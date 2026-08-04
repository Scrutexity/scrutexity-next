import { NextResponse } from "next/server";

type ProposalRequest = {
  clinicId?: string;
  contentSurface?: string;
  currentClaim?: string;
  proposedClaim?: string;
  cmsTarget?: "contentful" | "sanity" | "custom";
  evidenceIds?: string[];
  approverRole?: "chief_compliance_officer" | "delegated_ops_lead";
};

export async function POST(request: Request) {
  const body = (await request.json()) as ProposalRequest;
  const missing = ["clinicId", "contentSurface", "currentClaim", "proposedClaim", "cmsTarget"].filter(
    (field) => !body[field as keyof ProposalRequest],
  );

  if (missing.length || !body.evidenceIds?.length) {
    return NextResponse.json(
      {
        error: "proposal_validation_failed",
        message: "Proposal creation requires clinic, surface, current claim, proposed claim, CMS target, and at least one evidence id.",
        missing: body.evidenceIds?.length ? missing : [...missing, "evidenceIds"],
      },
      { status: 400 },
    );
  }

  const proposalId = `AGPT-RW-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8)}`;
  const payloadDigest = await digestProposal(body);

  return NextResponse.json(
    {
      proposalId,
      status: "pending_sign_off",
      cmsMutationStatus: "not_started",
      approvalRequiredFrom: body.approverRole ?? "chief_compliance_officer",
      payloadDigest,
      zeroDowntimePolicy: "stage_only_until_signed",
      auditTrail: [
        {
          event: "proposal_created",
          at: new Date().toISOString(),
          digest: payloadDigest,
        },
      ],
    },
    { status: 202 },
  );
}

async function digestProposal(body: ProposalRequest) {
  const payload = new TextEncoder().encode(JSON.stringify(body));
  const digest = await crypto.subtle.digest("SHA-256", payload);
  return `sha256:${Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32)}`;
}
