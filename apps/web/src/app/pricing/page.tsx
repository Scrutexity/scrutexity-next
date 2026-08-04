import { Metadata } from 'next';
import PricingContent from '@/components/scrutexity/pricing-content';

const title = 'Claim Review Pricing | Scrutexity';
const description = 'Public starting prices for the $99 Claim Support Review, Founder’s Audit, Agency Claim QA, and Agent Evidence Pack.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/pricing' },
  openGraph: { title, description, type: 'website', url: 'https://www.scrutexity.com/pricing', images: ['/api/og?title=Evidence-Grounded%20Review%20Pricing&eyebrow=Scrutexity'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/api/og?title=Evidence-Grounded%20Review%20Pricing&eyebrow=Scrutexity'] },
};

export default function PricingPage() {
  return <PricingContent />;
}
