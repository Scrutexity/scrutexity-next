'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/* ICP filter threshold — clinics below this monthly inquiry volume are below our typical client profile. */
const ICP_MIN_MONTHLY_INQUIRIES = 75;

type Pms = '' | 'boulevard' | 'mangomint' | 'zenoti' | 'other';

export default function RecoveryCalculator({ compact = false }: { compact?: boolean }) {
  const [pms, setPms] = useState<Pms>('');
  const [inquiries, setInquiries] = useState(240);
  const [conversionRate, setConversionRate] = useState(30);
  const [averageTicket, setAverageTicket] = useState(650);
  const reduceMotion = useReducedMotion();
  const motionEnabled = process.env.NEXT_PUBLIC_ENABLE_2026_UI === 'true' && !reduceMotion;
  const belowIcp = inquiries > 0 && inquiries < ICP_MIN_MONTHLY_INQUIRIES;

  const result = useMemo(() => {
    const missed = Math.max(0, inquiries * (1 - conversionRate / 100));
    const recovered = missed * 0.35;
    return { missed, recovered, revenue: recovered * averageTicket };
  }, [averageTicket, conversionRate, inquiries]);

  const outputMotion = motionEnabled
    ? { initial: { opacity: 0.65, y: 5 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.22 } }
    : {};

  return (
    <section className={`rounded-[1.75rem] border border-[#ddcfbf] bg-cream shadow-[0_16px_50px_rgba(80,57,38,0.08)] ${compact ? 'p-6' : 'p-7 sm:p-9'}`}>
      <p className="section-kicker">Recovery estimate</p>
      <h2 className={`mt-3 font-display ${compact ? 'text-2xl' : 'text-3xl'}`}>What could missed demand be worth?</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#625950]">
        Enter your monthly inquiry volume. This directional model applies a 35% recovery benchmark to currently unconverted inquiries; it is not a guarantee and must be verified against your records.
      </p>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold text-[#3d3731]">
          What&apos;s your current PMS?
          <select
            value={pms}
            onChange={(event) => setPms(event.target.value as Pms)}
            className="mt-2 w-full rounded-xl border border-[#d8c9b7] bg-white px-4 py-3 font-normal outline-none transition focus:border-[#9b6a51] focus:ring-2 focus:ring-[#9b6a51]/15"
          >
            <option value="">Select your PMS…</option>
            <option value="boulevard">Boulevard</option>
            <option value="mangomint">Mangomint</option>
            <option value="zenoti">Zenoti</option>
            <option value="other">Other / not listed</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-[#3d3731]">
          How many inbound inquiries do you receive per month?
          <input
            type="number"
            min="0"
            value={inquiries}
            onChange={(event) => setInquiries(Number(event.target.value))}
            className="mt-2 w-full rounded-xl border border-[#d8c9b7] bg-white px-4 py-3 font-normal outline-none transition focus:border-[#9b6a51] focus:ring-2 focus:ring-[#9b6a51]/15"
          />
        </label>
      </div>

      {belowIcp && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 rounded-2xl border border-[#d8b17a]/60 bg-[#fdf3e1] p-5 text-sm leading-7 text-[#5f4a2f]"
        >
          <strong className="block text-[#3d2f1c]">Heads up — your volume is lower than our typical client.</strong>
          We&apos;ll follow up, but you may not see meaningful recovery yet. Most clinics see clear results above{' '}
          {ICP_MIN_MONTHLY_INQUIRIES} inbound inquiries per month.
        </div>
      )}

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold text-[#3d3731]">
          Current conversion rate
          <div className="relative mt-2">
            <input
              type="number"
              min="0"
              max="100"
              value={conversionRate}
              onChange={(event) => setConversionRate(Math.min(100, Number(event.target.value)))}
              className="w-full rounded-xl border border-[#d8c9b7] bg-white px-4 py-3 pr-9 font-normal outline-none transition focus:border-[#9b6a51] focus:ring-2 focus:ring-[#9b6a51]/15"
            />
            <span className="absolute right-4 top-3 text-[#766b61]">%</span>
          </div>
        </label>
        <label className="text-sm font-semibold text-[#3d3731]">
          Average appointment value
          <div className="relative mt-2">
            <span className="absolute left-4 top-3 text-[#766b61]">$</span>
            <input
              type="number"
              min="0"
              value={averageTicket}
              onChange={(event) => setAverageTicket(Number(event.target.value))}
              className="w-full rounded-xl border border-[#d8c9b7] bg-white py-3 pl-8 pr-4 font-normal outline-none transition focus:border-[#9b6a51] focus:ring-2 focus:ring-[#9b6a51]/15"
            />
          </div>
        </label>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3" aria-live="polite">
        {[
          ['Unconverted inquiries', Math.round(result.missed).toLocaleString()],
          ['Potentially recovered', Math.round(result.recovered).toLocaleString()],
          ['Directional revenue', money.format(result.revenue)],
        ].map(([label, value]) => (
          <motion.div key={`${label}-${value}`} {...outputMotion} className="rounded-2xl border border-[#e7dbce] bg-[#f7f0e6] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b7766]">{label}</p>
            <p className="mt-2 font-display text-3xl text-[#2b2723]">{value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
