import type { Metadata } from 'next';
import VerifyReceiptContent from '@/components/scrutexity/verify-receipt-content';

export const metadata: Metadata = {
  title: 'Verify Audit Receipt | Scrutexity',
  description: 'Cryptographically verify a Scrutexity Agent Audit JSON receipt to prove compliance.',
  alternates: { canonical: '/verify-receipt' },
  robots: { index: false, follow: false },
};

export default function VerifyReceiptPage() {
  return <VerifyReceiptContent />;
}
