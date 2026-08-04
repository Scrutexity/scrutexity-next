'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Section from '@/components/ui-custom/section';
import Reveal from '@/components/ui-custom/reveal';
import { useLowPower } from '@/hooks/use-low-power';

const BeakerScene = dynamic(() => import('@/components/three/beaker-scene'), {
  ssr: false,
});

const MISSED_INQUIRY_DEFAULT = 40;
const AVG_BOOKING_DEFAULT = 350;
const CAPTURE_DEFAULT = 32;
const DEPOSIT_RATE_DEFAULT = 75;
const AVG_DEPOSIT_DEFAULT = 150;
const MONTHLY_PILOT = 2000;

interface SliderField {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix: string;
  defaultValue: number;
}

const sliders: SliderField[] = [
  { id: 'missed', label: 'Missed inquiries per month', min: 5, max: 200, step: 1, suffix: '', defaultValue: MISSED_INQUIRY_DEFAULT },
  { id: 'avgBooking', label: 'Average booking value', min: 100, max: 2000, step: 10, suffix: '', defaultValue: AVG_BOOKING_DEFAULT },
  { id: 'capture', label: 'Recovery capture rate', min: 5, max: 70, step: 1, suffix: '%', defaultValue: CAPTURE_DEFAULT },
  { id: 'depositRate', label: 'Deposit-to-booking rate', min: 30, max: 100, step: 1, suffix: '%', defaultValue: DEPOSIT_RATE_DEFAULT },
  { id: 'avgDeposit', label: 'Average deposit amount', min: 25, max: 500, step: 5, suffix: '', defaultValue: AVG_DEPOSIT_DEFAULT },
];

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/* ── Animated counter (spring-smoothed) for the headline number ── */
function SpringCounter({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 120, damping: 22, mass: 0.8 });
  const display = useTransform(spring, (v) => `$${Math.round(v).toLocaleString('en-US')}`);

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  if (reduced) {
    return <span className="font-display text-[2.6rem] text-[#C5A059]">${value.toLocaleString()}</span>;
  }

  return <motion.span className="font-display text-[2.6rem] text-[#C5A059]">{display}</motion.span>;
}

/* ── Static fallback for low-power/mobile: animated CSS bar chart ── */
function BeakerFallback({ monthlyRevenue }: { monthlyRevenue: number }) {
  const fillPct = Math.min((monthlyRevenue / 60000) * 100, 100);
  return (
    <div className="relative mx-auto h-[280px] w-[180px]">
      <div className="absolute inset-0 rounded-b-3xl rounded-t-xl border-2 border-sand-deep/50 bg-cream/40 backdrop-blur-sm" />
      <div
        className="absolute bottom-0 left-0 right-0 rounded-b-3xl transition-[height] duration-700 ease-out"
        style={{
          height: `${fillPct}%`,
          background: 'linear-gradient(to top, rgba(197,160,89,0.9), rgba(197,160,89,0.7))',
          boxShadow: '0 0 40px rgba(197,160,89,0.4) inset',
        }}
      />
      <div className="absolute inset-x-0 top-2 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
          {fillPct.toFixed(0)}% fill
        </span>
      </div>
    </div>
  );
}

