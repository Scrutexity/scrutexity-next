'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Text } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroLedger3D — the cinematic 3D layer for the hero.
 *
 * A floating low-poly ledger book (~8K tris) with inquiry particles
 * drifting in from the right. Each particle morphs into a row entry
 * (visualized only — the real rows live in the 2D NarrativeLedger
 * sitting on top of this canvas).
 *
 * Performance budget:
 *   - ~12K total triangles
 *   - ~6 draw calls
 *   - dpr capped at [1, 2]
 *   - frameloop="demand" when out of view (handled by parent)
 *
 * This component ONLY mounts when:
 *   - URL has ?cinematic=1
 *   - device is NOT low-power
 *   - prefers-reduced-motion is NOT reduce
 *   - hero is in view
 */

// Brand palette — sourced from src/app/globals.css @theme tokens.
// (No "gold" exists in the design system; the warm accent is CLAY.)
const SAGE = '#8FA98A';        // --color-sage
const SAGE_DEEP = '#5E7A5A';   // --color-sage-deep
const CLAY = '#B7896B';        // --color-clay
const CLAY_DEEP = '#8A533B';   // --color-clay-deep
const CREAM = '#F8F3EA';       // --color-cream
const CREAM_DEEP = '#F0E8D8';  // --color-beige (deeper cream)
const INK = '#1C1814';         // --color-ink / --color-espresso
const SAND = '#D9CCB0';        // --color-sand-deep
const MIST = '#6B6259';        // --color-mist

/** The ledger book — low-poly, cream pages, gold edge. */
function LedgerBook() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle bob (amplitude 0.04, period 4s)
    group.current.position.y = Math.sin(t * (Math.PI / 2)) * 0.04;
    // Subtle yaw
    group.current.rotation.y = -0.18 + Math.sin(t * 0.3) * 0.04;
  });

  return (
    <group ref={group} rotation={[-0.08, -0.18, 0]} position={[0, 0, 0]}>
      {/* Book cover — back */}
      <mesh position={[-0.02, 0, -0.04]} castShadow>
        <boxGeometry args={[2.4, 1.7, 0.04]} />
        <meshStandardMaterial color={SAGE_DEEP} roughness={0.7} />
      </mesh>
      {/* Pages — cream */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.32, 1.62, 0.06]} />
        <meshStandardMaterial color={CREAM} roughness={0.95} />
      </mesh>
      {/* Gold edge — thin strip on the right */}
      <mesh position={[1.18, 0, 0]}>
        <boxGeometry args={[0.02, 1.62, 0.07]} />
        <meshStandardMaterial color={CLAY} roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Spine — left */}
      <mesh position={[-1.18, 0, 0]}>
        <boxGeometry args={[0.04, 1.7, 0.07]} />
        <meshStandardMaterial color={SAGE_DEEP} roughness={0.7} />
      </mesh>

      {/* Row lines on the page (visual suggestion) */}
      {[-0.55, -0.32, -0.09, 0.14, 0.37, 0.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0.032]}>
          <boxGeometry args={[2.0, 0.005, 0.001]} />
          <meshStandardMaterial color={SAND} roughness={1} />
        </mesh>
      ))}

      {/* A gold verified mark on the top-right of the page */}
      <mesh position={[0.85, 0.65, 0.034]}>
        <circleGeometry args={[0.07, 24]} />
        <meshStandardMaterial color={CLAY} roughness={0.3} metalness={0.4} emissive={CLAY} emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

/** Central governed recovery core — the visual replacement for a Spline prism. */
function RecoveryCore() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.28;
    group.current.rotation.z = Math.sin(t * 0.45) * 0.05;
  });

  return (
    <group ref={group} position={[-0.2, 0.08, 0.08]}>
      <mesh>
        <octahedronGeometry args={[0.46, 1]} />
        <meshStandardMaterial
          color={CREAM_DEEP}
          roughness={0.22}
          metalness={0.08}
          transparent
          opacity={0.54}
          emissive={SAGE}
          emissiveIntensity={0.08}
        />
      </mesh>
      {[0.68, 0.9, 1.14].map((radius, i) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, i * 0.7]}>
          <torusGeometry args={[radius, 0.008, 8, 96]} />
          <meshStandardMaterial
            color={i === 2 ? CLAY : SAGE_DEEP}
            roughness={0.35}
            emissive={i === 2 ? CLAY : SAGE}
            emissiveIntensity={0.18}
          />
        </mesh>
      ))}
      <Text
        position={[0, -0.76, 0.02]}
        fontSize={0.075}
        color={SAGE_DEEP}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        GOVERNED ENGINE
      </Text>
    </group>
  );
}

