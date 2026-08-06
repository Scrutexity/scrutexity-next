import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Kicker, MONO, CTABand, RelatedRail } from "@/components/scrutexity/intel-kit";

/* ─────────────────────────────────────────────────────────────────────────
   ILLUSTRATIVE EXHIBIT — fictional company, fictional findings.
   Nothing on this page represents a real client or a completed engagement.
   The structure is real; the content is constructed to demonstrate it.
   ───────────────────────────────────────────────────────────────────────── */

const meta = [
  ["Subject", "Meridian Health Group (fictional)"],
  ["Entities in scope", "4 operating entities · 11 locations"],
  ["Surfaces reviewed", "Primary domain, 11 location pages, 3 campaign pages"],
  ["Capture window", "04–12 March 2026"],
  ["Prepared for", "Counsel-directed review"],
  ["Classification", "Confidential · Illustrative sample"],
];

const chain = [
  {
    step: "01",
    label: "Claim",
    confidence: "Observed",
    body: "“Our protocol is clinically proven to cut recovery time in half.”",
    meta: "Source: /treatments/recovery · Captured 06 Mar 2026, 14:22 UTC · Verbatim",
  },
  {
    step: "02",
    label: "Evidence",
    confidence: "High confidence",
    body: "No study, protocol reference, citation, or outcome data is linked from the claim or anywhere on the domain. A site-wide search returns no supporting document.",
    meta: "Method: full-domain crawl + manual review of linked assets · 06 Mar 2026",
  },
  {
    step: "03",
    label: "Pattern match",
    confidence: "Moderate confidence",
    body: "Quantified outcome claims of this construction — a specific improvement ratio attached to “clinically proven” without an accessible study — correspond to a documented enforcement pattern in this category.",
    meta: "Basis: published enforcement actions against comparable language · Not a finding of wrongdoing",
  },
  {
    step: "04",
    label: "AI distortion",
    confidence: "Observed",
    body: "Two of three answer systems restate the claim as established fact. One attributes it directly to the company without qualification; one drops “clinically proven” but retains the ratio as a plain outcome statement.",
    meta: "Captured 11 Mar 2026 · 3 systems · 4 phrasings each · Outputs recorded verbatim in Appendix C",
  },
  {
    step: "05",
    label: "Risk interpretation",
    confidence: "Requires professional review",
    body: "A quantified outcome claim with no visible substantiation, amplified by AI repetition across systems the company does not control. The evidence gap is documented; whether it constitutes a regulatory issue is a legal determination.",
    meta: "Scrutexity does not characterize this as a violation. That determination belongs to counsel.",
  },
  {
    step: "06",
    label: "Recommended action",
    confidence: "Priority 1",
    body: "Withdraw or substantiate. If substantiation exists but is unpublished, link it from the claim. If it does not, replace with scoped language describing what the protocol does without asserting a quantified outcome. Re-test AI representation 14 days after the correction is live.",
    meta: "Draft replacement language provided in Appendix D · Review by counsel before publication",
  },
];

const confidenceTone: Record<string, string> = {
  Observed: "border-sage-deep/45 bg-sage-deep/10 text-sage-deep",
  "High confidence": "border-sage-deep/45 bg-sage-deep/10 text-sage-deep",
  "Moderate confidence": "border-clay/45 bg-clay/10 text-clay",
  "Requires professional review": "border-clay/45 bg-clay/10 text-clay",
  "Priority 1": "border-clay/60 bg-clay/15 text-clay",
};

