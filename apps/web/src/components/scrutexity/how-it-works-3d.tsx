'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Pillar, Container, Eyebrow, SectionHeading, Lead } from '@/components/ui-custom/section';
import { useLowPower } from '@/hooks/use-low-power';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const TEAL = '#8FA98A';
const TEAL_DEEP = '#5E7A5A';
const GOLD = '#C5A059';
const CREAM = '#F8F3EA';
const INK = '#1C1814';
const SAND = '#D9CCB0';

/**
 * FOUR-GATE protocol — governed concierge, not automation.
 * Gate 1: BAA executed (governance precondition)
 * Gate 2: Read-only observe (diagnostic audit)
 * Gate 3: Staff-approved (authorized recovery)
 * Gate 4: PMS-verified (deposit confirmation)
 */
const PANELS = [
  {
    num: '01',
    eyebrow: 'Governance Precondition',
    badge: 'BAA-READY',
    badgeTone: 'sage' as const,
    title: 'No connection without a BAA.',
    body: 'A Business Associate Agreement is executed and on file before any read connection opens. This is the gate every recovery passes through — governance first, always.',
    status: 'BAA ON FILE · READY',
    visual: 'The teal seal materializing on the ledger — governance is established before anything is read.',
  },
  {
    num: '02',
    eyebrow: 'Diagnostic Audit',
    badge: 'READ-ONLY',
    badgeTone: 'sage' as const,
    title: 'Observe. Never modify.',
    body: 'We connect to your PMS with zero-write permissions. Within 24 hours, you receive a report detailing exactly how much demand was left on the table over the last 30 days.',
    status: 'OBSERVING · 24h',
    visual: 'A magnifying glass sweeps across empty ledger rows — observing demand, never writing.',
  },
  {
    num: '03',
    eyebrow: 'Authorized Recovery',
    badge: 'CLINICAL ESCALATION',
    badgeTone: 'gold' as const,
    title: 'Staff-approved before it sends.',
    body: 'Our protocol re-engages stalled patients in your clinic\u2019s voice. Any clinical message halts the automated reply and routes straight to your licensed staff. No autonomous clinical decisions.',
    status: 'STAFF REVIEW · APPROVED',
    visual: 'A pen writes a single row, then the gold staff-approved stamp seals it — nothing sends without sign-off.',
  },
  {
    num: '04',
    eyebrow: 'Verification',
    badge: 'PMS-VERIFIED',
    badgeTone: 'sage' as const,
    title: 'A booking counts once the deposit lands.',
    body: 'A booking is only \u201cVerified\u201d once the deposit is recorded in your PMS and the appointment is synced. We report deposits, not leads. Receipt-grade audit trail.',
    status: 'DEPOSIT VERIFIED · $1,800',
    visual: 'Verified marks pop in row by row — each one a deposit confirmed in your PMS, not a vanity lead.',
  },
];

/**
 * SINGLE-CANVAS morphing ledger — fixes the 3-separate-canvas bug.
 * One persistent canvas, one ledger mesh, morphing across 4 states
 * driven by scroll position via stateRef.
 *
 * State 0: BAA seal materializing (gold lock appears)
 * State 1: empty pages, magnifying glass sweeping
 * State 2: pen writing a row, staff-approved stamp
 * State 3: filled rows, verified marks popping in staggered
 */
