'use client';

import { motion } from 'framer-motion';
import SecurityBeacon from './SecurityBeacon';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/**
 * StaffFirstSection — Clinical Boundaries stop-rule.
 *
 * Sharp, unmistakable declaration: Scrutexity handles logistics.
 * Clinical decisions stay with staff. This is a trust signal for
 * medical professionals who fear AI overreach.
 */
export default function StaffFirstSection() {
  return (
    <section className="relative overflow-hidden bg-[#1A1A1A] px-5 py-24 sm:px-8 lg:py-28">
      {/* Subtle champagne accent wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(212,175,55,0.07),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: cinematicEase }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-mist">
            <SecurityBeacon tone="sage" size="sm" />
            Clinical Boundaries
          </p>
          <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-[#F8F7F3] md:text-4xl">
            Staff-first. Always.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-mist">
            Scrutexity handles the logistics of booking and deposits. Any
            inquiry requiring clinical advice or staff judgment is immediately
            escalated to your front desk. We recapture revenue; your staff
            retains medicine.
          </p>
        </motion.div>

        {/* Two-column boundary illustration */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {[
            {
              side: 'Scrutexity Handles',
              color: 'champagne',
              items: [
                'After-hours inquiry response',
                'Booking availability checks',
                'Deposit collection & confirmation',
                'Calendar sync to Boulevard/Mangomint',
                'Follow-up on unworked DMs',
              ],
            },
            {
              side: 'Your Staff Retains',
              color: 'sage',
              items: [
                'Clinical consultation & advice',
                'Treatment recommendations',
                'Medical history review',
                'Emergency & urgent care triage',
                'Provider-patient relationship',
              ],
            },
          ].map((col) => (
            <motion.div
              key={col.side}
              initial={{ opacity: 0, y: 24, rotateX: 8, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 1.0,
                delay: 0.15,
                ease: cinematicEase,
              }}
              className={`rounded-2xl border p-8 ${
                col.color === 'champagne'
                  ? 'border-[#D4AF37]/20 bg-[#1A1A1A]'
                  : 'border-[#B2AC88]/15 bg-[#1A1A1A]'
              }`}
              style={{ transformOrigin: 'center bottom' }}
            >
              <h3
                className={`font-display text-lg ${
                  col.color === 'champagne'
                    ? 'text-[#D4AF37]'
                    : 'text-mist'
                }`}
              >
                {col.side}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-[#D4CFC7]"
                  >
                    <span
                      className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${
                        col.color === 'champagne'
                          ? 'bg-[#D4AF37]'
                          : 'bg-[#B2AC88]'
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom assurance */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4, ease: cinematicEase }}
          className="mx-auto mt-10 max-w-lg text-center text-sm leading-6 text-mist"
        >
          Every protocol is reviewed with your clinical director before
          activation. No autonomous clinical decisions — ever.
        </motion.p>
      </div>
    </section>
  );
}
