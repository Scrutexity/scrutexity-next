'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';

function LowPolyScissors() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.z += delta * 0.08;
  });
  return (
    <group ref={group} rotation={[0.4, 0, -0.7]}>
      <mesh position={[-0.42, 0, 0]}><torusGeometry args={[0.34, 0.09, 8, 20]} /><meshStandardMaterial color="#d99bbd" roughness={0.45} /></mesh>
      <mesh position={[0.42, 0, 0]}><torusGeometry args={[0.34, 0.09, 8, 20]} /><meshStandardMaterial color="#c6afe9" roughness={0.45} /></mesh>
      <mesh position={[0.05, 0.58, 0]} rotation={[0, 0, -0.28]}><boxGeometry args={[0.12, 1.2, 0.08]} /><meshStandardMaterial color="#d4ad61" metalness={0.45} roughness={0.28} /></mesh>
      <mesh position={[-0.05, 0.58, 0]} rotation={[0, 0, 0.28]}><boxGeometry args={[0.12, 1.2, 0.08]} /><meshStandardMaterial color="#e2bd73" metalness={0.45} roughness={0.28} /></mesh>
    </group>
  );
}

export default function SalonObjectCanvas() {
  return (
    <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 4], fov: 42 }} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}>
      <ambientLight intensity={1.8} />
      <directionalLight position={[2, 3, 4]} intensity={2.4} />
      <LowPolyScissors />
    </Canvas>
  );
}