function MorphingLedger({ stateRef }: { stateRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const baaSeal = useRef<THREE.Mesh>(null);
  const magGlass = useRef<THREE.Group>(null);
  const pen = useRef<THREE.Group>(null);
  const stamp = useRef<THREE.Mesh>(null);
  const verifiedMarks = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const s = stateRef.current; // 0 → 4

    group.current.position.y = Math.sin(t * 0.8) * 0.03;
    group.current.rotation.y = -0.18 + Math.sin(t * 0.3) * 0.03;

    // BAA seal — visible in state 0, persists
    if (baaSeal.current) {
      const sealT = Math.max(0, Math.min(1, (1 - Math.abs(s - 0)) * 2));
      baaSeal.current.visible = sealT > 0.01;
      const overshoot = 1 + Math.sin(sealT * Math.PI) * 0.2 * (1 - sealT * 0.5);
      baaSeal.current.scale.setScalar(sealT * overshoot);
    }

    // Magnifying glass — state 1
    if (magGlass.current) {
      const vis1 = Math.max(0, 1 - Math.abs(s - 1));
      magGlass.current.visible = vis1 > 0.01;
      magGlass.current.position.x = -0.5 + ((Math.sin(t * 0.6) + 1) / 2) * 1.2;
      magGlass.current.position.y = 0.1 + Math.sin(t * 0.4) * 0.15;
      magGlass.current.scale.setScalar(vis1);
    }

    // Pen — state 2
    if (pen.current) {
      const vis2 = Math.max(0, 1 - Math.abs(s - 2));
      pen.current.visible = vis2 > 0.01;
      const writeT = Math.max(0, Math.min(1, s - 1.5));
      pen.current.position.x = -0.7 + writeT * 1.4;
      pen.current.scale.setScalar(vis2);
    }

    // Staff-approved stamp — state 2
    if (stamp.current) {
      const stampT = Math.max(0, Math.min(1, (s - 1.8) / 0.6));
      stamp.current.visible = stampT > 0.01;
      const overshoot = 1 + Math.sin(stampT * Math.PI) * 0.25 * (1 - stampT * 0.5);
      stamp.current.scale.setScalar(stampT * overshoot);
    }

    // Verified marks — state 3 (staggered pop)
    if (verifiedMarks.current) {
      verifiedMarks.current.children.forEach((child, i) => {
        const stagger = 2.5 + i * 0.12;
        const popT = Math.max(0, Math.min(1, (s - stagger) / 0.3));
        const overshoot = 1 + Math.sin(popT * Math.PI) * 0.3 * (1 - popT * 0.5);
        child.scale.setScalar(popT * overshoot);
        (child as THREE.Object3D).visible = popT > 0.01;
      });
    }
  });

  return (
    <group ref={group} rotation={[-0.06, -0.18, 0]}>
      {/* Gold base frame */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.38, 1.68, 0.14]} />
        <meshStandardMaterial color={GOLD} roughness={0.28} metalness={0.82} emissive={GOLD} emissiveIntensity={0.14} />
      </mesh>
      {/* Cream top */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[2.28, 1.58, 0.13]} />
        <meshStandardMaterial color={CREAM} roughness={0.92} />
      </mesh>
      {/* Teal spine */}
      <mesh position={[-1.17, 0, 0.04]}>
        <boxGeometry args={[0.04, 1.64, 0.16]} />
        <meshStandardMaterial color={TEAL_DEEP} roughness={0.55} metalness={0.2} />
      </mesh>

      {/* Row lines */}
      {[-0.5, -0.28, -0.06, 0.16, 0.38].map((y, i) => (
        <mesh key={i} position={[0.02, y, 0.09]}>
          <planeGeometry args={[1.9, 0.005]} />
          <meshStandardMaterial color={SAND} roughness={1} />
        </mesh>
      ))}

      {/* STATE 0 — BAA seal */}
      <mesh ref={baaSeal} position={[0, 0.15, 0.1]} visible={false}>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial color={TEAL} roughness={0.3} metalness={0.5} emissive={TEAL} emissiveIntensity={0.25} transparent opacity={0.9} />
      </mesh>

      {/* STATE 1 — magnifying glass */}
      <group ref={magGlass} position={[0, 0.1, 0.4]}>
        <mesh>
          <torusGeometry args={[0.22, 0.022, 16, 32]} />
          <meshStandardMaterial color={TEAL} roughness={0.35} metalness={0.4} />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 0.22, 8]} />
          <meshStandardMaterial color={TEAL_DEEP} roughness={0.5} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.2, 24]} />
          <meshStandardMaterial color={TEAL} transparent opacity={0.12} roughness={0.1} />
        </mesh>
      </group>

      {/* STATE 2 — pen + staff-approved stamp */}
      <group ref={pen} position={[0, -0.06, 0.18]} rotation={[0, 0, -0.3]} visible={false}>
        <mesh>
          <cylinderGeometry args={[0.028, 0.028, 0.5, 12]} />
          <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.28, 0]}>
          <coneGeometry args={[0.028, 0.08, 12]} />
          <meshStandardMaterial color={INK} roughness={0.4} />
        </mesh>
      </group>
      <mesh ref={stamp} position={[0.82, 0.38, 0.06]} visible={false}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.5} emissive={GOLD} emissiveIntensity={0.3} />
      </mesh>

      {/* STATE 3 — verified marks */}
      <group ref={verifiedMarks} position={[0, 0, 0.09]}>
        {[-0.5, -0.28, -0.06, 0.16, 0.38].map((y, i) => (
          <mesh key={i} position={[0.9, y, 0.01]} visible={false}>
            <circleGeometry args={[0.04, 16]} />
            <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.5} emissive={GOLD} emissiveIntensity={0.35} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function HowItWorksCanvas({ stateRef }: { stateRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 5, 6]} intensity={1.3} color="#FFF6E0" />
        <directionalLight position={[-4, 2, 3]} intensity={0.6} color="#FFE9C9" />
        <directionalLight position={[-2, -2, 2]} intensity={0.4} color={TEAL} />
        <pointLight position={[0, 0, 3]} intensity={0.5} color={GOLD} />
        <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.18}>
          <MorphingLedger stateRef={stateRef} />
        </Float>
      </Suspense>
    </Canvas>
  );
}

