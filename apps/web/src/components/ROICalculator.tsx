'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useFlowAnalytics } from '@/lib/useFlowAnalytics';
import MagneticButton from '@/components/MagneticButton';

interface MintParticle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export default function ROICalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [missedCalls, setMissedCalls] = useState(15);
  const [showMintRain, setShowMintRain] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [particles, setParticles] = useState<MintParticle[]>([]);
  const { trackEvent } = useFlowAnalytics();

  const avgTicket = monthlyRevenue / 80;
  const annualMissed = missedCalls * 52;
  const leakedRevenue = Math.round(annualMissed * avgTicket * 0.85);
  const recoveredRevenue = Math.round(leakedRevenue * 0.65);

  const triggerMintRain = () => {
    trackEvent('calculator_interaction', { monthlyRevenue, missedCalls, recoveredRevenue });
    setShowMintRain(true);

    const newParticles: MintParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 60 + 20,
      delay: Math.random() * 0.4,
    }));
    setParticles(newParticles);

    window.setTimeout(() => {
      setShowMintRain(false);
      setParticles([]);
    }, 1800);
  };

  return (
    <div className="relative mx-auto max-w-3xl translate-z-0 overflow-hidden rounded-lg border border-[#d9e5df] bg-white shadow-[0_28px_80px_-48px_rgba(11,82,91,0.55),0_0_70px_-48px_rgba(185,130,95,0.72)] [transform:perspective(1000px)_translateZ(38px)]">
      <div className="p-6 sm:p-10 lg:p-12">
        <h3 className="font-space-grotesk mb-10 text-center text-3xl font-semibold tracking-normal text-[#062b2f] sm:text-4xl">
          Calculate Your Recovery Potential
        </h3>

        <div className="space-y-10 sm:space-y-12">
          <div>
            <div className="mb-4 flex flex-col justify-between gap-2 text-sm text-[#4b6265] sm:flex-row">
              <span className="font-jetbrains text-[11px] uppercase tracking-[0.16em]">Estimated monthly revenue</span>
              <span className="font-jetbrains font-semibold text-primary">${monthlyRevenue.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={monthlyRevenue}
              onChange={(event) => setMonthlyRevenue(Number(event.target.value))}
              onPointerUp={triggerMintRain}
              className="w-full accent-success"
              aria-label="Estimated monthly revenue"
            />
          </div>

          <div>
            <div className="mb-4 flex flex-col justify-between gap-2 text-sm text-[#4b6265] sm:flex-row">
              <span className="font-jetbrains text-[11px] uppercase tracking-[0.16em]">Missed calls per week</span>
              <span className="font-jetbrains font-semibold text-urgency">{missedCalls}</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={1}
              value={missedCalls}
              onChange={(event) => setMissedCalls(Number(event.target.value))}
              onPointerUp={triggerMintRain}
              className="w-full accent-urgency"
              aria-label="Missed calls per week"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 rounded-lg border border-success/25 bg-[#f4fbf8] p-6 sm:mt-16 sm:p-10"
        >
          <div className="mb-8 text-center">
            <div className="font-jetbrains text-xs uppercase tracking-[0.18em] text-[#5d7475]">
              Projected annual recovery
            </div>
            <motion.div
              key={recoveredRevenue}
              initial={{ scale: 0.84, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.48, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-space-grotesk mt-3 text-5xl font-semibold tracking-normal text-pine [text-shadow:0_0_22px_rgba(184,125,107,0.30)] sm:text-7xl"
            >
              ${recoveredRevenue.toLocaleString()}
            </motion.div>
            <p className="mt-2 text-[#4b6265]">in the first year with Scrutexity</p>
          </div>

          <div className="grid gap-4 text-sm sm:grid-cols-2 sm:gap-6">
            <div className="rounded-lg bg-white p-5 sm:p-6">
              <div className="text-clay">Potential Leak</div>
              <div className="font-jetbrains mt-2 text-2xl text-ink [text-shadow:0_0_20px_rgba(184,125,107,0.26)] sm:text-3xl">
                ${leakedRevenue.toLocaleString()}
              </div>
            </div>
            <div className="rounded-lg bg-white p-5 sm:p-6">
              <div className="text-pine">Scrutexity Capture Rate</div>
              <div className="font-jetbrains mt-2 text-2xl text-ink [text-shadow:0_0_20px_rgba(184,125,107,0.26)] sm:text-3xl">65%</div>
            </div>
          </div>

          <div className="mt-7 text-center">
            <button
              type="button"
              onClick={() => setShowAssumptions((value) => !value)}
              className="text-sm font-semibold text-pine underline decoration-clay/40 underline-offset-4 transition-colors duration-300 hover:text-ink"
              aria-expanded={showAssumptions}
            >
              {showAssumptions ? 'Hide assumptions' : 'View assumptions'}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {showAssumptions && (
              <motion.div
                key="assumptions"
                initial={{ height: 0, opacity: 0, y: -8 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -8 }}
                transition={{ duration: 0.46, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-5 rounded-lg border border-clay/25 bg-bone/60 p-5 text-left text-sm leading-7 text-ink/75">
                  <ul className="space-y-2">
                    <li>Recovery rate: 35% (based on anonymized pilot data)</li>
                    <li>Average treatment value: $1,500</li>
                    <li>No-show rate: 22%</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showMintRain && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ opacity: 0, y: -80, scale: 0.6 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  y: [particle.y * -1, 220],
                  scale: [0.6, 1.1, 0.4],
                  x: [particle.x * 0.8, particle.x * 1.3],
                }}
                transition={{ duration: 1.4, delay: particle.delay }}
                className="absolute h-2 w-2 rounded-full bg-clay shadow-[0_0_12px_rgba(184,125,107,0.55)]"
                style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="flex justify-center border-t border-[#d9e5df] p-6 sm:p-8">
        <MagneticButton
          href="/diagnostic"
          variant="dark"
          onClick={() => trackEvent('cta_click', { location: 'roi_calculator' })}
          className="sm:px-12"
        >
          Book Your Free Diagnostic Audit
        </MagneticButton>
      </div>
    </div>
  );
}
