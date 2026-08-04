'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';
import DeferredEffectComposer from './deferred-effect-composer';
import * as THREE from 'three';

/* ────────────────────────────────────────────────────────────────────────
   LEAK SCENE — Glass orb cracks → gold drips → sage shield catches

   Driven by a single `leakProgress` MotionValue (0 → 1) that comes from
   Framer Motion's useScroll on the parent section. We read its current
   value inside useFrame via .get() — no React re-render needed.

   Act map:
     0.00 - 0.25  Orb intact, faintly pulsing (warm luxury)
     0.25 - 0.55  Orb cracks open: shell splits vertically, liquid exposed
     0.55 - 0.85  Gold particles drip downward into the void
     0.85 - 1.00  Sage glass shield rises and catches the flow (recovery)
   ──────────────────────────────────────────────────────────────────────── */

interface LeakSceneProps {
  leakProgress: { get: () => number };
}

const GOLD = '#C5A059';
const GOLD_DEEP = '#8A6A2E';
const SAGE = '#8FA98A';
const CREAM = '#F8F3EA';

/* ── Cracking glass orb (shell splits at progress > 0.25) ── */
function CrackingOrb({ progressRef }: { progressRef: { get: () => number } }) {
  const leftHalfRef = useRef<THREE.Group>(null!);
  const rightHalfRef = useRef<THREE.Group>(null!);
  const liquidRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const p = progressRef.get();
    const t = state.clock.elapsedTime;

    // Crack open: left half slides -X, right half slides +X, both rotate slightly
    const crack = THREE.MathUtils.smoothstep(p, 0.25, 0.6);
    if (leftHalfRef.current) {
      leftHalfRef.current.position.x = -crack * 0.55;
      leftHalfRef.current.rotation.z = crack * 0.18;
    }
    if (rightHalfRef.current) {
      rightHalfRef.current.position.x = crack * 0.55;
      rightHalfRef.current.rotation.z = -crack * 0.18;
    }

    // Liquid core shrinks as it drains
    if (liquidRef.current) {
      const drain = THREE.MathUtils.smoothstep(p, 0.45, 0.95);
      const breathe = 1 + Math.sin(t * 1.4) * 0.02;
      liquidRef.current.scale.setScalar((1 - drain * 0.75) * breathe);
      const mat = liquidRef.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = 0.32 + (1 - drain) * 0.0 + Math.sin(t * 2) * 0.06;
    }

    // Filament ring fades as the orb cracks
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.opacity = 1 - crack * 0.9;
        mat.transparent = true;
      }
      ringRef.current.rotation.z = t * 0.25;
      ringRef.current.scale.setScalar(1 + crack * 0.08);
    }
  });

  // Half-icosahedron shells: use clipping by positioning camera-friendly halves.
  // Simpler: two full icosahedrons, each masked via clipping plane. But clipping
  // is heavy in transmission; instead we use two half-open shells by scaling
  // each one asymmetrically. Practical compromise: two thin shells offset.
  return (
    <group>
      {/* Left half of glass shell */}
      <group ref={leftHalfRef} position={[-0.02, 0, 0]}>
        <mesh scale={[-1, 1, 1]}>
          <icosahedronGeometry args={[1.2, 4]} />
          <MeshTransmissionMaterial
            transmission={1.0}
            thickness={0.45}
            roughness={0.1}
            ior={1.4}
            chromaticAberration={0.05}
            distortion={0.05}
            distortionScale={0.18}
            temporalDistortion={0.08}
            color={CREAM}
            attenuationColor="#F0E8D8"
            attenuationDistance={2.2}
            resolution={512}
            samples={5}
          />
        </mesh>
      </group>

      {/* Right half of glass shell */}
      <group ref={rightHalfRef} position={[0.02, 0, 0]}>
        <mesh>
          <icosahedronGeometry args={[1.2, 4]} />
          <MeshTransmissionMaterial
            transmission={1.0}
            thickness={0.45}
            roughness={0.1}
            ior={1.4}
            chromaticAberration={0.05}
            distortion={0.05}
            distortionScale={0.18}
            temporalDistortion={0.08}
            color={CREAM}
            attenuationColor="#F0E8D8"
            attenuationDistance={2.2}
            resolution={512}
            samples={5}
          />
        </mesh>
      </group>

      {/* Gold liquid core */}
      <mesh ref={liquidRef} scale={0.85}>
        <icosahedronGeometry args={[1.0, 5]} />
        <MeshDistortMaterial
          color={GOLD}
          metalness={0.4}
          roughness={0.12}
          emissive={GOLD_DEEP}
          emissiveIntensity={0.32}
          distort={0.32}
          speed={2.2}
        />
      </mesh>

      {/* Gold filament ring (fades as orb cracks) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.42, 0.01, 12, 96]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1.0}
          roughness={0.18}
          emissive={GOLD}
          emissiveIntensity={0.4}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}

/* ── Dripping gold particles (instancedMesh for perf) ── */
function GoldDrips({ progressRef, count = 80 }: { progressRef: { get: () => number }; count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Per-particle seed state
  const seeds = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        // Start position: scattered around the orb center
        startX: (Math.random() - 0.5) * 0.9,
        startZ: (Math.random() - 0.5) * 0.9,
        // Fall distance (below the orb)
        fallY: -2.6 - Math.random() * 0.8,
        // Delay (0..0.4) — particles don't all start together
        delay: Math.random() * 0.4,
        // Speed multiplier
        speed: 0.8 + Math.random() * 0.5,
        // Size variation
        size: 0.025 + Math.random() * 0.035,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const p = progressRef.get();
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      // Particle active window: p between (0.5 + delay) and (0.95)
      const localP = THREE.MathUtils.clamp((p - 0.5 - s.delay) * 2.4 * s.speed, 0, 1);
      // Eased fall
      const eased = localP * localP;

      const x = s.startX + Math.sin(t * 1.2 + i) * 0.04;
      const y = -eased * s.fallY; // 0 → fallY (downward)
      const z = s.startZ + Math.cos(t * 0.8 + i) * 0.04;

      dummy.position.set(x, y, z);
      // Shrinks slightly as it falls (giving the impression of stretching)
      const scale = s.size * (1 - eased * 0.25);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color={GOLD}
        metalness={0.6}
        roughness={0.15}
        emissive={GOLD}
        emissiveIntensity={0.5}
      />
    </instancedMesh>
  );
}

/* ── Sage glass shield that rises at the end (recovery) ── */
function SageShield({ progressRef }: { progressRef: { get: () => number } }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const p = progressRef.get();
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;

    // Shield rises between p = 0.75 and 1.0
    const rise = THREE.MathUtils.smoothstep(p, 0.75, 1.0);
    meshRef.current.position.y = -2.6 + rise * 1.6; // rises from -2.6 to -1.0
    meshRef.current.position.z = -0.15;
    // Slight wobble once risen
    meshRef.current.rotation.x = -0.4 + Math.sin(t * 1.5) * 0.02 * rise;
    // Opacity in
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    if (mat) {
      mat.opacity = rise * 0.82;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2.6, -0.15]} rotation={[-0.4, 0, 0]}>
      <cylinderGeometry args={[1.5, 1.5, 0.12, 48, 1, false]} />
      <meshPhysicalMaterial
        color={SAGE}
        metalness={0.1}
        roughness={0.15}
        transmission={0.85}
        thickness={0.5}
        ior={1.35}
        transparent
        opacity={0}
        emissive={SAGE}
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

/* ── Lighting — same family as hero, slightly cooler as leak progresses ── */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} color={CREAM} />
      <directionalLight position={[4, 5, 4]} intensity={0.9} color={CREAM} />
      <directionalLight position={[-4, 1, -3]} intensity={0.4} color={SAGE} />
      {/* Gold underglow (fading as liquid drains is handled by liquid scaling) */}
      <pointLight position={[0, -0.8, 0.8]} intensity={1.3} color={GOLD} distance={3.8} decay={2} />
      {/* Catch light on the shield from below */}
      <pointLight position={[0, -2.0, 1.0]} intensity={0.5} color={SAGE} distance={3.0} decay={2} />
    </>
  );
}

function PostFX() {
  return (
    <DeferredEffectComposer
      bloom={{ luminanceThreshold: 0.4, luminanceSmoothing: 0.85, intensity: 0.5, radius: 0.7 }}
      vignette={{ offset: 0.3, darkness: 0.6 }}
    />
  );
}

/* ── Exported scene ── */
export default function LeakScene({ leakProgress }: LeakSceneProps) {
  return (
    <>
      <SceneLights />
      <CrackingOrb progressRef={leakProgress} />
      <GoldDrips progressRef={leakProgress} count={80} />
      <SageShield progressRef={leakProgress} />
      <PostFX />
    </>
  );
}
