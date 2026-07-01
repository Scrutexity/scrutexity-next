import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FileDown,
  Gauge,
  LockKeyhole,
  MapPinned,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Claim Intelligence Review | 30-Day Governance Pilot",
  description:
    "A 30-day read-only governance review pilot for multi-location med spas. Monitor claims, risk, remediation queues, and evidence exports without PMS migration.",
};

const pilotIncludes = [
  {
    icon: MapPinned,
    title: "5-25 location monitoring",
    body: "Portfolio view across locations, regions, and service-line surfaces without replacing Boulevard, Mangomint, Zenoti, or existing marketing tools.",
  },
  {
    icon: Gauge,
    title: "Claim risk score",
    body: "A structured score by location and treatment category, grounded in claim type, evidence status, surface visibility, and remediation priority.",
  },
  {
    icon: Workflow,
    title: "Remediation queue",
    body: "Unsupported or over-broad claims become an operator-readable queue with safer language, evidence requirements, owner, and review state.",
  },
  {
    icon: FileDown,
    title: "Exportable evidence report",
    body: "Day 0, Day 15, and Day 30 proof packets for operators, agencies, counsel, board review, or future diligence files.",
  },
];

const timeline = [
  {
    day: "Day 0",
    title: "Baseline snapshot",
    body: "AuditGPT scans the public claim surface, AI answer visibility, reputation signals, and high-risk treatment categories.",
  },
  {
    day: "Day 7-15",
    title: "Drift and queue review",
    body: "Claim Drift Monitoring watches for claim drift, new unsupported copy, risky AI answer changes, and evidence gaps that need owner action.",
  },
  {
    day: "Day 30",
    title: "Executive evidence packet",
    body: "Scrutexity delivers a board-room report: reviewed claim inventory, risk score movement, open remediation log, optional demand-at-risk context, and monitoring plan.",
  },
];

const ladder = [
  ["Free Claim Snapshot", "$0", "One public-surface scan to identify the top claim, visibility, and proof gaps."],
  ["Claim Intelligence Report", "$299", "Comprehensive review of priority claims with safer rewrite recommendations and proof requirements."],
  ["Claim Drift Monitoring", "$299/mo", "Ongoing claim drift monitoring, proof binder exports, remediation queues, and executive reporting."],
  ["PE / Agency expansion", "Custom", "Diligence bundles, partner consoles, portfolio monitoring, and benchmark index access."],
];

export default function RadarPilotPage() {
  return (
    <div className="min-h-screen bg-[#F8F4F0] text-[#1C1C1C]">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="grid gap-8 border-b border-[#1C1C1C]/15 pb-8 lg:grid-cols-[1fr_390px] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B86F4F]">
              Claim Intelligence Review / Paid Proof Mechanism
            </p>
            <h1 className="mt-4 max-w-5xl font-display text-5xl leading-none tracking-normal md:text-7xl">
              30-day read-only governance review pilot for multi-location med spas.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
              Claim Intelligence Review is the commercial bridge between a free AuditGPT snapshot and enterprise monitoring. It shows whether a 5-25 location operator has claim drift, unsupported treatment language, AI answer gaps, and fixable evidence debt before anyone touches the PMS.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/claim-audit?intent=claim-audit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1C1C1C] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F8F4F0] transition-colors hover:bg-[#B86F4F]"
              >
                Request Claim Intelligence Review
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/radar-pilot/dashboard"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#1C1C1C]/18 bg-white/35 px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1C1C1C] transition-colors hover:border-[#B86F4F]/60"
              >
                View dashboard demo
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-4">
            <div className="flex items-center gap-2 text-[#B86F4F]">
              <LockKeyhole size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">Pilot posture</p>
            </div>
            <dl className="mt-4 grid gap-3 font-mono text-xs">
              <div className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-3">
                <dt className="text-[#1C1C1C]/50">Access model</dt>
                <dd className="mt-1 text-[#1C1C1C]">Read-only / zero-downtime</dd>
              </div>
              <div className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-3">
                <dt className="text-[#1C1C1C]/50">Migration</dt>
                <dd className="mt-1 text-[#1C1C1C]">No PMS migration</dd>
              </div>
              <div className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-3">
                <dt className="text-[#1C1C1C]/50">Commercial role</dt>
                <dd className="mt-1 text-[#1C1C1C]">$299 paid proof bridge</dd>
              </div>
            </dl>
          </aside>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-4">
          {pilotIncludes.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
                <Icon size={18} className="text-[#B86F4F]" />
                <h2 className="mt-5 font-display text-3xl tracking-normal">{item.title}</h2>
                <p className="mt-3 text-xs leading-6 text-[#1C1C1C]/64">{item.body}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-[#1C1C1C]/15 bg-[#1C1C1C] p-5 text-[#F8F4F0]">
            <div className="flex items-center gap-2 text-[#D7A18A]">
              <ClipboardCheck size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                30-day operating rhythm
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {timeline.map((item) => (
                <article key={item.day} className="rounded-md border border-[#F8F4F0]/15 bg-[#F8F4F0]/5 p-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D7A18A]">{item.day}</p>
                  <h3 className="mt-2 font-display text-2xl tracking-normal">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#F8F4F0]/64">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B86F4F]">
              Reviewed claim inventory first
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-normal">The count is the artifact a diligence lead can use.</h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1C1C]/68">
              Claim Intelligence Review leads with the grounded inventory: each claim, source page, screenshot, treatment category, risk basis, evidence state, safer rewrite, and owner. Demand-at-risk is optional supporting context only. It is not the hero metric, a revenue guarantee, or a clinical or legal finding.
            </p>
            <div className="mt-5 grid gap-3">
              {[
                ["Primary deliverable", "A claim-by-claim inventory with source URL, screenshot, category, risk rationale, evidence status, remediation recommendation, and review state."],
                ["Supporting context", "A directional demand-at-risk range may be shown only with assumptions, confidence level, excluded variables, and the soft conversion multiplier called out plainly."],
                ["Boundary", "No guaranteed revenue, no legal clearance, no autonomous clinical advice, and no dollar figure without a worked derivation."],
              ].map(([label, body]) => (
                <div key={label} className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-3">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1C1C1C]/55">{label}</p>
                  <p className="mt-2 text-xs leading-6 text-[#1C1C1C]/64">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B86F4F]">
            Explicit funnel
          </p>
          <div className="mt-5 grid gap-3 lg:grid-cols-5">
            {ladder.map(([name, price, body]) => (
              <article key={name} className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1C1C1C]/55">{name}</p>
                <p className="mt-3 font-display text-3xl tracking-normal">{price}</p>
                <p className="mt-3 text-xs leading-6 text-[#1C1C1C]/62">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-[#B86F4F]/30 bg-[#B86F4F]/10 p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[#B86F4F]">
                <ShieldCheck size={18} />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                  Category position
                </p>
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-normal">Claim Governance, not generic AI compliance.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
                AuditGPT is the intake engine. Scrutexity is the operating system. Claim Intelligence Review is the paid proof mechanism. The Sealed Audit Trail is the reason a customer cannot casually leave after the record compounds.
              </p>
            </div>
            <Link
              href="/proof/sealed-audit-trail"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1C1C1C] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F8F4F0] transition-colors hover:bg-[#B86F4F]"
            >
              View proof moat
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
