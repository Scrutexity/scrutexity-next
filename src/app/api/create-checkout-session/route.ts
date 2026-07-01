import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, tier } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    // If no Stripe key, fall back to payment link
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log('[Stripe] No STRIPE_SECRET_KEY — returning payment link fallback');
      return NextResponse.json({
        url: 'https://buy.stripe.com/YOUR_PAYMENT_LINK',
      });
    }

    const { Stripe } = await import('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-03-31.basil' as any,
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/checkout/success?tier=${tier || 'lite'}`,
      cancel_url: `${request.nextUrl.origin}/lite`,
      metadata: {
        tier: tier || 'lite',
        source: 'lite_checkout',
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('[Stripe] Checkout error:', err);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
