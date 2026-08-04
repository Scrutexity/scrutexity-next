'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing';
import type { MotionValue } from 'framer-motion';
import { BlendFunction } from 'postprocessing';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type MousePosition = { x: number; y: number };

interface RevenueFlowCanvasProps {
  scrollProgress: MotionValue<number> | number;
  mousePosition: MousePosition;
  particleCount?: number;
  reduceMotion?: boolean;
}

function readProgress(value: MotionValue<number> | number) {
  return typeof value === 'number' ? value : value.get();
}

function clampAberration(value: number) {
  return THREE.MathUtils.clamp(value, -0.008, 0.008);
}

function ParticleSystem({
  scrollProgress,
  mousePosition,
  particleCount = 800,
  reduceMotion = false,
}: RevenueFlowCanvasProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const elapsedRef = useRef(0);

  const { initialChaos, orderedTargets, startPositions, startColors } = useMemo(() => {
    const chaos = new Float32Array(particleCount * 3);
    const targets = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const idx = i * 3;
      chaos[idx] = (Math.random() - 0.5) * 14;
      chaos[idx + 1] = (Math.random() - 0.5) * 14;
      chaos[idx + 2] = (Math.random() - 0.5) * 9;

      const theta = (i / particleCount) * Math.PI * 2 * 4;
      const phi = Math.acos(2 * (i / particleCount) - 1);
      const radius = 3.4 + Math.sin(i * 0.15) * 0.8;

      targets[idx] = radius * Math.sin(phi) * Math.cos(theta);
      targets[idx + 1] = radius * Math.sin(phi) * Math.sin(theta) + Math.cos(i * 0.3) * 0.7;
      targets[idx + 2] = radius * Math.cos(phi);

      colors[idx] = reduceMotion ? 0.18 : 0.72;
      colors[idx + 1] = reduceMotion ? 0.36 : 0.49;
      colors[idx + 2] = reduceMotion ? 0.29 : 0.42;
    }

    return {
      initialChaos: chaos,
      orderedTargets: targets,
      startPositions: reduceMotion ? targets.slice() : chaos.slice(),
      startColors: colors,
    };
  }, [particleCount, reduceMotion]);

  useFrame((_state, delta) => {
    if (!pointsRef.current || reduceMotion) return;
    elapsedRef.current += delta;

    const progress = THREE.MathUtils.clamp(readProgress(scrollProgress), 0, 1);
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const col = pointsRef.current.geometry.attributes.color as THREE.BufferAttribute;

    for (let i = 0; i < particleCount; i += 1) {
      const idx = i * 3;

      pos.array[idx] = THREE.MathUtils.lerp(
        pos.array[idx],
        initialChaos[idx] + (orderedTargets[idx] - initialChaos[idx]) * progress,
        0.048,
      );
      pos.array[idx + 1] = THREE.MathUtils.lerp(
        pos.array[idx + 1],
        initialChaos[idx + 1] + (orderedTargets[idx + 1] - initialChaos[idx + 1]) * progress,
        0.048,
      );
      pos.array[idx + 2] = THREE.MathUtils.lerp(
        pos.array[idx + 2],
        initialChaos[idx + 2] + (orderedTargets[idx + 2] - initialChaos[idx + 2]) * progress,
        0.048,
      );

      const dx = mousePosition.x * 5.5 - pos.array[idx];
      const dy = mousePosition.y * 5.5 - pos.array[idx + 1];
      const distSq = dx * dx + dy * dy;

      if (distSq > 0.001) {
        const force = 0.012 * (1 - progress * 0.5);
        pos.array[idx] += (dx / Math.sqrt(distSq)) * force;
        pos.array[idx + 1] += (dy / Math.sqrt(distSq)) * force;
      }

      col.array[idx] = THREE.MathUtils.lerp(0.72, 0.18, progress);
      col.array[idx + 1] = THREE.MathUtils.lerp(0.49, 0.36, progress);
      col.array[idx + 2] = THREE.MathUtils.lerp(0.42, 0.29, progress);
    }

    pos.needsUpdate = true;
    col.needsUpdate = true;
    pointsRef.current.rotation.y = elapsedRef.current * 0.065 * (0.7 + progress * 0.4);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[startPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[startColors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.058} vertexColors transparent sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function RevenueFlowCanvas(props: RevenueFlowCanvasProps) {
  const lastPointer = useRef({ x: 0, y: 0, time: 0 });
  const [aberration, setAberration] = useState<[number, number]>([0.00035, 0.00018]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    const last = lastPointer.current;
    const dt = Math.max(now - last.time, 16);
    const dx = event.clientX - last.x;
    const dy = event.clientY - last.y;
    const velocity = Math.min(Math.hypot(dx, dy) / dt, 2.8);
    const direction = Math.atan2(dy, dx);
    const intensity = Math.min(0.00035 + velocity * 0.0016, 0.008);

    lastPointer.current = { x: event.clientX, y: event.clientY, time: now };
    setAberration([
      Number(clampAberration(Math.cos(direction) * intensity).toFixed(5)),
      Number(clampAberration(Math.sin(direction) * intensity * 0.72).toFixed(5)),
    ]);
  };

  return (
    <div className="absolute inset-0 z-10" aria-hidden="true" onPointerMove={handlePointerMove}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.54} />
        <pointLight position={[8, 10, 12]} intensity={1.28} color="#B87D6B" />
        <pointLight position={[-7, -4, 8]} intensity={0.58} color="#2F5D4A" />
        <ParticleSystem {...props} />
        {!props.reduceMotion && (
          <EffectComposer multisampling={0} resolutionScale={0.5}>
            <Bloom
              blendFunction={BlendFunction.SCREEN}
              intensity={0.46}
              luminanceThreshold={0.74}
              luminanceSmoothing={0.24}
              mipmapBlur
              radius={0.42}
            />
            <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={aberration} radialModulation={false} />
            <Vignette eskil={false} offset={0.22} darkness={0.72} blendFunction={BlendFunction.NORMAL} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
