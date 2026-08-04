/**
 * Claim Intelligence — canonical domain model.
 *
 * The ClaimRecord is the core domain object. Every artifact is just a view of
 * this same data. The homepage feeds it demo data, the sample report feeds it
 * sample data, and customer reports feed it live audit data — same components,
 * no duplication.
 *
 * This file has no imports so it can be consumed from server or client code.
 */

export type Risk = 'low' | 'medium' | 'high';

/** Evidence state of a single claim. */
export type Status = 'supported' | 'weak' | 'unsupported';

/** The source types that can support a claim. */
export type EvidenceSourceType =
  | 'Website'
  | 'Research'
  | 'Government'
  | 'Internal'
  | 'Third Party';

/** Coverage of one claim by one source type. */
export type CoverageLevel = 'covered' | 'weak' | 'missing';

export interface Evidence {
  source: EvidenceSourceType;
  coverage: CoverageLevel;
  note?: string;
}

/** The core domain object. Every visualization is a view of this. */
export interface ClaimRecord {
  id: string;
  text: string;
  category: string;
  risk: Risk;
  status: Status;
  /** Per-source-type coverage. Drives the EvidenceCoverage matrix. */
  evidence: Evidence[];
  /** Human-readable summary of the evidence picture (cards, X-ray drawer). */
  evidenceNote?: string;
  /** Safer rewrite when the claim is weak or unsupported. */
  rewritten?: string;
  /** How prominently AI engines surface this claim, 0–100. */
  aiVisibility: number;
  owner?: string;
  updated?: string;
  proofHref?: string;
  /** Optional placement for the Website X-Ray overlay (CSS %). */
  overlay?: { top: string; left: string; width: string };
}

/** One AI answer engine and its citation quality for the audited subject. */
export interface CitationEngine {
  id: string;
  name: string;
  /** Node center in % of the canvas. */
  x: number;
  y: number;
  confidence: number;
  quality: 'Strong' | 'Partial' | 'Weak';
  missing: number;
  broken: number;
}

/** A point in a claim's drift history (git-commit style). */
export interface DriftEvent {
  date: string;
  hash: string;
  title: string;
  detail: string;
  status: Status;
  kind: 'created' | 'updated' | 'removed' | 'risk';
}

/** A derived confidence metric for the dashboard. */
export interface ConfidenceMetric {
  label: string;
  /** 0–100 for the progress ring. */
  value: number;
  display: string;
  delta: string;
  up: boolean;
  /** Whether "up" is good for this metric (legal exposure: down is good). */
  upIsGood: boolean;
  spark: number[];
}

/** The full audit payload an artifact set renders. */
export interface AuditMeta {
  subject: string;
  url: string;
  generated: string;
  illustrative: boolean;
}

export interface AuditData {
  meta: AuditMeta;
  claims: ClaimRecord[];
  citations: CitationEngine[];
  drift: DriftEvent[];
}
