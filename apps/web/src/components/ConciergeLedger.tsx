'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/**
 * ConciergeLedger — single-inquiry walkthrough.
 *
 * Visualizes one missed inquiry being processed by Scrutexity, from raw paper-note
 * arrival → formal stationery reply → champagne "Deposit confirmed" badge.
 *
 * Illustrative — quote text and dollar value labeled as sample. The narrative
 * is meant to make abstract "demand recovery" feel tactile and concrete.
 */

const conversationBeats = [
  { t: 'Fri 7:42 PM', label: 'Inquiry received' },
  { t: 'Fri 7:43 PM', label: 'Clinical screen passed' },
  { t: 'Fri 7:45 PM', label: 'Replied in clinic voice' },
  { t: 'Fri 7:51 PM', label: 'Deposit confirmed' },
];

export default function ConciergeLedger() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section className="relative overflow-hidden bg-cream px-5 py-24 sm:px-8 lg:py-28">
      {/* Warm soft-box wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(212,175,55,0.08),transparent_50%),radial-gradient(ellipse_at_85%_85%,rgba(47,93,74,0.08),transparent_55%)]" />

      <div ref={ref} className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mist">
            How one inquiry becomes a booked deposit
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-espresso md:text-4xl lg:text-5xl">
            The concierge ledger, line by line.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#6b6157]">
            Watch a single after-hours message move from missed&nbsp;voicemail to deposit-paid booking &mdash; in your clinic&rsquo;s exact tone of voice.
          </p>
        </motion.div>

        {/* Three-step transformation: paper → stationery → confirmation */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] lg:gap-10">
          {/* LEFT — Raw inquiry as a paper note */}
          <motion.div
            initial={{ opacity: 0, x: -28, rotate: -3 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: -1.5 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: cinematicEase }}
            className="relative"
          >
            {/* Paper card — slight tilt, torn edge feel, heavy cream stock texture */}
            <div
              className="paper-texture relative rounded-[20px] border border-[#E4DCC8] bg-[#FBF7EC] p-7 shadow-[0_22px_50px_-22px_rgba(61,43,31,0.20),0_4px_12px_-4px_rgba(61,43,31,0.10),inset_0_1px_1px_rgba(255,255,255,0.7)] sm:p-8"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(180deg, transparent 0 26px, rgba(184,125,107,0.06) 26px 27px)',
              }}
            >
              {/* Top tag */}
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#B87D6B]/35 bg-[#B87D6B]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a533b]">
                  Missed · After-hours
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9a8775]">
                  Fri 7:42 PM
                </span>
              </div>

              {/* The inquiry */}
              <p className="mb-4 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#9a8775]">
                Inquiry #4821
              </p>
              <blockquote className="border-l-2 border-[#B87D6B]/40 pl-4 font-display text-xl leading-[1.45] text-espresso sm:text-[22px]">
                &ldquo;Hi, do you have any openings for Botox tomorrow afternoon? My sister referred me &mdash; she said you do amazing work.&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-[#E4DCC8] pt-4">
                <div className="h-7 w-7 shrink-0 rounded-full border border-[#E4DCC8] bg-[#F5EBD8]" />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-espresso">
                    Inbound &mdash; Instagram DM
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#9a8775]">
                    Read receipt at 7:42:14 PM
                  </p>
                </div>
              </div>
            </div>

            {/* "Would have been missed" caption */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.0, ease: cinematicEase }}
              className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#B87D6B]"
            >
              <span className="inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-[#B87D6B]" />{' '}
              Would have been lost overnight
            </motion.p>
          </motion.div>

          {/* MIDDLE — Arrow + scan line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: cinematicEase }}
            className="hidden flex-col items-center justify-center self-center md:flex"
          >
            <div className="relative h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent">
              <motion.div
                aria-hidden="true"
                className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-[#D4AF37]"
                animate={{ x: [0, 80, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: cinematicEase }}
                style={{ boxShadow: '0 0 12px rgba(212,175,55,0.55)' }}
              />
            </div>
            <ArrowRight size={20} strokeWidth={1.5} className="mt-3 text-[#9a8775]" />
            <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#9a8775]">
              Read, screened,<br />replied
            </p>
          </motion.div>

          {/* RIGHT — Formal stationery reply */}
          <motion.div
            initial={{ opacity: 0, x: 28, rotate: 3 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 1.5 } : {}}
            transition={{ duration: 0.9, delay: 0.8, ease: cinematicEase }}
            className="relative"
          >
            {/* Stationery card — fluted glass + champagne hairline */}
            <div className="shimmer-sweep relative overflow-hidden rounded-[20px] border border-[#D4AF37]/25 bg-cream/90 p-7 shadow-[0_30px_60px_-22px_rgba(61,43,31,0.22),inset_0_1px_1px_rgba(255,255,255,0.75)] backdrop-blur-xl sm:p-8">
              {/* Letterhead bar */}
              <div className="-mx-7 -mt-7 mb-6 border-b border-[#D4AF37]/25 bg-gradient-to-r from-transparent via-[#D4AF37]/8 to-transparent px-7 pb-3 pt-3 sm:-mx-8 sm:-mt-8 sm:px-8">
                <p className="text-center font-mono text-[9.5px] font-bold uppercase tracking-[0.28em] text-mist">
                  Replied in clinic voice
                </p>
              </div>

              {/* The reply — Instrument Serif italic, stationery feel */}
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#9a8775]">
                Reply &mdash; sent at 7:45 PM
              </p>
              <blockquote className="mt-3 border-l-2 border-[#D4AF37]/45 pl-4 font-display text-[19px] italic leading-[1.5] text-espresso sm:text-xl">
                &ldquo;Hi&nbsp;Alex &mdash; thank you for thinking of us. Dr.&nbsp;Quinn has a 2:15 PM tomorrow that I can hold for you with a $250 booking deposit. May I send the secure link?&rdquo;
              </blockquote>

              {/* Action chip */}
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#E4DCC8] pt-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#2F5D4A]/30 bg-sage/8 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-sage-deep">
                  <Clock size={11} />
                  Deposit link sent · 7:45 PM
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9a8775]">
                  Logged in ledger
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom — Deposit Confirmed badge + timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.3, ease: cinematicEase }}
          className="mx-auto mt-14 max-w-3xl"
        >
          {/* Champagne deposit confirmed badge */}
          <div className="shimmer-sweep relative mx-auto flex w-fit items-center gap-3 overflow-hidden rounded-full border border-[#D4AF37]/45 bg-[#FBF7EC]/90 px-6 py-3 shadow-[0_18px_40px_-18px_rgba(212,175,55,0.45),inset_0_1px_1px_rgba(255,255,255,0.75)] backdrop-blur-md">
            <CheckCircle2 size={18} className="text-[#D4AF37]" strokeWidth={2.2} />
            <span className="font-display text-xl tracking-tight text-espresso">
              Deposit confirmed
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8a6a17]">
              $250 · 7:51 PM
            </span>
          </div>

          {/* Timeline beats */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-0">
            {conversationBeats.map((beat, i) => (
              <motion.div
                key={beat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + i * 0.14, ease: cinematicEase }}
                className="flex items-center"
              >
                <div className="flex flex-col items-center text-center sm:px-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
                    {beat.t}
                  </span>
                  <span className="mt-1 text-[13px] font-medium text-espresso">
                    {beat.label}
                  </span>
                </div>
                {i < conversationBeats.length - 1 && (
                  <div className="mx-2 hidden h-px w-8 bg-[#D4CFC7] sm:block" />
                )}
              </motion.div>
            ))}
          </div>

          <p className="mt-9 text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#9a8775]">
            Illustrative · single-inquiry walkthrough · real client ledgers replace this once consented
          </p>
        </motion.div>
      </div>
    </section>
  );
}
