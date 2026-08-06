import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TriangleAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Scrutexity Self-Audit | Run the Four-Part Exhibit on Your Own Site",
  description:
    "Apply Scrutexity's four-part exhibit format to your own published pages before you request the Sprint. This page shows you how we audited our own claims and what we changed.",
  alternates: { canonical: "/self-audit" },
};

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

/*
  Design direction — replaces the medical-aesthetic black/white palette:
  ─ Background:   bg-cream (var --color-cream)
  ─ Surface:      bg-bone / bg-white cards
  ─ Text:         text-espresso (headings), text-mist (body), text-bark (labels)
  ─ Accent:       text-sage-deep / border-sage-deep
  ─ Alert:        text-clay-deep / border-clay-deep/50
  ─ Resolved:     text-emerald-700 / bg-emerald-50
  ─ Type:         font-display for headings; var(--font-jetbrains-mono) for labels
  ─ Layout:       max-w-4xl centered, exhibit cards stacked, 1px left-bar accent
*/

// Our own claims audited. Every finding is a real change we made.
// No illustrative label needed here — these are confirmed internal actions.
const findings = [
  {
    risk: "Critical",
    title: "Fabricated scale and census data",
    publishedRecord: "Homepage hero displayed: 'Total Claim Distortions Anchored — 1.28M' and 'Regulatory Precedents Mapped — 18,492.'",
    capturedAnswer: "AI answer engines surfaced the numbers as product facts in vendor comparisons.",
    discrepancy: "Both numbers were hardcoded at launch. No client claims had been anchored. The enforcement corpus was empty. FTC guidance on ungrounded superiority claims is public record.",
    nextAction: "Removed entirely. No placeholder scale numbers remain on any page. The site reflects a pre-launch posture with no implied traction.",
    resolution: "Removed. Confirmed absent from all current pages.",
  },
  {
    risk: "Moderate",
    title: "Unmeasured decay assertion",
    publishedRecord: "Methodology page stated a '90-day decay logic' on claim validity.",
    capturedAnswer: "AI answer engines described the 90-day window as an established Scrutexity research finding.",
    discrepancy: "No decay rate measurement had been conducted. The 90-day figure was not drawn from observed data — it was an illustrative heuristic stated as a product specification.",
    nextAction: "Replace with a workflow trigger: monitoring activates at client launch or material site change. No fixed timeframe is asserted without measurement.",
    resolution: "Replaced. Methodology page now describes trigger-based monitoring, not a timed assertion.",
  },
  {
    risk: "Critical",
    title: "Cryptographic feature drift",
    publishedRecord: "Sprint deliverables listed: 'Cryptographic seal' and 'Tamper-evident evidence pack.'",
    capturedAnswer: "ChatGPT described Scrutexity's output as including verifiable cryptographic records.",
    discrepancy: "No hash chain or public verifier mechanism was live in production. Claiming tamper-evident properties without a working public verifier is a deceptive capability claim — the same category of discrepancy we audit for clients.",
    nextAction: "Remove all cryptographic and tamper-evident language until a live public verifier is deployed and linked from the product page.",
    resolution: "Removed. No cryptographic claims appear on any current page.",
  },
];

const riskColor: Record<string, string> = {
  Critical: "bg-clay-deep/10 text-clay-deep border-clay-deep/30",
  Moderate: "bg-amber-500/10 text-amber-700 border-amber-500/30",
};
const barColor: Record<string, string> = {
  Critical: "bg-clay-deep",
  Moderate: "bg-amber-500",
};

