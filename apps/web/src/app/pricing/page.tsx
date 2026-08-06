import { Metadata } from 'next';
import PricingContent from '@/components/scrutexity/pricing-content';

export const metadata: Metadata = {
  title: 'Claim Review Pricing | Scrutexity',
  description:
    'The intelligence funnel: Free Snapshot ($0), Claim Support Review ($99), Exposure Diagnostic and PE/M&A Diligence (custom quote), and Scrutexity Watch ($1,500/mo).',
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
