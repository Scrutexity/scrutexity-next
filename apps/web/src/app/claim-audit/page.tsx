import type { Metadata } from 'next';
import ClaimAuditContent from '@/components/scrutexity/claim-audit-content';

export const metadata: Metadata = {
  title: 'AuditGPT by Scrutexity | Claim Exposure Review Intake',
  description:
    'Submit a public marketing URL for an AuditGPT Claim Exposure Review. Scrutexity maps public claim language against current enforcement patterns and returns safer replacement language.',
  alternates: { canonical: '/claim-audit' },
  robots: { index: false, follow: true },
};

export default function ClaimAuditPage() {
  return <ClaimAuditContent />;
}
