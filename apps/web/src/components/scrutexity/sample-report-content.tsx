import Link from "next/link";
import { ArrowRight, Check, FileText } from "lucide-react";
import { SourceReference } from "@/components/scrutexity/source-reference";
import { PrintReportButton } from "@/components/scrutexity/print-report-button";
import { CopyLinkButton } from "@/components/scrutexity/copy-link-button";

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const findings = [
  {
    claim: "“Resolve 80% of customer support tickets automatically.”",
    source: "Homepage hero",
    classification: "Partial",
    scope: "Visible homepage copy reviewed on Aug. 4, 2026.",
    visibleSupport: "The product page describes automated ticket handling, but no public evaluation method, test set, or definition of resolved is linked.",
    whyItMatters: "A buyer cannot determine which ticket types were included, whether human intervention counted, or how the 80% figure was calculated.",
    nextAction: "Publish the evaluation method, sample size, exclusions, review period, and definition of resolution. Otherwise, narrow the claim.",
    suggestedFraming: "“Automates selected support workflows, with escalation rules configured by your team.”",
  },
  {
    claim: "“Our agent never hallucinates.”",
    source: "Security and trust page",
    classification: "Missing",
    scope: "Visible security and trust page copy reviewed on Aug. 4, 2026.",
    visibleSupport: "The page mentions retrieval grounding and response checks. No public test result supports an absolute error-free statement.",
    whyItMatters: "The word never is broader than the visible evidence and leaves no room for model, source, or configuration failure.",
    nextAction: "Replace the absolute statement and link to a dated evaluation protocol when one is available.",
    suggestedFraming: "“Uses retrieval grounding and configurable checks designed to reduce unsupported responses.”",
  },
];

export default function SampleReportContent() {
  return (
    <div className="print-document min-h-screen bg-cream text-bark">
      <div className="border-b border-cream/10 bg-espresso px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-cream" style={{ fontFamily: MONO }}>
        Sample · illustrative data, not live customer output
      </div>

      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-16 pt-20 sm:px-8 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
              Scrutexity · Sample Claim Support Report
            </p>
            <PrintReportButton />
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <h1 className="font-display text-5xl leading-tight text-espresso md:text-6xl">A report built for decisions, not theater.</h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-mist">
                This fictional Northstar Support AI fixture shows the structure of a Scrutexity review: claim, visible support, why the finding matters, and the next action.
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
                <dd className="mt-2 text-sm font-semibold text-espresso">Illustrative fixture</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="px-5 py-16 sm:px-8 md:py-20">
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
                    <SourceReference surface="Security and trust page" className="mt-2" />
                    <p className="mt-1 text-sm leading-6 text-mist">Fastest trust improvement; no new evidence is required to narrow the wording.</p>
                  </div>
                </li>
                <li className="grid gap-2 py-4 sm:grid-cols-[32px_1fr]">
                  <span className="text-sm font-semibold text-sage-deep">02</span>
                  <div>
                    <p className="font-semibold text-espresso">Publish the method behind the 80% resolution claim.</p>
                    <SourceReference surface="Homepage hero" className="mt-2" />
                    <p className="mt-1 text-sm leading-6 text-mist">If the measurement cannot be explained, use a capability statement instead.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section className="print-page-break mt-12">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-sage-deep" aria-hidden="true" />
              <h2 className="font-display text-4xl text-espresso">Detailed findings</h2>
            </div>

            <div className="mt-7 space-y-6">
              {findings.map((finding, index) => (
                <article id={`finding-${String(index + 1).padStart(2, "0")}`} tabIndex={-1} key={finding.claim} className="scroll-mt-32 overflow-hidden rounded-lg border border-sand-deep/45 bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep">
                  <div className="border-b border-sand-deep/35 bg-white p-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Finding {String(index + 1).padStart(2, "0")}</p>
                      <CopyLinkButton canonicalPath="/sample-report" anchor={`finding-${String(index + 1).padStart(2, "0")}`} label={`Copy finding ${index + 1} link`} />
                    </div>
                    <h3 className="mt-4 font-display text-3xl leading-tight text-espresso">Claim review</h3>
                    <p className="mt-3 font-mono text-xs leading-5 text-espresso">Classification: {finding.classification}</p>
                    <p className="mt-2 font-mono text-[10px] leading-5 text-mist">Scope: {finding.scope}</p>
                  </div>
                  <dl className="divide-y divide-sand-deep/30">
                    <div className="grid gap-3 bg-bone p-6 md:grid-cols-[150px_1fr]">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>Claim</dt>
                      <dd>
                        <p className="border-l border-sage-deep/45 pl-4 font-mono text-sm leading-6 text-espresso">{finding.claim}</p>
                        <SourceReference surface={finding.source} className="mt-3 pl-4" />
                      </dd>
                    </div>
                    <div className="grid gap-3 bg-white p-6 md:grid-cols-[150px_1fr]">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>Visible support</dt>
                      <dd className="text-sm leading-6 text-mist">{finding.visibleSupport}</dd>
                    </div>
                    <div className="grid gap-3 bg-bone p-6 md:grid-cols-[150px_1fr]">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>Why it matters</dt>
                      <dd className="text-sm leading-6 text-mist">{finding.whyItMatters}</dd>
                    </div>
                    <div className="grid gap-3 bg-cream p-6 md:grid-cols-[150px_1fr]">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>Next action</dt>
                      <dd className="text-sm leading-6 text-mist">
                        <p>{finding.nextAction}</p>
                        <p className="mt-3 font-semibold text-espresso">Suggested framing: {finding.suggestedFraming}</p>
                      </dd>
                    </div>
                  </dl>
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
          <p className="mt-12 hidden border-t border-sand-deep/35 pt-4 font-mono text-[10px] leading-5 print:block">
            Scrutexity · Sample Claim Support Report · https://www.scrutexity.com/sample-report · reviewed Aug. 4, 2026
          </p>
        </div>
      </div>
    </div>
  );
}
