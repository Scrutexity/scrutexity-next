import { Metadata } from 'next';
import PricingContent from '@/components/scrutexity/pricing-content';

const title = 'Scrutexity Pricing | Evidence-Grounded Business Reviews';
const description = 'Starting prices for Scrutexity Claim Support Reviews, Founder’s Audits, Agency Claim QA pilots, and Agent Evidence Packs.';

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
