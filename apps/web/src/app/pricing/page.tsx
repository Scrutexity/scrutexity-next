import { Metadata } from 'next';
import PricingContent from '@/components/scrutexity/pricing-content';

export const metadata: Metadata = {
  title: 'Scrutexity Pricing | Evidence-Grounded Business Reviews',
  description:
    'Starting prices for Scrutexity Claim Support Reviews, Founder’s Audits, Agency Claim QA pilots, and Agent Evidence Packs.',
};

export default function PricingPage() {
  return <PricingContent />;
}
