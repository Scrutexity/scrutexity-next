'use client';

/**
 * EvidenceCoverage — claim × source-type coverage matrix.
 * Derived from the canonical claims via buildCoverageMatrix, so the matrix is
 * always consistent with the claim records. Warm palette; status encoded with
 * color + label.
 */

import { useReducedMotion, motion } from 'framer-motion';
import { ArtifactHeading, Reveal, STATUS_META, MONO_STACK, EASE } from './_shared';
import {
  SAMPLE_CLAIMS,
  EVIDENCE_SOURCES,
  buildCoverageMatrix,
  type ClaimRecord,
  type Status,
} from '@/lib/claim-intelligence';

export interface EvidenceCoverageProps {
  claims?: ClaimRecord[];
}

export default function EvidenceCoverage({ claims = SAMPLE_CLAIMS }: EvidenceCoverageProps) {
  const reduce = useReducedMotion();
  const rows = buildCoverageMatrix(claims);

  return (
    <section className="relative border-t border-sand-deep/15 bg-cream px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <ArtifactHeading
            kicker="Sample Report · Evidence Coverage"
            title="Where each claim's proof"
            italic="actually lives."
            body="A coverage matrix maps every claim against the source types that could support it — so gaps are obvious before anyone asks for proof."
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 overflow-x-auto">
            <div className="min-w-[640px] overflow-hidden rounded-2xl border border-sand-deep/35 bg-beige/40 shadow-[0_24px_70px_-55px_rgba(28,24,20,0.5)]">
              {/* header */}
              <div
                className="grid grid-cols-[1.5fr_repeat(5,1fr)] gap-2 border-b border-sand-deep/30 bg-beige/70 px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-mist"
                style={{ fontFamily: MONO_STACK }}
              >
                <span>Claim</span>
                {EVIDENCE_SOURCES.map((c) => (
                  <span key={c} className="text-center">
                    {c}
                  </span>
                ))}
              </div>

              {rows.map((row, r) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1.5fr_repeat(5,1fr)] items-center gap-2 border-b border-sand-deep/15 px-4 py-2.5 last:border-0"
                >
                  <span className="truncate text-sm font-medium text-espresso">{row.claim}</span>
                  {row.cells.map((cell, c) => {
                    const meta = STATUS_META[cell.status];
                    return (
                      <div key={c} className="flex justify-center">
                        <motion.span
                          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, ease: EASE, delay: (r * 5 + c) * 0.015 }}
                          className={`flex h-7 w-7 items-center justify-center rounded-md border ${meta.border} ${meta.bg}`}
                          title={meta.label}
                          aria-label={`${row.claim} — ${cell.source}: ${meta.label}`}
                        >
                          <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                        </motion.span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* legend */}
        <Reveal delay={0.1}>
          <div className="mt-5 flex flex-wrap gap-5">
            {(['supported', 'weak', 'unsupported'] as Status[]).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${STATUS_META[s].dot}`} />
                <span className="text-xs text-mist">
                  {s === 'supported' ? 'Covered' : s === 'weak' ? 'Weak' : 'Missing'}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
