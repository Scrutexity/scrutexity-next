import { Metadata } from 'next';
import PricingContent from '@/components/scrutexity/pricing-content';

const title = 'Buyer Narrative Alignment Sprint Pricing | Scrutexity';
const description = 'The Buyer Narrative Alignment Sprint is a $1,500 fixed-fee, founder-reviewed analysis of claims, visible support, and buyer-narrative gaps.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/pricing' },
  openGraph: { title, description, type: 'website', url: 'https://www.scrutexity.com/pricing', images: ['/api/og?title=Buyer%20Narrative%20Alignment%20Sprint&eyebrow=Scrutexity'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/api/og?title=Buyer%20Narrative%20Alignment%20Sprint&eyebrow=Scrutexity'] },
};

export default function PricingPage() {
  return <PricingContent />;
}
