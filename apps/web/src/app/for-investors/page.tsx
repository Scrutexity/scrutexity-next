import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileText, TriangleAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "For Investors & Procurement — AI Capability Illusion Audit | Scrutexity",
  description:
    "Scrutexity's AI Capability Illusion Audit maps the gap between a target company's published evidence and what AI answer engines say about its capabilities. Scoped for PE due diligence and enterprise vendor review. $25,000 fixed fee.",
  alternates: { canonical: "/for-investors" },
};

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const deliverables = [
  {
    title: "Target claim map",
    body: "Every material capability, security, compliance, and product claim published across the target's public surfaces — website, documentation, GitHub, press releases — indexed and dated.",
  },
  {
    title: "Discrepancy register",
    body: "Each claim compared against what AI answer engines (ChatGPT, Perplexity, Gemini) return for buyer-side queries. Every divergence recorded verbatim, classified by type: hallucinated, outdated, unsupported, or narrower than claimed.",
  },
  {
    title: "Evidence-gap severity matrix",
    body: "Each discrepancy scored by: (1) whether visible support exists at all, (2) whether the support is scoped to the claim, and (3) the stage at which a buyer-side AI agent would most likely surface the gap.",
  },
  {
    title: "Deal-impact memo",
    body: "A structured memo, written for a procurement officer or investment committee, describing which discrepancies constitute material risk — defined as: a gap a reasonable buyer-side agent would flag, for which remediation or disclosure is available. No deal outcomes are guaranteed.",
  },
];

const notInScope = [
  "Legal opinions, compliance certification, or regulatory advice of any kind.",
  "Forensic review of internal systems, source code, or non-public documentation.",
  "Guaranteed deal outcomes, valuations, or risk classifications beyond the evidence visible in the agreed scope.",
  "Ongoing monitoring — that is a separate Continuous Drift engagement.",
  "Any claim or finding for which visible public support does not exist within the scope reviewed.",
];

const whoBenefits = [
  ["PE associates", "running AI-assisted due diligence on a software or AI company"],
  ["Enterprise procurement officers", "evaluating a vendor's published AI capability claims before signing"],
  ["Legal teams", "building a pre-close narrative risk record for a target company"],
  ["M&A advisers", "assessing whether a target's AI profile is consistent with its disclosed capabilities"],
];

