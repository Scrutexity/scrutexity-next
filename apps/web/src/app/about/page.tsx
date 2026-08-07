import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, RefreshCw, UserCheck, Zap } from "lucide-react";
import * as motion from "framer-motion/client";

export const metadata: Metadata = {
  title: "About Scrutexity | Claim Evidence Intelligence",
  description:
    "Scrutexity reviews public marketing claims and AI answers, flags what the evidence does not support, and returns safer wording. Founded and led by Nick Altstein.",
  alternates: { canonical: "/about" },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const riseIn = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-paper text-ink font-sans">
      {/* ═══ 1. Hero ═══════════════════════════════════════════════════ */}
      <section className="relative border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-20 sm:px-8 md:pt-40 md:pb-28 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-4xl"
          >
            <motion.div variants={riseIn}>
              <Eyebrow>About Scrutexity</Eyebrow>
            </motion.div>
            
            <motion.h1
              variants={riseIn}
              className="mt-6 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl md:text-6xl text-balance"
            >
              The audit that finds what AI is telling your buyers.
            </motion.h1>
            
            <motion.p
              variants={riseIn}
              className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft text-balance"
            >
              Enterprise buyers, investors, and procurement teams are researching your company via ChatGPT, Perplexity, and Gemini before they ever talk to you. Scrutexity maps the gap between what those AI models say and what your evidence actually supports.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. Founder Review ════════════════════════════════════════ */}
      <section className="border-b border-hairline bg-paper-light px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="rounded-xl border border-hairline bg-raised p-8 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-paper font-display text-2xl font-bold">
                  NA
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium text-ink">Nick Altstein</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                    Founder & Lead Auditor
                  </p>
                </div>
              </div>
              <p className="mt-8 text-base leading-relaxed text-ink-soft">
                &ldquo;Every audit is reviewed by me personally. When a buyer runs an AI search about your company before a sales call, the answer they get is either helping you close or quietly costing you the deal. We find out which.&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3 font-mono text-xs text-muted border-t border-hairline pt-6">
                <UserCheck className="h-4 w-4 text-accent" />
                Direct founder review on every engagement
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-6"
            >
              <motion.div variants={riseIn}>
                <Eyebrow>Why Scrutexity Exists</Eyebrow>
              </motion.div>
              <motion.h2 
                variants={riseIn}
                className="font-display text-3xl font-medium text-ink sm:text-4xl text-balance"
              >
                AI search changed the buying process. Most companies haven&apos;t noticed.
              </motion.h2>
              <motion.p variants={riseIn} className="text-base leading-relaxed text-ink-soft">
                The 30-second AI search a buyer runs before your call is shaping their questions, their skepticism, and their expectations. If that search surfaces outdated claims, hallucinated limitations, or compliance gaps that don&apos;t exist — you walk into a headwind you can&apos;t see.
              </motion.p>
              <motion.p variants={riseIn} className="text-base leading-relaxed text-ink-soft">
                We fix that. Automated scanning finds the discrepancies. Founder review prioritizes the ones that cost you deals. And a 14-day rerun proves the fixes worked.
              </motion.p>
              <motion.div variants={riseIn} className="pt-4">
                <Link
                  href="/contact?intent=narrative-alignment-audit&source=about"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-paper transition-[background-color,transform] duration-300 hover:bg-accent-bright active:scale-[0.98]"
                >
                  Get Your Diagnostic
                  <ArrowRight size={15} aria-hidden className="btn-arrow" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 3. Operating Standard ═════════════════════════════════════ */}
      <section className="border-b border-hairline bg-paper px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <Eyebrow>Operating Standard</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-medium text-ink sm:text-4xl lg:text-5xl">
              Concrete findings. Measurable fixes.
            </h2>
          </div>

          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3"
          >
            <motion.div variants={riseIn} className="bg-paper-light p-8 transition-colors duration-300 hover:bg-paper sm:p-10">
              <Zap className="h-6 w-6 text-accent mb-6" />
              <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">Automated + Human</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Automated tooling handles data capture and scoring. Nick Altstein reviews every finding and provides the strategic interpretation.
              </p>
            </motion.div>
            <motion.div variants={riseIn} className="bg-paper-light p-8 transition-colors duration-300 hover:bg-paper sm:p-10">
              <RefreshCw className="h-6 w-6 text-accent mb-6" />
              <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">14-Day Rerun</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Every audit includes a 14-day rerun after your fixes go live. We re-query the AI models and verify the narrative gap is closed.
              </p>
            </motion.div>
            <motion.div variants={riseIn} className="bg-paper-light p-8 transition-colors duration-300 hover:bg-paper sm:p-10">
              <CheckCircle2 className="h-6 w-6 text-accent mb-6" />
              <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">Continuous Monitoring</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                AI narratives drift over time as models are retrained. Our Watch tier catches new discrepancies before they become deal-killers.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. Closing ════════════════════════════════════════════════ */}
      <section className="px-5 py-28 sm:px-8 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 text-center"
        >
          <h2 className="font-display max-w-[20ch] text-3xl font-medium text-ink sm:text-4xl lg:text-5xl">
            Ready to see what AI says about you?
          </h2>
          <p className="max-w-[50ch] text-base leading-relaxed text-ink-soft sm:text-lg">
            Start with a free Snapshot to see the scope, or jump straight to the Diagnostic to remediate the risk.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Link
              href="/snapshot"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-semibold text-paper transition-[background-color,transform] duration-300 hover:bg-accent-bright active:scale-[0.98]"
            >
              Run free snapshot
              <ArrowRight size={15} aria-hidden className="btn-arrow" />
            </Link>
            
            <Link
              href="/contact?intent=narrative-alignment-audit&source=about-footer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-hairline decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              Get the Full Diagnostic
              <ArrowRight size={15} aria-hidden className="btn-arrow" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
