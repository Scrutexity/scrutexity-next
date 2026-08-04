export type ProcedureCategory =
  | "Injectables"
  | "Energy Devices"
  | "Body Contouring"
  | "Skin Health"
  | "Hormone Adjacent";

export type LocationTelemetry = {
  id: string;
  clinic: string;
  region: "Northeast" | "Southeast" | "Central" | "West";
  pms: "Boulevard" | "Mangomint";
  monthlyDemand: number;
  revenueCaptureRate: number;
  unsupportedClaims: number;
  offLabelExposure: number;
  complianceViolationProbability: number;
  leakage: number;
  remediationOpportunity: number;
  nrrProtectionDelta: number;
  riskScoreBefore: number;
  riskScoreAfter: number;
};

export type ClaimFlag = {
  id: string;
  clinicId: string;
  severity: "Moderate" | "Severe";
  surface: string;
  claim: string;
  riskBasis: string;
  recommendation: string;
  revenueAtRisk: number;
};

export type RemediationProposal = {
  proposalId: string;
  status: "Draft" | "Pending CCO Sign-Off" | "Approved" | "Deployed";
  cmsTarget: "Contentful" | "Sanity" | "Custom CMS";
  clinic: string;
  contentSurface: string;
  currentClaim: string;
  proposedClaim: string;
  evidenceStandard: string;
  version: string;
  immutableDigest: string;
};

export const telemetryLocations: LocationTelemetry[] = [
  {
    id: "clinic-nyc-01",
    clinic: "Northline Aesthetics - Flatiron",
    region: "Northeast",
    pms: "Boulevard",
    monthlyDemand: 412,
    revenueCaptureRate: 0.61,
    unsupportedClaims: 19,
    offLabelExposure: 0.32,
    complianceViolationProbability: 0.46,
    leakage: 48200,
    remediationOpportunity: 31900,
    nrrProtectionDelta: 0.074,
    riskScoreBefore: 78,
    riskScoreAfter: 41,
  },
  {
    id: "clinic-bos-02",
    clinic: "Northline Aesthetics - Seaport",
    region: "Northeast",
    pms: "Boulevard",
    monthlyDemand: 288,
    revenueCaptureRate: 0.67,
    unsupportedClaims: 11,
    offLabelExposure: 0.19,
    complianceViolationProbability: 0.34,
    leakage: 29100,
    remediationOpportunity: 18800,
    nrrProtectionDelta: 0.049,
    riskScoreBefore: 63,
    riskScoreAfter: 36,
  },
  {
    id: "clinic-atl-03",
    clinic: "Everwell Skin - Buckhead",
    region: "Southeast",
    pms: "Mangomint",
    monthlyDemand: 354,
    revenueCaptureRate: 0.58,
    unsupportedClaims: 23,
    offLabelExposure: 0.41,
    complianceViolationProbability: 0.58,
    leakage: 55700,
    remediationOpportunity: 37600,
    nrrProtectionDelta: 0.086,
    riskScoreBefore: 86,
    riskScoreAfter: 47,
  },
  {
    id: "clinic-dal-04",
    clinic: "Everwell Skin - Plano",
    region: "Central",
    pms: "Mangomint",
    monthlyDemand: 241,
    revenueCaptureRate: 0.64,
    unsupportedClaims: 8,
    offLabelExposure: 0.17,
    complianceViolationProbability: 0.29,
    leakage: 22100,
    remediationOpportunity: 14100,
    nrrProtectionDelta: 0.037,
    riskScoreBefore: 57,
    riskScoreAfter: 31,
  },
  {
    id: "clinic-la-05",
    clinic: "Vellum Medical Spa - Brentwood",
    region: "West",
    pms: "Boulevard",
    monthlyDemand: 327,
    revenueCaptureRate: 0.56,
    unsupportedClaims: 27,
    offLabelExposure: 0.44,
    complianceViolationProbability: 0.62,
    leakage: 62400,
    remediationOpportunity: 42100,
    nrrProtectionDelta: 0.092,
    riskScoreBefore: 89,
    riskScoreAfter: 49,
  },
];

export const baselineYield = [
  { category: "Injectables" as ProcedureCategory, preAuditCapture: 0.68, governedCapture: 0.77, monthlyDelta: 31800 },
  { category: "Energy Devices" as ProcedureCategory, preAuditCapture: 0.51, governedCapture: 0.66, monthlyDelta: 48900 },
  { category: "Body Contouring" as ProcedureCategory, preAuditCapture: 0.47, governedCapture: 0.61, monthlyDelta: 42100 },
  { category: "Skin Health" as ProcedureCategory, preAuditCapture: 0.72, governedCapture: 0.79, monthlyDelta: 18700 },
  { category: "Hormone Adjacent" as ProcedureCategory, preAuditCapture: 0.39, governedCapture: 0.52, monthlyDelta: 26700 },
];

