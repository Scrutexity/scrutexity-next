'use client';

/**
 * ClaimHeatmap — GitHub-Security-style claim register.
 * Sortable, filterable, animated rows derived from the canonical ClaimRecord
 * model. Replaces icon cards in "What Gets Reviewed". Warm palette only.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpDown, ShieldCheck, AlertTriangle, FileWarning } from 'lucide-react';
import { ArtifactHeading, Reveal, STATUS_META, MONO_STACK, EASE } from './_shared';
import {
  SAMPLE_CLAIMS,
  RISK_ORDER,
  RISK_LABEL,
  riskToStatus,
  actionForStatus,
  evidenceState,
  type ClaimRecord,
  type Risk,
} from '@/lib/claim-intelligence';

const RISK_ICON = { high: FileWarning, medium: AlertTriangle, low: ShieldCheck } as const;

type SortKey = 'claim' | 'risk' | 'evidence';
type FilterKey = 'all' | Risk;

export interface ClaimHeatmapProps {
  claims?: ClaimRecord[];
}

export default function ClaimHeatmap({ claims = SAMPLE_CLAIMS }: ClaimHeatmapProps) {
  const reduce = useReducedMotion();
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'risk', dir: 1 });
  const [filter, setFilter] = useState<FilterKey>('all');

  const rows = useMemo(() => {
    let r = filter === 'all' ? claims : claims.filter((row) => row.risk === filter);
    r = [...r].sort((a, b) => {
      let cmp = 0;
      if (sort.key === 'risk') cmp = RISK_ORDER[a.risk] - RISK_ORDER[b.risk];
      else if (sort.key === 'claim') cmp = a.text.localeCompare(b.text);
      else cmp = evidenceState(a).localeCompare(evidenceState(b));
      return cmp * sort.dir;
    });
    return r;
  }, [claims, sort, filter]);

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: 1 }));

  const counts = {
    all: claims.length,
    high: claims.filter((r) => r.risk === 'high').length,
    medium: claims.filter((r) => r.risk === 'medium').length,
    low: claims.filter((r) => r.risk === 'low').length,
  };

  return (
    <section className="relative border-t border-sand-deep/15 bg-beige/40 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <ArtifactHeading
            kicker="What Gets Reviewed"
            title="A risk register for"
            italic="every claim you publish."
            body="Each public claim is scored by risk and evidence — sortable, filterable, and ready to assign. This is what your team sees before a page goes live."
          />
        </Reveal>

        {/* filter chips */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap gap-2">
            {(['all', 'high', 'medium', 'low'] as FilterKey[]).map((f) => {
              const activeChip = filter === f;
              const label = f === 'all' ? 'All claims' : RISK_LABEL[f];
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    activeChip
                      ? 'border-espresso bg-espresso text-cream'
                      : 'border-sand-deep/40 bg-cream text-mist hover:border-sage-deep/40 hover:text-espresso'
                  }`}
                  style={{ fontFamily: MONO_STACK }}
                >
                  {label}
                  <span className={activeChip ? 'text-cream/60' : 'text-mist/50'}>{counts[f]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* table */}
        <Reveal delay={0.08}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-sand-deep/35 bg-cream shadow-[0_24px_70px_-55px_rgba(28,24,20,0.5)]">
            {/* header */}
            <div
              className="grid grid-cols-[1.6fr_0.9fr_0.9fr_1fr] items-center gap-2 border-b border-sand-deep/30 bg-beige/60 px-4 py-3 text-[10px] uppercase tracking-[0.13em] text-mist sm:px-6"
              style={{ fontFamily: MONO_STACK }}
            >
              <SortHead label="Claim" active={sort.key === 'claim'} onClick={() => toggleSort('claim')} />
              <SortHead label="Risk" active={sort.key === 'risk'} onClick={() => toggleSort('risk')} />
              <SortHead label="Evidence" active={sort.key === 'evidence'} onClick={() => toggleSort('evidence')} />
              <span className="text-right">Action</span>
            </div>

            <AnimatePresence initial={false}>
              {rows.map((row, i) => {
                const status = riskToStatus(row.risk);
                const meta = STATUS_META[status];
                const RiskIcon = RISK_ICON[row.risk];
                return (
                  <motion.div
                    key={row.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : i * 0.03 }}
                    className="grid grid-cols-[1.6fr_0.9fr_0.9fr_1fr] items-center gap-2 border-b border-sand-deep/15 px-4 py-3.5 text-sm last:border-0 hover:bg-beige/40 sm:px-6"
                  >
                    <span className="truncate font-medium text-espresso">{row.text}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${meta.text}`}>
                      <RiskIcon size={13} />
                      {RISK_LABEL[row.risk]}
                    </span>
                    <span className="text-xs text-mist">{evidenceState(row)}</span>
                    <span className="text-right">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-semibold ${meta.border} ${meta.bg} ${meta.text}`}
                      >
                        {actionForStatus(status)}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SortHead({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 transition-colors hover:text-espresso ${
        active ? 'text-espresso' : ''
      }`}
    >
      {label}
      <ArrowUpDown size={11} className={active ? 'text-sage-deep' : 'opacity-40'} />
    </button>
  );
}
