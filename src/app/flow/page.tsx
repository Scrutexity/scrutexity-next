'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { ArchitectureVisualWidget } from '@/components/ArchitectureVisualWidget';
import DeviceDetection from '@/components/DeviceDetection';
import HolographicDataCard from '@/components/HolographicDataCard';
import LayerReveal from '@/components/LayerReveal';
import MagneticButton from '@/components/MagneticButton';
import ROICalculator from '@/components/ROICalculator';
import TrustRail from '@/components/TrustRail';
import { useFlowAnalytics } from '@/lib/useFlowAnalytics';

const problemCards = [
  {
    metric: '37%',
    label: 'After-hours calls that never receive a follow-up',
    ledgerContext:
      'Based on 30-day lookback across 14 medspas. Each missed call represents $484 in average treatment value.',
  },
  {
    metric: '35%',
    label: 'Recoverable through AI reply within 90 seconds',
    ledgerContext:
      "Zenoti's benchmark data shows AI receptionists recover 35% of missed calls. Scrutexity delivers this without migration.",
  },
  {
    metric: '$1,700+',
    label: 'Recovered monthly revenue per location',
    ledgerContext:
      'At $484 average ticket and 10 missed calls/week, recovered calls alone generate $1,700+/month. Dormant leads add 2-3x.',
  },
  {
    metric: '42 sec',
    label: 'Median response time (down from 6.2 days)',
    ledgerContext:
      'After-hours replies drop from 6.2 days to 42 seconds. Speed-to-lead is the #1 predictor of conversion.',
  },
];

