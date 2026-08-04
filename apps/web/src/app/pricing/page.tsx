import { Metadata } from 'next';
import PricingContent from '@/components/scrutexity/pricing-content';

const title = 'Buyer Narrative Alignment Sprint | Scrutexity Pricing';
const description = 'A $1,500 engagement that captures buyer-intent AI answers, compares them with the published record, improves controllable sources, and reruns the same questions after 14 days.';

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
