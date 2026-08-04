export const INQUIRY_OFFER_VALUES = [
  'claim-support-review',
  'founders-audit',
  'agency-claim-qa',
  'agent-evidence-pack',
  'monitoring',
] as const;

export type InquiryOffer = (typeof INQUIRY_OFFER_VALUES)[number];

export const INQUIRY_OFFERS: Record<InquiryOffer, {
  label: string;
  formLabel: string;
  submitLabel: string;
  subject: string;
  prompt: string;
  confirmationTitle: string;
  scoped: boolean;
}> = {
  'claim-support-review': {
    label: 'Claim Support Review',
    formLabel: 'Claim Support Review · $99',
    submitLabel: 'Continue to secure checkout',
    subject: 'Claim Support Review inquiry',
    prompt: 'Send the public page you want reviewed and the claim that matters most.',
    confirmationTitle: 'Claim Support Review request saved.',
    scoped: false,
  },
  'founders-audit': {
    label: 'Founder’s Audit',
    formLabel: 'Founder’s Audit · from $750',
    submitLabel: 'Send Founder’s Audit inquiry',
    subject: 'Founder’s Audit inquiry',
    prompt: 'Share the company URL, current offer, and the business question you need the audit to answer.',
    confirmationTitle: 'Founder’s Audit inquiry received.',
    scoped: true,
  },
  'agency-claim-qa': {
    label: 'Agency Claim QA',
    formLabel: 'Agency Claim QA · from $1,500',
    submitLabel: 'Send Agency Claim QA inquiry',
    subject: 'Agency Claim QA inquiry',
    prompt: 'Share your agency URL, typical client volume, and one representative client page.',
    confirmationTitle: 'Agency Claim QA inquiry received.',
    scoped: true,
  },
  'agent-evidence-pack': {
    label: 'Agent Evidence Pack',
    formLabel: 'Agent Evidence Pack · from $2,500',
    submitLabel: 'Send Agent Evidence Pack inquiry',
    subject: 'Agent Evidence Pack inquiry',
    prompt: 'Share the agent’s customer-facing use case and the approximate transcript volume available for review.',
    confirmationTitle: 'Agent Evidence Pack inquiry received.',
    scoped: true,
  },
  monitoring: {
    label: 'Monitoring inquiry',
    formLabel: 'Monitoring inquiry · after an initial review',
    submitLabel: 'Send monitoring inquiry',
    subject: 'Scrutexity monitoring inquiry',
    prompt: 'Monitoring is considered after an initial review. Share the surface, change cadence, and review need.',
    confirmationTitle: 'Monitoring inquiry received.',
    scoped: true,
  },
};

export function isInquiryOffer(value: string | undefined): value is InquiryOffer {
  return Boolean(value && INQUIRY_OFFER_VALUES.includes(value as InquiryOffer));
}
