/**
 * The Scrutexity Operating System — single source of truth.
 *
 * Every product page is a "layer" of one operating system. This file is the
 * canonical metadata: the five moves (Find · Fix · Monitor · Audit · Prove),
 * each layer's inputs/outputs, the next layer it hands off to, and the artifacts
 * it produces. Pages and shared components read from here so the ecosystem stays
 * consistent and there is no duplicated layer data across the codebase.
 */

export type Move = 'Find' | 'Fix' | 'Monitor' | 'Audit' | 'Prove';

export const MOVES: Move[] = ['Find', 'Fix', 'Monitor', 'Audit', 'Prove'];

export type ArtifactKind = 'json' | 'pdf' | 'md' | 'csv' | 'tsx' | 'svg' | 'yaml' | 'zip';

export type Artifact = {
  name: string;
  kind: ArtifactKind;
  /** One-line description shown on hover — describes the artifact, never a result claim. */
  desc: string;
  /** Stable artifact identity — makes each output read like a product, not a PDF. Illustrative. */
  id: string;
  /** Revision number — reinforces that artifacts are versioned, not one-off. */
  rev: number;
  /** Illustrative generation time. */
  time: string;
  /** Owning function. */
  owner: string;
};

export type Layer = {
  id: string;
  slug: string;
  name: string;
  layerNo: number;
  /** The operating-system move this layer performs. Null for cross-cutting layers (delivery, verticals). */
  move: Move | null;
  tagline: string;
  input: string;
  output: string;
  /** id of the layer this one hands off to, or null for the final/edge layers. */
  nextId: string | null;
  artifacts: Artifact[];
};

