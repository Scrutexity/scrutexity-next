import { Metadata } from 'next';
import PricingContent from '@/components/scrutexity/pricing-content';

export const metadata: Metadata = {
  title: 'Scrutexity Pricing | Claim Exposure Audit & Guardian Monitoring',
  description:
    'Claim reviews for regulated marketing. Free snapshot, $497 Claim Exposure Audit with a dated review record, Guardian monitoring from $1,497/mo, Enterprise multi-site from $4,997/mo.',
};

export default function PricingPage() {
  return <PricingContent />;
}
