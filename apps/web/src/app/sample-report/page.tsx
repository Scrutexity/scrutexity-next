import type { Metadata } from 'next';
import SampleReportContent from '@/components/scrutexity/sample-report-content';

export const metadata: Metadata = {
  title: 'Sample Claim Audit Report | Scrutexity',
  description:
    'A Scrutexity Claim Audit Report on a representative Autonomous AI Company archetype. We evaluate public business claims by asking what is claimed, what evidence supports it, what gap remains, and what safer framing reads more honestly — without calling claims true, false, legal, or illegal.',
  alternates: { canonical: '/sample-report' },
};

export default function SampleReportPage() {
  return <SampleReportContent />;
}
