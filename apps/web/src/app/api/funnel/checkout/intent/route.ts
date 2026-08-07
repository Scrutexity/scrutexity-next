import { NextResponse } from "next/server";
import Stripe from "stripe";
import { verifyScanToken } from "@/lib/funnel/auth";
import { getScanRecord } from "@/lib/funnel/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-07-29.dahlia",
});

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    
    const body = await request.json();
    const { scanId } = body;

    const payload = await verifyScanToken(token);
    if (!payload || payload.scanId !== scanId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const record = await getScanRecord(scanId);
    if (!record || record.authLevel === "LOCKED") {
      // Must have captured email first
      return NextResponse.json({ error: "Invalid state for checkout" }, { status: 400 });
    }

    if (record.authLevel === "PURCHASED" || record.authLevel === "DEMO") {
      return NextResponse.json({ error: "Already purchased" }, { status: 400 });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 9900, // $99.00
      currency: "usd",
      metadata: {
        scanId,
        type: "EXHIBIT_PACKAGE",
      },
      // In production, you might link this to a Stripe Customer using record.email
      receipt_email: record.email || undefined,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Checkout intent error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