export default function RevenueFlowPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { trackEvent } = useFlowAnalytics();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const heroProgress = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const headlinePosition = useTransform(heroProgress, [0, 1], ['0% 50%', '100% 50%']);
  const headlineSize = useTransform(heroProgress, [0, 1], ['260% 100%', '118% 100%']);
  const headlineGlow = useTransform(
    heroProgress,
    [0, 1],
    [
      'drop-shadow(0 0 18px rgba(255,107,107,0.22))',
      'drop-shadow(0 0 34px rgba(0,245,212,0.38))',
    ],
  );
  const headlineShadow = useTransform(
    heroProgress,
    [0, 1],
    [
      '0 2px 32px rgba(0,0,0,0.42), 0 0 1px rgba(255,255,255,0.8)',
      '0 2px 38px rgba(0,0,0,0.34), 0 0 18px rgba(0,245,212,0.18)',
    ],
  );

  return (
    <main ref={containerRef} className="min-h-screen overflow-x-hidden bg-white text-[#062b2f]">
      <section
        className="relative flex min-h-[calc(100vh-68px)] cursor-none items-start overflow-hidden bg-bone px-5 pb-16 pt-28 [perspective:1200px] sm:px-8 lg:pb-12 lg:pt-32"
        onMouseMove={(event) => {
          setMousePos({
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: (event.clientY / window.innerHeight) * 2 - 1,
          });
        }}
      >
        <DeviceDetection scrollProgress={heroProgress} mousePosition={mousePos} />
        <div className="warm-hero-mesh absolute inset-0 z-0" />
        <div className="absolute left-[-12%] top-[-14%] z-[1] h-[34rem] w-[34rem] rounded-full bg-[#B9825F]/30 blur-[86px]" aria-hidden="true" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_28%_22%,rgba(184,125,107,0.18),transparent_32%),linear-gradient(90deg,rgba(245,240,232,0.94)_0%,rgba(245,240,232,0.68)_42%,rgba(245,240,232,0.10)_72%),linear-gradient(180deg,rgba(245,240,232,0.05)_0%,rgba(245,240,232,0.44)_76%,#ffffff_100%)]" />
        <div className="pointer-events-none absolute left-5 top-28 z-[5] max-w-[16ch] select-none font-space-grotesk text-[5rem] font-semibold uppercase leading-[0.82] tracking-normal text-clay/[0.10] mix-blend-multiply [transform:perspective(1000px)_translateZ(-80px)] sm:left-8 sm:text-[8rem] lg:left-14 lg:top-24 lg:text-[11rem]" aria-hidden="true">
          Recovery Ledger
        </div>
        <div
          className="pointer-events-none absolute z-[20] h-72 w-72 rounded-full bg-clay/15 blur-xl mix-blend-multiply transition-all duration-75 sm:h-96 sm:w-96"
          style={{
            left: `${(mousePos.x + 1) * 50}%`,
            top: `${(mousePos.y + 1) * 50}%`,
            transform: `translate(-50%, -50%) scale(${1 + Math.abs(mousePos.x) * 0.3})`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-20 ml-0 max-w-xl text-left lg:ml-8 xl:ml-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-clay/35 bg-bone/80 px-5 py-2 font-jetbrains text-[11px] font-semibold uppercase tracking-[0.16em] text-pine shadow-[0_0_34px_-24px_rgba(184,125,107,0.76)] backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-clay" />
            Live Revenue Flow Visualizer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.58 }}
            style={{ filter: headlineGlow, textShadow: headlineShadow }}
            className="font-space-grotesk text-5xl font-semibold leading-none tracking-normal text-ink sm:text-7xl lg:text-8xl"
          >
            Your revenue is
            <br />
            <motion.span
              className="bg-[linear-gradient(105deg,#B87D6B_0%,#2F5D4A_44%,#1C1814_72%,#B87D6B_100%)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [will-change:background-position]"
              style={{
                backgroundPosition: headlinePosition,
                backgroundSize: headlineSize,
              }}
            >
              leaking right now
            </motion.span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.5 }}
            className="mt-8 max-w-xl text-lg leading-8 text-ink/72 sm:text-2xl sm:leading-10"
          >
            Scroll to watch Scrutexity capture missed calls, dormant demand, and delayed replies before they become
            invisible loss.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.41, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8"
          >
            <TrustRail />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticButton
              href="#roi"
              variant="mint"
              className="shadow-[0_22px_60px_-30px_rgba(0,245,212,0.9)]"
              onClick={() => trackEvent('cta_click', { location: 'hero' })}
            >
              See Your Projected Recovery
              <ArrowRight size={17} />
            </MagneticButton>
            <MagneticButton
              href="/diagnostic"
              variant="ghost"
              onClick={() => trackEvent('cta_click', { location: 'hero_secondary' })}
            >
              Run the Diagnostic
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#d9e5df] bg-[#f4fbf8] px-5 pb-12 pt-40 sm:px-8 lg:pb-16 lg:pt-44">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl text-left">
            <p className="section-kicker text-primary">The Invisible Leak</p>
            <h2 className="font-space-grotesk mt-5 text-4xl font-semibold leading-tight tracking-normal text-[#062b2f] sm:text-6xl">
              Every slow reply becomes measurable lost demand.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4b6265]">
              These are the diagnostic benchmarks behind the recovery layer, mapped to source, speed, and monthly lift.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5 lg:translate-y-10">
              <HolographicDataCard {...problemCards[0]} />
            </div>
            <div className="lg:col-span-7">
              <HolographicDataCard {...problemCards[1]} />
            </div>
            <div className="lg:col-span-8 lg:-mt-4 lg:ml-12">
              <HolographicDataCard {...problemCards[2]} />
            </div>
            <div className="lg:col-span-4 lg:-mt-16">
              <HolographicDataCard {...problemCards[3]} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-40 pt-12 sm:px-8 lg:pb-44 lg:pt-16">
        <LayerReveal />
      </section>

      <section id="roi" className="border-y border-[#d9e5df] bg-[#f4fbf8] px-5 pb-20 pt-36 sm:px-8 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 ml-auto max-w-3xl text-left lg:text-right">
            <p className="section-kicker text-primary">ROI Engine</p>
            <h2 className="font-space-grotesk mt-5 text-4xl font-semibold leading-tight tracking-normal text-[#062b2f] sm:text-6xl">
              Do the math while the system shows its work.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4b6265]">
              Drag the sliders, release, and watch the recovery potential update without burying the buyer in a
              spreadsheet.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      <ArchitectureVisualWidget />

      <section className="bg-white px-5 pb-40 pt-12 text-center sm:px-8 lg:pb-44 lg:pt-16">
        <div className="mx-auto max-w-4xl">
          <p className="section-kicker text-primary">Next Step</p>
          <h2 className="font-space-grotesk mt-5 text-4xl font-semibold leading-tight tracking-normal text-[#062b2f] sm:text-6xl">
            Ready to stop the leak?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4b6265]">
            Keep your diagnostic-first motion intact. Use the audit to quantify missed demand before changing your stack.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton
              href="/diagnostic"
              variant="dark"
              onClick={() => trackEvent('cta_click', { location: 'final' })}
            >
              Start the Diagnostic
              <ArrowRight size={17} />
            </MagneticButton>
            <MagneticButton
              href="/"
              variant="ghost"
            >
              Back to Main Site
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
