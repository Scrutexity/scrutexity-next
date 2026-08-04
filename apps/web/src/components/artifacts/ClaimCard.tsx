'use client';

/**
 * ClaimCard — the reusable "claim object" view (think Stripe payment object).
 * Renders a canonical ClaimRecord so every report shows claims identically.
 * Includes a deterministic decorative QR for verification. Warm palette.
 */

import { ShieldCheck, AlertTriangle, FileWarning, ExternalLink, User, Clock } from 'lucide-react';
import { STATUS_META, MONO_STACK } from './_shared';
import {
  SAMPLE_CLAIMS,
  RISK_LABEL,
  riskToStatus,
  evidenceState,
  type ClaimRecord,
  type Risk,
} from '@/lib/claim-intelligence';

const RISK_ICON = { high: FileWarning, medium: AlertTriangle, low: ShieldCheck } as const;
const RISK_TEXT: Record<Risk, string> = { high: 'High risk', medium: 'Medium risk', low: 'Low risk' };

/** Tiny deterministic QR-like glyph from the id (decorative, not scannable). */
function QrGlyph({ seed }: { seed: string }) {
  const n = 7;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < n * n; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    cells.push((h >> 16) % 2 === 0);
  }
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="h-11 w-11" aria-hidden shapeRendering="crispEdges">
      <rect width={n} height={n} fill="transparent" />
      {cells.map((on, i) =>
        on ? (
          <rect key={i} x={i % n} y={Math.floor(i / n)} width={1} height={1} fill="#1C1814" />
        ) : null,
      )}
    </svg>
  );
}

export function ClaimCard({ record }: { record: ClaimRecord }) {
  const status = riskToStatus(record.risk);
  const meta = STATUS_META[status];
  const RiskIcon = RISK_ICON[record.risk];
  const evidence = record.evidenceNote ?? `${evidenceState(record)} evidence`;

  return (
    <div className="overflow-hidden rounded-2xl border border-sand-deep/35 bg-cream shadow-[0_18px_50px_-40px_rgba(28,24,20,0.5)]">
      {/* header strip */}
      <div className="flex items-center justify-between border-b border-sand-deep/25 bg-beige/50 px-5 py-3">
        <span className="text-[10px] uppercase tracking-[0.14em] text-mist" style={{ fontFamily: MONO_STACK }}>
          claim · {record.id}
        </span>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${meta.text}`}>
          <RiskIcon size={13} />
          {RISK_TEXT[record.risk]}
        </span>
      </div>

      <div className="flex gap-4 p-5">
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-snug text-espresso">“{record.text}”</p>

          <div className="mt-4 space-y-2.5 text-sm">
            <Field label="Evidence" value={evidence} />
            {record.owner && <Field label="Owner" value={record.owner} icon={<User size={12} />} />}
            {record.updated && <Field label="Updated" value={record.updated} icon={<Clock size={12} />} />}
            <Field label="Risk" value={RISK_LABEL[record.risk]} />
          </div>

          {record.proofHref && (
            <a
              href={record.proofHref}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-sage-deep transition-colors hover:text-espresso"
              style={{ fontFamily: MONO_STACK }}
            >
              View proof
              <ExternalLink size={11} />
            </a>
          )}
        </div>

        {/* QR verification */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <div className="rounded-lg border border-sand-deep/30 bg-beige/40 p-1.5">
            <QrGlyph seed={record.id} />
          </div>
          <span className="text-[8px] uppercase tracking-[0.12em] text-mist/60" style={{ fontFamily: MONO_STACK }}>
            verify
          </span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-sand-deep/25 pb-2 last:border-0">
      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-mist/70" style={{ fontFamily: MONO_STACK }}>
        {icon}
        {label}
      </span>
      <span className="text-right text-xs text-bark">{value}</span>
    </div>
  );
}

export interface ClaimCardShowcaseProps {
  records?: ClaimRecord[];
}

/** Showcase grid for the platform page — a representative spread of risks. */
export default function ClaimCardShowcase({ records }: ClaimCardShowcaseProps) {
  const cards =
    records ??
    (['CLM-2041', 'CLM-2045', 'CLM-2042']
      .map((id) => SAMPLE_CLAIMS.find((c) => c.id === id))
      .filter(Boolean) as ClaimRecord[]);
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((r) => (
        <ClaimCard key={r.id} record={r} />
      ))}
    </div>
  );
}
