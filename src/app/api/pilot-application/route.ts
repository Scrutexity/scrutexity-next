import { NextRequest, NextResponse } from 'next/server';

const pmsOptions = ['Boulevard', 'Mangomint', 'Zenoti', 'Other'];
const inquiryOptions = ['Under 75', '75-150', '150-250', '250+'];
const ticketOptions = ['Under $500', '$500-$1,000', '$1,000-$2,000', '$2,000+'];
const locationOptions = ['1', '2-3', '4+'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fullName = clean(body.fullName);
    const email = clean(body.email);
    const phone = clean(body.phone) || 'Not provided';
    const clinicName = clean(body.clinicName);
    const website = clean(body.website) || 'Not provided';
    const currentPms = clean(body.currentPms);
    const locationCount = clean(body.locationCount) || '1';
    const estimatedMonthlyInquiries = clean(body.estimatedMonthlyInquiries) || 'Under 75';
    const avgTicketRange = clean(body.avgTicketRange) || 'Under $500';

    if (!fullName || !email || !clinicName || !currentPms) {
      return NextResponse.json({ error: 'Full name, email, clinic name, and PMS selection are required' }, { status: 400 });
    }

    if (!pmsOptions.includes(currentPms)) {
      return NextResponse.json({ error: 'Valid PMS selection required' }, { status: 400 });
    }

    if (!inquiryOptions.includes(estimatedMonthlyInquiries)) {
      return NextResponse.json({ error: 'Valid monthly inquiry range required' }, { status: 400 });
    }

    if (!ticketOptions.includes(avgTicketRange)) {
      return NextResponse.json({ error: 'Valid average ticket range required' }, { status: 400 });
    }

    if (!locationOptions.includes(locationCount)) {
      return NextResponse.json({ error: 'Valid location count required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[PilotApplication] RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Application delivery is not configured' }, { status: 503 });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Scrutexity <onboarding@resend.dev>',
      to: 'nick@scrutexity.com',
      subject: `New Scrutexity pilot application: ${clinicName}`,
      text: `New Scrutexity pilot application:

Full name: ${fullName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Clinic name: ${clinicName}
Website: ${website}
Current PMS: ${currentPms}
Number of locations: ${locationCount}
Estimated monthly inquiries: ${estimatedMonthlyInquiries}
Average ticket range: ${avgTicketRange}

Review and reply within 24 hours if the clinic qualifies for the current cohort.`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[PilotApplication] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 200) : '';
}
