import type { Metadata } from 'next';
import PEReportContent from '@/components/scrutexity/pe-report-content';

export const metadata: Metadata = {
  title: 'AuditGPT Liability Report | Scrutexity',
  description: 'View the live M&A compliance risk score for the scanned domain.',
  robots: { index: false, follow: false },
};

export default function PEReportPage() {
  return <PEReportContent />;
}
