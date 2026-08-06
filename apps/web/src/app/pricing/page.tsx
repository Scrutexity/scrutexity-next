import { Metadata } from 'next';
import PricingContent from '@/components/scrutexity/pricing-content';

export const metadata: Metadata = {
  title: 'Pricing | Scrutexity Engagements',
  description:
    'Free Snapshot, Claim Support Review, Claim Exposure Diagnostic, and Scrutexity Watch.',
  alternates: { canonical: '/pricing' },
  keywords: [
    'regulatory exposure assessment',
    'AI due diligence',
    'public claim audit',
    'AI narrative integrity',
  ],
  openGraph: {
    title: 'Pricing | Scrutexity Engagements',
    description:
      'Four levels of intelligence. Scope is determined by entities, domains, locations, claims, and review depth.',
    url: '/pricing',
    type: 'website',
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
