'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { Anchor, Container, Eyebrow } from '@/components/ui-custom/section';
import NarrativeLedger, { type LedgerRow } from '@/components/scrutexity/narrative-ledger';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Six demo rows that "stream in" as the user scrolls through the pinned section.
const STREAM_ROWS: LedgerRow[] = [
  { id: 's1', source: 'IG DM', amount: 2450, time: '11:42 PM → 09:15 AM', verified: true },
  { id: 's2', source: 'Web form', amount: 1800, time: '04:08 PM → 08:50 AM', verified: true },
  { id: 's3', source: 'Missed call', amount: 3200, time: '02:14 PM → 10:02 AM', verified: true },
  { id: 's4', source: 'Voicemail', amount: 1950, time: '09:30 AM → 11:18 AM', verified: true },
  { id: 's5', source: 'IG DM', amount: 2800, time: '08:14 PM → 07:32 AM', verified: true },
  { id: 's6', source: 'Web form', amount: 1600, time: '06:42 PM → 08:14 AM', verified: true },
];

export default function LedgerMoment() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Map scroll progress through this section to row count.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // For reduced-motion users, show all rows immediately.
  const rowCount = useTransform(scrollYProgress, [0.1, 0.85], [reduced ? 6 : 0, 6]);
  const ledgerScale = useTransform(scrollYProgress, [0, 0.1, 0.85, 0.95, 1], [0.96, 1, 1, 0.96, 0.9]);
  const ledgerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.4, 1, 1, 0.5]);
  const ledgerRotateX = useTransform(scrollYProgress, [0.85, 1], [0, -25]); // close animation
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <Anchor
      id="ledger"
      tone="cream-deep"
      py="loose"
      ref={sectionRef}
      className="relative"
    >
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center min-h-[70vh]">
          {/* LEFT — narrative copy */}
          <motion.div style={{ y: reduced ? 0 : headlineY }}>
            <Eyebrow tone="gold">
              <span className="h-1 w-1 rounded-full bg-gold" />
              02 · The ledger moment
            </Eyebrow>

            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ink"
            >
              Every recovery shows up as a real deposit in your PMS —{' '}
              <span className="text-sage-deep italic">receipt-grade, never an estimate.</span>
            </motion.h2>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
              className="mt-7 font-sans text-base md:text-lg leading-[1.6] text-mist max-w-lg"
            >
              Other platforms report leads. We report deposits. A booking is only counted as
              recovered once the deposit is recorded in your PMS and the appointment is synced. The
              ledger you see here is what your finance team will reconcile against — line by line,
              row by row.
            </motion.p>

            {/* Inline trust — distributed, not siloed at the bottom */}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {[
                'PMS-verified · not self-reported',
                'Receipt-grade audit trail',
                'SHA-256 record for M&A diligence',
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sage-deep/85"
                >
                  <span className="h-1 w-1 rounded-full bg-sage" aria-hidden />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — the streaming ledger */}
          <motion.div
            style={{
              scale: reduced ? 1 : ledgerScale,
              opacity: reduced ? 1 : ledgerOpacity,
              rotateX: reduced ? 0 : ledgerRotateX,
              transformPerspective: 1000,
            }}
            className="relative"
          >
            <StreamingLedger rowCountMV={rowCount} />
          </motion.div>
        </div>
      </Container>
    </Anchor>
  );
}

/**
 * StreamingLedger — renders rows progressively based on a MotionValue.
 * Uses useMotionValueEvent to subscribe to scroll progress and update
 * the visible row count without re-rendering on every frame.
 */
function StreamingLedger({ rowCountMV }: { rowCountMV: ReturnType<typeof useTransform<number, number>> }) {
  const [count, setCount] = useState(0);

  useMotionValueEvent(rowCountMV, 'change', (v) => {
    setCount(Math.round(v));
  });

  const visibleRows = STREAM_ROWS.slice(0, count);
  const visibleTotal = visibleRows.reduce((sum, r) => sum + r.amount, 0);

  return (
    <NarrativeLedger
      variant="stream"
      rows={visibleRows}
      total={visibleTotal}
      title="Recovered deposits — last 24h"
      subtitle="Inquiries in. Booked deposits out."
      trustBadge="PMS-verified · receipt-grade"
    />
  );
}