export default function RoiCalculator() {
  const [vals, setVals] = useState(() =>
    Object.fromEntries(sliders.map((s) => [s.id, s.defaultValue]))
  );
  const lowPower = useLowPower();

  // MotionValue for monthlyRevenue — drives the 3D beaker without React re-renders
  const monthlyRevenueMV = useMotionValue(0);

  // Gate the R3F render loop on viewport visibility (matches hero-canvas.tsx).
  // When the beaker scrolls out of view, Canvas switches to frameloop="demand"
  // → zero GPU draw calls (the beaker's useFrame loop stops entirely).
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = canvasContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const update = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setVals((prev) => ({ ...prev, [id]: Number(e.target.value) }));
  };

  const output = useMemo(() => {
    const recovered = Math.round(Number(vals.missed) * (Number(vals.capture) / 100));
    const monthlyRevenue = Math.round(recovered * Number(vals.avgBooking));
    const annualRevenue = monthlyRevenue * 12;
    const depositRevenue = Math.round(
      recovered * (Number(vals.depositRate) / 100) * Number(vals.avgDeposit)
    );
    const breakevenDays = Math.round((MONTHLY_PILOT / (monthlyRevenue || 1)) * 30);
    return { recovered, monthlyRevenue, annualRevenue, depositRevenue, breakevenDays };
  }, [vals]);

  // Push the latest monthlyRevenue into the MotionValue so the beaker reads it
  useEffect(() => {
    monthlyRevenueMV.set(output.monthlyRevenue);
  }, [output.monthlyRevenue, monthlyRevenueMV]);

  // Build a stable ref-getter for the beaker (it reads .get() per-frame)
  const revenueRefGetter = useMemo(
    () => ({ get: () => monthlyRevenueMV.get() }),
    [monthlyRevenueMV],
  );

  return (
    <Section className="bg-sand" id="roi-calculator">
      <Reveal>
        <p className="sage-pill text-[10px] uppercase tracking-[0.2em] mx-auto w-fit">
          Estimate your recovery
        </p>
        <h2 className="mt-5 text-center font-display text-3xl leading-tight text-espresso md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
          What is missed demand worth to your clinic?
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        {/* Sliders (left, 3/5) */}
        <div className="space-y-7 lg:col-span-3">
          {sliders.map((s) => (
            <div key={s.id}>
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor={s.id} className="text-sm font-medium text-bark">
                  {s.label}
                </label>
                <span className="font-mono text-sm font-bold text-clay">
                  {Number(vals[s.id]).toLocaleString()}{s.suffix}
                </span>
              </div>
              <input
                id={s.id}
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={vals[s.id]}
                onChange={update(s.id)}
                className="luxury-slider"
                aria-label={s.label}
              />
            </div>
          ))}

          {/* Mini-stats below sliders (kept for context, lighter weight) */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-sand-deep/40 pt-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
                Annual recovered
              </p>
              <p className="mt-1 font-display text-2xl text-sage-deep">
                ${output.annualRevenue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
                Monthly deposits
              </p>
              <p className="mt-1 font-display text-2xl text-clay">
                ${output.depositRevenue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
                Inquiries recovered
              </p>
              <p className="mt-1 font-display text-2xl text-espresso">
                {output.recovered.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
                Breakeven on pilot
              </p>
              <p className="mt-1 font-display text-2xl text-espresso">
                ~{output.breakevenDays} days
              </p>
            </div>
          </div>
        </div>

        {/* 3D Beaker + counter (right, 2/5) */}
        <div className="lg:col-span-2 flex flex-col items-center">
          <Reveal delay={0.15} y={18}>
            <div ref={canvasContainerRef} className="relative h-[340px] w-full">
              {lowPower ? (
                <BeakerFallback monthlyRevenue={output.monthlyRevenue} />
              ) : (
                <Canvas
                  camera={{ position: [0.8, 0.2, 3.4], fov: 45 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
                  frameloop={inView ? 'always' : 'demand'}
                  style={{ background: 'transparent', position: 'absolute', inset: 0 }}
                >
                  <BeakerScene monthlyRevenueRef={revenueRefGetter} />
                </Canvas>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sand/40" />
            </div>
          </Reveal>

          {/* Headline recovered revenue counter (spring-animated) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="mt-2 text-center"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist">
              Est. monthly recovered revenue
            </p>
            <div className="mt-1">
              <SpringCounter value={output.monthlyRevenue} />
            </div>
          </motion.div>
        </div>
      </div>

      <Reveal delay={0.2}>
        <p className="mt-10 text-center text-xs text-mist">
          Estimates are directional and based on industry benchmarks. Verified results require manual review against your clinic data.
        </p>
      </Reveal>
    </Section>
  );
}
