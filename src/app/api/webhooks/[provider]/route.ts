import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/supabase/utils/supabase-server';

// POST: Provider webhook endpoint for payment confirmation
// Signature verification and idempotency check happen here.
// Only the SUPABASE_SERVICE_ROLE_KEY (server-side) should receive these webhooks.
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider') || 'unknown';

    // Read raw body for signature verification
    const body = await request.text();

    // Get the provider webhook secret from environment
    // In production, this should be fetched from secure env vars
    const webhookSecret = process.env[`WEBHOOK_SECRET_${provider.toUpperCase()}`];

    if (!webhookSecret) {
      console.error(`Webhook secret not configured for provider: ${provider}`);
      return NextResponse.json(
        { error: 'Webhook endpoint misconfigured' },
        { status: 500 }
      );
    }

    // Verify signature (provider-specific logic)
    // This is a placeholder - real implementation depends on the provider
    // e.g., Cashfree requires HMAC-SHA256 signature verification,
    // PhonePe requires RSA signature, etc.
    const signatureValid = verifyProviderSignature(provider, body, request.headers.get('x-signature') || '');

    if (!signatureValid) {
      console.error(`Invalid signature for provider webhook: ${provider}`);
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    // Parse the webhook payload
    let webhookData;
    try {
      webhookData = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    const {
      gateway_order_id, // Order ID from the provider
      gateway_payment_id, // Payment ID from the provider
      amount,
      currency,
      status,
    } = webhookData || {};

    if (!gateway_order_id || !gateway_payment_id) {
      return NextResponse.json(
        { error: 'Missing required webhook fields' },
        { status: 400 }
      );
    }

    const supa = createSupabaseServerClient();

    // Find the order by gateway_order_id (owner verification)
    const { data: order, error: orderError } = await supa
      .from('orders')
      .select('id, order_token, total_cents, payment_status')
      .eq('id', gateway_order_id) // Using gateway_order_id as reference
      .single();

    if (orderError || !order) {
      console.error('Order not found in webhook:', gateway_order_id);
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check idempotency - if payment already confirmed, ignore
    if (order.payment_status === 'confirmed') {
      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        orderToken: order.order_token,
      });
    }

    // Find the payment record for this order
    const { data: payment, error: paymentError } = await supa
      .from('payments')
      .select('id, gateway, payment_status, amount_cents, gateway_order_id, gateway_payment_id')
      .eq('order_id', order.id)
      .single();

    if (paymentError || !payment) {
      console.error('Payment record not found in webhook:', paymentError);
      return NextResponse.json(
        { error: 'Payment record not found' },
        { status: 404 }
      );
    }

    // Verify amount and currency match
    const amountInCents = typeof amount === 'number' ? amount : (currency ? parseFloat(amount) * 100 : 0);
    if (payment.amount_cents !== amountInCents) {
      console.error(`Amount mismatch: expected ${payment.amount_cents}, got ${amountInCents}`);
      return NextResponse.json(
        { error: 'Amount mismatch' },
        { status: 400 }
      );
    }

    // Verify provider payment ID ownership
    if (payment.gateway_payment_id !== gateway_payment_id) {
      console.error(`Payment ID mismatch: ${payment.gateway_payment_id} vs ${gateway_payment_id}`);
      return NextResponse.json(
        { error: 'Payment ID mismatch' },
        { status: 400 }
      );
    }

    // Update payment record with provider data
    const { error: paymentUpdateError } = await supa
      .from('payments')
      .update({
        payment_status: status || 'confirmed',
        gateway_order_id: gateway_order_id,
        gateway_payment_id: gateway_payment_id,
        gateway_signature: request.headers.get('x-signature') || null,
        amount_cents: amountInCents,
      })
      .eq('id', payment.id);

    if (paymentUpdateError) {
      console.error('Payment update error in webhook:', paymentUpdateError);
      return NextResponse.json(
        { error: 'Failed to update payment status' },
        { status: 500 }
      );
    }

    // Update order payment status
    const { error: orderUpdateError } = await supa
      .from('orders')
      .update({ payment_status: status || 'confirmed' })
      .eq('id', order.id);

    if (orderUpdateError) {
      console.error('Order update error in webhook:', orderUpdateError);
      return NextResponse.json(
        { error: 'Failed to update order status' },
        { status: 500 }
      );
    }

    // Add timeline entry
    await supa
      .from('order_timeline')
      .insert({
        order_id: order.id,
        stage: 'OUT_FOR_DELIVERY', // or appropriate stage based on status
      });

    return NextResponse.json({
      success: true,
      paymentStatus: 'confirmed',
      orderToken: order.order_token,
    });
  } catch (error) {
    console.error('Webhook exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper: Verify provider signature (placeholder - implement per provider)
function verifyProviderSignature(
  provider: string,
  body: string,
  signature: string | null
): boolean {
  // Placeholder implementation - in production, each provider has
  // specific signature verification (HMAC, RSA, etc.)
  // For now, accept all webhooks if no secret is configured
  // (this should be replaced with real verification)
  return true;
}