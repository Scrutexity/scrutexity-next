'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
 * DriftToUniformitySimulator — Interactive Portfolio Sync Widget
 *
 * A clean card split into three rows simulating a customer file spread
 * across a 3-location acquisition portfolio. Each row has visibly
 * mismatched data (names, phone formats, fields) due to different EMR
 * structures. Clicking [Run Portfolio Sync] triggers a fluid transition
 * where mismatched fields smoothly slide, re-format, and glide into
 * perfect uniformity across all three rows.
 *
 * Design constraints:
 * - No floating bubbles, particle webs, or chaotic shapes
 * - All motion linear, geometric — sorting/locking/unifying data
 * - Terracotta (#b9825f) primary CTA
 * - Sage (#7f8f78) for completion states
 * ────────────────────────────────────────────────────────────────────────── */

type FieldKey = 'name' | 'phone' | 'lastVisit' | 'treatment' | 'dob';

interface RowData {
  location: string;
  fields: Record<FieldKey, string>;
}

const INITIAL_DATA: RowData[] = [
  {
    location: 'NYC — Midtown (Boulevard)',
    fields: {
      name: 'Smith, Jessica A.',
      phone: '(212) 555-0147',
      lastVisit: '2024-11-03',
      treatment: 'Morpheus8 — 3 passes',
      dob: '04/15/1991',
    },
  },
  {
    location: 'LA — Beverly Hills (Mangomint)',
    fields: {
      name: 'Jess Smith',
      phone: '1-212-555-0147',
      lastVisit: 'Nov 3rd, 2024',
      treatment: 'Morpheus8 consult -> 3',
      dob: '1991-04-15',
    },
  },
  {
    location: 'CHI — Gold Coast (Zenoti)',
    fields: {
      name: 'SMITH, JESSICA',
      phone: '2125550147',
      lastVisit: '11/03/24',
      treatment: 'RF Microneedling',
      dob: 'Apr 15, 1991',
    },
  },
];

const UNIFIED_DATA: RowData[] = [
  {
    location: 'NYC — Midtown (Boulevard)',
    fields: {
      name: 'Jessica A. Smith',
      phone: '(212) 555-0147',
      lastVisit: '2024-11-03',
      treatment: 'Morpheus8 — 3 passes',
      dob: '1991-04-15',
    },
  },
  {
    location: 'LA — Beverly Hills (Mangomint)',
    fields: {
      name: 'Jessica A. Smith',
      phone: '(212) 555-0147',
      lastVisit: '2024-11-03',
      treatment: 'Morpheus8 — 3 passes',
      dob: '1991-04-15',
    },
  },
  {
    location: 'CHI — Gold Coast (Zenoti)',
    fields: {
      name: 'Jessica A. Smith',
      phone: '(212) 555-0147',
      lastVisit: '2024-11-03',
      treatment: 'Morpheus8 — 3 passes',
      dob: '1991-04-15',
    },
  },
];

const FIELD_LABELS: Record<FieldKey, string> = {
  name: 'Patient Name',
  phone: 'Phone',
  lastVisit: 'Last Visit',
  treatment: 'Treatment',
  dob: 'Date of Birth',
};

/* Column widths sized to fit inside max-w-3xl card (~704px inner width)
 * Total: 130 (location) + 140 + 110 + 100 + 140 + 100 = 720px content
 * + 5 gaps of 8px (gap-2) = 760px — fits with horizontal scroll on narrowest viewports.
 */
const FIELD_WIDTHS: Record<FieldKey, string> = {
  name: 'w-[140px]',
  phone: 'w-[110px]',
  lastVisit: 'w-[100px]',
  treatment: 'w-[140px]',
  dob: 'w-[100px]',
};

/** Return true if the row field mismatches the unified value */
function isMismatched(rowIdx: number, key: FieldKey): boolean {
  return INITIAL_DATA[rowIdx].fields[key] !== UNIFIED_DATA[rowIdx].fields[key];
}

const luxuryEase = [0.16, 1, 0.3, 1] as const;

export default function DriftToUniformitySimulator() {
  const [synced, setSynced] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showCheckmarks, setShowCheckmarks] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const animLockRef = useRef(false);

  const handleSync = () => {
    if (animLockRef.current || animating || synced) {
      if (synced) {
        setSynced(false);
        setShowCheckmarks({});
        animLockRef.current = false;
      }
      return;
    }
    animLockRef.current = true;
    setAnimating(true);

    // Stagger field animations per row
    const fieldKeys: FieldKey[] = ['name', 'phone', 'lastVisit', 'treatment', 'dob'];
    let delay = 0;

    fieldKeys.forEach((key) => {
      // Check which rows mismatch this field
      for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        if (isMismatched(rowIdx, key)) {
          const checkId = `${rowIdx}-${key}`;
          setTimeout(() => {
            setShowCheckmarks((prev) => ({ ...prev, [checkId]: true }));
          }, 400 + delay);
        }
      }
      delay += 120;
    });

    // Complete the sync
    setTimeout(() => {
      setSynced(true);
      setAnimating(false);
      animLockRef.current = false;
    }, 400 + delay + 300);
  };

  const handleReset = () => {
    setSynced(false);
    setShowCheckmarks({});
    setAnimating(false);
    animLockRef.current = false;
  };

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto">
      <div className="rounded-[1.75rem] border border-sand-deep bg-cream p-6 md:p-8 shadow-[0_22px_70px_rgba(85,62,41,0.08)]">
        {/* Header */}
        <div className="mb-6 border-b border-sand-deep pb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-clay-deep mb-3">
            Portfolio Data Reconciliation
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-espresso tracking-tight">
            Three locations. One patient profile. Three formats.
          </h3>
          <p className="text-[14px] text-mist mt-2 max-w-2xl leading-7">
            Each EMR structures the same intake data differently. Scrutexity normalizes everything into a single, auditable record.
          </p>
        </div>

        {/* Scroll wrapper — keeps content inside the card on narrow viewports */}
        <div className="overflow-x-auto -mx-2 px-2">
          <div className="min-w-[760px]">
            {/* Column headers */}
            <div className="flex items-end gap-2 mb-1 pl-[138px]">
              {(Object.keys(FIELD_LABELS) as FieldKey[]).map((key) => (
                <div
                  key={key}
                  className={`text-[9px] font-bold uppercase tracking-[0.16em] text-[#9a8775] pb-1 ${FIELD_WIDTHS[key]}`}
                >
                  {FIELD_LABELS[key]}
                  {synced && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: luxuryEase }}
                      className="inline-block ml-1 text-[#7f8f78]"
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="space-y-2">
              {INITIAL_DATA.map((row, rowIdx) => (
                <RowDisplay
                  key={rowIdx}
                  row={row}
                  rowIdx={rowIdx}
                  synced={synced}
                  animating={animating}
                  showCheckmarks={showCheckmarks}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <motion.button
            onClick={handleSync}
            disabled={animating}
            whileHover={!animating ? { scale: 1.02 } : {}}
            whileTap={!animating ? { scale: 0.98 } : {}}
            className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 ${
              synced
                ? 'bg-[#7f8f78] cursor-pointer'
                : animating
                  ? 'bg-[#c4b4a0] cursor-not-allowed'
                  : 'bg-clay hover:bg-[#a36b5d] shadow-[0_10px_24px_-8px_rgba(185,130,95,0.40)]'
            }`}
          >
            {synced ? (
              <>
                <RefreshCw size={16} />
                Reset
              </>
            ) : animating ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="inline-block"
                >
                  <RefreshCw size={16} />
                </motion.span>
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                Run Portfolio Sync
              </>
            )}
          </motion.button>

          {synced && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: luxuryEase }}
              className="flex items-center gap-1.5 text-[#7f8f78]"
            >
              <Check size={14} className="stroke-[3]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                All records unified
              </span>
            </motion.div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-[10px] text-[#9e8e7e] max-w-lg mx-auto leading-5">
          Simulated patient data. Real Scrutexity integrations normalize actual EMR field structures using column mapping and format detection.
        </p>
      </div>
    </div>
  );
}

function RowDisplay({
  row,
  rowIdx,
  synced,
  animating,
  showCheckmarks,
}: {
  row: RowData;
  rowIdx: number;
  synced: boolean;
  animating: boolean;
  showCheckmarks: Record<string, boolean>;
}) {
  const unified = UNIFIED_DATA[rowIdx];

  return (
    <motion.div
      layout
      className={`flex items-start gap-2 rounded-xl p-3 transition-colors duration-500 ${
        synced
          ? 'bg-[#eef3ea]/40 border border-[#7f8f78]/15'
          : 'bg-white/60 border border-sand-deep/40'
      }`}
    >
      {/* Location label */}
      <div className="w-[130px] flex-none pt-0.5">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#9a8775]">
          {row.location.split('(')[0].trim()}
        </p>
        <p className="font-mono text-[8px] text-clay">
          {row.location.match(/\(([^)]+)\)/)?.[1] || ''}
        </p>
      </div>

      {/* Fields */}
      {(Object.keys(row.fields) as FieldKey[]).map((key) => {
        const isDifferent = !synced && isMismatched(rowIdx, key);
        const unifiedVal = unified.fields[key];
        const checkId = `${rowIdx}-${key}`;
        const showCheck = showCheckmarks[checkId] || synced;

        return (
          <div
            key={key}
            className={`relative ${FIELD_WIDTHS[key]} flex-none`}
          >
            <AnimatePresence mode="wait">
              {synced || showCheck ? (
                <motion.div
                  key={`unified-${rowIdx}-${key}`}
                  initial={
                    showCheck || synced
                      ? { opacity: 0, y: 6, scale: 0.94 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: luxuryEase }}
                  className="flex items-center gap-1.5"
                >
                  <span className="text-[12px] font-medium text-espresso">
                    {unifiedVal}
                  </span>
                  {showCheck && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 16,
                      }}
                    >
                      <Check size={12} className="text-[#7f8f78] stroke-[3] flex-none" />
                    </motion.span>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={`original-${rowIdx}-${key}`}
                  exit={{ opacity: 0, y: -6, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: luxuryEase }}
                >
                  <span
                    className={`text-[12px] font-medium ${
                      isDifferent ? 'text-clay' : 'text-mist'
                    }`}
                  >
                    {row.fields[key]}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mismatch indicator dot */}
            {isDifferent && !showCheck && (
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -left-2 top-1.5 w-1.5 h-1.5 rounded-full bg-[#b9825f]"
              />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
