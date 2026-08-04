/**
 * Claim Intelligence artifact system.
 * Reusable visual artifacts for the Scrutexity platform — warm clinical
 * luxury, never dark mode. Each artifact answers one question:
 * what is wrong, why it matters, how we prove it, how we fix it.
 */

export { default as WebsiteXRay } from './WebsiteXRay';
export { default as ClaimHeatmap } from './ClaimHeatmap';
export { default as ClaimDashboard } from './ClaimDashboard';
export { default as CitationNetwork } from './CitationNetwork';
export { default as ClaimTimeline } from './ClaimTimeline';
export { default as EvidenceCoverage } from './EvidenceCoverage';
export { default as ClaimCardShowcase, ClaimCard } from './ClaimCard';
export { default as ClaimLifecycle } from './ClaimLifecycle';
export { default as TrustStack } from './TrustStack';
export { default as GovernanceFlywheel } from './GovernanceFlywheel';

// Canonical domain model — the ClaimRecord every artifact consumes.
export type {
  ClaimRecord,
  AuditData,
  CitationEngine,
  DriftEvent,
  Evidence,
  ConfidenceMetric,
  Status,
  Risk,
} from '@/lib/claim-intelligence';
export { SAMPLE_AUDIT } from '@/lib/claim-intelligence';
