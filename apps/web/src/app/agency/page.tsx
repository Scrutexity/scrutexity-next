import type { Metadata } from 'next';
import AgencyContent from '@/components/scrutexity/agency-content';

const title = 'Buyer Narrative Alignment Sprint for Agencies | Scrutexity';
const description = 'Use the $1,500 Buyer Narrative Alignment Sprint for one selected client, case study, launch, repositioning effort, or the agency’s own positioning.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/agency' },
  openGraph: { title, description, type: 'website', url: 'https://www.scrutexity.com/agency', images: ['/api/og?title=Agency%20Buyer%20Narrative%20Sprint&eyebrow=Scrutexity'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/api/og?title=Agency%20Buyer%20Narrative%20Sprint&eyebrow=Scrutexity'] },
};

export default function AgencyPage() {
  return <AgencyContent />;
}
