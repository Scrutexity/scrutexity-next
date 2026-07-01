import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Archive, FileLock2, Fingerprint, History, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sealed Audit Trail | Scrutexity Proof Binder",
  description:
    "Tamper-evident claim records, monthly proof binders, and exportable evidence trails for governed growth infrastructure.",
};

const loggedEvents = [
  "Original claim text",
  "Screenshot and surface URL",
  "Risk basis and matrix version",
  "Evidence status and proof source",
  "Approved safer rewrite",
  "Reviewer and approver identity",
  "CMS or page deployment state",
  "Monthly proof binder export",
];

const binderSections = [
  ["Claim inventory", "All monitored claims, surfaces, status, owner, evidence requirement, and expiration date."],
  ["Change log", "Timestamped before-after history with screenshots, claim matrix version, and reviewer action."],
  ["AI answer samples", "Representative answer-engine outputs showing how the business is described across priority prompts."],
  ["Open risk register", "Unresolved claims, evidence gaps, and recommended remediation sequence for ops review."],
  ["Export package", "Board, insurer, agency, and diligence-ready PDF/CSV packet with tamper-evident digests."],
];

export default function SealedAuditTrailPage() {
  return (
    <div className="min-h-screen bg-[#F8F4F0] text-[#1C1C1C]">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="grid gap-8 border-b border-[#1C1C1C]/15 pb-8 lg:grid-cols-[1fr_390px] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B86F4F]">
              Proof Binder / Sealed Audit Trail
            </p>
            <h1 className="mt-4 max-w-5xl font-display text-5xl leading-none tracking-normal md:text-7xl">
              The retention product is the record they cannot afford to lose.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
              Scrutexity becomes defensible infrastructure when every claim, fix, approval, screenshot, and export is preserved as operational memory. The UI can be copied. The history cannot.
            </p>
          </div>
          <div className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-4">
            <div className="flex items-center gap-2 text-[#B86F4F]">
              <Fingerprint size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                Digest sample
              </p>
            </div>
            <p className="mt-4 break-all font-mono text-xs leading-6 text-[#1C1C1C]/64">
              sha256:8f7c34b1b7a2:claim-record:matrix-v4.2:2026-07
            </p>
          </div>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-[#1C1C1C]/15 bg-[#1C1C1C] p-5 text-[#F8F4F0]">
            <div className="flex items-center gap-2 text-[#D7A18A]">
              <Archive size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                Every important action logs
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {loggedEvents.map((event) => (
                <div key={event} className="rounded-md border border-[#F8F4F0]/15 bg-[#F8F4F0]/5 p-3">
                  <p className="font-mono text-[11px] leading-5 text-[#F8F4F0]/72">{event}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
            <div className="flex items-center gap-2 text-[#B86F4F]">
              <FileLock2 size={18} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                Monthly Scrutexity Proof Binder
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {binderSections.map(([label, body]) => (
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
                <History size={18} />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                  Switching-cost thesis
                </p>
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-normal">After 90 days, leaving means losing claim memory.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
                A clinic can replace a report. It cannot easily replace the chronology of what it claimed, what supported it, who approved the change, and how the surface evolved. That retained evidence is the real product moat.
              </p>
            </div>
            <Link
              href="/proof/telemetry-alpha"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1C1C1C] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F8F4F0] transition-colors hover:bg-[#B86F4F]"
            >
              View telemetry alpha
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#1C1C1C]/15 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[#1C1C1C]/50">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={13} /> Structural verification only</span>
          <span>No autonomous clinical advice</span>
          <span>Export built for counsel, insurers, operators, and diligence teams</span>
        </footer>
      </main>
    </div>
  );
}
