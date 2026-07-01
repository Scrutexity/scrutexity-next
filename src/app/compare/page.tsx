import type { Metadata } from 'next';
import CompareContent from '@/components/scrutexity/compare-content';

export const metadata: Metadata = {
  title: 'Compare | Scrutexity',
  description:
    'How Scrutexity’s read-only, BAA-governed recovery overlay compares to Boulevard, Mangomint, and Zenoti (including the 9-agent AI suite). Flat fee, no migration, licensed-staff approval on every recovery.',
  alternates: { canonical: '/compare' },
};

export default function ComparePage() {
  return <CompareContent />;
}
