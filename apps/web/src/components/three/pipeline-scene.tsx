'use client';

import { useRef, useMemo } from 'react';
import type { ReactElement } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import DeferredEffectComposer from './deferred-effect-composer';
import * as THREE from 'three';

/* ────────────────────────────────────────────────────────────────────────
   PIPELINE SCENE — Scroll-orchestrated 3D protocol visualization

   Driven by a discrete `step` prop (0 | 1 | 2). The scene interpolates
   between three "presences" using spring-smoothed values inside useFrame.
   No useScroll here — the parent tracks scroll via IntersectionObserver
   and passes the active step.

   Step 0 — DIAGNOSTIC AUDIT (READ-ONLY)
     Glowing connection node + thin beam to the PMS block on the right.
     Floating "READ-ONLY" label.

   Step 1 — AUTHORIZED RECOVERY (PERMISSIONED)
     Sage-tinted laser grid. ~50 gold particles flow downward through it.
     ~20% are gently deflected sideways (filtered unqualified leads).

   Step 2 — VERIFICATION (PMS-VERIFIED)
     Gold particles coalesce into a diamond (octahedron) with a bloom pulse.
     Floating "Booked + Deposit Confirmed." label.

   Performance:
     - 1 InstancedMesh for all particles (1 draw call)
     - EffectComposer with multisampling=0
     - frameloop gated by parent (Canvas props)
   ──────────────────────────────────────────────────────────────────────── */

const GOLD = '#C5A059';
const GOLD_DEEP = '#8A6A2E';
const SAGE = '#8FA98A';
const SAGE_DEEP = '#5E7A5A';
const CREAM = '#F8F3EA';
const ESPRESSO = '#1C1814';

const PARTICLE_COUNT = 50;

interface PipelineSceneProps {
  step: 0 | 1 | 2;
}

/* ── Diagnostic node + beam (step 0) ── */
function DiagnosticNode({ stepRef }: { stepRef: React.MutableRefObject<number> }) {
  const nodeRef = useRef<THREE.Group>(null!);
  const beamRef = useRef<THREE.Mesh>(null!);
  const pmsRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const stepVal = stepRef.current;
    // Presence = 1 at step 0, fades out as step → 1
    const presence = Math.max(0, 1 - Math.max(0, stepVal - 0.15) * 1.4);

    if (nodeRef.current) {
      nodeRef.current.visible = presence > 0.01;
      nodeRef.current.position.y = 0.4 + Math.sin(t * 1.2) * 0.04;
      const mat = (nodeRef.current.children[0] as THREE.Mesh)?.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.opacity = presence;
        mat.transparent = true;
        mat.emissiveIntensity = 0.35 * presence + Math.sin(t * 2) * 0.08 * presence;
      }
    }
    if (beamRef.current) {
      beamRef.current.visible = presence > 0.01;
      const bm = beamRef.current.material as THREE.MeshBasicMaterial;
      if (bm) bm.opacity = presence * 0.6;
      beamRef.current.scale.x = 1 + Math.sin(t * 3) * 0.02;
    }
    if (pmsRef.current) {
      pmsRef.current.visible = presence > 0.01;
      const pm = pmsRef.current.material as THREE.MeshStandardMaterial;
      if (pm) pm.opacity = presence * 0.9;
    }
  });

  return (
    <group>
      {/* Glowing connection node (left) */}
      <group ref={nodeRef} position={[-1.0, 0.4, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.28, 2]} />
          <meshStandardMaterial
            color={SAGE_DEEP}
            metalness={0.4}
            roughness={0.25}
            emissive={SAGE_DEEP}
            emissiveIntensity={0.35}
            transparent
            opacity={1}
          />
        </mesh>
        {/* Halo ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.008, 12, 64]} />
          <meshBasicMaterial color={SAGE} transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Beam to PMS */}
      <mesh ref={beamRef} position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 1.4, 8]} />
        <meshBasicMaterial color={SAGE} transparent opacity={0.6} />
      </mesh>

      {/* PMS block (right) */}
      <mesh ref={pmsRef} position={[1.0, 0.4, 0]}>
        <boxGeometry args={[0.45, 0.32, 0.32]} />
        <meshStandardMaterial
          color="#E6DCC6"
          metalness={0.1}
          roughness={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Floating label */}
      <Text
        position={[-1.0, 0.85, 0]}
        fontSize={0.11}
        color={SAGE_DEEP}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        fontWeight="bold"
      >
        READ-ONLY
      </Text>
    </group>
  );
}

