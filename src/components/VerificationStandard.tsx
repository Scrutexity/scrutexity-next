'use client';

import { motion } from 'framer-motion';
import SecurityBeacon from './SecurityBeacon';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/**
 * VerificationStandard — the institutional definition of a verified recovery.
 *
 * Replaces all fake "Sample Ledgers." This is the permanent, high-contrast
 * standard box that defines what constitutes a Verified Recovery.
 *
 * Styling: Fluted Glass card with Champagne Gold accent border.
 * The "Fluted Glass" effect uses CSS repeating-linear-gradient to create
 * subtle vertical ridges, mimicking high-end clinic interior glass partitions.
 */
export default function VerificationStandard() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-24 sm:px-8 lg:py-28">
      {/* Warm ambient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-3xl">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: cinematicEase }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-mist">
            <SecurityBeacon tone="champagne" size="sm" />
            Verification Standard
          </p>
          <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-espresso md:text-4xl">
            What &ldquo;Verified&rdquo; means.
          </h2>
        </motion.div>

        {/* Fluted Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 32, rotateX: 10, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 1.1, delay: 0.12, ease: cinematicEase }}
          className="fluted-glass mt-14 rounded-3xl border border-[#D4AF37]/25 p-10 sm:p-12 lg:p-14"
          style={{ transformOrigin: 'center bottom' }}
        >
          {/* Verification criteria */}
          <div className="space-y-8">
            {[
              {
                letter: 'A',
                label: 'A previously unworked lead is re-engaged.',
                detail:
                  'The inquiry sat unanswered — after-hours, weekend, or simply missed. Scrutexity identifies it and initiates a response in your clinic\'s voice.',
              },
              {
                letter: 'B',
                label: 'A two-way conversation leads to a deposit.',
                detail:
                  'The lead responds. A real conversation happens — questions answered, availability confirmed — and a deposit is placed.',
              },
              {
                letter: 'C',
                label: 'The booking is recorded autonomously in your PMS.',
                detail:
                  'The appointment is synced to Boulevard or Mangomint. The deposit is logged. The calendar reflects reality — no manual entry.',
              },
            ].map((item, i) => (
              <div key={item.letter} className="flex gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/12 font-mono text-[10px] font-bold tracking-widest text-[#D4AF37]">
                  {item.letter}
                </span>
                <div>
                  <p className="font-display text-lg leading-snug text-espresso">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#6B6259]">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

          {/* Bottom seal */}
          <div className="flex items-center justify-between text-xs text-mist">
            <span className="inline-flex items-center gap-1.5 font-mono tracking-wider uppercase">
              <SecurityBeacon tone="champagne" size="sm" />
              Read-Only Audit First
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono tracking-wider uppercase">
              <SecurityBeacon tone="champagne" size="sm" />
              HIPAA · BAA Signed
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono tracking-wider uppercase">
              <SecurityBeacon tone="champagne" size="sm" />
              PMS-Native Booking
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