export default function SelfAuditPage() {
  return (
    <div className="min-h-screen bg-cream text-bark">

      {/* Header */}
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
            Scrutexity · Internal Claim Audit
          </p>
          <div className="mt-6 flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="font-display text-5xl leading-tight text-espresso md:text-6xl">
                We ran our own methodology on our own pages.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-mist">
                Before auditing a client, we applied the four-part exhibit format to Scrutexity&apos;s own published claims. This page shows what we found, what we changed, and the score. It is the free entry point to the Sprint — run it on your own site first.
              </p>
            </div>
            <div className="hidden shrink-0 flex-col items-end lg:flex">
              <span className="font-display text-6xl text-espresso">74<span className="text-2xl text-mist">/100</span></span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-mist mt-1" style={{ fontFamily: MONO }}>Initial score</span>
              <span className="text-[10px] text-mist mt-1" style={{ fontFamily: MONO }}>Reviewed Aug. 2026</span>
            </div>
          </div>

          {/* Mobile score */}
          <div className="flex items-center gap-4 mt-6 lg:hidden">
            <span className="font-display text-4xl text-espresso">74<span className="text-xl text-mist">/100</span></span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-mist" style={{ fontFamily: MONO }}>Initial score · Reviewed Aug. 2026</span>
          </div>
        </div>
      </section>

      {/* Findings */}
      <main className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-10">
            <TriangleAlert className="h-5 w-5 text-clay-deep" />
            <h2 className="font-display text-3xl text-espresso">Three findings. All resolved.</h2>
          </div>

          <div className="space-y-6">
            {findings.map((finding, i) => (
              <article key={i} className="relative overflow-hidden rounded-xl border border-sand-deep/40 bg-white">
                {/* Left risk bar */}
                <div className={`absolute left-0 top-0 h-full w-1 ${barColor[finding.risk]}`} />

                {/* Header */}
                <div className="border-b border-sand-deep/30 px-7 py-5 pl-9">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl text-espresso">{finding.title}</h3>
                    <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${riskColor[finding.risk]}`} style={{ fontFamily: MONO }}>
                      {finding.risk}
                    </span>
                  </div>
                </div>

                {/* Four-part exhibit */}
                <dl className="grid gap-px bg-sand-deep/30 sm:grid-cols-2">
                  {[
                    ["Published record", finding.publishedRecord],
                    ["Captured answer", finding.capturedAnswer],
                    ["Observed discrepancy", finding.discrepancy],
                    ["Next action", finding.nextAction],
                  ].map(([term, val]) => (
                    <div key={String(term)} className="bg-white px-7 py-5 pl-9 last:sm:pl-7 first:sm:pl-9">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>{term}</dt>
                      <dd className="mt-2 text-sm leading-6 text-mist">{val}</dd>
                    </div>
                  ))}
                </dl>

                {/* Resolution */}
                <div className="border-t border-sand-deep/30 bg-emerald-50/60 px-7 py-4 pl-9">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-800 mr-2" style={{ fontFamily: MONO }}>Resolution</span>
                      <span className="text-sm text-emerald-900">{finding.resolution}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Self-compliance note */}
          <aside className="mt-10 rounded-xl border border-sand-deep/45 bg-bone p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep mb-3" style={{ fontFamily: MONO }}>Self-compliance note</p>
            <p className="text-sm leading-7 text-mist">
              Before publishing this page, we applied our own methodology to the copy above. Material claims on this page and their visible support: the 74/100 score is an internal assessment, not an independently verified index — labeled as such. The three findings are confirmed internal changes, not illustrative. Dates are set to the actual review period (Aug. 2026). No outcomes are implied for any future client engagement based on our own self-audit results.
            </p>
          </aside>

          {/* Run it on your site */}
          <section className="mt-14 border-t border-sand-deep/30 pt-14">
            <h2 className="font-display text-3xl text-espresso md:text-4xl">
              Now run it on your own pages.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-mist">
              Take the four-part exhibit format — published record, captured answer, observed discrepancy, next action — and apply it to your top three product or security claims. Query ChatGPT and Perplexity yourself. If the captured answers diverge from what your pages can support, you have found your Sprint scope.
            </p>

            <div className="mt-8 rounded-xl border border-sand-deep/45 bg-white divide-y divide-sand-deep/30">
              {[
                { step: "01", instruction: "Pick up to three material claims your published pages make — capability, security, or compliance." },
                { step: "02", instruction: "Query ChatGPT and Perplexity: 'What does [company] claim about [claim topic]?' Record the answers verbatim." },
                { step: "03", instruction: "Compare the captured answer against your published pages. Is the support visible? Is the scope accurate?" },
                { step: "04", instruction: "If you find a gap — a claim the AI answer states that your pages can't support — that is your Sprint starting point." },
              ].map(({ step, instruction }) => (
                <div key={step} className="flex gap-4 px-6 py-4">
                  <span className="text-[10px] font-semibold text-sage-deep shrink-0 mt-0.5" style={{ fontFamily: MONO }}>{step}</span>
                  <p className="text-sm leading-6 text-mist">{instruction}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact?intent=buyer-narrative-sprint&source=self-audit"
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep"
              >
                Request the Sprint
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/sample-report"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-sand-deep bg-bone px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep"
              >
                View the Sample
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
