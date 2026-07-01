import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, FileText, Handshake, Layers3, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Agency Trust Console | Scrutexity Partners",
  description:
    "Co-branded AuditGPT snapshots, claim review certificates, and claim drift monitoring for med spa agencies and growth consultants.",
};

const partnerOutputs = [
  {
    title: "White-label AuditGPT snapshots",
    body: "Run client claim, AI visibility, reputation, and demand leakage snapshots without forcing a new tool narrative into the agency relationship.",
  },
  {
    title: "Co-branded trust certificate",
    body: "Issue a conservative Claim-Safe Growth certificate after fixes are applied, linked to a live Scrutexity claim record instead of a static badge.",
  },
  {
    title: "Monthly claim drift evidence packet",
    body: "Show clients what changed, what drifted, what was remediated, and which unresolved claim risks still need operator approval.",
  },
];

const consoleFields = [
  "Client workspace",
  "Claim risk score",
  "AI answer gap",
  "GBP / review surface",
  "Remediation queue",
  "Certificate status",
  "Proof binder export",
  "Renewal risk",
];

export default function AgencyConsolePage() {
  return (
    <div className="min-h-screen bg-[#F8F4F0] text-[#1C1C1C]">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="grid gap-8 border-b border-[#1C1C1C]/15 pb-8 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B86F4F]">
              Partner Channel / Agency Trust Console
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none tracking-normal md:text-7xl">
              Give agencies a trust layer they can sell without becoming compliance staff.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
              Scrutexity should not chase every clinic one by one. The faster route is to arm med spa agencies, SEO firms, website shops, and growth consultants with co-branded claim governance infrastructure.
            </p>
          </div>
          <div className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1C1C1C]/55">
              Channel offer
            </p>
            <p className="mt-3 font-display text-4xl tracking-normal">$499/mo</p>
            <p className="mt-2 text-xs leading-5 text-[#1C1C1C]/62">
              Founding Beta partner license for up to 25 monthly claim snapshots, co-branded report exports, and Claim Intelligence Review handoff.
            </p>
            <p className="mt-3 font-mono text-[10px] leading-5 text-[#1C1C1C]/50">
              Commercial options: platform fee, usage-based audit packs, or documented rev share on Claim Drift Monitoring conversions.
            </p>
          </div>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {partnerOutputs.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B86F4F]">
                0{index + 1}
              </span>
              <h2 className="mt-5 font-display text-3xl tracking-normal">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#1C1C1C]/64">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-[#1C1C1C]/15 bg-[#1C1C1C] p-5 text-[#F8F4F0]">
            <div className="flex items-center gap-2 text-[#D7A18A]">
              <Layers3 size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                Multi-tenant console fields
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {consoleFields.map((field) => (
                <div key={field} className="rounded-md border border-[#F8F4F0]/15 bg-[#F8F4F0]/5 p-3">
                  <p className="font-mono text-[11px] text-[#F8F4F0]/72">{field}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[#F8F4F0]/68">
              Extension point: connect each workspace to AuditGPT scans, Claim Drift Monitoring, Contento remediation tasks, and proof binder exports. The agency keeps the client relationship; Scrutexity owns the trust-routing rail.
            </p>
          </div>

          <div className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B86F4F]">
              Certificate workflow
            </p>
            <div className="mt-5 space-y-3">
              {[
                ["Snapshot", "Agency runs a public-surface AuditGPT scan and receives the top claim, AI visibility, reputation, and demand leakage findings."],
                ["Fix", "Contento or the agency applies safer claim framing, evidence tags, and platform-specific copy boundaries."],
                ["Issue", "Scrutexity creates a certificate with status, scope, last reviewed date, and a link to the sealed claim record."],
                ["Monitor", "Claim Drift Monitoring watches for drift so the certificate cannot become stale marketing theater."],
              ].map(([label, body]) => (
                <div key={label} className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-4">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#1C1C1C]">{label}</p>
                  <p className="mt-2 text-xs leading-6 text-[#1C1C1C]/62">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-[#B86F4F]/30 bg-[#B86F4F]/10 p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[#B86F4F]">
                <Handshake size={18} />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                  First channel motion
                </p>
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-normal">Offer 20 agencies three free client snapshots.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
                The ask is simple: show where their clients are exposed, then convert agencies into Claim Drift Monitoring distribution partners. Do not call this legal certification; call it claim-safe growth workflow.
              </p>
            </div>
            <Link
              href="/claim-audit?intent=agency_console"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1C1C1C] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F8F4F0] transition-colors hover:bg-[#B86F4F]"
            >
              Start partner intake
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#1C1C1C]/15 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[#1C1C1C]/50">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={13} /> No legal certification claim</span>
          <span className="inline-flex items-center gap-2"><BadgeCheck size={13} /> Certificate must link to live evidence</span>
          <span className="inline-flex items-center gap-2"><FileText size={13} /> Exportable client proof packet</span>
        </footer>
      </main>
    </div>
  );
}