export default function HowItWorks3D() {
  const reduced = useReducedMotion();
  const lowPower = useLowPower();
  const stateRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const useFallback = reduced || lowPower;

  return (
    <Pillar id="protocol" tone="cream-deep" py="normal">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow tone="sage">
            <span className="h-1 w-1 rounded-full bg-sage" />
            04 · The recovery protocol
          </Eyebrow>
          <SectionHeading className="mt-5">
            From missed inquiry to verified deposit —{' '}
            <span className="text-sage-deep italic">in four governed gates.</span>
          </SectionHeading>
          <Lead className="mt-6">
            The same ledger, in four states. Every recovery moves through this protocol —
            governance first, trust built into each gate, not bolted on at the end.
          </Lead>
        </div>

        {useFallback ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {PANELS.map((p, i) => (
              <FallbackPanel key={p.num} panel={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
            {/* LEFT — single persistent canvas (mounts ONCE, morphs across 4 states) */}
            <div className="lg:sticky lg:top-28 h-[360px] md:h-[440px] lg:h-[520px]">
              <HowItWorksCanvas stateRef={stateRef} />
            </div>

            {/* RIGHT — scrolling panels that drive the morph */}
            <div className="space-y-20 lg:space-y-28">
              {PANELS.map((panel, i) => (
                <Panel
                  key={panel.num}
                  panel={panel}
                  index={i}
                  active={activeIdx === i}
                  onEnter={() => {
                    stateRef.current = i;
                    setActiveIdx(i);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </Pillar>
  );
}

function Panel({
  panel,
  index,
  active,
  onEnter,
}: {
  panel: (typeof PANELS)[number];
  index: number;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <motion.div
      onViewportEnter={onEnter}
      viewport={{ amount: 0.5 }}
      className="min-h-[50vh] flex items-center"
    >
      <div className="w-full">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage-deep">{panel.num}</span>
          <span className={panel.badgeTone === 'gold' ? 'gold-pill' : 'sage-pill'}>{panel.badge}</span>
          {active && (
            <motion.span
              layoutId="active-dot"
              className="h-1.5 w-1.5 rounded-full bg-gold"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist/80 mb-2">{panel.eyebrow}</p>
        <h3 className="font-display text-3xl lg:text-4xl leading-[1.1] text-ink">{panel.title}</h3>
        <p className="mt-5 font-sans text-base leading-[1.6] text-mist max-w-md">{panel.body}</p>

        {/* Visual caption — explains what the 3D canvas is showing right now */}
        <div className={cn(
          'mt-6 flex items-start gap-2.5 px-4 py-3 rounded-xl border transition-colors duration-300',
          active ? 'bg-sage-soft/40 border-sage/30' : 'bg-cream border-sand-deep/40'
        )}>
          <span className={cn(
            'mt-0.5 flex items-center justify-center h-4 w-4 rounded-full shrink-0 text-[9px] font-mono font-bold transition-colors',
            active ? 'bg-sage-deep text-cream' : 'bg-sand-deep text-mist'
          )} aria-hidden>
            ↗
          </span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-sage-deep mb-0.5">
              {active ? 'Watching now' : 'Visual'}
            </p>
            <p className="font-sans text-sm leading-[1.5] text-ink/80">{panel.visual}</p>
          </div>
        </div>

        {/* Status line */}
        <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream border border-sand-deep/50">
          <span className={cn('h-1.5 w-1.5 rounded-full transition-colors', active ? 'bg-sage' : 'bg-mist/40')} aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-sage-deep">{panel.status}</span>
        </div>
      </div>
    </motion.div>
  );
}

function FallbackPanel({
  panel,
  index,
}: {
  panel: (typeof PANELS)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
      className="p-7 rounded-2xl bg-cream border border-sand-deep/50"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage-deep">{panel.num}</span>
        <span className={panel.badgeTone === 'gold' ? 'gold-pill' : 'sage-pill'}>{panel.badge}</span>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist/80 mb-2">{panel.eyebrow}</p>
      <h3 className="font-display text-xl leading-[1.15] text-ink">{panel.title}</h3>
      <p className="mt-4 font-sans text-sm leading-[1.6] text-mist">{panel.body}</p>
      <div className="mt-6 pt-5 border-t border-sand-deep/40 inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-sage-deep">{panel.status}</span>
      </div>
    </motion.div>
  );
}
