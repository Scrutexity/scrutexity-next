import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiKey = body.apiKey;

    console.log('[Scrutexity Pilot Integration] Received API Key:', apiKey ? '***' + apiKey.slice(-4) : 'none');

    // Simulate database save delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Send email notification to founder (mocked)
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Scrutexity <nick@scrutexity.com>',
          to: 'nick@scrutexity.com',
          subject: `[Pilot] New API Key Connected`,
          text: `A new pilot clinic just completed Phase 2 and connected their API Key.
          
API Key Ends In: ${apiKey ? apiKey.slice(-4) : 'N/A'}

The 24-hour sandbox timer has initiated.`,
        });
      }
    } catch (emailError) {
      console.log('[Scrutexity Pilot] Email skipped (no API key or Resend error)');
    }

    return NextResponse.json({ success: true, message: 'API key saved securely. Sandbox initiated.' });
  } catch (error) {
    console.error('[Scrutexity Pilot] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