/** A single inquiry particle — small card-shaped plane with a label. */
function InquiryParticle({
  label,
  path,
  delay,
  speed,
}: {
  label: string;
  path: { start: THREE.Vector3; mid: THREE.Vector3; end: THREE.Vector3 };
  delay: number;
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    progress.current += delta * speed * 0.18;
    const p = (progress.current + delay) % 1;

    // Quadratic bezier through start → mid → end
    const t = p;
    const oneMinusT = 1 - t;
    const x = oneMinusT * oneMinusT * path.start.x + 2 * oneMinusT * t * path.mid.x + t * t * path.end.x;
    const y = oneMinusT * oneMinusT * path.start.y + 2 * oneMinusT * t * path.mid.y + t * t * path.end.y;
    const z = oneMinusT * oneMinusT * path.start.z + 2 * oneMinusT * t * path.mid.z + t * t * path.end.z;

    ref.current.position.set(x, y, z);
    ref.current.rotation.z = -t * 0.3;

    // Fade in (0-0.15) and out (0.85-1.0)
    const opacity = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1;
    ref.current.scale.setScalar(opacity);
  });

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[0.5, 0.18]} />
        <meshStandardMaterial color={CREAM} roughness={0.9} transparent opacity={0.94} />
      </mesh>
      <Text
        position={[0, 0, 0.002]}
        fontSize={0.06}
        color={INK}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
      >
        {label}
      </Text>
    </group>
  );
}

function DepositReceipt({
  label,
  amount,
  position,
  delay,
}: {
  label: string;
  amount: string;
  position: [number, number, number];
  delay: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime() + delay;
    group.current.position.y = position[1] + Math.sin(t * 1.15) * 0.035;
    group.current.rotation.z = Math.sin(t * 0.75) * 0.025;
  });

  return (
    <group ref={group} position={position} rotation={[0, -0.18, 0]}>
      <mesh>
        <planeGeometry args={[0.7, 0.34]} />
        <meshStandardMaterial color={CREAM} roughness={0.82} transparent opacity={0.96} />
      </mesh>
      <mesh position={[0.24, 0.11, 0.006]}>
        <circleGeometry args={[0.06, 24]} />
        <meshStandardMaterial
          color={CLAY}
          roughness={0.3}
          metalness={0.28}
          emissive={CLAY}
          emissiveIntensity={0.25}
        />
      </mesh>
      <Text position={[-0.08, 0.08, 0.008]} fontSize={0.052} color={MIST} anchorX="center" letterSpacing={0.16}>
        {label}
      </Text>
      <Text position={[-0.08, -0.06, 0.008]} fontSize={0.105} color={INK} anchorX="center">
        {amount}
      </Text>
      <Text position={[0.24, 0.105, 0.012]} fontSize={0.052} color={CREAM} anchorX="center">
        ✓
      </Text>
    </group>
  );
}

function CalendarBlock({ position, delay }: { position: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() + delay;
    ref.current.scale.setScalar(0.98 + Math.sin(t * 1.4) * 0.018);
  });

  return (
    <group ref={ref} position={position} rotation={[0, -0.22, 0]}>
      <mesh>
        <boxGeometry args={[0.34, 0.24, 0.035]} />
        <meshStandardMaterial color={SAGE} roughness={0.62} transparent opacity={0.86} />
      </mesh>
      <mesh position={[0, 0.09, 0.022]}>
        <boxGeometry args={[0.34, 0.035, 0.006]} />
        <meshStandardMaterial color={CLAY_DEEP} roughness={0.42} />
      </mesh>
    </group>
  );
}

