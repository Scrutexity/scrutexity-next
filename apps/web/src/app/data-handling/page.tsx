import type { Metadata } from 'next';
import DataHandlingContent from '@/components/scrutexity/data-handling-content';

export const metadata: Metadata = {
  title: 'Data Handling | Scrutexity',
  description: 'How Scrutexity handles your data. Plain language, because a company that audits claims should be clear about its own.',
  alternates: { canonical: '/data-handling' },
};

export default function DataHandlingPage() {
  return <DataHandlingContent />;
}
