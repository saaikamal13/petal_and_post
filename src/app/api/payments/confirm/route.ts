import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/supabase/utils/supabase-server';

// GET: Check payment status for an order
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderToken = searchParams.get('order_token');

    if (!orderToken) {
      return NextResponse.json(
        { error: 'Order token required' },
        { status: 400 }
      );
    }

    // Validate token format: ORD- + 32 base64url-safe characters
    const tokenPattern = /^ORD-[A-Za-z0-9_-]{32}$/;
    if (!tokenPattern.test(orderToken)) {
      return NextResponse.json(
        { error: 'Invalid order token format' },
        { status: 400 }
      );
    }

    const supa = createSupabaseServerClient();

    // Get order with payment info
    const { data: order, error: orderError } = await supa
      .from('orders')
      .select('id, order_token, payment_status, total_cents')
      .eq('order_token', orderToken)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Get payment record
    const { data: payment, error: paymentError } = await supa
      .from('payments')
      .select('gateway, payment_status, amount_cents, gateway_order_id, gateway_payment_id, gateway_signature, created_at, updated_at')
      .eq('order_id', order.id)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json(
        { error: 'Payment record not found' },
        { status: 404 }
      );
    }

    // Return sanitized payment info (never expose gateway signatures/raw data)
return NextResponse.json({
      success: true,
      paymentStatus: payment.payment_status,
      amountCents: payment.amount_cents,
      gateway: payment.gateway,
      orderToken,
    });
  } catch (err) {
    console.error('Payment GET exception:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Create a payment order (abstract/provider-agnostic)
// This endpoint sets up the payment record but does NOT confirm it.
// The actual confirmation happens via webhook from the payment provider.
export async function POST(request: NextRequest) {
  try {
    const {
      order_token,
      provider, // e.g., "cashfree", "phonepe", "razorpay"
    } = await request.json();

    if (!order_token) {
      return NextResponse.json(
        { error: 'Order token required' },
        { status: 400 }
      );
    }

    // Validate token format: ORD- + 32 base64url-safe characters
    const tokenPattern = /^ORD-[A-Za-z0-9_-]{32}$/;
    if (!tokenPattern.test(order_token)) {
      return NextResponse.json(
        { error: 'Invalid order token format' },
        { status: 400 }
      );
    }

    const supa = createSupabaseServerClient();

    // Verify the order exists
    const { data: order, error: orderError } = await supa
      .from('orders')
      .select('id, total_cents')
      .eq('order_token', order_token)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Create payment record in 'pending' state
    // gateway is set to the provider name; gateway_order_id and gateway_payment_id
    // are initially null and populated by the webhook
    const { data: payment, error: paymentError } = await supa
      .from('payments')
      .upsert({
        order_id: order.id,
        gateway: provider || 'none',
        amount_cents: order.total_cents,
        payment_status: 'pending',
        gateway_order_id: null,
        gateway_payment_id: null,
        gateway_signature: null,
      }, {
        onConflict: 'order_id',
      });

    if (paymentError) {
      console.error('Payment create error:', paymentError);
      return NextResponse.json(
        { error: 'Failed to create payment record' },
        { status: 500 }
      );
    }

return NextResponse.json({
      success: true,
      paymentId: (payment as unknown as { id: string }).id,
      order_token,
      paymentStatus: 'pending',
      amountCents: (payment as unknown as { amount_cents: number }).amount_cents,
    });
  } catch (error) {
    console.error('Payment create exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}