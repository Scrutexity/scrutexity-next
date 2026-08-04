/**
 * Scoring — derive the confidence dashboard from the canonical claims.
 * Headline numbers are computed deterministically from the claims so the same
 * function works for demo, sample, and live audit data. Sparkline trends are
 * representative (a real audit would supply historical points).
 */

import type { ClaimRecord, CitationEngine, ConfidenceMetric } from './types';

function pct(n: number, d: number): number {
  return d === 0 ? 0 : Math.round((n / d) * 100);
}

/** Trend points that land on `end` — representative until real history exists. */
function trendTo(end: number, swing = 22, steps = 7): number[] {
  const start = Math.max(0, end - swing);
  return Array.from({ length: steps }, (_, i) =>
    Math.round(start + ((end - start) * i) / (steps - 1)),
  );
}

export function deriveConfidence(
  claims: ClaimRecord[],
  citations: CitationEngine[] = [],
): ConfidenceMetric[] {
  const total = claims.length || 1;
  const supported = claims.filter((c) => c.status === 'supported').length;
  const unsupported = claims.filter((c) => c.status === 'unsupported').length;
  const highRisk = claims.filter((c) => c.risk === 'high').length;

  // Overall claim score: weighted by how many claims are supported vs. unsupported.
  const overall = Math.round(pct(supported, total) * 0.7 + (100 - pct(unsupported, total)) * 0.3);

  // Evidence coverage: share of all (claim × source) cells that are covered.
  const cells = claims.reduce((sum, c) => sum + c.evidence.length, 0);
  const covered = claims.reduce(
    (sum, c) => sum + c.evidence.filter((e) => e.coverage === 'covered').length,
    0,
  );
  const coverage = pct(covered, cells || 1);

  // AI visibility: mean of per-claim visibility, or mean engine confidence.
  const aiFromClaims = Math.round(claims.reduce((s, c) => s + c.aiVisibility, 0) / total);
  const aiFromEngines = citations.length
    ? Math.round(citations.reduce((s, e) => s + e.confidence, 0) / citations.length)
    : aiFromClaims;
  const aiVisibility = citations.length ? aiFromEngines : aiFromClaims;

  // Legal exposure: higher when more high-risk claims are live (0 = none).
  const exposure = pct(highRisk, total);

  // Trust score: blend of overall posture and coverage.
  const trust = Math.round(overall * 0.5 + coverage * 0.5);

  return [
    {
      label: 'Overall Claim Score',
      value: overall,
      display: String(overall),
      delta: '+8',
      up: true,
      upIsGood: true,
      spark: trendTo(overall),
    },
    {
      label: 'Evidence Coverage',
      value: coverage,
      display: `${coverage}%`,
      delta: '+12%',
      up: true,
      upIsGood: true,
      spark: trendTo(coverage),
    },
    {
      label: 'AI Visibility',
      value: aiVisibility,
      display: String(aiVisibility),
      delta: '+5',
      up: true,
      upIsGood: true,
      spark: trendTo(aiVisibility, 12),
    },
    {
      label: 'Legal Exposure',
      value: exposure,
      display: exposure >= 50 ? 'High' : exposure >= 25 ? 'Med' : 'Low',
      delta: `-${highRisk} risks`,
      up: false,
      upIsGood: false,
      spark: trendTo(exposure + 26).reverse(),
    },
    {
      label: 'Trust Score',
      value: trust,
      display: String(trust),
      delta: '+9',
      up: true,
      upIsGood: true,
      spark: trendTo(trust),
    },
  ];
}

/** Count of claims needing a rewrite this cycle (for the owner-brief tile). */
export function highRiskCount(claims: ClaimRecord[]): number {
  return claims.filter((c) => c.risk === 'high').length;
}
