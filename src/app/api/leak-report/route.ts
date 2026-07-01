import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, traffic, conv, ticket, monthlyLeak, pilotTarget } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Number validation
    if (typeof traffic !== 'number' || traffic < 800 || traffic > 12000) {
      return NextResponse.json({ error: 'Invalid traffic' }, { status: 400 });
    }
    if (typeof conv !== 'number' || conv < 0.8 || conv > 7) {
      return NextResponse.json({ error: 'Invalid conv' }, { status: 400 });
    }
    if (typeof ticket !== 'number' || ticket < 450 || ticket > 3500) {
      return NextResponse.json({ error: 'Invalid ticket' }, { status: 400 });
    }

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailText = `Hello,

Thank you for requesting your missed-demand estimate from Scrutexity. Based on the metrics you provided, your clinic has an estimated missed-demand opportunity of $${monthlyLeak.toLocaleString()} per month.

Your inputs:
- Monthly qualified traffic: ${traffic.toLocaleString()}
- Current booking conversion: ${conv.toFixed(1)}%
- Average high-ticket value: $${ticket.toLocaleString()}

Our conservative 14-day pilot target to recover this demand is $${pilotTarget.toLocaleString()}. The pilot installs our governed routing layer around the moments where your high-ticket demand goes cold, without forcing a software migration.

We'll be in touch if we have questions. No sales call — the data speaks for itself.

Best,
Nick
Founder, Scrutexity
founder@scrutexity.com`;

      await resend.emails.send({
        from: 'Nick <founder@scrutexity.com>',
        to: email,
        subject: 'Your missed-demand estimate',
        text: emailText,
      });

      await resend.emails.send({
        from: 'Scrutexity <founder@scrutexity.com>',
        to: 'founder@scrutexity.com',
        subject: `New calculator lead: ${email}`,
        text: `New calculator lead: ${email}, estimated monthly: $${monthlyLeak.toLocaleString()}`,
      });
    } catch (emailError) {
      console.log('[LeakReport] Email skipped (no API key or Resend error)');
    }

    // Forward lead payload to local Command Center webhook
    try {
      const webhookUrl = process.env.COMMAND_CENTER_WEBHOOK_URL || 'http://localhost:3010/api/webhooks/vercel-lead';
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).catch(err => console.log('[LeakReport] Webhook fetch error (non-blocking):', err.message));
    } catch (err) {
      console.log('[LeakReport] Webhook prep error:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[LeakReport] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
