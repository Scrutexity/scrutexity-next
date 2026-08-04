import type { Metadata } from 'next';
import VerifyContent from '@/components/scrutexity/verify-content';

export const metadata: Metadata = {
  title: 'Scrutexity Verify | Badge Standards and Audit Status',
  description:
    'How Scrutexity verification works. Five badge states cover the claim and recovery lifecycle: Claim Audit Completed, Claim Library Active, Monitored by Scrutexity, Audited by Scrutexity, Expired — Rescan Required.',
  alternates: { canonical: '/verify' },
  robots: { index: false, follow: true },
};

export default function VerifyPage() {
  return <VerifyContent />;
}
