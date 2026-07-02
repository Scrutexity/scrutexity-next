import { NextRequest, NextResponse } from 'next/server';

const clientRanges = ['1-5', '6-15', '16-30', '30+'];
const serviceOptions = [
  'Website design & development',
  'SEO & content',
  'Paid ads',
  'Reputation management',
  'Social media',
  'Email & SMS marketing',
  'PR & brand strategy',
  'Other',
];
const auditExperienceOptions = ['Yes', 'No'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const agencyName = clean(body.agencyName);
    const website = clean(body.website);
    const contactName = clean(body.contactName);
    const email = clean(body.email);
    const phone = clean(body.phone) || 'Not provided';
    const activeClientRange = clean(body.activeClientRange);
    const services = cleanStringArray(body.services, serviceOptions);
    const averageValue = clean(body.averageValue);
    const interestReason = cleanLong(body.interestReason);
    const auditExperience = clean(body.auditExperience);
    const auditDetails = clean(body.auditDetails) || 'Not provided';
    const sampleClientUrl = clean(body.sampleClientUrl) || 'Not provided';
    const additionalNotes = cleanLong(body.additionalNotes) || 'Not provided';

    if (!agencyName || !website || !contactName || !email || !activeClientRange || !averageValue || !interestReason || !auditExperience) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    if (!clientRanges.includes(activeClientRange)) {
      return NextResponse.json({ error: 'Valid active client range required' }, { status: 400 });
    }

    if (!auditExperienceOptions.includes(auditExperience)) {
      return NextResponse.json({ error: 'Valid audit experience selection required' }, { status: 400 });
    }

    if (services.length === 0) {
      return NextResponse.json({ error: 'At least one service selection is required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[PartnerOSApplication] RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Application delivery is not configured' }, { status: 503 });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Scrutexity <onboarding@resend.dev>',
      to: 'nick@scrutexity.com',
      subject: `New Partner OS beta application: ${agencyName}`,
      text: `New Scrutexity Partner OS founding beta application:

Agency name: ${agencyName}
Website: ${website}
Primary contact: ${contactName}
Email: ${email}
Phone: ${phone}
Active med spa/wellness/high-trust healthcare clients: ${activeClientRange}
Services: ${services.join(', ')}
Average client value: ${averageValue}

Why interested:
${interestReason}

Prior claim/compliance/trust audits: ${auditExperience}
Details: ${auditDetails}
Sample client URL: ${sampleClientUrl}

Anything else:
${additionalNotes}

Internal follow-up:
1. Review within 48 hours.
2. Run a free sample Claim Snapshot on the supplied client page if usable.
3. Schedule a 20-minute call.
4. Show the sample report, explain the Sprint, confirm feedback commitment, then send contract/invoice.`,
    });

    await resend.emails.send({
      from: 'Scrutexity <onboarding@resend.dev>',
      to: email,
      subject: 'Scrutexity Partner OS beta application received',
      text: `Thanks ${contactName},

We received your Scrutexity Partner OS founding beta application for ${agencyName}.

We review applications within 48 hours. If selected, we will run a free sample snapshot on one of your client pages and schedule a 20-minute call.

Beta reminder:
- 5 founding partner spots
- From $1,497/month, billed monthly
- 10 white-label AuditGPT Claim Intelligence Reports per month
- Med Spa Claim Cleanup Sprint playbook + templates
- Monthly 15-20 minute feedback call

Scrutexity identifies trust gaps, proof gaps, AI answer distortion, and missed-demand patterns, then supports staff-approved, playbook-guided activation workflows.

- Scrutexity`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[PartnerOSApplication] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 240) : '';
}

function cleanLong(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 1200) : '';
}

function cleanStringArray(value: unknown, allowed: string[]) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(clean).filter((item) => allowed.includes(item));
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
