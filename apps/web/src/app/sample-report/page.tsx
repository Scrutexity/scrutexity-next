import type { Metadata } from 'next';
import SampleReportContent from '@/components/scrutexity/sample-report-content';

const title = 'Sample Claim Audit Report | Scrutexity';
const description = 'A clearly labeled Scrutexity sample showing the exact claim, visible evidence, support gap, business impact, safer framing draft, and recommended next step.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/sample-report' },
  openGraph: { title, description, type: 'article', url: 'https://www.scrutexity.com/sample-report', images: ['/api/og?title=Sample%20Claim%20Support%20Report&eyebrow=Illustrative%20report'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/api/og?title=Sample%20Claim%20Support%20Report&eyebrow=Illustrative%20report'] },
};

export default function SampleReportPage() {
  return <SampleReportContent />;
}
