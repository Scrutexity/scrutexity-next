"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useReducedMotion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

function Counter({ value, prefix = '$', className = '' }: { value: number; prefix?: string; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const spring = useSpring(value, { mass: 0.8, stiffness: 60, damping: 14 });
  const rounded = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString('en-US')}`);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      spring.set(value);
    }
  }, [value, spring, mounted]);

  if (!mounted) {
    return <span className={className}>{prefix}{value.toLocaleString('en-US')}</span>;
  }

  return <motion.span className={className}>{rounded}</motion.span>;
}

function FlatSlider({
  label, value, min, max, step = 1, format, accent = 'sage', onChange,
}: {
  label: string; value: number; min: number; max: number; step?: number;
  format?: (v: number) => string; accent?: 'sage' | 'gold'; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const fillColor = accent === 'gold' ? '#D4AF37' : '#5E7A5A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className="py-6 border-b border-sand-deep/20 last:border-b-0"
    >
      <div className="flex justify-between items-baseline mb-4">
        <label className="text-sm font-sans text-ink">{label}</label>
        <span className="text-base font-mono font-semibold text-ink tabular-nums">
          {format ? format(value) : value}
        </span>
      </div>
      <div className="relative w-full">
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[3px] w-full rounded-full bg-sand-deep/35"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[3px] rounded-full transition-all duration-200"
          style={{ width: `${pct}%`, background: fillColor }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-6 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-cream
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-ink/30
            [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(28,24,20,0.18)]
            [&::-webkit-slider-thumb]:transition-shadow
            [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:hover:shadow-[0_4px_14px_rgba(28,24,20,0.25)]
          "
        />
      </div>
    </motion.div>
  );
}

export default function RoiCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const _isInView = useInView(ref, { once: true, margin: '-60px' });
  const _reduced = useReducedMotion() ?? false;

  const [missed, setMissed] = useState(60);
  const [avgBooking, setAvgBooking] = useState(450);
  const [recoveryRate, setRecoveryRate] = useState(32);
  const [depositRate, setDepositRate] = useState(75);

  const recovered = Math.round(missed * (recoveryRate / 100) * avgBooking * (depositRate / 100));
  const annualized = recovered * 12;
  const patientsPerMonth = Math.round(missed * (recoveryRate / 100));
  const breakevenDays = Math.max(7, Math.round(14000 / Math.max(1, recovered)));

  return (
    <section
      id="calculator"
      ref={ref}
      className="py-32 md:py-40 bg-cream border-t border-sand-deep/15 relative z-10"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl mb-16"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-sage-deep block mb-5">
            ROI Simulation
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-ink">
            What is missed demand{' '}
            <span className="italic text-sage-deep">worth to your clinic?</span>
          </h2>
          <p className="mt-5 font-sans text-mist text-base leading-[1.55]">
            Defaults are mid-range NYC aesthetics benchmarks. Drag to your reality. The result is an{' '}
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-mist/70">
              ILLUSTRATIVE
            </span>{' '}
            estimate — verified figures arrive only after a read-only PMS sync.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Flat sliders, no nested cards */}
          <div className="lg:col-span-7">
            <FlatSlider
              label="Missed inquiries per month"
              value={missed} min={10} max={200}
              onChange={setMissed}
            />
            <FlatSlider
              label="Average booking value"
              value={avgBooking} min={100} max={2000} step={50}
              format={(v) => `$${v.toLocaleString()}`}
              onChange={setAvgBooking}
            />
            <FlatSlider
              label="Recovery capture rate"
              value={recoveryRate} min={5} max={100}
              format={(v) => `${v}%`}
              accent="gold"
              onChange={setRecoveryRate}
            />
            <FlatSlider
              label="Deposit-to-booking rate"
              value={depositRate} min={10} max={100}
              format={(v) => `${v}%`}
              onChange={setDepositRate}
            />
          </div>

          {/* RIGHT: Single quiet result card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div
              className="rounded-2xl p-8 bg-white/70 border border-sand-deep/25"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow:
                  '0 14px 36px -12px rgba(28,24,20,0.10), inset 0 1px 1px rgba(255,255,255,0.6)',
              }}
            >
              <div className="flex justify-between items-baseline pb-5 border-b border-sand-deep/25">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-mist/70">
                  Engine state
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-sage-deep">
                  · Live
                </span>
              </div>

              <div className="pt-7">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-mist/65 block">
                  Illustrative monthly recovery
                </span>
                <Counter
                  value={recovered}
                  className="mt-1 font-display text-5xl lg:text-6xl text-ink tracking-[-0.02em] block tabular-nums"
                />
                
                {/* Collapsible Math Breakdown */}
                <div className="mt-3">
                  <details className="group text-left" aria-expanded="false">
                    <summary className="text-[10px] font-mono uppercase tracking-[0.12em] text-sage-deep cursor-pointer hover:underline list-none flex items-center gap-1 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage-deep/50 rounded-sm px-1 py-0.5">
                      <span>Show me how</span>
                      <span className="transition-transform duration-200 group-open:rotate-180">↓</span>
                    </summary>
                    <div className="mt-2 p-3 bg-cream-deep/60 rounded-lg border border-sand-deep/20 font-mono text-[9px] text-mist leading-relaxed tabular-nums">
                      <div>Formula: inquiries × capture % × avg ticket × deposit %</div>
                      <div className="mt-1.5 font-bold text-ink">
                        {missed} × {recoveryRate}% × ${avgBooking} × {depositRate}% = ${recovered.toLocaleString('en-US')}/mo
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              <div className="mt-7 pt-5 border-t border-sand-deep/25 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-sans text-mist">Annualized</span>
                  <Counter
                    value={annualized}
                    className="font-mono text-sm font-semibold text-ink tabular-nums"
                  />
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-sans text-mist">Inquiries recovered / mo</span>
                  <span className="font-mono text-sm font-semibold text-ink tabular-nums">
                    {patientsPerMonth}
                  </span>
                </div>
                
                {/* Redesigned High-Weight Gold Breakeven Payback Window */}
                <div className="mt-6 p-4 rounded-xl border border-gold/30 bg-gold/5 flex flex-col gap-1 text-center shadow-[0_4px_12px_-6px_rgba(197,160,89,0.12)]">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-gold-deep font-bold">
                    Pilot Payback Window
                  </span>
                  <div className="font-display text-xl text-ink mt-0.5">
                    Breakeven: <span className="font-bold text-gold-deep">~{breakevenDays} days</span>
                  </div>
                  <p className="text-[9.5px] leading-snug text-mist mt-1 font-sans">
                    Pilot pays for itself in {breakevenDays} days. Then it pays you for the next 343.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-[11px] font-sans text-mist/55 leading-[1.55]">
              Estimates are directional, drawn from institutional benchmarks. Verified
              figures require a read-only PMS sync.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
