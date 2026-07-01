'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarSearch, Sparkles } from 'lucide-react';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/**
 * RevenueXRaySection — "A diagnostic look at what's leaking."
 *
 * Visualizes the 24-hour audit: a week-view calendar grid starts in a faded
 * "messy" state (missed/stalled slots in clay). A champagne X-Ray beam sweeps
 * left → right across the grid; everything it passes flips to a clean
 * "recovered" state with patient initials.
 *
 * Illustrative — labels say so plainly.
 */

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const SLOTS = ['10 AM', '12 PM', '2 PM', '4 PM'];

interface SlotState {
  beforeKind: 'missed' | 'stalled' | 'booked' | 'empty';
  afterKind: 'recovered' | 'booked' | 'empty';
  initials?: string;
  reason?: string;
}

// 5 days × 4 slots = 20 cells. Pre-defined story.
const SCHEDULE: SlotState[][] = [
  // Mon, Tue, Wed, Thu, Fri  (one column per day)
  [
    { beforeKind: 'booked', afterKind: 'booked', initials: 'A.M.' },
    { beforeKind: 'missed', afterKind: 'recovered', initials: 'J.S.', reason: 'After-hours DM' },
    { beforeKind: 'empty', afterKind: 'empty' },
    { beforeKind: 'stalled', afterKind: 'recovered', initials: 'R.O.', reason: 'Slow response · 4h' },
  ],
  [
    { beforeKind: 'missed', afterKind: 'recovered', initials: 'P.K.', reason: 'After-hours call' },
    { beforeKind: 'empty', afterKind: 'empty' },
    { beforeKind: 'booked', afterKind: 'booked', initials: 'D.R.' },
    { beforeKind: 'stalled', afterKind: 'recovered', initials: 'L.H.', reason: 'Dormant lead · 62 days' },
  ],
  [
    { beforeKind: 'empty', afterKind: 'empty' },
    { beforeKind: 'missed', afterKind: 'recovered', initials: 'E.G.', reason: 'Web form, unworked' },
    { beforeKind: 'stalled', afterKind: 'recovered', initials: 'C.W.', reason: 'Slow response · 6h' },
    { beforeKind: 'empty', afterKind: 'empty' },
  ],
  [
    { beforeKind: 'booked', afterKind: 'booked', initials: 'T.N.' },
    { beforeKind: 'empty', afterKind: 'empty' },
    { beforeKind: 'missed', afterKind: 'recovered', initials: 'V.P.', reason: 'After-hours DM' },
    { beforeKind: 'empty', afterKind: 'empty' },
  ],
  [
    { beforeKind: 'stalled', afterKind: 'recovered', initials: 'B.A.', reason: 'No-show, no follow-up' },
    { beforeKind: 'missed', afterKind: 'recovered', initials: 'M.C.', reason: 'Missed callback' },
    { beforeKind: 'empty', afterKind: 'empty' },
    { beforeKind: 'booked', afterKind: 'booked', initials: 'S.D.' },
  ],
];

const BEFORE_STYLES = {
  missed: { bg: '#FBF2EC', border: 'rgba(184,125,107,0.30)', text: '#8a533b', label: 'Missed' },
  stalled: { bg: '#F8F3EA', border: 'rgba(184,125,107,0.22)', text: '#9a8775', label: 'Stalled' },
  booked: { bg: '#FAF9F6', border: 'rgba(28,24,20,0.10)', text: '#3D2B1F', label: 'Booked' },
  empty: { bg: 'transparent', border: 'rgba(28,24,20,0.08)', text: '#9a8775', label: '' },
} as const;

const AFTER_STYLES = {
  recovered: { bg: '#FBF7EC', border: 'rgba(212,175,55,0.50)', text: '#3D2B1F', label: 'Recovered' },
  booked: { bg: '#FAF9F6', border: 'rgba(28,24,20,0.10)', text: '#3D2B1F', label: 'Booked' },
  empty: { bg: 'transparent', border: 'rgba(28,24,20,0.08)', text: '#9a8775', label: '' },
} as const;

