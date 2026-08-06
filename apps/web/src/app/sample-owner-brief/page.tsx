import { SampleOwnerBriefWidget } from '@/components/SampleOwnerBriefWidget';

export const metadata = {
  title: 'Sample Owner Brief | Scrutexity',
  description: 'This is what you receive on Day 14: every recovered lead, source, transcript, and deposit on record. Illustrated with modeled data.',
  robots: { index: false, follow: true },
};

export default function SampleOwnerBriefPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans">
      <main className="px-5 pb-24 pt-6 sm:px-8">
        <SampleOwnerBriefWidget />
      </main>
    </div>
  );
}
