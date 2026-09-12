import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/supabase/utils/supabase-server';
import crypto from 'crypto';

// POST: Create a new order from draft
export async function POST(request: NextRequest) {
  try {
    const {
      content,
      writingStyle,
      closing,
      recipientGreetingName,
      flowersEnabled,
      flowerType,
      waxSealEnabled,
      envelopeColor,
      recipientData,
      sender,
    } = await request.json();

    // Server-side pricing calculation (never trust browser-supplied total)
    const basePrice = 4900; // ₹49 in paise

    let calligraphyPrice = 0;
    if (writingStyle === 'calligraphy') {
      calligraphyPrice = 1500;
    }

    let flowersPrice = 0;
    if (flowersEnabled && flowerType) {
      flowersPrice = 3000;
    }

    let waxSealPrice = 0;
    if (waxSealEnabled) {
      waxSealPrice = 2000;
    }

    const totalCents =
      basePrice +
      calligraphyPrice +
      flowersPrice +
      waxSealPrice;

    // Generate cryptographically secure order token:
    // ORD- + 32 base64url characters
    const tokenChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

    let token = 'ORD-';

    for (let i = 0; i < 32; i++) {
      token += tokenChars[crypto.randomInt(0, tokenChars.length)];
    }

    // Create Supabase server client (service-role key, server-only)
    const supa = createSupabaseServerClient();

    // ============================================================
    // 1. CREATE ORDER
    // ============================================================

    const { data: order, error: orderError } = await supa
      .from('orders')
      .insert({
        order_token: token,
        status: 'pending',
        total_cents: totalCents,
        payment_status: 'pending',
        user_id: null, // anonymous order
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Order creation error:', orderError);

      return NextResponse.json(
        {
          error: 'Failed to create order',
          details: orderError?.message || 'Unknown order creation error',
        },
        { status: 500 }
      );
    }

    // ============================================================
    // 2. CREATE LETTER
    // ============================================================

    const { data: letter, error: letterError } = await supa
      .from('letters')
      .insert({
        order_id: order.id,
        content: content || '',
        writing_style: writingStyle || 'classic',
        closing: closing || '',
        recipient_greeting: recipientGreetingName || null,
        anonymity_mode: sender?.anonymityMode || 'anonymous',
        nickname: sender?.nickname || null,
        real_name: sender?.realName || null,
      })
      .select()
      .single();

    if (letterError || !letter) {
      console.error('Letter creation error:', letterError);

      // Clean up the order so we don't leave a partial order behind.
      await supa
        .from('orders')
        .delete()
        .eq('id', order.id);

      return NextResponse.json(
        {
          error: 'Failed to create letter',
          details: letterError?.message || 'Unknown letter creation error',
        },
        { status: 500 }
      );
    }

    // ============================================================
    // 3. CREATE RECIPIENT
    // ============================================================

    // recipientType is a database-level type, NOT the department.
    // The previous code incorrectly sent values such as "CSE" here,
    // which violated recipients_recipient_type_check.
    const rType = 'student';

    const { data: rec, error: recipientError } = await supa
      .from('recipients')
      .insert({
        order_id: order.id,
        recipient_type: rType,
        name: recipientData?.name || '',
        department_or_school: recipientData?.department || '',
        year: recipientData?.year || null,
        registration_number:
          recipientData?.registrationNumber || null,
        delivery_location:
          recipientData?.deliveryLocation || '',
        delivery_instructions:
          recipientData?.deliveryInstructions || null,
      })
      .select()
      .single();

    if (recipientError || !rec) {
      console.error('Recipient creation error:', recipientError);

      // Clean up the partially-created order.
      // The related letter should be removed by the database
      // if order_id has ON DELETE CASCADE configured.
      await supa
        .from('orders')
        .delete()
        .eq('id', order.id);

      return NextResponse.json(
        {
          error: 'Failed to create recipient',
          details:
            recipientError?.message ||
            'Unknown recipient creation error',
        },
        { status: 500 }
      );
    }

    // ============================================================
    // 4. CREATE CUSTOMIZATION
    // ============================================================

    const { data: customization, error: customizationError } =
      await supa
        .from('customizations')
        .insert({
          order_id: order.id,
          flowers_enabled: flowersEnabled || false,
          flower_type: flowerType || null,
          wax_seal_enabled: waxSealEnabled || false,
          envelope_color: envelopeColor || 'blush',
          base_price_cents: basePrice,
          calligraphy_price_cents: calligraphyPrice,
          flowers_price_cents: flowersPrice,
          wax_seal_price_cents: waxSealPrice,
        })
        .select()
        .single();

    if (customizationError || !customization) {
      console.error(
        'Customization creation error:',
        customizationError
      );

      // Clean up the partially-created order.
      await supa
        .from('orders')
        .delete()
        .eq('id', order.id);

      return NextResponse.json(
        {
          error: 'Failed to create customization',
          details:
            customizationError?.message ||
            'Unknown customization creation error',
        },
        { status: 500 }
      );
    }

    // ============================================================
    // 5. CREATE INITIAL TIMELINE ENTRY
    // ============================================================

    const { error: timelineError } = await supa
      .from('order_timeline')
      .insert({
        order_id: order.id,
        stage: 'pending',
      });

    if (timelineError) {
      console.error(
        'Timeline creation error:',
        timelineError
      );

      // Clean up the partially-created order.
      await supa
        .from('orders')
        .delete()
        .eq('id', order.id);

      return NextResponse.json(
        {
          error: 'Failed to create order timeline',
          details: timelineError.message,
        },
        { status: 500 }
      );
    }

    // ============================================================
    // 6. RETURN SUCCESS
    // ============================================================

    return NextResponse.json({
      success: true,
      orderToken: token,
      order,
      letter,
      recipient: rec,
      customization,
      total: totalCents / 100,
    });
  } catch (error) {
    console.error('Order creation exception:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve order summary for tracking/page
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

    // Validate token format:
    // ORD- + 32 base64url-safe characters
    const tokenPattern = /^ORD-[A-Za-z0-9_-]{32}$/;

    if (!tokenPattern.test(orderToken)) {
      return NextResponse.json(
        { error: 'Invalid order token format' },
        { status: 400 }
      );
    }

    // Create Supabase server client
    const supa = createSupabaseServerClient();

    // ============================================================
    // GET ORDER
    // ============================================================

    const { data: order, error: orderError } = await supa
      .from('orders')
      .select(`
        id,
        order_token,
        status,
        total_cents,
        payment_status,
        created_at
      `)
      .eq('order_token', orderToken)
      .single();

    if (orderError || !order) {
      console.error('Order fetch error:', orderError);

      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // ============================================================
    // GET RECIPIENT
    // ============================================================

    const { data: recipient, error: recipientError } =
      await supa
        .from('recipients')
        .select(`
          name,
          recipient_type,
          department_or_school,
          year,
          delivery_location
        `)
        .eq('order_id', order.id)
        .single();

    if (recipientError) {
      console.error(
        'Recipient fetch error:',
        recipientError
      );
    }

    // ============================================================
    // GET CUSTOMIZATION
    // ============================================================

    const {
      data: customization,
      error: customizationError,
    } = await supa
      .from('customizations')
      .select(`
        flowers_enabled,
        flower_type,
        wax_seal_enabled,
        envelope_color
      `)
      .eq('order_id', order.id)
      .single();

    if (customizationError) {
      console.error(
        'Customization fetch error:',
        customizationError
      );
    }

    // ============================================================
    // GET TIMELINE
    // ============================================================

    const {
      data: timeline,
      error: timelineError,
    } = await supa
      .from('order_timeline')
      .select('stage, created_at')
      .eq('order_id', order.id)
      .order('created_at', { ascending: true });

    if (timelineError) {
      console.error(
        'Timeline fetch error:',
        timelineError
      );
    }

    // ============================================================
    // SAFE RESPONSE
    // ============================================================

    const safeOrder = {
      id: order.id,
      order_token: order.order_token,
      status: order.status,
      total_cents: order.total_cents,
      payment_status: order.payment_status,
      created_at: order.created_at,
    };

    const safeRecipient = recipient
      ? {
          name: recipient.name,
          recipient_type: recipient.recipient_type,
          department_or_school:
            recipient.department_or_school,
          year: recipient.year,
          delivery_location:
            recipient.delivery_location,
        }
      : null;

    const safeCustomization = customization
      ? {
          flowers_enabled:
            customization.flowers_enabled,
          flower_type: customization.flower_type,
          wax_seal_enabled:
            customization.wax_seal_enabled,
          envelope_color:
            customization.envelope_color,
        }
      : null;

    const safeTimeline = timeline
      ? timeline.map(
          (t: {
            stage: string;
            created_at: string;
          }) => ({
            stage: t.stage,
            created_at: t.created_at,
          })
        )
      : [];

    return NextResponse.json({
      order: safeOrder,
      recipient: safeRecipient,
      customization: safeCustomization,
      timeline: safeTimeline,
    });
  } catch (err) {
    console.error('Order GET exception:', err);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details:
          err instanceof Error
            ? err.message
            : 'Unknown error',
      },
      { status: 500 }
    );
  }
}