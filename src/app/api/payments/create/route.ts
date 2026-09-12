import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/supabase/utils/supabase-server';

// POST: Create a payment order (abstract/provider-agnostic)
// This endpoint sets up the payment record in 'pending' state.
// The actual confirmation happens via webhook from the payment provider.
export async function POST(request: NextRequest): Promise<NextResponse> {
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

    // Check if a payment record already exists for this order (idempotency)
    const { data: existingPayment, error: existingError } = await supa
      .from('payments')
      .select('payment_status, gateway, amount_cents, id')
      .eq('order_id', order.id)
      .single();

    if (existingError && existingError.code !== 'PGRST116') {
      // PGRST116 = "No rows returned" - that's fine, no payment exists yet
      console.error('Payment check error:', existingError);
      return NextResponse.json(
        { error: 'Failed to check existing payment' },
        { status: 500 }
      );
    }

    // If payment already exists and is confirmed, return existing record
    if (existingPayment && existingPayment.payment_status === 'confirmed') {
      return NextResponse.json({
        success: true,
        paymentId: existingPayment.id,
        orderToken: order_token,
        paymentStatus: 'confirmed',
        amountCents: existingPayment.amount_cents,
      });
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      paymentId: (payment as any).id,
      orderToken: order_token,
      paymentStatus: 'pending',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      amountCents: (payment as any).amount_cents,
    });
  } catch (error) {
    console.error('Payment create exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}