import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Kicker, MONO } from '@/components/scrutexity/intel-kit';

export const metadata: Metadata = {
  title: 'How It Works | Scrutexity',
  description: 'Three simple steps: Scan, Review, Record.',
  alternates: { canonical: '/how-it-works' },
};

const STEPS = [
  {
    num: "01",
    title: "Scan",
    body: "You provide a public URL. Scrutexity extracts the substantive claims made on the page, ignoring boilerplate and navigation."
  },
  {
    num: "02",
    title: "Review",
    body: "We examine the public evidence linked to support those claims. If a claim lacks visible support, we flag it as an evidence gap. We also suggest safer, more precise language."
  },
  {
    num: "03",
    title: "Record",
    body: "You receive a clear, dated snapshot of what was found. This creates a baseline record you can use to track changes over time and demonstrate a culture of compliance."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <Kicker>Process</Kicker>
          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.07] text-espresso sm:text-5xl lg:text-6xl">
            How Scrutexity Works.
          </h1>
          <p className="mt-7 text-lg leading-8 text-bark">
            From public URL to dated intelligence record in three steps.
          </p>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl space-y-12">
          {STEPS.map((step) => (
            <article key={step.num} className="p-8 md:p-12 rounded-xl border border-sand-deep/40 bg-bone flex flex-col md:flex-row gap-8 items-start">
              <span className="text-4xl font-display text-clay shrink-0">
                {step.num}
              </span>
              <div>
                <h2 className="font-display text-3xl text-espresso mb-4">{step.title}</h2>
                <p className="text-lg leading-8 text-mist">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-bone px-5 py-24 sm:px-8 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl leading-tight text-espresso md:text-5xl">
            Ready to see it work?
          </h2>
          <div className="mt-10 flex justify-center">
            <Link
              href="/snapshot"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep"
            >
              Run Your Free Snapshot
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
