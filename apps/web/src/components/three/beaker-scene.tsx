'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import DeferredEffectComposer from './deferred-effect-composer';
import * as THREE from 'three';

/* ────────────────────────────────────────────────────────────────────────
   BEAKER SCENE — Reactive 3D glass cylinder that fills with gold liquid

   Driven by `monthlyRevenue` (0 .. ~60000). The liquid level animates
   via spring physics (no React re-render on slider drag — the parent
   passes a ref so we read .get() per-frame).

   Components:
     - Glass cylinder (MeshTransmissionMaterial — matches hero orb)
     - Gold liquid (cylinder, scales Y based on revenue/maxRevenue)
     - Liquid surface ripple (animated via useFrame on top vertices)
     - ~20 gold particles suspended in the liquid (instancedMesh)
     - Minimal bloom on the gold surface

   Camera: static ¾ angle.
   ──────────────────────────────────────────────────────────────────────── */

const GOLD = '#C5A059';
const GOLD_DEEP = '#8A6A2E';
const SAGE = '#8FA98A';
const CREAM = '#F8F3EA';
const MAX_REVENUE = 60000;

interface BeakerSceneProps {
  /** Pass a ref to a number so slider drags don't trigger React re-renders */
  monthlyRevenueRef: { get: () => number };
}

/* ── Gold liquid with rippling surface ── */
function GoldLiquid({ revenueRef }: { revenueRef: { get: () => number } }) {
  const liquidRef = useRef<THREE.Mesh>(null!);
  const surfaceRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // The smoothed fill level (spring)
  const smoothedLevel = useRef(0);

  // Build a high-res cylinder geometry for the liquid so we can ripple the top
  const liquidGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.62, 0.62, 1.0, 48, 8, false);
    return geo;
  }, []);

  // Particle seeds (reduced from 40 → 20 for GPU savings; visually imperceptible)
  const particleSeeds = useMemo(() => {
    const arr: { x: number; y: number; z: number; size: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 0.95,
        y: (Math.random() - 0.5) * 1.6,
        z: (Math.random() - 0.5) * 0.95,
        size: 0.012 + Math.random() * 0.018,
        speed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const target = Math.min(revenueRef.get() / MAX_REVENUE, 1);
    // Spring-smoothed level
    smoothedLevel.current += (target - smoothedLevel.current) * 0.08;

    const level = smoothedLevel.current;
    // Liquid sits inside the beaker: beaker interior ~1.4 tall, centered at y=-0.2
    // Liquid bottom at y = -0.9, fills up to y = -0.9 + level * 1.4
    const liquidHeight = Math.max(0.01, level * 1.4);
    const liquidY = -0.9 + liquidHeight / 2;

    if (liquidRef.current) {
      liquidRef.current.scale.y = liquidHeight;
      liquidRef.current.position.y = liquidY;
      // Pulse emissive as the level rises
      const mat = liquidRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.25 + level * 0.15 + Math.sin(t * 2) * 0.04;
      }
    }

    // Ripple the top "surface" — a thin disc that sits on top of the liquid
    if (surfaceRef.current) {
      surfaceRef.current.position.y = -0.9 + liquidHeight;
      surfaceRef.current.visible = level > 0.005;
      // Wobble the surface
      surfaceRef.current.rotation.z = Math.sin(t * 1.5) * 0.02 * level;
      surfaceRef.current.scale.x = 1 + Math.sin(t * 2) * 0.01;
      surfaceRef.current.scale.z = 1 + Math.cos(t * 1.7) * 0.01;
      const sm = surfaceRef.current.material as THREE.MeshStandardMaterial;
      if (sm) sm.opacity = 0.85 * Math.min(level * 4, 1);
    }

    // Suspended particles — only visible portion (inside the liquid height)
    if (particlesRef.current) {
      particlesRef.current.visible = level > 0.01;
      for (let i = 0; i < particleSeeds.length; i++) {
        const s = particleSeeds[i];
        const floatY = s.y + Math.sin(t * s.speed + s.phase) * 0.06;
        // Clamp particle Y to be inside the liquid
        const clampedY = Math.max(-0.88, Math.min(-0.9 + liquidHeight - 0.02, floatY * (liquidHeight / 1.6)));
        const x = s.x + Math.sin(t * s.speed * 0.7 + s.phase) * 0.02;
        const z = s.z + Math.cos(t * s.speed * 0.6 + s.phase) * 0.02;
        dummy.position.set(x, clampedY, z);
        dummy.scale.setScalar(s.size);
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Main liquid body */}
      <mesh ref={liquidRef} geometry={liquidGeometry} scale={[1, 0.01, 1]} position={[0, -0.89, 0]}>
        <meshStandardMaterial
          color={GOLD}
          metalness={0.5}
          roughness={0.18}
          emissive={GOLD_DEEP}
          emissiveIntensity={0.28}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Liquid surface (thin disc on top) */}
      <mesh ref={surfaceRef} position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 48]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.6}
          roughness={0.1}
          emissive={GOLD}
          emissiveIntensity={0.35}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Suspended gold particles inside the liquid (reduced 40 → 20 for perf) */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, 20]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.7}
          roughness={0.12}
          emissive={GOLD}
          emissiveIntensity={0.5}
        />
      </instancedMesh>
    </group>
  );
}

/* ── Glass beaker (cylinder) ── */
function GlassBeaker() {
  return (
    <group>
      {/* Main beaker body — glass cylinder */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.7, 0.65, 1.6, 48, 1, true]} />
        <MeshTransmissionMaterial
          transmission={1.0}
          thickness={0.3}
          roughness={0.06}
          ior={1.45}
          chromaticAberration={0.04}
          distortion={0.02}
          distortionScale={0.1}
          temporalDistortion={0.05}
          color={CREAM}
          attenuationColor="#F0E8D8"
          attenuationDistance={2.0}
          resolution={512}
          samples={5}
        />
      </mesh>

      {/* Beaker base (solid disc) */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.04, 48]} />
        <MeshTransmissionMaterial
          transmission={0.9}
          thickness={0.4}
          roughness={0.08}
          ior={1.45}
          color={CREAM}
          resolution={256}
          samples={4}
        />
      </mesh>

      {/* Beaker rim (thin torus on top) */}
      <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.018, 12, 64]} />
        <meshStandardMaterial
          color={CREAM}
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

/* ── Lights — match hero scene family ── */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.28} color={CREAM} />
      <directionalLight position={[3, 5, 4]} intensity={1.0} color={CREAM} />
      <directionalLight position={[-4, 1, -3]} intensity={0.4} color={SAGE} />
      {/* Gold underglow to make the liquid glow from below */}
      <pointLight position={[0, -1.5, 0.6]} intensity={1.2} color={GOLD} distance={3.5} decay={2} />
      {/* Subtle fill from camera-left */}
      <directionalLight position={[-3, -1, 4]} intensity={0.22} color="#F0E8D8" />
    </>
  );
}

function PostFX() {
  return (
    <DeferredEffectComposer
      bloom={{ luminanceThreshold: 0.4, luminanceSmoothing: 0.85, intensity: 0.42, radius: 0.7 }}
      vignette={{ offset: 0.3, darkness: 0.5 }}
    />
  );
}

/* ── Exported scene ── */
export default function BeakerScene({ monthlyRevenueRef }: BeakerSceneProps) {
  return (
    <>
      <SceneLights />
      <GlassBeaker />
      <GoldLiquid revenueRef={monthlyRevenueRef} />
      <PostFX />
    </>
  );
}
