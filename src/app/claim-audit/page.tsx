import type { Metadata } from 'next';
import ClaimAuditContent from '@/components/scrutexity/claim-audit-content';

export const metadata: Metadata = {
  title: 'AuditGPT by Scrutexity | Audit, Visibility, Reputation, and Recovery Plan',
  description:
    'AuditGPT reviews your website, claims, visibility, reputation surface, and follow-up paths, then gives you a clear plan for what to fix first. Diagnose unsupported claims, evidence gaps, AI visibility issues, and leakage.',
  alternates: { canonical: '/claim-audit' },
};

export default function ClaimAuditPage() {
  return <ClaimAuditContent />;
}
