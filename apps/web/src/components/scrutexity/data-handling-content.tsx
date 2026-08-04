"use client";

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default function DataHandlingContent() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans selection:bg-sage-deep/20">
      <section className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-32 border-b border-sand-deep/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sage-deep/30 bg-sage-deep/10 text-[10px] uppercase tracking-[0.18em] text-sage-deep font-bold mb-8"
            style={{ fontFamily: MONO_STACK }}
          >
            <ShieldCheck size={14} />
            Data Integrity
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl tracking-[-0.03em] leading-[1.05] max-w-3xl mb-8"
          >
            How Scrutexity Handles Your Data
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="text-xl md:text-2xl text-mist leading-[1.5] max-w-2xl font-serif italic"
          >
            Plain language, because a company that audits claims should be clear about its own.
          </motion.p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="max-w-3xl mx-auto space-y-16">
          
          <div>
            <h2 className="font-display text-3xl mb-4 text-sage-deep">The short version.</h2>
            <p className="text-lg text-ink/80 leading-relaxed">
              When you paste a transcript, we strip identifying details before anything is analyzed, we don't store the transcript after the audit runs, and we never sell or share your data. The sections below are the detail behind each of those.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl mb-4">What happens to a transcript you paste.</h2>
            <p className="text-lg text-mist leading-relaxed">
              The moment a transcript reaches our system, it passes through a redaction layer that masks identifying details — names, phone numbers, emails, dates, and similar personal information — before the content is analyzed. The analysis runs on the redacted version. The original, unredacted text is never written to disk and never stored.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl mb-4">Where the analysis happens.</h2>
            <p className="text-lg text-mist leading-relaxed">
              Redacted transcript text is processed by a large language model to evaluate the claims made in it. We pin a specific model version for every audit and record it in your receipt, so the same audit can be reproduced under the same conditions. Redacted text sent for analysis is not used to train any model.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl mb-4">What we keep, and for how long.</h2>
            <p className="text-lg text-mist leading-relaxed">
              We retain the audit result — the findings and the sealed receipt — so it can be verified later. We do not retain the underlying transcript. If you need a result deleted, contact us and we'll remove it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl mb-4 text-clay-deep">What we never do.</h2>
            <p className="text-lg text-mist leading-relaxed">
              We don't sell your data. We don't share it with third parties beyond the model provider needed to run the analysis. We don't use your transcripts to train models. We don't post, publish, or repurpose anything you submit.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl mb-4">If you handle protected health information.</h2>
            <p className="text-lg text-mist leading-relaxed">
              Scrutexity is built so that patient-identifying details are removed before analysis, but you should still avoid pasting protected health information where you can. For organizations that require one, we sign a Business Associate Agreement on request — reach out before sending data you consider protected.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl mb-4">The receipt.</h2>
            <p className="text-lg text-mist leading-relaxed">
              Every audit produces a cryptographically sealed receipt recording the findings, the engine and model version, and a timestamp. Anyone you share it with can verify through our portal that it hasn't been altered. A sealed receipt confirms the integrity of the result; it is not a legal or clinical judgment, and Scrutexity does not provide legal, regulatory, or medical advice.
            </p>
          </div>

          <div className="pt-8 border-t border-sand-deep/20">
            <h2 className="font-display text-2xl mb-4">Questions.</h2>
            <p className="text-lg text-mist leading-relaxed mb-6">
              If anything here is unclear, ask us. A company in the business of governed claims should be able to explain its own data handling without making you read between the lines.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-ink text-cream rounded-lg text-sm font-semibold transition-all hover:bg-sage-deep"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
