import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Kicker, MONO } from '@/components/scrutexity/intel-kit';
import * as motion from "framer-motion/client";

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

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const riseIn = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink font-sans">
      <section className="border-b border-hairline bg-paper-light px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-4xl text-center">
          <motion.div variants={riseIn}>
            <Kicker>Process</Kicker>
          </motion.div>
          <motion.h1 variants={riseIn} className="mt-6 font-display text-[2.5rem] leading-[1.07] text-ink sm:text-5xl lg:text-6xl">
            How Scrutexity Works.
          </motion.h1>
          <motion.p variants={riseIn} className="mt-7 text-lg leading-8 text-ink-soft">
            From public URL to dated intelligence record in three steps.
          </motion.p>
        </motion.div>
      </section>

      <section className="border-b border-hairline bg-paper px-5 py-20 sm:px-8 md:py-24">
        <motion.div 
          variants={stagger} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-4xl space-y-12"
        >
          {STEPS.map((step) => (
            <motion.article 
              variants={riseIn}
              key={step.num} 
              className="p-8 md:p-12 rounded-xl border border-hairline bg-raised flex flex-col md:flex-row gap-8 items-start shadow-[var(--shadow-card)]"
            >
              <span className="text-4xl font-display text-accent shrink-0">
                {step.num}
              </span>
              <div>
                <h2 className="font-display text-3xl text-ink mb-4">{step.title}</h2>
                <p className="text-lg leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="bg-paper-light px-5 py-24 sm:px-8 md:py-28">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            Ready to see it work?
          </h2>
          <div className="mt-10 flex justify-center">
            <Link
              href="/snapshot"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent-bright"
            >
              Run Your Free Snapshot
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
