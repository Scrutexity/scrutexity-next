import type { Metadata } from "next";
import { CheckCircle2, DatabaseZap, FileLock2, GitBranch, ShieldCheck } from "lucide-react";
import { openApiProposalSpec, remediationProposals } from "@/lib/july-governance-data";
import { approveRemediationProposal } from "./actions";

export const metadata: Metadata = {
  title: "Autonomous Remediation Approval Engine | Scrutexity",
  description:
    "Q3 pre-architecture for AuditGPT read/write remediation proposals, explicit sign-off, CMS staging, and immutable audit trails.",
};

export default function RemediationPage() {
  return (
    <div className="min-h-screen bg-[#F8F4F0] text-[#1C1C1C]">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="border-b border-[#1C1C1C]/15 pb-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B86F4F]">
            Q3 Pre-Architecture / Read-Write Approval Engine
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none tracking-normal md:text-7xl">
            Autonomous remediation stops at the approval boundary.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#1C1C1C]/68">
            The enterprise posture is not &quot;AI writes to your website.&quot; AuditGPT identifies risk, proposes a safer claim matrix, stages a CMS payload, and requires named human sign-off before deployment. Sovereignty is the product.
          </p>
        </header>

        <section className="mt-8 grid gap-4 lg:grid-cols-4">
          <FlowStep icon={<FileLock2 size={18} />} label="1. Read-only finding" body="Risk is discovered from public surfaces, PMS context, and retained telemetry without production mutation." />
          <FlowStep icon={<GitBranch size={18} />} label="2. Safer matrix" body="The system proposes bounded language, evidence requirements, and versioned claim taxonomy." />
          <FlowStep icon={<DatabaseZap size={18} />} label="3. CMS staging" body="Contentful, Sanity, or custom CMS receives a draft payload only after proposal creation." />
          <FlowStep icon={<ShieldCheck size={18} />} label="4. Sign-off and deploy" body="CCO or delegated Ops lead signs exact scope before the live deployment record is written." />
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B86F4F]">
              Proposed remediation workflow
            </p>
            <div className="mt-5 space-y-4">
              {remediationProposals.map((proposal) => (
                <article key={proposal.proposalId} className="rounded-lg border border-[#1C1C1C]/12 bg-[#F8F4F0] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em]">{proposal.proposalId}</p>
                      <h2 className="mt-2 font-display text-3xl tracking-normal">{proposal.contentSurface}</h2>
                      <p className="mt-1 text-xs text-[#1C1C1C]/55">{proposal.clinic} / {proposal.cmsTarget}</p>
                    </div>
                    <span className="rounded border border-[#B86F4F]/35 bg-[#B86F4F]/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#B86F4F]">
                      {proposal.status}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3">
                    <ClaimMatrixRow label="Current claim" value={proposal.currentClaim} tone="risk" />
                    <ClaimMatrixRow label="Proposed claim" value={proposal.proposedClaim} tone="safe" />
                    <ClaimMatrixRow label="Evidence standard" value={proposal.evidenceStandard} />
                  </div>
                  <form action={approveRemediationProposal as unknown as (formData: FormData) => void} className="mt-4 rounded-md border border-[#1C1C1C]/12 bg-white/45 p-3">
                    <input type="hidden" name="proposalId" value={proposal.proposalId} />
                    <input type="hidden" name="approvalScope" value="claim_matrix_and_cms_payload" />
                    <label className="block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1C1C1C]/55" htmlFor={`${proposal.proposalId}-approver`}>
                      Approver
                    </label>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <input
                        id={`${proposal.proposalId}-approver`}
                        name="approver"
                        defaultValue="Chief Compliance Officer"
                        className="h-10 flex-1 rounded-md border border-[#1C1C1C]/15 bg-[#F8F4F0] px-3 text-sm"
                      />
                      <button
                        type="submit"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#1C1C1C]/20 bg-[#1C1C1C] px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F8F4F0] transition-colors hover:bg-[#B86F4F]"
                      >
                        <CheckCircle2 size={15} aria-hidden="true" />
                        Sign
                      </button>
                    </div>
                  </form>
                  <p className="mt-3 font-mono text-[10px] text-[#1C1C1C]/45">{proposal.version} / {proposal.immutableDigest}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <section className="rounded-lg border border-[#1C1C1C]/15 bg-[#1C1C1C] p-5 text-[#F8F4F0]">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D7A18A]">
                OpenAPI-style proposal endpoint
              </p>
              <pre className="mt-4 max-h-[560px] overflow-auto rounded-md border border-[#F8F4F0]/15 bg-[#F8F4F0]/5 p-4 font-mono text-[11px] leading-5 text-[#F8F4F0]/78">
                {JSON.stringify(openApiProposalSpec, null, 2)}
              </pre>
            </section>

            <section className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B86F4F]">
                Data model and versioning
              </p>
              <div className="mt-4 grid gap-3">
                {[
                  ["claim_matrix", "id, clinic_id, procedure_category, approved_bounds, prohibited_terms, evidence_policy_id, version"],
                  ["claim_variant", "id, matrix_id, surface, current_text, proposed_text, risk_basis, status, cms_payload_hash"],
                  ["approval_event", "id, proposal_id, actor_id, role, action, scope, signed_at, ip_digest, immutable_digest"],
                  ["deployment_event", "id, proposal_id, cms_target, external_entry_id, deployed_at, rollback_ref, zero_downtime_status"],
                ].map(([name, fields]) => (
                  <div key={name} className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-3">
                    <p className="font-mono text-xs font-semibold text-[#1C1C1C]">{name}</p>
                    <p className="mt-2 font-mono text-[11px] leading-5 text-[#1C1C1C]/60">{fields}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

function FlowStep({ icon, label, body }: { icon: React.ReactNode; label: string; body: string }) {
  return (
    <article className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-4">
      <div className="text-[#B86F4F]">{icon}</div>
      <h2 className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.12em]">{label}</h2>
      <p className="mt-3 text-xs leading-6 text-[#1C1C1C]/65">{body}</p>
    </article>
  );
}

function ClaimMatrixRow({ label, value, tone }: { label: string; value: string; tone?: "risk" | "safe" }) {
  return (
    <div
      className={`rounded-md border p-3 ${
        tone === "risk"
          ? "border-[#1C1C1C]/15 bg-[#1C1C1C]/5"
          : tone === "safe"
            ? "border-[#B86F4F]/35 bg-[#B86F4F]/10"
            : "border-[#1C1C1C]/12 bg-white/35"
      }`}
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1C1C1C]/55">{label}</p>
      <p className="mt-2 text-xs leading-5 text-[#1C1C1C]/72">{value}</p>
    </div>
  );
}
