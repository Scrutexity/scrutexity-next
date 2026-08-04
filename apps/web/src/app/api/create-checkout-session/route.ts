import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryId, email } = body;
    const priceId = process.env.STRIPE_CLAIM_SUPPORT_REVIEW_PRICE_ID;

    if (!inquiryId || !email) {
      return NextResponse.json({ error: 'Missing inquiry details' }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY || !priceId) {
      return NextResponse.json(
        { error: 'Checkout is not configured. No payment was created.' },
        { status: 503 },
      );
    }

    const { Stripe } = await import('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/contact?intent=claim-support-review&checkout=cancelled`,
      metadata: {
        product: 'claim_support_review',
        inquiryId,
        email,
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
