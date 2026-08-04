import type { Metadata } from 'next';
import AgencyContent from '@/components/scrutexity/agency-content';

export const metadata: Metadata = {
  title: 'Agency Claim QA Pilot | Scrutexity',
  description:
    'Add claim QA to client websites, campaigns, case studies, and launches without building an internal audit team. Pilot pricing starts at $1,500.',
  alternates: { canonical: '/agency' },
};

export default function AgencyPage() {
  return <AgencyContent />;
}
