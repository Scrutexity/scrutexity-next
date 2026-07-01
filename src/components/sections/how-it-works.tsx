'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Section from '@/components/ui-custom/section';
import Reveal from '@/components/ui-custom/reveal';
import { useLowPower } from '@/hooks/use-low-power';

const PipelineScene = dynamic(() => import('@/components/three/pipeline-scene'), {
  ssr: false,
});

const steps = [
  {
    number: '01',
    title: 'Diagnostic Audit',
    label: 'READ-ONLY',
    labelColor: 'text-sage-deep border-sage/30 bg-sage/8',
    description:
      'We connect to your PMS with zero-write permissions. Within 24 hours, you receive a report detailing exactly how much demand was left on the table over the last 30 days.',
  },
  {
    number: '02',
    title: 'Authorized Recovery',
    label: 'PERMISSIONED',
    labelColor: 'text-clay border-clay/30 bg-clay/8',
    description:
      'Once approved, our protocol re-engages stalled patients in your clinic\'s voice. Every interaction is logged and staff-approved before it sends.',
  },
  {
    number: '03',
    title: 'Verification',
    label: 'PMS-VERIFIED',
    labelColor: 'text-sage-deep border-sage/30 bg-sage/8',
    description:
      'A booking is only "Verified" once the deposit is recorded in your PMS and the appointment is synced. We report deposits, not leads.',
  },
];

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/* Static fallback (mobile / low-power / reduced-motion) — keeps the original
   concentric-ring sage visual so the section still reads well without WebGL. */
function PipelineFallback({ step }: { step: 0 | 1 | 2 }) {
  return (
    <div className="paper-glass-sage rounded-3xl p-8">
      <div className="flex items-center justify-center">
        <div className="relative h-64 w-64">
          <div className="absolute inset-0 rounded-full border-2 border-sage/20 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-sage/15 animate-[spin_8s_linear_infinite_reverse]" />
          <div className="absolute inset-8 rounded-full border border-sage/10 animate-[spin_6s_linear_infinite]" />
          <div className="absolute inset-[60px] flex items-center justify-center rounded-full bg-gradient-to-br from-clay/30 to-sage/20 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-sage-deep">
              {step === 0 ? 'READ-ONLY' : step === 1 ? 'ACTIVE' : 'VERIFIED'}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-mist">
        Protocol status: <span className="font-semibold text-sage-deep">
          {step === 0 ? 'Read-only engaged' : step === 1 ? 'Recovering' : 'Deposit confirmed'}
        </span>
      </p>
    </div>
  );
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const lowPower = useLowPower();

  // Gate the R3F render loop on viewport visibility (matches hero-canvas.tsx).
  // When the sticky 3D panel scrolls out of view, Canvas switches to
  // frameloop="demand" → zero GPU draw calls.
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

  // Track which step is in view (largest visible portion wins)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observers: IntersectionObserver[] = [];
    const visibilities = [0, 0, 0];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visibilities[i] = entry.isIntersecting ? entry.intersectionRatio : 0;
          }
          // Pick the step with the highest visibility
          let maxIdx = 0;
          let maxVal = visibilities[0];
          for (let k = 1; k < visibilities.length; k++) {
            if (visibilities[k] > maxVal) {
              maxVal = visibilities[k];
              maxIdx = k;
            }
          }
          if (maxVal > 0.05) {
            setActiveStep(maxIdx as 0 | 1 | 2);
          }
        },
        {
          // Track the step element as it crosses the middle band of the viewport
          rootMargin: '-25% 0px -50% 0px',
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <Section className="bg-cream" id="how-it-works">
      <Reveal>
        <p className="sage-pill text-[10px] uppercase tracking-[0.2em] mx-auto w-fit">
          The recovery protocol
        </p>
        <h2 className="mt-5 text-center font-display text-3xl leading-tight text-espresso md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
          Read-only first. <span className="text-sage-deep">Permissioned always.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-5 lg:gap-14">
        {/* Step list (left, 3/5) */}
        <div className="lg:col-span-3 space-y-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
            >
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: cinematicEase }}
                className="flex gap-6"
              >
                {/* Step number — active step gets full clay emphasis */}
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all duration-500 ${
                      activeStep === i
                        ? 'border-clay bg-clay text-cream shadow-[0_8px_24px_-8px_rgba(183,137,107,0.5)]'
                        : 'border-clay/30 bg-cream text-clay'
                    }`}
                  >
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="mt-2 h-16 w-px bg-gradient-to-b from-sand to-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className={`font-display text-xl leading-snug transition-colors duration-500 ${
                        activeStep === i ? 'text-espresso' : 'text-espresso/70'
                      }`}
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {step.title}
                    </h3>
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] ${step.labelColor}`}>
                      {step.label}
                    </span>
                  </div>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-mist">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Sticky 3D visual (right, 2/5) */}
        <div className="hidden lg:col-span-2 lg:block">
          <div ref={canvasContainerRef} className="sticky top-32 h-[420px]">
            {lowPower ? (
              <PipelineFallback step={activeStep} />
            ) : (
              <>
                <Canvas
                  camera={{ position: [0, 0.2, 5.5], fov: 45 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
                  frameloop={inView ? 'always' : 'demand'}
                  style={{ background: 'transparent', position: 'absolute', inset: 0 }}
                >
                  <PipelineScene step={activeStep} />
                </Canvas>
                {/* Soft warm overlay so it sits in the page */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-cream/40" />
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
