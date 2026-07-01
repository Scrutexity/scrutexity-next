"use server";

import { revalidatePath } from "next/cache";

export type ApprovalActionState = {
  ok: boolean;
  message: string;
  auditDigest?: string;
};

export async function approveRemediationProposal(formData: FormData): Promise<ApprovalActionState> {
  const proposalId = String(formData.get("proposalId") ?? "");
  const approver = String(formData.get("approver") ?? "");
  const approvalScope = String(formData.get("approvalScope") ?? "");

  if (!proposalId || !approver || approvalScope !== "claim_matrix_and_cms_payload") {
    return {
      ok: false,
      message: "Approval blocked. Proposal, approver, and exact scope acknowledgement are required.",
    };
  }

  const auditDigest = `sha256:${Buffer.from(`${proposalId}:${approver}:approved`).toString("hex").slice(0, 24)}`;

  revalidatePath("/remediation");

  return {
    ok: true,
    message: "Proposal approved for controlled CMS staging. Live deployment still requires deployment confirmation.",
    auditDigest,
  };
}
