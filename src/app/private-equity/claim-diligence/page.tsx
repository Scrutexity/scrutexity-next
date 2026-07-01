import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileSearch, ShieldAlert, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Med Spa Claim Diligence | Scrutexity",
  description:
    "Claim, AI visibility, reputation, and demand governance diligence for med spa acquisitions, MSOs, lenders, and operating partners.",
};

const diligenceScope = [
  "Website and landing page claims",
  "GLP-1, IV therapy, hormone, peptide, and regenerative medicine language",
  "Provider credential and before-after claims",
  "Google Business Profile and reputation surface",
  "AI answer visibility and citation gaps",
  "Reviewed claim inventory with source URLs and screenshots",
  "Optional demand-at-risk context with visible assumptions",
  "Booking and recovery exposure notes",
  "Evidence readiness and unresolved remediation log",
  "Post-close Claim Drift Monitoring plan",
];

const packages = [
  {
    name: "Light Target Review",
    price: "$3k-$7.5k",
    body: "Single-site or small target scan for claim risk, AI visibility gaps, and obvious diligence blockers.",
  },
  {
    name: "Platform Diligence Pack",
    price: "$10k-$25k",
    body: "Multi-location diligence with risk matrix, open-issues log, remediation timeline, and post-close monitoring recommendations.",
  },
  {
    name: "Portfolio Claim Drift Retainer",
    price: "$5k-$15k/mo",
    body: "Ongoing monitoring for acquired or existing portfolio locations, including monthly proof binders and board-ready exceptions.",
  },
];

export default function ClaimDiligencePage() {
  return (
    <div className="min-h-screen bg-[#F8F4F0] text-[#1C1C1C]">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="border-b border-[#1C1C1C]/15 pb-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B86F4F]">
            PE / M&A Diligence
          </p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-none tracking-normal md:text-7xl">
            A diligence pack for the claim surface buyers usually discover too late.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
            Med spa roll-ups inherit more than scheduling systems and revenue. They inherit claim language, AI answers, local reputation, recovery gaps, and evidence debt. Scrutexity turns that surface into a board-readable diligence artifact.
          </p>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-[#1C1C1C]/15 bg-[#1C1C1C] p-5 text-[#F8F4F0]">
            <div className="flex items-center gap-2 text-[#D7A18A]">
              <BriefcaseBusiness size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                Acquisition questions answered
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {[
                "What claim liabilities are embedded in the growth engine?",
                "Which treatment categories require evidence before scaled marketing?",
                "Where is demand being created but not governed?",
                "What must be fixed before post-close paid media expansion?",
                "Which locations need Claim Drift Monitoring first?",
              ].map((question) => (
                <div key={question} className="rounded-md border border-[#F8F4F0]/15 bg-[#F8F4F0]/5 p-3">
                  <p className="text-sm leading-6 text-[#F8F4F0]/72">{question}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
            <div className="flex items-center gap-2 text-[#B86F4F]">
              <FileSearch size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                Diligence scope
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {diligenceScope.map((item) => (
                <div key={item} className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-3">
                  <p className="font-mono text-[11px] leading-5 text-[#1C1C1C]/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => (
            <article key={item.name} className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B86F4F]">
                {item.name}
              </p>
              <p className="mt-4 font-display text-4xl tracking-normal">{item.price}</p>
              <p className="mt-3 text-sm leading-7 text-[#1C1C1C]/64">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-lg border border-[#B86F4F]/30 bg-[#B86F4F]/10 p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[#B86F4F]">
                <TrendingUp size={18} />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                  Land-and-expand logic
                </p>
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-normal">Pre-close diligence becomes post-close operating infrastructure.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
                The same risks identified during diligence become Claim Drift Monitoring priorities after close. That is the enterprise wedge: one target engagement can seed a portfolio-wide governed growth contract.
              </p>
            </div>
            <Link
              href="/contact?intent=claim_diligence"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1C1C1C] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F8F4F0] transition-colors hover:bg-[#B86F4F]"
            >
              Request diligence pack
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        <footer className="mt-8 rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert size={18} className="mt-1 text-[#B86F4F]" />
            <p className="text-sm leading-7 text-[#1C1C1C]/68">
              Red-team boundary: this is not a legal opinion, valuation opinion, or regulatory clearance. It is a structured claim, visibility, and demand-governance diligence artifact designed to inform counsel, operators, lenders, and sponsors.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
