import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, websiteUrl, companyType, worry, phone, budget, primaryGoal, selectedTier } = body;

    if (!name || !email || !company || !websiteUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate unique public ID for this requested audit
    const companySlug = company
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const publicId = `${companySlug || 'clinic'}-${Math.random().toString(36).substring(2, 8)}`;

    let redirectUrl = `/claim-audit/${publicId}`;

    // Determine checkout redirect URL for paid tiers
    if (selectedTier === 'full' || selectedTier === 'rescan') {
      const isRescan = selectedTier === 'rescan';
      const stripeSecret = process.env.STRIPE_SECRET_KEY;
      const priceId = isRescan 
        ? (process.env.NEXT_PUBLIC_STRIPE_CLAIM_DRIFT_MONITORING_299_MONTHLY || 'price_test_monitoring_299')
        : (process.env.NEXT_PUBLIC_STRIPE_CLAIM_INTELLIGENCE_REPORT_299 || 'price_test_intel_299');

      if (stripeSecret) {
        try {
          const { Stripe } = await import('stripe');
          const stripe = new Stripe(stripeSecret, {
            apiVersion: '2025-03-31.basil' as any,
          });

          const session = await stripe.checkout.sessions.create({
            mode: isRescan ? 'subscription' : 'payment',
            payment_method_types: ['card'],
            line_items: [
              {
                price: priceId,
                quantity: 1,
              },
            ],
            success_url: `${request.nextUrl.origin}/claim-audit/${publicId}`,
            cancel_url: `${request.nextUrl.origin}/claim-audit`,
            metadata: {
              product: isRescan ? 'claim_drift_monitoring' : 'claim_intelligence_report',
              publicId,
              email,
            },
          });
          redirectUrl = session.url || redirectUrl;
        } catch (checkoutErr: any) {
          console.error('[ClaimAudit] Failed to create Stripe checkout session:', checkoutErr.message);
          // Fallback to dev auto-unlock URL if Stripe fails
          redirectUrl = `/claim-audit/${publicId}?unlocked=1`;
        }
      } else {
        console.warn('[ClaimAudit] STRIPE_SECRET_KEY not set. Falling back to dev-unlocked path.');
        redirectUrl = `/claim-audit/${publicId}?unlocked=1`;
      }
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('[ClaimAudit] RESEND_API_KEY is not configured. Simulating success.');
      return NextResponse.json({ success: true, redirectUrl });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Send Lead to Nick
    await resend.emails.send({
      from: 'Scrutexity <onboarding@resend.dev>',
      to: 'nick@scrutexity.com',
      subject: `New Claim Audit Request: ${company} (${selectedTier})`,
      text: `New Claim Audit Intake:

Name: ${name}
Email: ${email}
Company: ${company}
Website: ${websiteUrl}
Type: ${companyType}
Goal: ${primaryGoal || 'Not provided'}
Phone: ${phone || 'Not provided'}
Budget: ${budget || 'Not provided'}
Tier: ${selectedTier}
Report ID: ${publicId}
Report Link: ${request.nextUrl.origin}/claim-audit/${publicId}

Worry/Focus:
${worry}
`,
    });

    // 2. Send Confirmation to User
    if (selectedTier === 'full' || selectedTier === 'rescan') {
      await resend.emails.send({
        from: 'Scrutexity <onboarding@resend.dev>',
        to: email,
        subject: `Your Scrutexity Claim Audit is being prepared`,
        text: `Hi ${name},

We have received your website URL and request. Your Claim Audit is being prepared. 

You can view the preview and monitor progress here:
${request.nextUrl.origin}/claim-audit/${publicId}

If you haven't completed your payment yet, you will be prompted on the page, or you can complete checkout directly to release the full report.

Expect delivery within 24 to 48 hours after payment confirmation.

Best,
The Scrutexity Team
www.scrutexity.com`,
      });
    } else {
      // Free Snapshot Confirmation
      await resend.emails.send({
        from: 'Scrutexity <onboarding@resend.dev>',
        to: email,
        subject: `Your Free 3-Point Snapshot request`,
        text: `Hi ${name},

We have received your website URL. We are processing your Free 3-Point Visibility & Trust Snapshot.

You can view it here once ready:
${request.nextUrl.origin}/claim-audit/${publicId}

Expect delivery within 24 to 48 hours. 

Best,
The Scrutexity Team
www.scrutexity.com`,
      });
    }

    return NextResponse.json({ success: true, redirectUrl });
  } catch (error) {
    console.error('[ClaimAudit] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
