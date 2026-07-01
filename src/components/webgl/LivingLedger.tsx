import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 800;
const SAND_COLORS = ['#F5F0E8', '#E8E0D8', '#D4CFC7', '#C4B8A8'];
const GREEN_COLORS = ['#2F5D4A', '#3D7A62', '#4A9678'];

function SandStream() {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions, colors, phases] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    const phs = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.8) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const sandColor = new THREE.Color(SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)]);
      cols[i * 3] = sandColor.r;
      cols[i * 3 + 1] = sandColor.g;
      cols[i * 3 + 2] = sandColor.b;
      phs[i] = Math.random() * Math.PI * 2;
    }
    return [pos, cols, phs];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const posArray = pointsRef.current!.geometry.attributes.position.array as Float32Array;
    const colArray = pointsRef.current!.geometry.attributes.color.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x = posArray[i * 3];
      let y = posArray[i * 3 + 1];
      let z = posArray[i * 3 + 2];

      x += 0.03;

      if (x > 0) {
        const streamY = Math.sin(time * 0.5 + x * 0.3 + phases[i]) * 2;
        const streamZ = Math.cos(time * 0.3 + x * 0.2 + phases[i]) * 1.5;
        y += (streamY - y) * 0.04;
        z += (streamZ - z) * 0.04;

        const targetGreen = new THREE.Color(GREEN_COLORS[i % 3]);
        colArray[i * 3] += (targetGreen.r - colArray[i * 3]) * 0.03;
        colArray[i * 3 + 1] += (targetGreen.g - colArray[i * 3 + 1]) * 0.03;
        colArray[i * 3 + 2] += (targetGreen.b - colArray[i * 3 + 2]) * 0.03;
      } else {
        y += Math.sin(time + phases[i]) * 0.015;
        z += Math.cos(time * 0.7 + phases[i]) * 0.01;
      }

      if (x > 18) {
        x = -18;
        y = (Math.random() - 0.5) * 15;
        z = (Math.random() - 0.5) * 10;
        const resetColor = new THREE.Color(SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)]);
        colArray[i * 3] = resetColor.r;
        colArray[i * 3 + 1] = resetColor.g;
        colArray[i * 3 + 2] = resetColor.b;
      }

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;
    }

    pointsRef.current!.geometry.attributes.position.needsUpdate = true;
    pointsRef.current!.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function LivingLedger() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <fog attach="fog" args={['#F5F0E8', 8, 25]} />
        <ambientLight intensity={0.8} />
        <SandStream />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#F5F0E8_70%)]" />
    </div>
  );
}
