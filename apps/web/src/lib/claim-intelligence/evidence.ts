/**
 * Evidence — coverage helpers derived from the canonical ClaimRecord model.
 * The EvidenceCoverage matrix and the heatmap's evidence column are both
 * derived here so there is one source of truth for evidence state.
 */

import type { ClaimRecord, CoverageLevel, EvidenceSourceType, Status } from './types';
import { COVERAGE_TO_STATUS } from './status';

export const EVIDENCE_SOURCES: EvidenceSourceType[] = [
  'Website',
  'Research',
  'Government',
  'Internal',
  'Third Party',
];

export interface CoverageCell {
  source: EvidenceSourceType;
  coverage: CoverageLevel;
  status: Status;
}

export interface CoverageRow {
  id: string;
  claim: string;
  cells: CoverageCell[];
}

/** Build the claim × source-type coverage matrix from claims. */
export function buildCoverageMatrix(claims: ClaimRecord[]): CoverageRow[] {
  return claims.map((c) => ({
    id: c.id,
    claim: c.text,
    cells: EVIDENCE_SOURCES.map((source) => {
      const ev = c.evidence.find((e) => e.source === source);
      const coverage: CoverageLevel = ev ? ev.coverage : 'missing';
      return { source, coverage, status: COVERAGE_TO_STATUS[coverage] };
    }),
  }));
}

/** Short evidence-state label for tables/cards: None / Partial / Verified. */
export function evidenceState(claim: ClaimRecord): 'None' | 'Partial' | 'Verified' {
  const covered = claim.evidence.filter((e) => e.coverage === 'covered').length;
  const some = claim.evidence.some((e) => e.coverage !== 'missing');
  if (covered >= 2) return 'Verified';
  if (some) return 'Partial';
  return 'None';
}
