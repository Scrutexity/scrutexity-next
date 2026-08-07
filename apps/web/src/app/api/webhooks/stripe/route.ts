import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateScanAuthLevel } from "@/lib/funnel/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-07-29.dahlia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_placeholder";

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      const scanId = paymentIntent.metadata?.scanId;
      const type = paymentIntent.metadata?.type;
      
      if (scanId && type === "EXHIBIT_PACKAGE") {
        console.log(`Payment succeeded for scanId: ${scanId}. Upgrading to PURCHASED.`);
        
        // Upgrade the DB record to PURCHASED
        try {
          await updateScanAuthLevel(scanId, "PURCHASED");
        } catch (dbError) {
          console.error("Failed to upgrade scan record in DB:", dbError);
          // Still return 200 so Stripe doesn't retry endlessly, 
          // but we'd normally want an alerting system here.
        }
      }
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
