import { Metadata } from 'next';
import PricingContent from '@/components/scrutexity/pricing-content';

export const metadata: Metadata = {
  title: 'Scrutexity Pricing | AuditGPT, Contento, AI Visibility, and Recovery',
  description:
    'Start with the audit. Grow with the system. Pricing for AuditGPT reports plus pilot/waitlist options for Contento, AI Visibility, Recovery, and Agency white-label packages.',
};

export default function PricingPage() {
  return <PricingContent />;
}
