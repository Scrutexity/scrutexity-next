export type AuthLevel = "LOCKED" | "EMAIL_CAPTURED" | "PURCHASED" | "DEMO";

export type RegulatoryVector = {
  id: string; // e.g., "FTC_SEC_5"
  name: string;
  description: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
};

export type ClaimExhibit = {
  id: string;
  originalClaimText: string | null; // NULL if redacted
  remediatedClaimText: string | null; // NULL if redacted
  vector: RegulatoryVector;
  missingSupportReason: string | null; // NULL if redacted
};

export type ScanStatus = {
  scanId: string;
  targetUrl: string;
  scannedAt: string; // ISO 8601
  totalGapsFound: number;
};

export type RedactedScanResult = ScanStatus & {
  authLevel: "LOCKED";
  exhibitAStructure: {
    vectorId: string;
    hasRemediation: boolean;
  };
};

export type PartialRevealResult = ScanStatus & {
  authLevel: "EMAIL_CAPTURED";
  exhibitA: ClaimExhibit;
};

export type FullExhibitPackage = ScanStatus & {
  authLevel: "PURCHASED";
  provenanceHash: string; // SHA-256
  exhibits: ClaimExhibit[]; // Array of fully populated exhibits
};

// Discriminated union for funnel state management
export type FunnelPayload =
  | { state: "LOADING" }
  | { state: "DEMO"; data: FullExhibitPackage }
  | { state: "LOCKED"; data: RedactedScanResult }
  | { state: "PARTIAL"; data: PartialRevealResult }
  | { state: "UNLOCKED"; data: FullExhibitPackage }
  | { state: "ERROR"; error: Error };
