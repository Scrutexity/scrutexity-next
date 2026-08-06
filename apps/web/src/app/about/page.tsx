import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, RefreshCw, UserCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Scrutexity | AI Narrative Audit & Monitoring",
  description:
    "Scrutexity audits what AI answer engines say about your company, finds the gaps, and helps you fix them before a deal falls apart. Founded and led by Nick Altstein.",
  alternates: { canonical: "/about" },
};

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-20 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
            About Scrutexity
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-espresso md:text-6xl">
            The audit that finds what AI is telling your buyers.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-mist">
            Enterprise buyers, investors, and procurement teams are researching your company via ChatGPT, Perplexity, and Gemini before they ever talk to you. Scrutexity maps the gap between what those AI models say and what your evidence actually supports.
          </p>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="rounded-2xl border border-sand-deep/45 bg-bone p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-cream font-display text-2xl font-bold">
                  NA
                </div>
                <div>
                  <h3 className="font-display text-2xl text-espresso">Nick Altstein</h3>
                  <p className="text-xs uppercase tracking-wider text-sage-deep font-semibold" style={{ fontFamily: MONO }}>
                    Founder & Lead Auditor
                  </p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-mist">
                "Every audit is reviewed by me personally. When a buyer runs an AI search about your company before a sales call, the answer they get is either helping you close or quietly costing you the deal. We find out which."
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-bark/70 border-t border-sand-deep/30 pt-4" style={{ fontFamily: MONO }}>
                <UserCheck className="h-4 w-4 text-sage-deep" />
                Direct founder review on every engagement
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
                Why Scrutexity Exists
              </p>
              <h2 className="font-display text-3xl text-espresso sm:text-4xl">
                AI search changed the buying process. Most companies haven't noticed.
              </h2>
              <p className="text-base leading-7 text-mist">
                The 30-second AI search a buyer runs before your call is shaping their questions, their skepticism, and their expectations. If that search surfaces outdated claims, hallucinated limitations, or compliance gaps that don't exist — you walk into a headwind you can't see.
              </p>
              <p className="text-base leading-7 text-mist">
                We fix that. Automated scanning finds the discrepancies. Founder review prioritizes the ones that cost you deals. And a 14-day rerun proves the fixes worked.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact?intent=narrative-alignment-audit&source=about"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep"
                >
                  Get Your Diagnostic
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
              Operating Standard
            </p>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">
              Concrete findings. Measurable fixes.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-sand-deep/45 bg-white p-7">
              <Zap className="h-7 w-7 text-sage-deep mb-4" />
              <h3 className="font-display text-2xl text-espresso">Automated + Human</h3>
              <p className="mt-3 text-sm leading-6 text-mist">
                Automated tooling handles data capture and scoring. Nick Altstein reviews every finding and provides the strategic interpretation.
              </p>
            </div>
            <div className="rounded-xl border border-sand-deep/45 bg-white p-7">
              <RefreshCw className="h-7 w-7 text-sage-deep mb-4" />
              <h3 className="font-display text-2xl text-espresso">14-Day Rerun</h3>
              <p className="mt-3 text-sm leading-6 text-mist">
                Every audit includes a 14-day rerun after your fixes go live. We re-query the AI models and verify the narrative gap is closed.
              </p>
            </div>
            <div className="rounded-xl border border-sand-deep/45 bg-white p-7">
              <CheckCircle2 className="h-7 w-7 text-sage-deep mb-4" />
              <h3 className="font-display text-2xl text-espresso">Continuous Monitoring</h3>
              <p className="mt-3 text-sm leading-6 text-mist">
                AI narratives drift over time as models are retrained. Our Watch tier catches new discrepancies before they become deal-killers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone px-5 py-20 text-center sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">Ready to see what AI says about you?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">
            Start with a $99 Snapshot to find out if there's a problem, or jump straight to the Diagnostic to fix it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact?intent=narrative-alignment-audit&source=about-footer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep"
            >
              Get the Full Diagnostic
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/snapshot"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-white px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep"
            >
              Start with a $99 Snapshot
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
