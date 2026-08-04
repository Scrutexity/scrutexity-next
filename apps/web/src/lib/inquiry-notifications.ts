import {
  claimInquiryNotification,
  markInquiryNotificationSent,
  releaseInquiryNotification,
  type InquiryRecord,
} from '@/lib/inquiries';
import { INQUIRY_OFFERS } from '@/lib/inquiry-offers';

export async function notifyInquiryOwner(
  record: InquiryRecord,
  kind: 'submission' | 'payment',
): Promise<{ configured: boolean; sent: boolean; duplicate: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const owner = process.env.INQUIRY_OWNER_EMAIL;
  if (!apiKey || !from || !owner) return { configured: false, sent: false, duplicate: false };

  const claimed = await claimInquiryNotification(record.id, kind);
  if (!claimed) return { configured: true, sent: false, duplicate: true };

  try {
    const offer = INQUIRY_OFFERS[record.offer];
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const paid = kind === 'payment';
    const lines = [
      `Inquiry ID: ${record.id}`,
      `Submitted: ${record.createdAt}`,
      `Payment state: ${paid ? 'Paid' : 'Not paid'}`,
      `Offer: ${offer.label} (${record.offer})`,
      `Name: ${record.name}`,
      `Email: ${record.email}`,
      `Website: ${record.websiteUrl}`,
      '',
      'Context:',
      record.context || 'Not provided',
    ];
    if (paid) {
      lines.push(
        '',
        `Paid at: ${record.paidAt ?? 'Not recorded'}`,
        `Amount: ${record.amountTotal == null ? 'Not recorded' : `${(record.amountTotal / 100).toFixed(2)} ${(record.currency ?? '').toUpperCase()}`}`,
        `Stripe session: ${record.stripeSessionId ?? 'Not recorded'}`,
      );
    }

    const result = await resend.emails.send({
      from,
      to: owner,
      replyTo: record.email,
      subject: paid
        ? `PAID Scrutexity Claim Support Review · ${record.id}`
        : `New ${offer.label} inquiry · ${record.id}`,
      text: lines.join('\n'),
    });
    if (result.error) throw new Error('OWNER_NOTIFICATION_FAILED');
    await markInquiryNotificationSent(record.id, kind);
    return { configured: true, sent: true, duplicate: false };
  } catch (error) {
    await releaseInquiryNotification(record.id, kind);
    throw error;
  }
}
