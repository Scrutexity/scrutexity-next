'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLowPower } from '@/hooks/use-low-power';

/* Leak scene is dynamically imported (R3F + three are heavy) */
const LeakScene = dynamic(() => import('@/components/three/leak-scene'), {
  ssr: false,
});

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/* ── Static fallback for low-power / mobile / reduced-motion ── */
function LeakFallback() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(197,160,89,0.18),transparent_55%),radial-gradient(ellipse_at_50%_80%,rgba(143,169,138,0.14),transparent_50%)]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-32 w-32 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, rgba(197,160,89,0.55) 0%, rgba(197,160,89,0.12) 60%, transparent 80%)',
            boxShadow: '0 0 60px rgba(197,160,89,0.25)',
          }}
        />
      </div>
    </div>
  );
}

export default function RevenueLeak() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasInView, setCanvasInView] = useState(true);
  const lowPower = useLowPower();

  // Gate the R3F render loop on viewport visibility (matches hero-canvas.tsx,
  // how-it-works.tsx, roi-calculator.tsx). The leak section is 200vh tall;
  // when the user scrolls fully past it (above or below), the Canvas switches
  // to frameloop="demand" → zero GPU draw calls.
  useEffect(() => {
    const el = canvasContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCanvasInView(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track scroll progress across the 200vh section, mapped to leak act 0..1
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end start'],
  });

  // Spring-smoothed leak progress (gives a cinematic delay, no linear feel)
  const leakProgressSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    mass: 1.0,
  });

  // Counter: $0 → $8,950 lost this month, mapped across leak act 0.05..0.85
  const counterValue = useTransform(leakProgressSpring, [0.05, 0.85], [0, 8950]);
  const formattedCounter = useTransform(counterValue, (v) =>
    `$${Math.round(v).toLocaleString('en-US')}`,
  );

  // Copy reveals
  const eyebrowOpacity = useTransform(leakProgressSpring, [0.0, 0.12, 0.85, 1.0], [0, 1, 1, 0.55]);
  const headlineOpacity = useTransform(leakProgressSpring, [0.0, 0.15, 0.6, 0.95], [0, 1, 1, 0.4]);
  const counterOpacity = useTransform(leakProgressSpring, [0.18, 0.32, 0.92, 1.0], [0, 1, 1, 0.7]);
  const counterScale = useTransform(leakProgressSpring, [0.18, 0.4], [0.92, 1]);
  const recoveryCopyOpacity = useTransform(leakProgressSpring, [0.82, 0.95], [0, 1]);
  const recoveryCopyY = useTransform(leakProgressSpring, [0.82, 0.98], [24, 0]);

  // Pass the spring motion value into the R3F scene (it reads .get() per-frame)
  const leakProgressPassthrough = leakProgressSpring as unknown as { get: () => number };

  return (
    <section
      ref={containerRef}
      id="revenue-leak"
      className="relative h-[200vh] bg-cream"
      aria-label="Where revenue leaks"
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D background — gated by IntersectionObserver so GPU is idle when
            the user has scrolled fully past the 200vh section. */}
        <div ref={canvasContainerRef} className="absolute inset-0 opacity-70">
          {lowPower ? (
            <LeakFallback />
          ) : (
            <Canvas
              camera={{ position: [0, 0, 5.0], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
              frameloop={canvasInView ? 'always' : 'demand'}
              style={{ background: 'transparent', position: 'absolute', inset: 0 }}
            >
              <LeakScene leakProgress={leakProgressPassthrough} />
            </Canvas>
          )}
        </div>

        {/* Warm ivory overlay so text reads cleanly */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream/85" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream to-transparent" />

        {/* ── Eyebrow ── */}
        <motion.div
          style={{ opacity: eyebrowOpacity }}
          className="absolute left-1/2 top-[14vh] -translate-x-1/2"
        >
          <p className="sage-pill text-[10px] uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            Where revenue leaks
          </p>
        </motion.div>

        {/* ── Headline ── */}
        <motion.div
          style={{ opacity: headlineOpacity }}
          className="absolute left-1/2 top-[24vh] w-full max-w-3xl -translate-x-1/2 px-6 text-center"
        >
          <h2 className="font-display text-3xl font-normal leading-[1.1] text-espresso sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
            Every missed inquiry is a deposit
            <br />
            <span className="italic text-clay">your competitor collects.</span>
          </h2>
        </motion.div>

        {/* ── Counter (the bleeding number) ── */}
        <motion.div
          style={{ opacity: counterOpacity, scale: counterScale }}
          className="absolute left-1/2 top-[58vh] -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mist">
            Lost this month — and counting
          </p>
          <motion.p
            className="font-display text-[3.5rem] font-normal leading-none text-[#C5A059] sm:text-[5rem] md:text-[6rem]"
            style={{ letterSpacing: '-0.03em', textShadow: '0 4px 40px rgba(197,160,89,0.25)' }}
          >
            {formattedCounter}
          </motion.p>
        </motion.div>

        {/* ── Recovery copy (the catch) ── */}
        <motion.div
          style={{ opacity: recoveryCopyOpacity, y: recoveryCopyY }}
          className="absolute left-1/2 top-[78vh] w-full max-w-2xl -translate-x-1/2 px-6 text-center"
        >
          <p className="font-display text-2xl font-normal leading-tight text-espresso sm:text-3xl" style={{ letterSpacing: '-0.02em' }}>
            Scrutexity catches what
            <br />
            <span className="italic text-sage-deep">your front desk misses.</span>
          </p>
          <a
            href="#pilot"
            className="clay-cta mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
          >
            Start 14-Day Pilot
            <ArrowRight size={15} />
          </a>
        </motion.div>

        {/* ── Scroll progress rail (right edge) ── */}
        <div className="absolute right-6 top-1/2 hidden h-32 w-px -translate-y-1/2 bg-sand-deep/50 md:block">
          <motion.div
            className="absolute left-0 top-0 w-px bg-[#C5A059]"
            style={{ height: useTransform(leakProgressSpring, [0, 1], ['0%', '100%']) }}
          />
        </div>
      </div>
    </section>
  );
}
