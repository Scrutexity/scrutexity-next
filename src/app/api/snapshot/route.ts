import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, clinic, email, phone, pms } = body;

    if (!name || !clinic || !email || !email.includes('@')) {
      return NextResponse.json({ error: 'Name, clinic, and valid email are required' }, { status: 400 });
    }

    // Try to send notification email
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Scrutexity <founder@scrutexity.com>',
        to: 'founder@scrutexity.com',
        subject: `Revenue Leak Snapshot request: ${clinic}`,
        text: [
          `New Revenue Leak Snapshot request:`,
          `Name: ${name}`,
          `Clinic: ${clinic}`,
          `Email: ${email}`,
          `Phone: ${phone || '—'}`,
          `PMS: ${pms || '—'}`,
          ``,
          `→ https://scrutexity.com/snapshot/thank-you`,
        ].join('\n'),
      });

      await resend.emails.send({
        from: 'Nick <founder@scrutexity.com>',
        to: email,
        subject: 'Your Revenue Leak Snapshot is being prepared',
        text: [
          `Hi ${name.split(' ')[0]},`,
          ``,
          `Thanks for requesting a Revenue Leak Snapshot for ${clinic}.`,
          ``,
          `I review every submission personally within 24 hours. You'll receive:`,
          ``,
          `• Your clinic's Demand Capture Health Score`,
          `• Estimated monthly revenue leakage`,
          `• Response time vs. industry benchmark`,
          `• Top 3 recovery opportunities`,
          ``,
          `If you don't hear from me by tomorrow, reply to this email and I'll bump you to the front of the line.`,
          ``,
          `Best,`,
          `Nick`,
          `Founder, Scrutexity`,
          `founder@scrutexity.com`,
        ].join('\n'),
      });
    } catch (emailError) {
      console.log('[Snapshot] Email skipped (no API key or Resend error)');
    }

    // Forward lead to local Command Center webhook
    try {
      const webhookUrl = process.env.COMMAND_CENTER_WEBHOOK_URL || 'http://localhost:3010/api/webhooks/vercel-lead';
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'snapshot', ...body })
      }).catch(err => console.log('[Snapshot] Webhook error (non-blocking):', err.message));
    } catch (err) {
      console.log('[Snapshot] Webhook prep error:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Snapshot] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