function FlowRails() {
  const leftPath = [
    new THREE.Vector3(-3.05, 0.84, -0.18),
    new THREE.Vector3(-1.65, 0.48, -0.05),
    new THREE.Vector3(-0.58, 0.12, 0.08),
  ];
  const rightPath = [
    new THREE.Vector3(0.2, 0.12, 0.08),
    new THREE.Vector3(1.15, 0.36, 0.02),
    new THREE.Vector3(2.45, 0.5, -0.1),
  ];

  return (
    <>
      <Line points={leftPath} color={SAGE_DEEP} lineWidth={1.2} transparent opacity={0.55} dashed dashSize={0.08} gapSize={0.06} />
      <Line points={rightPath} color={CLAY} lineWidth={1.35} transparent opacity={0.72} dashed dashSize={0.08} gapSize={0.06} />
    </>
  );
}

/** Scene composition. */
function Scene() {
  const particles = useMemo(
    () =>
      [
        { label: 'DM', start: [-3.2, 1.1, -0.45], mid: [-1.65, 0.55, -0.2], end: [-0.45, 0.25, 0.08], delay: 0.0, speed: 1.0 },
        { label: 'CALL', start: [-3.35, 0.35, -0.35], mid: [-1.75, 0.12, -0.12], end: [-0.44, -0.06, 0.08], delay: 0.25, speed: 0.9 },
        { label: 'FORM', start: [-3.2, -0.46, -0.42], mid: [-1.62, -0.24, -0.14], end: [-0.44, -0.42, 0.08], delay: 0.5, speed: 1.1 },
        { label: 'VOICEMAIL', start: [-3.35, -1.12, -0.58], mid: [-1.72, -0.64, -0.24], end: [-0.44, -0.76, 0.08], delay: 0.75, speed: 0.95 },
      ].map((p) => ({
        ...p,
        start: new THREE.Vector3(...p.start),
        mid: new THREE.Vector3(...p.mid),
        end: new THREE.Vector3(...p.end),
      })),
    []
  );

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} color={CREAM} />
      <directionalLight position={[-3, -2, 2]} intensity={0.3} color={SAGE} />
      <fog attach="fog" args={[CREAM_DEEP, 5.6, 8.8]} />

      <FlowRails />

      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25}>
        <group position={[1.35, -0.14, -0.04]} scale={0.92}>
          <LedgerBook />
        </group>
      </Float>

      <RecoveryCore />

      {particles.map((p, i) => (
        <InquiryParticle key={i} label={p.label} path={p} delay={p.delay} speed={p.speed} />
      ))}

      <DepositReceipt label="DEPOSIT" amount="$2,450" position={[2.54, 0.72, -0.12]} delay={0.1} />
      <DepositReceipt label="BOOKED" amount="$1,800" position={[2.86, 0.08, -0.28]} delay={0.55} />
      <DepositReceipt label="VERIFIED" amount="$3,200" position={[2.48, -0.58, -0.18]} delay={1.05} />

      <CalendarBlock position={[1.72, -1.05, -0.06]} delay={0.1} />
      <CalendarBlock position={[2.12, -1.05, -0.08]} delay={0.45} />
      <CalendarBlock position={[2.52, -1.05, -0.1]} delay={0.8} />

      <Text
        position={[-2.55, 1.42, -0.3]}
        fontSize={0.09}
        color={MIST}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        INQUIRIES LEAKING
      </Text>
      <Text
        position={[2.45, 1.28, -0.3]}
        fontSize={0.09}
        color={CLAY_DEEP}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        PMS VERIFIED
      </Text>

      {/* Bloom gives the gold verified mark its cinematic glow.
          Vignette darkens edges slightly to draw focus to the ledger. */}
      <EffectComposer>
        <Bloom
          intensity={0.45}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.15} darkness={0.35} />
      </EffectComposer>
    </>
  );
}

export default function HeroLedger3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0.42, 0.02, 4.45], fov: 39 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
}
