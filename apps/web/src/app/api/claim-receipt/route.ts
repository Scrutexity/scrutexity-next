import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, organization, email, url, receiptId } = body;

    // Log submission (non-blocking)
    console.log('[Claim Receipt Submission]', {
      receiptId,
      name,
      organization,
      email,
      url,
      timestamp: new Date().toISOString(),
    });

    // Optional: send email notification, store in DB, etc.
    // For now, just acknowledge receipt
    return NextResponse.json(
      { success: true, receiptId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Claim Receipt Error]', error);
    return NextResponse.json(
      { error: 'Failed to process receipt' },
      { status: 500 }
    );
  }
}
