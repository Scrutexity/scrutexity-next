import type { Metadata } from 'next';
import AgencyContent from '@/components/scrutexity/agency-content';

const title = 'Agency Claim QA | Scrutexity';
const description = 'Add claim QA to client websites, campaigns, case studies, and launches without building an internal audit team. Engagements start at $1,500.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/agency' },
  openGraph: { title, description, type: 'website', url: 'https://www.scrutexity.com/agency', images: ['/api/og?title=Agency%20Claim%20QA%20Pilot&eyebrow=Scrutexity'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/api/og?title=Agency%20Claim%20QA%20Pilot&eyebrow=Scrutexity'] },
};

export default function AgencyPage() {
  return <AgencyContent />;
}
