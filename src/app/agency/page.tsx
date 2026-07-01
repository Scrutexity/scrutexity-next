import type { Metadata } from 'next';
import AgencyContent from '@/components/scrutexity/agency-content';

export const metadata: Metadata = {
  title: 'Agency Claim Intelligence Receipts | Scrutexity',
  description:
    'Scrutexity acts as your invisible backend. Attach dated Claim Intelligence Receipts, reviewed-badge pages, and client approval language to high-claim launches.',
  alternates: { canonical: '/agency' },
};

export default function AgencyPage() {
  return <AgencyContent />;
}