/* ── Laser grid + flowing particles (step 1) ── */
function LaserGridAndParticles({ stepRef }: { stepRef: React.MutableRefObject<number> }) {
  const gridRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Per-particle state
  const seeds = useMemo(() => {
    const arr = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        // Lane through the grid (X position)
        x: (Math.random() - 0.5) * 1.6,
        z: (Math.random() - 0.5) * 0.4,
        // Phase offset (0..1) so particles are distributed along the flow
        phase: Math.random(),
        // Speed multiplier
        speed: 0.6 + Math.random() * 0.5,
        // Is this particle deflected? (20%)
        deflected: Math.random() < 0.2,
        // Deflection direction (sign)
        deflectSign: Math.random() < 0.5 ? -1 : 1,
        size: 0.022 + Math.random() * 0.018,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const stepVal = stepRef.current;
    // Presence: 0 at step 0, 1 at step 1, fades at step 2
    const presence = THREE.MathUtils.clamp(
      Math.min(stepVal * 1.8, (2 - stepVal) * 1.8),
      0,
      1,
    );

    if (gridRef.current) {
      gridRef.current.visible = presence > 0.01;
      gridRef.current.rotation.z = Math.sin(t * 0.4) * 0.03;
      gridRef.current.children.forEach((child) => {
        const m = (child as THREE.Mesh).material as THREE.Material & { opacity?: number };
        if (m && 'opacity' in m) {
          (m as THREE.MeshBasicMaterial).opacity = presence * 0.35;
        }
      });
    }

    if (particlesRef.current) {
      particlesRef.current.visible = presence > 0.01;
      // In step 2, particles lerp toward diamond vertices
      const coalesce = THREE.MathUtils.clamp((stepVal - 1.4) * 1.6, 0, 1);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const s = seeds[i];
        // Flow position (step 1): top → bottom on a loop
        const flowY = ((t * s.speed * 0.4 + s.phase) % 1) * 2.4 - 1.2; // 1.2 → -1.2
        const baseX = s.x;
        const baseZ = s.z;

        // Deflection: if deflected, drift sideways as it falls
        const deflectProgress = THREE.MathUtils.clamp((1.2 - flowY) / 1.5, 0, 1);
        const deflectX = s.deflected
          ? s.deflectSign * deflectProgress * 0.9
          : 0;
        const deflectOpacity = s.deflected
          ? Math.max(0, 1 - deflectProgress * 1.3)
          : 1;

        // Coalesce position (step 2): lerp toward a diamond vertex
        const vertexIdx = i % 6;
        const diamondVerts: [number, number, number][] = [
          [0, 0.7, 0],    // top
          [0.5, 0, 0],    // right
          [0, -0.7, 0],   // bottom
          [-0.5, 0, 0],   // left
          [0, 0, 0.45],   // front
          [0, 0, -0.45],  // back
        ];
        const target = diamondVerts[vertexIdx];
        const finalX = THREE.MathUtils.lerp(baseX + deflectX, target[0], coalesce);
        const finalY = THREE.MathUtils.lerp(flowY, target[1], coalesce);
        const finalZ = THREE.MathUtils.lerp(baseZ, target[2], coalesce);

        dummy.position.set(finalX, finalY, finalZ);
        const scale = s.size * (1 + coalesce * 0.6) * deflectOpacity;
        dummy.scale.setScalar(Math.max(0.001, scale));
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Build the grid as thin lines (a sage-tinted mesh grid)
  const gridLines = useMemo(() => {
    const lines: ReactElement[] = [];
    const N = 8;
    const size = 2.0;
    // Horizontal lines
    for (let i = 0; i <= N; i++) {
      const y = -1.2 + (i / N) * 2.4;
      lines.push(
        <mesh key={`h-${i}`} position={[0, y, 0]}>
          <boxGeometry args={[size, 0.008, 0.008]} />
          <meshBasicMaterial color={SAGE} transparent opacity={0.35} />
        </mesh>
      );
    }
    // Vertical lines
    for (let i = 0; i <= N; i++) {
      const x = -size / 2 + (i / N) * size;
      lines.push(
        <mesh key={`v-${i}`} position={[x, 0, 0]}>
          <boxGeometry args={[0.008, 2.4, 0.008]} />
          <meshBasicMaterial color={SAGE} transparent opacity={0.35} />
        </mesh>
      );
    }
    return lines;
  }, []);

  return (
    <group>
      <group ref={gridRef}>{gridLines}</group>

      <instancedMesh ref={particlesRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.6}
          roughness={0.15}
          emissive={GOLD}
          emissiveIntensity={0.4}
          transparent
          opacity={0.95}
        />
      </instancedMesh>
    </group>
  );
}

/* ── Diamond (Verification, step 2) ── */
function Diamond({ stepRef }: { stepRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const stepVal = stepRef.current;
    // Presence: 0 until step ~1.5, then 1
    const presence = THREE.MathUtils.clamp((stepVal - 1.4) * 1.6, 0, 1);

    if (groupRef.current) {
      groupRef.current.visible = presence > 0.01;
      groupRef.current.rotation.y = t * 0.5;
      const breathe = 1 + Math.sin(t * 2.4) * 0.04;
      groupRef.current.scale.setScalar(presence * breathe);

      const mesh = groupRef.current.children[0] as THREE.Mesh;
      if (mesh) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.opacity = presence;
          mat.transparent = true;
          mat.emissiveIntensity = 0.3 + Math.sin(t * 2.4) * 0.1;
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} visible={false}>
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.7}
          roughness={0.1}
          emissive={GOLD}
          emissiveIntensity={0.3}
          transparent
          opacity={0}
        />
      </mesh>
      {/* Floating label below the diamond */}
      <Text
        position={[0, -1.0, 0]}
        fontSize={0.1}
        color={ESPRESSO}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
        fontWeight={500}
      >
        Booked + Deposit Confirmed.
      </Text>
    </group>
  );
}

/* ── Camera rig — spring-dolly based on step ── */
function CameraRig({ stepRef }: { stepRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const stepVal = stepRef.current;
    // Step 0: z=5.5, y=0.2
    // Step 1: z=4.0, y=0.0
    // Step 2: z=3.4, y=0.1
    const targetZ = 5.5 - stepVal * 1.05;
    const targetY = 0.2 - stepVal * 0.07 + (stepVal > 1 ? (stepVal - 1) * 0.1 : 0);
    camera.position.z += (targetZ - camera.position.z) * 0.07;
    camera.position.y += (targetY - camera.position.y) * 0.07;
    camera.position.x += (0 - camera.position.x) * 0.07;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Lights ── */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.28} color={CREAM} />
      <directionalLight position={[4, 5, 4]} intensity={0.9} color={CREAM} />
      <directionalLight position={[-4, 1, -3]} intensity={0.4} color={SAGE} />
      <pointLight position={[0, 0, 1.5]} intensity={0.6} color={GOLD} distance={4.5} decay={2} />
    </>
  );
}

function PostFX() {
  return (
    <DeferredEffectComposer
      bloom={{ luminanceThreshold: 0.4, luminanceSmoothing: 0.85, intensity: 0.45, radius: 0.7 }}
      vignette={{ offset: 0.3, darkness: 0.55 }}
    />
  );
}

/* ── Exported scene ── */
export default function PipelineScene({ step }: PipelineSceneProps) {
  const stepRef = useRef(0);

  // Drive the spring-smoothed step value inside useFrame via a sub-component
  // so we don't violate rules-of-hooks. The ref is mutated each frame.
  useFrame(() => {
    stepRef.current += (step - stepRef.current) * 0.07;
  });

  return (
    <>
      <SceneLights />
      <DiagnosticNode stepRef={stepRef} />
      <LaserGridAndParticles stepRef={stepRef} />
      <Diamond stepRef={stepRef} />
      <CameraRig stepRef={stepRef} />
      <PostFX />
    </>
  );
}