export default function ForInvestorsPage() {
  return (
    <div className="min-h-screen bg-cream text-bark">

      {/* Hero */}
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-20 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
            For Investors &amp; Procurement
          </p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="font-display text-5xl leading-[1.03] text-espresso sm:text-6xl lg:text-7xl">
                Is the target company's AI narrative consistent with its published evidence?
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-mist">
                The Scrutexity AI Capability Illusion Audit maps the gap between what AI answer engines say about a company's capabilities and what its public evidence can support. Fixed fee. Bounded scope. Dated record.
              </p>
            </div>
            <div className="rounded-xl border border-sand-deep/45 bg-white p-7 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>Engagement summary</p>
              <dl className="mt-5 divide-y divide-sand-deep/30">
                {[
                  ["Fee", "$25,000 fixed"],
                  ["Turnaround", "Target: 10 business days from scope sign-off"],
                  ["Deliverable", "Claim map · discrepancy register · evidence-gap matrix · deal-impact memo"],
                  ["Scope recorded", "Before work begins. Scope changes require amendment."],
                  ["Reviewer", "Nick Altstein, personally"],
                ].map(([term, val]) => (
                  <div key={String(term)} className="flex gap-4 py-3">
                    <dt className="w-28 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-mist" style={{ fontFamily: MONO }}>{term}</dt>
                    <dd className="text-sm text-espresso">{val}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/contact?intent=illusion-audit&source=for-investors-hero"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep"
              >
                Request the Illusion Audit
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-sand-deep/30 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Who it is for</p>
              <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">
                AI-assisted diligence has a blind spot.
              </h2>
              <p className="mt-5 text-sm leading-7 text-mist">
                Enterprise procurement and PE due diligence workflows now use AI answer engines as a research step. When those engines surface a discrepancy between a vendor's capability claims and its visible evidence, the flag goes into the record — even if the discrepancy is a hallucination. The Illusion Audit finds those gaps before the buyer's AI does.
              </p>
            </div>
            <div className="rounded-xl border border-sand-deep/45 bg-bone divide-y divide-sand-deep/30">
              {whoBenefits.map(([role, context]) => (
                <div key={role} className="flex gap-4 p-5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                  <div>
                    <span className="text-sm font-semibold text-espresso">{role}</span>
                    <span className="text-sm text-mist"> — {context}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl mb-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Deliverables</p>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">
              Four documents. Fixed scope. Dated record.
            </h2>
            <p className="mt-5 text-sm leading-7 text-mist">
              Every deliverable is bounded to the scope recorded at engagement start. Scope changes require a written amendment before additional work begins.
            </p>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-xl border border-sand-deep/35 bg-sand-deep/35 md:grid-cols-2 lg:grid-cols-4">
            {deliverables.map(({ title, body }, i) => (
              <li key={title} className="bg-bone p-6">
                <div className="flex items-center justify-between mb-6">
                  <FileText className="h-5 w-5 text-sage-deep" aria-hidden="true" />
                  <span className="text-[10px] font-semibold text-mist" style={{ fontFamily: MONO }}>0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl text-espresso">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-mist">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Illustrative exhibit */}
      <section className="border-b border-sand-deep/30 bg-espresso px-5 py-20 text-cream sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-soft" style={{ fontFamily: MONO }}>
                Illustrative exhibit format
              </p>
              <h2 className="mt-4 font-display text-4xl text-cream md:text-5xl">
                The four-part exhibit.
              </h2>
              <p className="mt-5 text-sm leading-7 text-cream/70">
                Every discrepancy in the register follows this format. Data below is illustrative and does not represent a confirmed Scrutexity engagement or outcome.
              </p>
            </div>
            <div className="rounded-xl border border-cream/15 bg-cream/5 p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-soft mb-5" style={{ fontFamily: MONO }}>
                Illustrative · reviewed Aug. 2026 · not a confirmed outcome
              </p>
              {[
                ["Published record", "Product documentation: 'SOC 2 Type II certified.' Scope: production infrastructure. Sub-processors listed: 3 of 7."],
                ["Captured answer", "Perplexity: 'The company is SOC 2 Type II certified across all systems and sub-processors.'"],
                ["Observed discrepancy", "AI answer generalizes certification to 'all systems.' Published scope covers production infrastructure only; sub-processor coverage is partial and documented."],
                ["Next action", "Add scope qualifier to every public SOC 2 reference. Update sub-processor list or note current coverage explicitly. Remediation is target company's responsibility."],
              ].map(([term, val]) => (
                <div key={String(term)} className="border-t border-cream/10 pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-sage-soft" style={{ fontFamily: MONO }}>{term}</span>
                  <p className="mt-1.5 text-xs leading-5 text-cream/70">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What it is not */}
      <section className="border-b border-sand-deep/30 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-clay-deep" style={{ fontFamily: MONO }}>Scope boundaries</p>
              <h2 className="mt-4 font-display text-3xl text-espresso">What this engagement is not.</h2>
              <p className="mt-5 text-sm leading-7 text-mist">
                Every Scrutexity engagement is bounded by evidence visible in the public record within the agreed scope. These items fall outside that boundary.
              </p>
            </div>
            <ul className="space-y-3 rounded-xl border border-sand-deep/45 bg-bone p-7">
              {notInScope.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-mist">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-clay-deep" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bone px-5 py-20 text-center sm:px-8 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Next step</p>
          <h2 className="mt-5 font-display text-4xl text-espresso md:text-5xl">
            Find the gaps before the buyer&apos;s AI does.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">
            $25,000 fixed fee. Target 10-business-day turnaround. Scope recorded before work begins. Nick Altstein reviews the engagement personally.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact?intent=illusion-audit&source=for-investors-footer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep"
            >
              Request the Illusion Audit
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/sample-report"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-cream px-8 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep"
            >
              View the Sample
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
