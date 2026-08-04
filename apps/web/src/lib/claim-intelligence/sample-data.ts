/**
 * Sample audit data — the canonical demo payload.
 *
 * Used by the homepage and the /claim-intelligence showcase. A sample report
 * would import its own sample JSON, and a customer report would pass live audit
 * JSON — all into the exact same components.
 */

import type { AuditData, ClaimRecord, CitationEngine, DriftEvent } from './types';

export const SAMPLE_CLAIMS: ClaimRecord[] = [
  {
    id: 'CLM-2041',
    text: 'Lose 20 lbs in your first month',
    category: 'Outcome',
    risk: 'high',
    status: 'unsupported',
    evidence: [
      { source: 'Website', coverage: 'weak' },
      { source: 'Research', coverage: 'missing' },
      { source: 'Government', coverage: 'missing' },
      { source: 'Internal', coverage: 'weak' },
      { source: 'Third Party', coverage: 'missing' },
    ],
    evidenceNote: 'No cohort, study, or qualification criteria on the page. Numeric outcome implies a guaranteed result.',
    rewritten: 'In the SURMOUNT-1 trial (N=2,539), patients lost an average of 20.9% body weight over 72 weeks. Individual results vary.',
    aiVisibility: 64,
    owner: 'Marketing',
    updated: 'Apr 2026',
    proofHref: '/verify-receipt',
    overlay: { top: '20%', left: '6%', width: '54%' },
  },
  {
    id: 'CLM-2042',
    text: 'FDA-approved semaglutide',
    category: 'Medication',
    risk: 'medium',
    status: 'weak',
    evidence: [
      { source: 'Website', coverage: 'covered' },
      { source: 'Research', coverage: 'weak' },
      { source: 'Government', coverage: 'covered' },
      { source: 'Internal', coverage: 'weak' },
      { source: 'Third Party', coverage: 'missing' },
    ],
    evidenceNote: 'Brand-name Wegovy is FDA approved; compounded semaglutide is not. Page does not distinguish the two.',
    rewritten: 'Brand-name Wegovy (semaglutide) is FDA approved. Compounded semaglutide is not FDA approved and is dispensed by licensed pharmacies.',
    aiVisibility: 71,
    owner: 'Compliance',
    updated: 'May 2026',
    proofHref: '/verify-receipt',
    overlay: { top: '38%', left: '6%', width: '42%' },
  },
  {
    id: 'CLM-2043',
    text: 'No side effects — safe for everyone',
    category: 'Safety',
    risk: 'high',
    status: 'unsupported',
    evidence: [
      { source: 'Website', coverage: 'missing' },
      { source: 'Research', coverage: 'missing' },
      { source: 'Government', coverage: 'missing' },
      { source: 'Internal', coverage: 'weak' },
      { source: 'Third Party', coverage: 'missing' },
    ],
    evidenceNote: 'Contradicts prescribing information. GLP-1 carries a boxed warning and common GI adverse reactions.',
    rewritten: 'Most patients tolerate treatment well. Common side effects include nausea and GI discomfort. Review the full safety profile with your provider.',
    aiVisibility: 48,
    owner: 'Clinical',
    updated: 'Apr 2026',
    proofHref: '/verify-receipt',
    overlay: { top: '55%', left: '6%', width: '50%' },
  },
  {
    id: 'CLM-2044',
    text: 'Clinically proven results',
    category: 'Evidence',
    risk: 'medium',
    status: 'weak',
    evidence: [
      { source: 'Website', coverage: 'weak' },
      { source: 'Research', coverage: 'weak' },
      { source: 'Government', coverage: 'missing' },
      { source: 'Internal', coverage: 'covered' },
      { source: 'Third Party', coverage: 'missing' },
    ],
    evidenceNote: 'No study, journal, or trial identifier cited alongside the claim.',
    rewritten: 'Backed by the SURMOUNT-1 and STEP trials for the named medications. See sources.',
    aiVisibility: 58,
    owner: 'Marketing',
    updated: 'Mar 2026',
    proofHref: '/verify-receipt',
    overlay: { top: '64%', left: '52%', width: '40%' },
  },
  {
    id: 'CLM-2045',
    text: 'Board-certified medical team',
    category: 'Credential',
    risk: 'low',
    status: 'supported',
    evidence: [
      { source: 'Website', coverage: 'covered' },
      { source: 'Research', coverage: 'covered' },
      { source: 'Government', coverage: 'covered' },
      { source: 'Internal', coverage: 'covered' },
      { source: 'Third Party', coverage: 'weak' },
    ],
    evidenceNote: 'Provider credentials are listed and verifiable on the state medical board registry.',
    aiVisibility: 82,
    owner: 'Clinical',
    updated: 'Jun 2026',
    proofHref: '/verify-receipt',
    overlay: { top: '72%', left: '6%', width: '40%' },
  },
  {
    id: 'CLM-2046',
    text: 'HIPAA-aware workflow',
    category: 'Compliance',
    risk: 'low',
    status: 'supported',
    evidence: [
      { source: 'Website', coverage: 'covered' },
      { source: 'Research', coverage: 'weak' },
      { source: 'Government', coverage: 'covered' },
      { source: 'Internal', coverage: 'covered' },
      { source: 'Third Party', coverage: 'covered' },
    ],
    evidenceNote: 'BAA available; workflow documented internally.',
    aiVisibility: 69,
    owner: 'Compliance',
    updated: 'Jun 2026',
    proofHref: '/verify-receipt',
  },
];

export const SAMPLE_CITATIONS: CitationEngine[] = [
  { id: 'chatgpt', name: 'ChatGPT', x: 50, y: 12, confidence: 82, quality: 'Strong', missing: 1, broken: 0 },
  { id: 'claude', name: 'Claude', x: 86, y: 35, confidence: 74, quality: 'Partial', missing: 2, broken: 0 },
  { id: 'gemini', name: 'Gemini', x: 78, y: 80, confidence: 61, quality: 'Partial', missing: 3, broken: 1 },
  { id: 'google', name: 'Google AI', x: 22, y: 80, confidence: 48, quality: 'Weak', missing: 4, broken: 2 },
  { id: 'perplexity', name: 'Perplexity', x: 14, y: 35, confidence: 69, quality: 'Partial', missing: 2, broken: 1 },
];

export const SAMPLE_DRIFT: DriftEvent[] = [
  { date: 'January', hash: 'a1f4e8', title: 'Claim created', detail: '“Clinically proven” added with linked study.', status: 'supported', kind: 'created' },
  { date: 'March', hash: 'c7b210', title: 'Website updated', detail: 'Page redesigned; citation footnote dropped.', status: 'weak', kind: 'updated' },
  { date: 'April', hash: 'd9a3f1', title: 'Evidence removed', detail: 'Linked study 404s; no source remains.', status: 'unsupported', kind: 'removed' },
  { date: 'Today', hash: 'live', title: 'High risk', detail: 'Unsupported claim still live and indexed by AI.', status: 'unsupported', kind: 'risk' },
];

export const SAMPLE_AUDIT: AuditData = {
  meta: {
    subject: 'Upper East Side Aesthetics',
    url: 'yourclinic.com/weight-loss',
    generated: '2026-06-28',
    illustrative: true,
  },
  claims: SAMPLE_CLAIMS,
  citations: SAMPLE_CITATIONS,
  drift: SAMPLE_DRIFT,
};