export default function SampleReportContent() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      {/* ── Hero ── */}
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Kicker>Sample diligence file</Kicker>
          <h1 className="mt-6 max-w-4xl font-display text-[2.5rem] leading-[1.07] text-espresso sm:text-5xl lg:text-6xl">
            See the intelligence before you buy it.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-bark">
            One finding, traced end to end: the claim as published, the evidence behind it, the
            pattern it matches, how AI systems repeat it, what that means, and what to do next.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-mist">
            Every field shown here appears in every engagement. Only the subject is fictional.
          </p>
        </div>
      </section>

      {/* ── The exhibit ── */}
      <section className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <article className="overflow-hidden rounded-xl border border-sand-deep/50 bg-bone shadow-[0_1px_2px_rgba(28,24,20,0.04),0_14px_36px_-16px_rgba(28,24,20,0.12)]">
            {/* Document header */}
            <header className="border-b border-sand-deep/40 px-7 py-7 sm:px-10 sm:py-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay"
                    style={{ fontFamily: MONO }}
                  >
                    Scrutexity · Exhibit A
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-snug text-espresso">
                    Priority Finding 01 — Unsubstantiated outcome claim
                  </h2>
                </div>
                <span
                  className="shrink-0 rounded-full border border-clay/40 bg-clay/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-clay"
                  style={{ fontFamily: MONO }}
                >
                  Illustrative
                </span>
              </div>

              <dl className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {meta.map(([term, value]) => (
                  <div key={term} className="grid grid-cols-[130px_1fr] gap-3 border-t border-sand-deep/35 pt-3">
                    <dt
                      className="text-[10px] font-semibold uppercase tracking-[0.1em] text-mist"
                      style={{ fontFamily: MONO }}
                    >
                      {term}
                    </dt>
                    <dd className="text-xs leading-5 text-bark">{value}</dd>
                  </div>
                ))}
              </dl>
            </header>

            {/* The chain */}
            <div className="divide-y divide-sand-deep/35">
              {chain.map(({ step, label, confidence, body, meta: line }) => (
                <section key={step} className="px-7 py-8 sm:px-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-baseline gap-4">
                      <span
                        className="text-[10px] font-semibold text-clay"
                        style={{ fontFamily: MONO }}
                      >
                        {step}
                      </span>
                      <h3
                        className="text-xs font-semibold uppercase tracking-[0.14em] text-espresso"
                        style={{ fontFamily: MONO }}
                      >
                        {label}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${
                        confidenceTone[confidence] ?? "border-sand-deep bg-cream text-mist"
                      }`}
                      style={{ fontFamily: MONO }}
                    >
                      {confidence}
                    </span>
                  </div>

                  <p
                    className={`mt-5 leading-7 text-espresso ${
                      step === "01" ? "font-display text-2xl leading-snug" : "text-base"
                    }`}
                  >
                    {body}
                  </p>

                  <p
                    className="mt-4 border-t border-sand-deep/30 pt-3 text-[11px] leading-5 text-mist"
                    style={{ fontFamily: MONO }}
                  >
                    {line}
                  </p>
                </section>
              ))}
            </div>

            {/* Redacted appendix strip */}
            <footer className="border-t border-sand-deep/40 bg-cream px-7 py-7 sm:px-10">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mist"
                style={{ fontFamily: MONO }}
              >
                Appendices — withheld from sample
              </p>
              <div className="mt-5 space-y-2.5">
                {[
                  "Appendix A — Full claim inventory (147 claims across 11 locations)",
                  "Appendix B — Evidence map and source register",
                  "Appendix C — AI answer captures, verbatim, by system and phrasing",
                  "Appendix D — Draft replacement language, per finding",
                  "Appendix E — Recommended diligence questions for counsel",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-24 shrink-0 rounded-sm bg-sand-deep/70"
                    />
                    <span className="text-xs leading-5 text-mist">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[11px] leading-5 text-mist">
                Appendices are delivered in full to the commissioning party. They are redacted
                here because a sample should demonstrate structure, not volume.
              </p>
            </footer>
          </article>

          <p className="mt-6 text-xs leading-5 text-mist">
            Illustrative sample. Meridian Health Group is a fictional company. The findings,
            captures, and dates are constructed to demonstrate the record format and do not
            represent a real organization or a completed Scrutexity engagement.
          </p>
        </div>
      </section>

      {/* ── How to read it ── */}
      <section className="border-b border-sand-deep/30 bg-bone px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <Kicker>How to read a finding</Kicker>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso md:text-5xl">
              Three things every field is designed to survive.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Someone checking it",
                b: "Every observation carries a source and a capture timestamp. A reviewer can open the same page and see the same thing, or establish that it changed.",
              },
              {
                t: "Someone disagreeing with it",
                b: "Confidence labels are explicit and conservative. Where a determination requires an attorney, the field says so rather than implying a conclusion.",
              },
              {
                t: "Being forwarded without you",
                b: "The finding is written to be read cold, by someone who was not in the kickoff call and will not ask a follow-up question.",
              },
            ].map(({ t, b }) => (
              <article key={t} className="rounded-xl border border-sand-deep/50 bg-cream p-7">
                <h3 className="font-display text-2xl leading-snug text-espresso">{t}</h3>
                <p className="mt-4 text-sm leading-6 text-mist">{b}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-clay/40 bg-clay/[0.07] p-8">
            <Kicker>Language discipline</Kicker>
            <p className="mt-4 max-w-3xl text-base leading-7 text-bark">
              Findings are described as pattern matches, documented inconsistencies, evidence
              gaps, and potential exposure. Scrutexity does not characterize a finding as a
              violation. That determination belongs to a qualified attorney.
            </p>
            <Link
              href="/methodology"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-espresso transition-colors hover:text-clay"
            >
              Read the full methodology
              <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        title="See this run against your own record."
        body="A Private Assessment starts with the decision you are trying to make, then scopes the file to it."
        primary={{ label: "Request a Private Assessment", href: "/private-assessment?source=sample-report" }}
        secondary={{ label: "Start with a Diagnostic", href: "/claim-exposure-diagnostic" }}
      />

      <RelatedRail
        links={[
          { label: "Diligence", href: "/diligence" },
          { label: "For Counsel", href: "/counsel" },
          { label: "Methodology", href: "/methodology" },
          { label: "Proof", href: "/proof" },
          { label: "Pricing", href: "/pricing" },
        ]}
      />
    </div>
  );
}