export const claimFlags: ClaimFlag[] = [
  {
    id: "flag-001",
    clinicId: "clinic-la-05",
    severity: "Severe",
    surface: "Morpheus8 service page",
    claim: "FDA-approved skin tightening with guaranteed collagen rebuild.",
    riskBasis: "Approval framing overstates indication and uses guarantee language without outcome support.",
    recommendation: "Replace with indication-bounded device language and route expected-outcome language to consult scripts.",
    revenueAtRisk: 18400,
  },
  {
    id: "flag-002",
    clinicId: "clinic-atl-03",
    severity: "Severe",
    surface: "Google Business Profile post",
    claim: "Ozempic alternative for permanent weight loss.",
    riskBasis: "Therapeutic substitution and permanence claim create avoidable clinical and advertising exposure.",
    recommendation: "Move to clinician-reviewed eligibility language with explicit program constraints.",
    revenueAtRisk: 22600,
  },
  {
    id: "flag-003",
    clinicId: "clinic-nyc-01",
    severity: "Moderate",
    surface: "Injectables landing page",
    claim: "Erase wrinkles in one appointment.",
    riskBasis: "Absolute outcome promise without duration, patient variability, or evidence boundary.",
    recommendation: "Use improvement-oriented language and attach before-after evidence requirements.",
    revenueAtRisk: 12100,
  },
  {
    id: "flag-004",
    clinicId: "clinic-bos-02",
    severity: "Moderate",
    surface: "Email campaign",
    claim: "Medical-grade facial reverses sun damage.",
    riskBasis: "Disease-adjacent reversal language unsupported by treatment record.",
    recommendation: "Reframe to cosmetic appearance support and require product/protocol evidence tags.",
    revenueAtRisk: 8200,
  },
  {
    id: "flag-005",
    clinicId: "clinic-dal-04",
    severity: "Moderate",
    surface: "Paid search ad",
    claim: "Clinically proven fat loss without surgery.",
    riskBasis: "Proof standard not linked to selected procedure, patient class, or device protocol.",
    recommendation: "Bind claim to procedure category and approved proof source before ad relaunch.",
    revenueAtRisk: 7600,
  },
];

export const remediationProposals: RemediationProposal[] = [
  {
    proposalId: "AGPT-RW-2026-07-018",
    status: "Pending CCO Sign-Off",
    cmsTarget: "Contentful",
    clinic: "Vellum Medical Spa - Brentwood",
    contentSurface: "Morpheus8 service page",
    currentClaim: "FDA-approved skin tightening with guaranteed collagen rebuild.",
    proposedClaim: "A clinician-guided RF microneedling treatment used to support visible skin texture and firmness improvements for eligible patients.",
    evidenceStandard: "Device indication, consent language, before-after media policy, staff consult script alignment.",
    version: "claim-matrix-v4.2",
    immutableDigest: "sha256:8f7c34b1b7a2:proposal:018",
  },
  {
    proposalId: "AGPT-RW-2026-07-021",
    status: "Draft",
    cmsTarget: "Sanity",
    clinic: "Everwell Skin - Buckhead",
    contentSurface: "Weight management campaign",
    currentClaim: "Ozempic alternative for permanent weight loss.",
    proposedClaim: "A medically supervised weight-management consultation for patients seeking eligibility review and structured follow-up.",
    evidenceStandard: "Clinical service taxonomy, contraindication review, staff escalation path, no permanence language.",
    version: "claim-matrix-v4.2",
    immutableDigest: "sha256:44ac9d02ee18:proposal:021",
  },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);
}

export function portfolioTotals() {
  const totals = telemetryLocations.reduce(
    (acc, location) => {
      acc.monthlyDemand += location.monthlyDemand;
      acc.leakage += location.leakage;
      acc.remediationOpportunity += location.remediationOpportunity;
      acc.nrrProtectionDelta += location.nrrProtectionDelta;
      acc.riskBefore += location.riskScoreBefore;
      acc.riskAfter += location.riskScoreAfter;
      return acc;
    },
    {
      monthlyDemand: 0,
      leakage: 0,
      remediationOpportunity: 0,
      nrrProtectionDelta: 0,
      riskBefore: 0,
      riskAfter: 0,
    },
  );

  return {
    ...totals,
    nrrProtectionDelta: totals.nrrProtectionDelta / telemetryLocations.length,
    riskBefore: Math.round(totals.riskBefore / telemetryLocations.length),
    riskAfter: Math.round(totals.riskAfter / telemetryLocations.length),
  };
}

export const openApiProposalSpec = {
  openapi: "3.1.0",
  info: {
    title: "AuditGPT Remediation Proposal API",
    version: "2026-07-alpha",
    summary: "Creates signed, reviewable claim remediation proposals before any CMS write.",
  },
  paths: {
    "/api/remediation/proposals": {
      post: {
        operationId: "createRemediationProposal",
        summary: "Create a remediation proposal in read/write approval mode.",
        security: [{ scrutexityServiceToken: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["clinicId", "contentSurface", "currentClaim", "proposedClaim", "cmsTarget", "evidenceIds"],
                properties: {
                  clinicId: { type: "string" },
                  contentSurface: { type: "string" },
                  currentClaim: { type: "string" },
                  proposedClaim: { type: "string" },
                  cmsTarget: { type: "string", enum: ["contentful", "sanity", "custom"] },
                  evidenceIds: { type: "array", items: { type: "string" }, minItems: 1 },
                  approverRole: { type: "string", enum: ["chief_compliance_officer", "delegated_ops_lead"] },
                },
              },
            },
          },
        },
        responses: {
          "202": {
            description: "Proposal accepted for approval workflow. No customer CMS mutation has occurred.",
          },
          "409": {
            description: "Claim matrix version conflict or evidence lock failure.",
          },
        },
      },
    },
  },
};
