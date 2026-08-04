'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshTransmissionMaterial, ContactShadows, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef } from 'react';
import * as THREE from 'three';

/**
 * FlowOrb — the central R3F glass sphere for the inquiry→AI→booking narrative.
 * Pine-tinted glass exterior, inner "circuit" wireframe in clay/gold.
 * Renders client-only via the dynamic import in FlowVisualSection.
 */

function InnerCircuit() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x += delta * 0.07;
  });
  return (
    <Icosahedron ref={ref} args={[0.78, 1]}>
      <meshStandardMaterial
        color="#D9A067"
        wireframe
        emissive="#B87D6B"
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </Icosahedron>
  );
}

function GlassSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.08;
  });
  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[1.15, 64, 64]} />
      <MeshTransmissionMaterial
        thickness={1.6}
        roughness={0.05}
        transmission={1}
        ior={1.45}
        chromaticAberration={0.04}
        backside
        color="#2F5D4A"
        attenuationColor="#1f4537"
        attenuationDistance={1.4}
      />
    </mesh>
  );
}

function Scene() {
  // Soft-box studio lighting: warm key spotlight with high penumbra, a fill, and a clay rim.
  // No neon — lighting creates the drama, not glow. (Bolder Warm spec, 2026-06-17.)
  return (
    <>
      <ambientLight intensity={0.42} color="#FFF5E6" />
      {/* Warm key spotlight, high penumbra — soft-box studio quality */}
      <spotLight
        position={[3.5, 5, 4]}
        angle={0.65}
        penumbra={0.95}
        intensity={1.4}
        color="#FFF5E6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Cool fill from opposite side, very low intensity — sage hint to balance the warmth */}
      <pointLight position={[-3, 1.5, -2]} intensity={0.35} color="#B2AC88" />
      {/* Clay rim light grazing the back of the orb for separation */}
      <pointLight position={[0, -1.5, -3]} intensity={0.55} color="#B87D6B" />

      <Float speed={1.05} rotationIntensity={0.22} floatIntensity={0.4}>
        <group>
          <InnerCircuit />
          <GlassSphere />
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.32}
        scale={6}
        blur={2.6}
        far={3}
        color="#3a2718"
      />
      <Environment preset="apartment" environmentIntensity={0.32} />
    </>
  );
}

export default function FlowOrb() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.15, 4.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene />
      {/* Bloom dialed way down — we want soft halation, not a glow effect.
          Threshold high so only the brightest specular highlight blooms. */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.85} luminanceSmoothing={0.6} intensity={0.28} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
