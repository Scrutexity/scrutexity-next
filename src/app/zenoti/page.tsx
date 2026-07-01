import { Metadata } from 'next';
import ZeniotiCompareContent from './ZeniotiCompareContent';

export const metadata: Metadata = {
  title: 'Zenoti vs Scrutexity | Automation vs Governance',
  description: 'Zenoti automates follow-up until booking. Scrutexity routes clinical questions to staff for approval. Which approach fits your compliance requirements?',
  openGraph: {
    title: 'Zenoti vs Scrutexity | Automation vs Governance',
    description: 'Compare Zenoti\'s AI automation against Scrutexity\'s governed recovery infrastructure. BAA-compliant, read-only architecture built for medspa and aesthetic surgery.',
    type: 'website',
  },
};

export default function ZeniotiComparePage() {
  return <ZeniotiCompareContent />;
}
