'use client';

import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Anchor, Container, Eyebrow } from '@/components/ui-custom/section';
import NarrativeLedger, { type LedgerRow } from '@/components/scrutexity/narrative-ledger';
import ProtocolVideoModal from '@/components/scrutexity/protocol-video-modal';
import { useLowPower, useInView } from '@/hooks/use-low-power';
import DrawnLedger from '@/components/scrutexity/drawn-ledger';
import { HandUnderline } from '@/components/scrutexity/hand-accents';

// 3D hero scene — lazy-loaded, SSR disabled, only mounts on capable devices.
const HeroLedger3D = dynamic(() => import('@/components/three/hero-ledger-3d'), {
  ssr: false,
  loading: () => null,
});

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const DEMO_ROWS: LedgerRow[] = [
  { id: 'r1', source: 'IG DM', amount: 2450, time: '11:42 PM → 09:15 AM', verified: true },
  { id: 'r2', source: 'Web form', amount: 1800, time: '04:08 PM → 08:50 AM', verified: true },
  { id: 'r3', source: 'Missed call', amount: 3200, time: '02:14 PM → 10:02 AM', verified: true },
  { id: 'r4', source: 'Voicemail', amount: 1950, time: '09:30 AM → 11:18 AM', verified: true },
];

const DEMO_TOTAL = 9400;

export default function HeroRecovery() {
  const reduced = useReducedMotion();
  const lowPower = useLowPower();

  // Cinematic 3D is enabled by default on capable devices. Allow ?cinematic=0
  // to explicitly disable. Reading the param during initial state avoids the
  // setState-in-effect pattern.
  const [cinematic] = useState(() => {
    if (typeof window === 'undefined') return true;
    const params = new URLSearchParams(window.location.search);
    if (params.has('cinematic')) {
      return params.get('cinematic') !== '0';
    }
    return true;
  });

  // Only mount 3D when: cinematic enabled, not low-power, not reduced-motion, and in view.
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.1, once: true });
  const show3D = cinematic && !lowPower && !reduced && inView;

  // Video modal state
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <Anchor id="hero" tone="cream" py="loose" className="relative overflow-hidden">
      {/* Ambient sage glow — pure CSS, no WebGL */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(143,169,138,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(183,137,107,0.12), transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <Eyebrow tone="sage">
                <span className="h-1 w-1 rounded-full bg-sage" />
                Verified demand recovery
              </Eyebrow>
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.08 }}
              className="mt-6 font-display text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.02] tracking-[-0.025em] text-ink"
            >
              Missed inquiries become{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-sage-deep">booked deposits.</span>
                <HandUnderline
                  className="absolute left-0 right-0 -bottom-2 w-full h-3"
                  delay={0.6}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
              className="mt-7 font-sans text-base md:text-lg leading-[1.6] text-mist max-w-xl"
            >
              A governed recovery layer for Boulevard and Mangomint — under a signed BAA,
              staff-approved before it sends, and verified by your PMS ledger. Never vanity leads.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.32 }}
              className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <a
                href="#pilot"
                className="sage-cta inline-flex items-center justify-center rounded-lg px-7 py-3.5 font-sans text-sm font-semibold tracking-tight"
              >
                Start 14-day pilot
                <span className="ml-2" aria-hidden>→</span>
              </a>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="clay-cta inline-flex items-center justify-center rounded-lg px-6 py-3.5 font-sans text-sm font-semibold tracking-tight"
              >
                Watch the protocol
                <span className="ml-2 text-cream/80" aria-hidden>·</span>
                <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/80">
                  90s
                </span>
              </button>
            </motion.div>

            {/* Distributed trust bar — appears inline with the CTA, not siloed at the bottom */}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {[
                'BAA before activation',
                'Read-only · zero write access',
                'Cancel anytime, keep your report',
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sage-deep/85"
                >
                  <span className="h-1 w-1 rounded-full bg-sage" aria-hidden />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — single clean hand-drawn ledger illustration */}
          <motion.div
            ref={ref}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.4 }}
            className="relative"
          >
            <DrawnLedger className="w-full h-full min-h-[420px] lg:min-h-[520px]" />

            {/* Caption beneath the illustration */}
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-mist/70 text-center"
            >
              Every row is a real deposit in your PMS — receipt-grade, never an estimate
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist/60">
            Scroll to explore
          </span>
          <motion.span
            aria-hidden
            className="h-8 w-[1px] bg-gradient-to-b from-sage to-transparent"
            style={{ transformOrigin: 'top' }}
            animate={reduced ? undefined : { scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </Container>

      {/* Watch the protocol modal — triggered by the hero CTA */}
      <ProtocolVideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </Anchor>
  );
}