export default function RevenueXRaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section className="relative overflow-hidden content-auto bg-cream px-5 py-24 sm:px-8 lg:py-28">
      {/* Warm wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.10),transparent_55%)]" />

      <div ref={ref} className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-mist">
            <CalendarSearch size={13} strokeWidth={1.8} className="text-[#D4AF37]" />
            The Scrutexity protocol · 30-day scan
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-espresso md:text-4xl lg:text-5xl">
            The hidden leak in your front desk.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#6b6157]">
            Faded inquiries &mdash; unanswered texts, 3:00 AM missed calls, stalled consults &mdash; resolve into confirmed deposits, recorded in Boulevard, synced to your staff&rsquo;s schedule.
          </p>
        </motion.div>

        {/* The X-Ray canvas: calendar grid + scan beam */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: cinematicEase }}
          className="relative overflow-hidden rounded-3xl border border-sand bg-cream paper-texture shadow-[0_30px_70px_-30px_rgba(61,43,31,0.18),inset_0_1px_1px_rgba(255,255,255,0.7)]"
        >
          {/* Header strip */}
          <div className="flex items-center justify-between border-b border-sand bg-cream px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
                Sample week · Boulevard
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Audit progress</span>
              <div className="relative h-1 w-32 overflow-hidden rounded-full bg-[#EDE6DB]">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundColor: '#D4AF37' }}
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 2.4, delay: 0.5, ease: cinematicEase }}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]">100%</span>
            </div>
          </div>

          {/* Grid + scan beam container */}
          <div className="relative p-4 sm:p-6">
            {/* Champagne X-Ray scan beam */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-2 z-20 w-[3px] rounded-full sm:inset-y-4"
              style={{
                background: 'linear-gradient(180deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.95) 18%, rgba(212,175,55,0.95) 82%, rgba(212,175,55,0) 100%)',
                boxShadow: '0 0 22px rgba(212,175,55,0.55), 0 0 8px rgba(212,175,55,0.85)',
                left: 0,
              }}
              initial={{ x: '-2%' }}
              animate={isInView ? { x: ['-2%', '102%'] } : {}}
              transition={{ duration: 2.4, delay: 0.55, ease: cinematicEase }}
            />
            {/* Soft beam wash trailing behind */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-2 z-10 w-32 sm:inset-y-4"
              style={{
                background: 'linear-gradient(90deg, rgba(212,175,55,0.18), rgba(212,175,55,0))',
                left: 0,
              }}
              initial={{ x: '-30%' }}
              animate={isInView ? { x: ['-30%', '102%'] } : {}}
              transition={{ duration: 2.4, delay: 0.5, ease: cinematicEase }}
            />

            {/* Day-of-week row */}
            <div className="grid grid-cols-5 gap-1.5 pb-3 sm:gap-3">
              {DAYS.map((day, i) => (
                <motion.p
                  key={day}
                  initial={{ opacity: 0, y: -8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: cinematicEase }}
                  className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a8775]"
                >
                  {day}
                </motion.p>
              ))}
            </div>

            {/* Slot grid */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
              {SCHEDULE.map((dayColumn, dayIdx) => (
                <div key={dayIdx} className="flex flex-col gap-1.5 sm:gap-3">
                  {dayColumn.map((slot, slotIdx) => (
                    <SlotCell
                      key={`${dayIdx}-${slotIdx}`}
                      slot={slot}
                      time={SLOTS[slotIdx]}
                      dayIdx={dayIdx}
                      isInView={isInView}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom totals strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 3.0, ease: cinematicEase }}
            className="flex flex-col items-start justify-between gap-3 border-t border-sand bg-cream px-6 py-4 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono uppercase tracking-[0.18em] text-mist">Sample week:</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#FBF7EC] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a6a17]">
                <Sparkles size={11} className="text-[#D4AF37]" /> 8 slots recovered
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">vs 4 baseline</span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a8775]">
              Illustrative · real audits replace this with your data
            </p>
          </motion.div>
        </motion.div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 3.2, ease: cinematicEase }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <a
            href="/revenue-leak-audit"
            className="signature-draw-btn inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-7 py-3.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#F8F7F3] shadow-[0_18px_40px_-18px_rgba(28,24,20,0.55),inset_0_1px_1px_rgba(255,255,255,0.10)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Run my free Revenue X-Ray
            <span aria-hidden="true">→</span>
          </a>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
            Read-only · 24-hour turnaround · keep the report
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SlotCell({
  slot,
  time,
  dayIdx,
  isInView,
}: {
  slot: SlotState;
  time: string;
  dayIdx: number;
  isInView: boolean;
}) {
  // Each cell flips state shortly after the scan beam (≈2.4s sweep) passes its column.
  // Distribute the flip across the 5 columns: dayIdx 0..4 flips at ~0.55 + 0.40*dayIdx seconds.
  const flipDelay = 0.55 + dayIdx * 0.4;
  const before = BEFORE_STYLES[slot.beforeKind];
  const after = AFTER_STYLES[slot.afterKind];

  // Empty slots: just static, no transition needed.
  if (slot.beforeKind === 'empty' && slot.afterKind === 'empty') {
    return (
      <div
        className="rounded-lg border border-dashed px-2 py-2 sm:px-3 sm:py-2.5"
        style={{ borderColor: before.border, backgroundColor: before.bg, minHeight: 48 }}
      >
        <p className="font-mono text-[9px] uppercase tracking-wider text-[#9a8775]/60">{time}</p>
      </div>
    );
  }

  // Cells with a transition: cross-fade between before and after layers.
  return (
    <div className="relative" style={{ minHeight: 56 }}>
      {/* BEFORE layer */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: [1, 1, 0] } : {}}
        transition={{ duration: 0.6, delay: flipDelay, ease: cinematicEase, times: [0, 0.4, 1] }}
        className="absolute inset-0 rounded-lg border px-2 py-1.5 sm:px-3 sm:py-2"
        style={{ backgroundColor: before.bg, borderColor: before.border }}
      >
        <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: '#9a8775' }}>
          {time}
        </p>
        {slot.beforeKind !== 'empty' && (
          <p className="mt-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider" style={{ color: before.text }}>
            {before.label}
          </p>
        )}
      </motion.div>

      {/* AFTER layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 0, 1] } : {}}
        transition={{ duration: 0.6, delay: flipDelay, ease: cinematicEase, times: [0, 0.4, 1] }}
        className="absolute inset-0 rounded-lg border px-2 py-1.5 sm:px-3 sm:py-2"
        style={{
          backgroundColor: after.bg,
          borderColor: after.border,
          boxShadow:
            slot.afterKind === 'recovered'
              ? 'inset 0 1px 1px rgba(255,255,255,0.7), 0 6px 16px -8px rgba(212,175,55,0.30)'
              : 'inset 0 1px 1px rgba(255,255,255,0.7)',
        }}
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: '#9a8775' }}>
            {time}
          </p>
          {slot.afterKind === 'recovered' && (
            <Sparkles size={10} className="text-[#D4AF37]" />
          )}
        </div>
        {slot.initials && (
          <p className="mt-0.5 truncate font-display text-[14px] leading-tight tracking-tight" style={{ color: after.text }}>
            {slot.initials}
          </p>
        )}
        {slot.afterKind === 'recovered' && slot.reason && (
          <p className="mt-0.5 truncate font-mono text-[8.5px] uppercase tracking-wider text-[#8a6a17]/80">
            {slot.reason}
          </p>
        )}
      </motion.div>
    </div>
  );
}
