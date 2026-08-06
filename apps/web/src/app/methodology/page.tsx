import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, FileSearch, Layers3, RefreshCw, ScanSearch, SquarePen, TriangleAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Scrutexity Methodology | AI Narrative Audit Process",
  description: "How Scrutexity captures AI answer engine outputs, maps them against published evidence, scores gaps by commercial risk, and verifies fixes with a 14-day rerun.",
  alternates: { canonical: "/methodology" },
};

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const steps = [
  {
    title: "Capture",
    body: "Query ChatGPT, Perplexity, and Gemini with buyer-side questions about your product, security, pricing, and compliance. Record the outputs verbatim.",
    icon: ScanSearch,
  },
  {
    title: "Audit",
    body: "Map each AI output against your published pages. Separate testable claims from description and verify each against evidence a buyer can inspect.",
    icon: FileSearch,
  },
  {
    title: "Gap-Score",
    body: "Classify every discrepancy: hallucinated, outdated, unsupported, or narrower than claimed. Score each by commercial risk — which gaps are costing deals.",
    icon: TriangleAlert,
  },
  {
    title: "Fix",
    body: "Provide exact safer framing drafts, schema updates, and source remediation steps that close each gap without overpromising.",
    icon: SquarePen,
  },
  {
    title: "Monitor",
    body: "14 days after fixes go live, re-query the AI models to measure exact shift. Ongoing subscription catches new drift as models are retrained.",
    icon: RefreshCw,
  },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-20 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Methodology</p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-espresso md:text-6xl">
            Every finding points back to something a buyer can see and verify.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-mist">
            Scrutexity's five-step process moves from AI output capture to verified narrative alignment — with a measurable delta after every engagement.
          </p>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ol className="grid gap-px overflow-hidden rounded-xl border border-sand-deep/35 bg-sand-deep/35 lg:grid-cols-5">
            {steps.map(({ title, body, icon: Icon }, index) => (
              <li key={title} className="bg-bone p-6">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-sage-deep" aria-hidden="true" />
                  <span className="text-[10px] font-semibold text-mist" style={{ fontFamily: MONO }}>0{index + 1}</span>
                </div>
                <h2 className="mt-7 font-display text-2xl text-espresso">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-mist">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>What's included in every report</p>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">The useful parts.</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "AI answer engine output capture",
                "Claim-to-evidence mapping",
                "Gap classification by type",
                "Commercial risk scoring",
                "Safer framing drafts",
                "Recommended next steps",
                "14-day rerun verification",
                "Dated report metadata",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-bark">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-xl border border-sand-deep/45 bg-white p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-deep" style={{ fontFamily: MONO }}>Scope Boundaries</p>
            <h2 className="mt-4 font-display text-3xl text-espresso">An audit, not a substituted legal opinion.</h2>
            <p className="mt-5 text-sm leading-7 text-mist">
              Scrutexity does not provide legal advice, clinical advice, certification, or guaranteed outcomes. Findings describe reviewed public material, AI engine outputs, and the evidence visible within the agreed scope. Nick Altstein reviews every engagement personally, but the interpretation of legal risk remains the client's and their counsel's responsibility.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-center sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">See the method in report form.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">
            The sample report uses illustrative data and labels every field required to understand the finding and act on it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/sample-report" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep">
              View Sample Report <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-bone px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep">
              Review Pricing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
