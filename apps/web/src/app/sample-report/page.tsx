import type { Metadata } from 'next';
import SampleReportContent from '@/components/scrutexity/sample-report-content';

export const metadata: Metadata = {
  title: 'Sample Claim Audit Report | Scrutexity',
  description:
    'A clearly labeled Scrutexity sample showing the exact claim, visible evidence, support gap, business impact, safer framing draft, and recommended next step.',
  alternates: { canonical: '/sample-report' },
};

export default function SampleReportPage() {
  return <SampleReportContent />;
}
