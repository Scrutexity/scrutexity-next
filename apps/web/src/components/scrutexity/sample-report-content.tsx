import Link from "next/link";
import { ArrowRight, Check, FileText, TriangleAlert } from "lucide-react";

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const findings = [
  {
    claim: "“Resolve 80% of customer support tickets automatically.”",
    source: "Homepage hero",
    evidence: "The product page describes automated ticket handling, but no public evaluation method, test set, or definition of resolved is linked.",
    gap: "A buyer cannot determine which ticket types were included, whether human intervention counted, or how the 80% figure was calculated.",
    needed: "Evaluation method, sample size, excluded ticket classes, review period, and a stable definition of resolution.",
    impact: "The headline result may create diligence friction because the scope cannot be reproduced from public material.",
    rewrite: "“Automates selected support workflows, with escalation rules configured by your team.”",
    next: "Publish the evaluation note or replace the numeric claim with the narrower product-capability statement.",
  },
  {
    claim: "“Our agent never hallucinates.”",
    source: "Security and trust page",
    evidence: "The page mentions retrieval grounding and response checks. No public test result supports an absolute error-free statement.",
    gap: "The absolute word never is broader than the visible evidence and leaves no room for model, source, or configuration failure.",
    needed: "Defined evaluation set, error taxonomy, observed failure rate, model version, and test date.",
    impact: "An absolute promise can undermine trust when a buyer asks for the benchmark behind it.",
    rewrite: "“Uses retrieval grounding and configurable checks designed to reduce unsupported responses.”",
    next: "Replace the absolute statement and link to the evaluation protocol when available.",
  },
];

export default function SampleReportContent() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <div className="border-b border-cream/10 bg-espresso px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-cream" style={{ fontFamily: MONO }}>
        Sample · illustrative data, not live customer output
      </div>

      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-16 pt-20 sm:px-8 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
            Scrutexity · Sample Claim Support Report
          </p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <h1 className="font-display text-5xl leading-tight text-espresso md:text-6xl">A report built for decisions, not theater.</h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-mist">
                This fictional Northstar Support AI fixture shows the structure of a Scrutexity review: exact claim, visible evidence, support gap, business impact, safer framing, and the next action.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-5 rounded-lg border border-sand-deep/45 bg-white p-6">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-mist" style={{ fontFamily: MONO }}>Reviewed surface</dt>
                <dd className="mt-2 text-sm font-semibold text-espresso">Public website</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-mist" style={{ fontFamily: MONO }}>Record date</dt>
                <dd className="mt-2 text-sm font-semibold text-espresso">2026-08-04</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-mist" style={{ fontFamily: MONO }}>Claims reviewed</dt>
                <dd className="mt-2 text-sm font-semibold text-espresso">2 sample claims</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-mist" style={{ fontFamily: MONO }}>Status</dt>
                <dd className="mt-2 text-sm font-semibold text-clay-deep">Needs revision</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <main className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <section className="grid gap-5 md:grid-cols-[0.7fr_1.3fr]">
            <div className="rounded-lg bg-espresso p-7 text-cream">
              <FileText className="h-6 w-6 text-sage-soft" aria-hidden="true" />
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-soft" style={{ fontFamily: MONO }}>Executive verdict</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-cream">Two material claims outrun the support visible to a buyer.</h2>
              <p className="mt-5 text-sm leading-6 text-cream/70">
                The product capabilities may be real. The public wording is broader than the evidence currently shown, creating avoidable trust friction during evaluation.
              </p>
            </div>
            <div className="rounded-lg border border-sand-deep/45 bg-white p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Priority order</p>
              <ol className="mt-5 divide-y divide-sand-deep/30">
                <li className="grid gap-2 py-4 sm:grid-cols-[32px_1fr]">
                  <span className="text-sm font-semibold text-sage-deep">01</span>
                  <div>
                    <p className="font-semibold text-espresso">Remove or qualify the absolute “never hallucinates” statement.</p>
                    <p className="mt-1 text-sm leading-6 text-mist">Fastest trust improvement; no new evidence is required to narrow the wording.</p>
                  </div>
                </li>
                <li className="grid gap-2 py-4 sm:grid-cols-[32px_1fr]">
                  <span className="text-sm font-semibold text-sage-deep">02</span>
                  <div>
                    <p className="font-semibold text-espresso">Publish the method behind the 80% resolution claim.</p>
                    <p className="mt-1 text-sm leading-6 text-mist">If the measurement cannot be explained, use a capability statement instead.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section className="mt-12">
            <div className="flex items-center gap-3">
              <TriangleAlert className="h-5 w-5 text-clay-deep" aria-hidden="true" />
              <h2 className="font-display text-4xl text-espresso">Detailed findings</h2>
            </div>

            <div className="mt-7 space-y-6">
              {findings.map((finding, index) => (
                <article key={finding.claim} className="overflow-hidden rounded-lg border border-sand-deep/45 bg-bone">
                  <div className="border-b border-sand-deep/35 bg-white p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Finding {String(index + 1).padStart(2, "0")} · {finding.source}</p>
                    <h3 className="mt-4 font-display text-3xl leading-tight text-espresso">{finding.claim}</h3>
                  </div>
                  <dl className="grid gap-px bg-sand-deep/35 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      ["Visible evidence", finding.evidence],
                      ["Support gap", finding.gap],
                      ["Evidence needed", finding.needed],
                      ["Business impact", finding.impact],
                    ].map(([term, value]) => (
                      <div key={term} className="bg-bone p-5">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>{term}</dt>
                        <dd className="mt-3 text-sm leading-6 text-mist">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="grid gap-6 border-t border-sand-deep/35 bg-cream p-6 lg:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>Safer framing draft</p>
                      <p className="mt-3 text-sm font-semibold leading-6 text-espresso">{finding.rewrite}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>Recommended next step</p>
                      <p className="mt-3 text-sm leading-6 text-mist">{finding.next}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-lg border border-sand-deep/45 bg-white p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Report boundaries</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {["Public material and supplied transcripts only", "No legal or clinical conclusion", "No certification or guaranteed outcome"].map((item) => (
                <p key={item} className="flex gap-2 text-sm leading-6 text-mist">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-sand-deep/35 pt-12 text-center">
            <h2 className="font-display text-4xl text-espresso md:text-5xl">Start with one public page.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">
              The $99 Claim Support Review applies this structure to one priority page and returns the highest-value fixes first.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact?intent=claim-support-review&source=sample-report" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep">
                Start a Claim Review
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/methodology" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-bone px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep">
                Read the Methodology
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
