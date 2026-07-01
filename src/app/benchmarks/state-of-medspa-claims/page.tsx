import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, FileText, LockKeyhole, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "State of Medical Aesthetics Claims | Scrutexity Benchmarks",
  description:
    "Anonymized medical aesthetics claim risk benchmarks for operators, agencies, private equity, and insurers.",
};

const benchmarkFindings = [
  { category: "FDA-adjacent device language", share: "38%", note: "Common around energy devices and skin tightening pages." },
  { category: "Guaranteed or permanent outcome claims", share: "31%", note: "Highest concentration in injectables, body contouring, and weight-loss copy." },
  { category: "Evidence-incomplete before/after claims", share: "44%", note: "Frequently missing consent, treatment protocol, timeline, or patient variability context." },
  { category: "AI answer visibility gap", share: "57%", note: "Operators often appear in answer engines without the evidence language they would want quoted." },
  { category: "Demand-at-risk context", share: "Optional", note: "Reported only behind claim counts, with assumptions and excluded variables visible." },
];

const reportSections = [
  "Top unsupported claim types",
  "Fastest-growing risky treatment categories",
  "GLP-1, IV therapy, peptide, and hormone claim patterns",
  "Before-after and testimonial risk patterns",
  "AI answer visibility and citation gaps",
  "Demand-at-risk context with methodology and excluded variables",
  "Questions PE buyers and insurers should ask",
];

export default function StateOfMedspaClaimsPage() {
  return (
    <div className="min-h-screen bg-[#F8F4F0] text-[#1C1C1C]">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="border-b border-[#1C1C1C]/15 pb-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B86F4F]">
            Benchmark Intelligence / No Hall of Shame
          </p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-none tracking-normal md:text-7xl">
            Own the category metric without naming operators.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
            The correct media moat is anonymized, operator-grade intelligence. Scrutexity should publish aggregate claim-risk benchmarks that create market pressure without making the company radioactive to the operators it needs to serve.
          </p>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-4">
          {benchmarkFindings.map((finding) => (
            <article key={finding.category} className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1C1C1C]/55">
                {finding.category}
              </p>
              <p className="mt-4 font-display text-5xl tracking-normal text-[#B86F4F]">{finding.share}</p>
              <p className="mt-3 text-xs leading-6 text-[#1C1C1C]/62">{finding.note}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
            <div className="flex items-center gap-2 text-[#B86F4F]">
              <FileText size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                Q3 2026 report structure
              </p>
            </div>
            <div className="mt-5 grid gap-3">
              {reportSections.map((section) => (
                <div key={section} className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-3">
                  <p className="font-mono text-[11px] leading-5 text-[#1C1C1C]/70">{section}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#1C1C1C]/15 bg-[#1C1C1C] p-5 text-[#F8F4F0]">
            <div className="flex items-center gap-2 text-[#D7A18A]">
              <BarChart3 size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                Distribution machine
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Public teaser", "Publish anonymized findings and category charts to create operator urgency."],
                ["Agency edition", "Give partners a client-ready version they can use in sales and retention conversations."],
                ["PE / insurer edition", "Package deeper benchmark data, diligence questions, and treatment-category risk indicators."],
                ["Monitoring conversion", "End every report with a private clinic snapshot and a Claim Drift Monitoring pilot."],
              ].map(([label, body]) => (
                <div key={label} className="rounded-md border border-[#F8F4F0]/15 bg-[#F8F4F0]/5 p-4">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#F8F4F0]">{label}</p>
                  <p className="mt-2 text-xs leading-6 text-[#F8F4F0]/62">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-[#B86F4F]/30 bg-[#B86F4F]/10 p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[#B86F4F]">
                <TrendingUp size={18} />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                  30-day launch path
                </p>
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-normal">Start with 25-50 public websites, anonymized.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
                Do not wait for perfect data scale. Publish the first Medical Aesthetics Claim Risk Snapshot with clear caveats, anonymized examples, and a direct AuditGPT intake path.
              </p>
            </div>
            <Link
              href="/claim-audit?intent=benchmark_snapshot"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1C1C1C] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F8F4F0] transition-colors hover:bg-[#B86F4F]"
            >
              Run private snapshot
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#1C1C1C]/15 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[#1C1C1C]/50">
          <span className="inline-flex items-center gap-2"><LockKeyhole size={13} /> No named operator shaming</span>
          <span>Anonymized aggregate intelligence</span>
          <span>Public media wedge, private enterprise dataset</span>
        </footer>
      </main>
    </div>
  );
}
