'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const performanceMode = process.env.NEXT_PUBLIC_2026_PERFORMANCE_MODE === 'true';

function ParticleWave({ density }: { density: 'low' | 'standard' }) {
  const points = useRef<THREE.Points>(null);
  const wave = useRef<THREE.Line>(null);
  const pointsMaterial = useRef<THREE.PointsMaterial>(null);

  const particleGeometry = useMemo(() => {
    const particleCount = density === 'low' ? 18 : performanceMode ? 30 : 60;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const seed = Math.sin((i + 1) * 91.345) * 43758.5453;
      const unit = seed - Math.floor(seed);
      positions[i * 3] = (unit - 0.5) * 12;
      positions[i * 3 + 1] = ((unit * 7.31) % 1 - 0.5) * 7;
      positions[i * 3 + 2] = ((unit * 13.17) % 1 - 0.5) * 3;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [density]);

  const waveGeometry = useMemo(() => {
    const positions = new Float32Array((performanceMode ? 28 : 48) * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const waveMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c6afe9', transparent: true, opacity: 0.22 }),
    [],
  );
  const waveObject = useMemo(() => new THREE.Line(waveGeometry, waveMaterial), [waveGeometry, waveMaterial]);

  useEffect(() => () => {
    particleGeometry.dispose();
    waveGeometry.dispose();
    waveMaterial.dispose();
  }, [particleGeometry, waveGeometry, waveMaterial]);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    if (points.current) {
      points.current.rotation.y += delta * 0.025;
      points.current.rotation.z = Math.sin(elapsed * 0.18) * 0.05;
      if (pointsMaterial.current) pointsMaterial.current.opacity = 0.34 + Math.sin(elapsed * 0.55) * 0.08;
    }
    const attribute = waveGeometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < attribute.count; i += 1) {
      const x = (i / (attribute.count - 1) - 0.5) * 12;
      attribute.setXYZ(i, x, Math.sin(x * 0.75 + elapsed * 0.28) * 0.5 - 1.2, -0.5);
    }
    attribute.needsUpdate = true;
    if (wave.current) wave.current.rotation.z += delta * 0.004;
  });

  return (
    <group rotation={[-0.12, 0, -0.08]}>
      <points ref={points} geometry={particleGeometry}>
        <pointsMaterial ref={pointsMaterial} color="#e4a9c7" size={0.055} transparent opacity={0.42} depthWrite={false} />
      </points>
      <primitive ref={wave} object={waveObject} />
    </group>
  );
}

export default function WebGLScene({ density }: { density: 'low' | 'standard' }) {
  return (
    <Canvas
      dpr={performanceMode ? 1 : [1, 1.25]}
      camera={{ position: [0, 0, 7], fov: 52 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power', preserveDrawingBuffer: false }}
      className="h-full w-full opacity-80"
    >
      <ParticleWave density={density} />
    </Canvas>
  );
}
