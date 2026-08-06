import type { Metadata } from 'next';
import SampleReportContent from '@/components/scrutexity/sample-report-content';

export const metadata: Metadata = {
  title: 'Sample Diligence File | Scrutexity',
  description:
    'See the intelligence before you buy it. An illustrative exhibit tracing one finding from claim to evidence, pattern match, AI distortion, and action.',
  alternates: { canonical: '/sample-report' },
  keywords: ['AI due diligence', 'public claim audit', 'claim substantiation intelligence'],
  openGraph: {
    title: 'Sample Diligence File | Scrutexity',
    description: 'See the intelligence before you buy it.',
    url: '/sample-report',
    type: 'website',
  },
};

export default function SampleReportPage() {
  return <SampleReportContent />;
}