export const LAYERS: Layer[] = [
  {
    id: 'auditgpt',
    slug: '/auditgpt',
    name: 'AuditGPT',
    layerNo: 1,
    move: 'Find',
    tagline: 'Claim intelligence & gap diagnostics',
    input: 'Website',
    output: 'Claim Audit',
    nextId: 'contento',
    artifacts: [
      { name: 'claim_scan.json', kind: 'json', desc: 'Every declarative claim extracted from your properties.', id: 'CS-118', rev: 3, time: '18:42 UTC', owner: 'Diagnostics' },
      { name: 'risk_map.pdf', kind: 'pdf', desc: 'Claims ranked by evidence gap and exposure.', id: 'RM-204', rev: 2, time: '18:44 UTC', owner: 'Compliance' },
      { name: 'priority_plan.md', kind: 'md', desc: 'A 30-day sequence of what to fix first.', id: 'PP-061', rev: 1, time: '18:45 UTC', owner: 'Strategy' },
    ],
  },
  {
    id: 'contento',
    slug: '/contento',
    name: 'Contento',
    layerNo: 2,
    move: 'Fix',
    tagline: 'Governed rewrites & proof-backed content',
    input: 'Approved claims',
    output: 'Governed content',
    nextId: 'ai-visibility',
    artifacts: [
      { name: 'proof_block.tsx', kind: 'tsx', desc: 'A drop-in proof component tied to evidence.', id: 'PB-077', rev: 4, time: '09:12 UTC', owner: 'Content' },
      { name: 'service_page.md', kind: 'md', desc: 'Claim-safe page copy with sources attached.', id: 'SP-145', rev: 2, time: '09:20 UTC', owner: 'Content' },
      { name: 'campaign_brief.pdf', kind: 'pdf', desc: 'Email and SMS framing that does not overclaim.', id: 'CB-039', rev: 1, time: '09:31 UTC', owner: 'Marketing' },
    ],
  },
  {
    id: 'ai-visibility',
    slug: '/ai-visibility',
    name: 'AI Visibility',
    layerNo: 3,
    move: 'Monitor',
    tagline: 'Answer-engine visibility & entity truth',
    input: 'Entity facts',
    output: 'Visibility report',
    nextId: 'agent-audit',
    artifacts: [
      { name: 'answer_snapshot.csv', kind: 'csv', desc: 'How AI engines currently describe your business.', id: 'AS-212', rev: 5, time: '06:03 UTC', owner: 'Visibility' },
      { name: 'entity_map.json', kind: 'json', desc: 'Brand facts and citations across surfaces.', id: 'EM-088', rev: 3, time: '06:05 UTC', owner: 'Visibility' },
      { name: 'citation_queue.md', kind: 'md', desc: 'Sources queued for correction or addition.', id: 'CQ-054', rev: 2, time: '06:08 UTC', owner: 'Visibility' },
    ],
  },
  {
    id: 'agent-audit',
    slug: '/recovery',
    name: 'Recovery Archive',
    layerNo: 4,
    move: 'Audit',
    tagline: 'Archived recovery research & agent guardrail audit context',
    input: 'Agent transcripts',
    output: 'Guardrail gap map',
    nextId: 'proof',
    artifacts: [
      { name: 'transcript_audit.csv', kind: 'csv', desc: 'Agent turns reviewed for unsupported or off-policy claims.', id: 'TA-301', rev: 2, time: '14:18 UTC', owner: 'Guardrails' },
      { name: 'guardrail_map.yaml', kind: 'yaml', desc: 'A plain-English map of policy gaps and safer response patterns.', id: 'GM-022', rev: 3, time: '14:22 UTC', owner: 'Guardrails' },
      { name: 'archive_note.md', kind: 'md', desc: 'Retained missed-demand recovery research and competitor context.', id: 'AN-110', rev: 1, time: '14:40 UTC', owner: 'Strategy' },
    ],
  },
  {
    id: 'proof',
    slug: '/proof',
    name: 'Proof',
    layerNo: 5,
    move: 'Prove',
    tagline: 'Sealed receipts, trust pages & reputation',
    input: 'Evidence',
    output: 'Proof receipt',
    nextId: 'agency',
    artifacts: [
      { name: 'proof_receipt.pdf', kind: 'pdf', desc: 'A SHA-256 sealed record of what was reviewed.', id: 'PR-256', rev: 1, time: '21:07 UTC', owner: 'Proof' },
      { name: 'verification.svg', kind: 'svg', desc: 'An embeddable verify badge tied to the receipt.', id: 'VR-019', rev: 2, time: '21:09 UTC', owner: 'Proof' },
      { name: 'trust_page.tsx', kind: 'tsx', desc: 'A buyer-facing proof page built from evidence.', id: 'TP-007', rev: 3, time: '21:14 UTC', owner: 'Proof' },
    ],
  },
  {
    id: 'agency',
    slug: '/partner-os',
    name: 'Agency & Partners',
    layerNo: 6,
    move: null,
    tagline: 'White-label delivery & portfolio rollout',
    input: 'Client portfolio',
    output: 'White-label pack',
    nextId: null,
    artifacts: [
      { name: 'client_audit.pdf', kind: 'pdf', desc: 'A white-label claim audit under your brand.', id: 'CA-133', rev: 2, time: '11:50 UTC', owner: 'Partners' },
      { name: 'portfolio_report.csv', kind: 'csv', desc: 'Cross-client status across every layer.', id: 'PT-048', rev: 4, time: '11:55 UTC', owner: 'Partners' },
      { name: 'white_label_pack.zip', kind: 'zip', desc: 'Brandable artifacts for client delivery.', id: 'WL-005', rev: 1, time: '12:03 UTC', owner: 'Partners' },
    ],
  },
];

export function getLayer(id: string): Layer | undefined {
  return LAYERS.find((layer) => layer.id === id);
}

/** The layer that performs a given move (used to label the operating-system rail). */
export function layerForMove(move: Move): Layer | undefined {
  return LAYERS.find((layer) => layer.move === move);
}

/** Flat list of every artifact filename across the system — for "what's generated" strips. */
export const ALL_ARTIFACT_NAMES: string[] = LAYERS.flatMap((l) => l.artifacts.map((a) => a.name));
