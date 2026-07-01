import { NextResponse, NextRequest } from 'next/server';

const RESEND_API = 'https://api.resend.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, clinic, locations } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[ReportRequest] RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    // Send the confirmation email to the lead.
    // NOTE: Resend sandbox only sends to scrutexity@gmail.com until the domain
    // is fully verified for sending. Swap to email once verified.
    const userPayload = {
      from: 'Scrutexity <onboarding@resend.dev>',
      to: ['scrutexity@gmail.com'],
      subject: 'Your demand leak report — Scrutexity',
      text: [
        `Hi${clinic ? ` — thanks for reaching out from ${clinic}` : ''},`,
        '',
        "We've received your request. Within 24 hours, we'll map your clinic's missed-demand patterns and email you the report directly.",
        '',
        "Here's what we look at:",
        '- Missed calls and after-hours inquiries with no callback triggered',
        '- Web forms unanswered for 2+ hours',
        '- Consults inquired but never re-contacted',
        '- Deposit links never sent after a consult',
        '',
        "We'll send you a written summary of what we find — no sales call required. If we find a leak worth addressing, the report will say so plainly and we'll propose next steps.",
        '',
        "If we don't find anything meaningful, we'll tell you that too.",
        '',
        'Best,',
        'Nick',
        'Founder, Scrutexity',
        'nick@scrutexity.com',
      ].join('\n'),
    };

    const userRes = await fetch(`${RESEND_API}/emails`, {
      method: 'POST',
      headers,
      body: JSON.stringify(userPayload),
    });

    if (!userRes.ok) {
      const errText = await userRes.text();
      console.error('[ReportRequest] Resend user send failed:', userRes.status, errText);
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }

    // Send the internal notification.
    const internalPayload = {
      from: 'Scrutexity <onboarding@resend.dev>',
      to: ['scrutexity@gmail.com'],
      subject: `New leak report request: ${email}`,
      text: [
        `New leak report request:`,
        '',
        `Email: ${email}`,
        `Clinic: ${clinic || '(not provided)'}`,
        `Locations: ${locations || '(not provided)'}`,
        '',
        'Reply within 24h with the demand report.',
      ].join('\n'),
    };

    const internalRes = await fetch(`${RESEND_API}/emails`, {
      method: 'POST',
      headers,
      body: JSON.stringify(internalPayload),
    });

    if (!internalRes.ok) {
      const errText = await internalRes.text();
      console.error('[ReportRequest] Resend internal send failed:', internalRes.status, errText);
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }

    // Best-effort CRM push — skip silently if unset.
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    if (crmWebhookUrl) {
      try {
        await fetch(crmWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'scrutexity-homepage-audit-form',
            email,
            clinic,
            locations,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (crmError) {
        console.error('[ReportRequest] CRM webhook push failed:', crmError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ReportRequest] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
