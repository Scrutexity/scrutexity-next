import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MakroRedesign from '@/components/redesign/makro-redesign';

// Literal Makro reference font (makro.framer.website uses Inter). Scoped to
// this route only — the rest of the app keeps Geist.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-redesign',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Scrutexity — Redesign Concept',
  description:
    'Internal redesign concept: literal Makro palette, responsive, motion-rich. Not indexed.',
  robots: { index: false, follow: false },
};

export default function RedesignPage() {
  return (
    <div
      className={`${inter.variable} min-h-screen bg-[#14142d] text-[#ebedfa] antialiased`}
    >
      <MakroRedesign />
    </div>
  );
}
