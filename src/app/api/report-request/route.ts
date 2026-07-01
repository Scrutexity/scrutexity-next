import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, clinic, locations } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Nick <founder@scrutexity.com>',
        to: email,
        subject: 'Your demand leak report — Scrutexity',
        text: `Hi${clinic ? ` — thanks for reaching out from ${clinic}` : ''},

We've received your request. Within 24 hours, we'll map your clinic's missed-demand patterns and email you the report directly.

Here's what we look at:
- Missed calls and after-hours inquiries with no callback triggered
- Web forms unanswered for 2+ hours
- Consults inquired but never re-contacted
- Deposit links never sent after a consult

We'll send you a written summary of what we find — no sales call required. If we find a leak worth addressing, the report will say so plainly and we'll propose next steps.

If we don't find anything meaningful, we'll tell you that too.

Best,
Nick
Founder, Scrutexity
founder@scrutexity.com`,
      });

      await resend.emails.send({
        from: 'Scrutexity <founder@scrutexity.com>',
        to: 'founder@scrutexity.com',
        subject: `New leak report request: ${email}`,
        text: `New leak report request:

Email: ${email}
Clinic: ${clinic || '(not provided)'}
Locations: ${locations || '(not provided)'}

Reply within 24h with the demand report.`,
      });
    } catch {
      console.log('[ReportRequest] Email skipped (no API key or Resend error)');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ReportRequest] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
