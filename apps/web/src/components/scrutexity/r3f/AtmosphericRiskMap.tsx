'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useLowPower } from '@/hooks/use-low-power';

// Design tokens matching globals.css
const SAGE_DEEP = '#5E7A5A';
const CLAY = '#B7896B';
const BONE = '#FFFBF3';
const MIST = '#6B6259';
const INK = '#1C1814';

// Mock list of database regulatory triggers for hover display
const MOCK_TRIGGERS = [
  { trigger: 'ftc_sec5_absolute_guarantee', score: 85, desc: 'Unsubstantiated clinical guarantees.' },
  { trigger: 'fda_approval_misrepresentation', score: 90, desc: 'Unverified medical device approval claim.' },
  { trigger: 'glp1_unapproved_compounding', score: 95, desc: 'Off-label compounded weight loss marketing.' },
  { trigger: 'botox_permanence_promise', score: 80, desc: 'Permanent wrinkle removal overstatement.' },
  { trigger: 'laser_painless_permanent', score: 70, desc: 'Unsubstantiated risk-free device promise.' }
];

type SwarmNode = {
  pos: THREE.Vector3;
  color: THREE.Color;
  speed: number;
  scale: number;
  isUnsupported: boolean;
  angle: number;
  radius: number;
  triggerInfo?: typeof MOCK_TRIGGERS[0];
};

function SwarmScene({ 
  count = 250, 
  liveClaims = [],
  onHover 
}: { 
  count?: number; 
  liveClaims?: any[];
  onHover: (node: SwarmNode | null) => void 
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  // Initialize nodes: first N nodes represent actual live claims, remainder are background filler
  const nodes = useMemo<SwarmNode[]>(() => {
    const list: SwarmNode[] = [];
    const colorSage = new THREE.Color(SAGE_DEEP);
    const colorClay = new THREE.Color(CLAY);

    const liveCount = Math.min(liveClaims.length, 45);

    // 1. Live claims in the foreground
    for (let i = 0; i < liveCount; i++) {
      const claim = liveClaims[i];
      const isUnsupported = !claim.visibleCitation;

      const radius = isUnsupported ? 2.3 + Math.random() * 0.8 : 0.4 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 1.5;
      const z = Math.sin(angle) * radius;

      list.push({
        pos: new THREE.Vector3(x, y, z),
        color: isUnsupported ? colorClay : colorSage,
        speed: 0.12 + Math.random() * 0.2,
        scale: isUnsupported ? 0.095 : 0.065,
        isUnsupported,
        angle,
        radius,
        triggerInfo: {
          trigger: claim.regulatoryTriggers?.[0] || 'ftc_sec5_absolute_guarantee',
          score: claim.severityScore || 85,
          desc: claim.claimText || 'Scanned claim text.'
        }
      });
    }

    // 2. Procedural filler in background
    for (let i = liveCount; i < count; i++) {
      const isUnsupported = Math.random() > 0.8;
      
      const radius = isUnsupported ? 2.5 + Math.random() * 1.5 : Math.random() * 1.2;
      const angle = Math.random() * Math.PI * 2;
      
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 1.8;
      const z = Math.sin(angle) * radius;

      list.push({
        pos: new THREE.Vector3(x, y, z),
        color: isUnsupported ? colorClay : colorSage,
        speed: 0.1 + Math.random() * 0.25,
        scale: isUnsupported ? 0.07 + Math.random() * 0.04 : 0.04 + Math.random() * 0.03,
        isUnsupported,
        angle,
        radius,
        triggerInfo: isUnsupported ? MOCK_TRIGGERS[Math.floor(Math.random() * MOCK_TRIGGERS.length)] : undefined
      });
    }
    return list;
  }, [count, liveClaims]);

  // Generate tether lines between a subset of core nodes (snapping unsupported nodes)
  const linePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    // Link core nodes that are close to each other
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].isUnsupported) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[j].isUnsupported) continue;
        if (nodes[i].pos.distanceTo(nodes[j].pos) < 0.6) {
          points.push(nodes[i].pos);
          points.push(nodes[j].pos);
        }
      }
    }
    return points;
  }, [nodes]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    nodes.forEach((node, i) => {
      if (node.isUnsupported) {
        // Outer orbit kinematics: slow orbital rotation
        const orbitalAngle = node.angle + t * node.speed * 0.3;
        const x = Math.cos(orbitalAngle) * node.radius;
        const z = Math.sin(orbitalAngle) * node.radius;
        
        // Breathing scale effect (pulse opacity/scale)
        const breathe = 1 + Math.sin(t * 1.5 + i) * 0.12;
        
        tempObject.position.set(x, node.pos.y + Math.sin(t * 0.4 + i) * 0.08, z);
        tempObject.scale.setScalar(node.scale * breathe);
      } else {
        // Core gravity kinematics: slight breathing pull towards center
        const coreFactor = 1 + Math.sin(t * 0.2 + i) * 0.05;
        tempObject.position.copy(node.pos).multiplyScalar(coreFactor);
        tempObject.scale.setScalar(node.scale);
      }

      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
      meshRef.current!.setColorAt(i, node.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }

    // Animate connection tethers slowly
    if (lineRef.current) {
      lineRef.current.rotation.y = t * 0.05;
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    const instanceId = e.instanceId;
    if (instanceId !== undefined && nodes[instanceId]) {
      const node = nodes[instanceId];
      // Get the world position of the hovered instance
      const position = new THREE.Vector3();
      const matrix = new THREE.Matrix4();
      meshRef.current!.getMatrixAt(instanceId, matrix);
      position.setFromMatrixPosition(matrix);
      
      onHover({
        ...node,
        pos: position
      });
    }
  };

  return (
    <>
      <instancedMesh 
        ref={meshRef} 
        args={[null as any, null as any, count]}
        onPointerOver={handlePointerOver}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial roughness={0.4} metalness={0.1} />
      </instancedMesh>

      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color={MIST} transparent opacity={0.12} />
      </lineSegments>
    </>
  );
}

export function AtmosphericRiskMap() {
  const lowPower = useLowPower();
  const [hoveredNode, setHoveredNode] = useState<SwarmNode | null>(null);
  const [liveClaims, setLiveClaims] = useState<any[]>([]);

  useEffect(() => {
    if (lowPower) return;
    fetch('/api/live-claims')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLiveClaims(data);
        }
      })
      .catch((err) => console.error('Failed to fetch live claims:', err));
  }, [lowPower]);

  // Focus distance shifts dynamically based on hovered node position
  const focusZ = hoveredNode ? hoveredNode.pos.z : 0;

  if (lowPower) {
    return (
      <div className="relative w-full h-[320px] rounded-2xl border border-sand-deep/30 bg-bone/30 flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <span className="font-mono text-[9px] uppercase tracking-wider text-sage-deep">
            Volumetric Audit Grid
          </span>
          <p className="font-display text-2xl text-espresso">Interactive 3D view deactivated</p>
          <p className="text-xs text-mist max-w-xs mx-auto leading-relaxed">
            Low-power mode or reduced-motion is active. The live claim network is monitored statically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[320px] rounded-2xl border border-[#e1d4c5] bg-bone overflow-hidden shadow-[0_22px_70px_rgba(85,62,41,0.08)]">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-wider text-sage-deep block">
          Telemetry Graph
        </span>
        <span className="font-display text-lg text-espresso mt-1 font-semibold block">
          Atmospheric Risk Map
        </span>
      </div>

      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas 
            camera={{ position: [0, 0, 4.5], fov: 50 }}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 3]} intensity={1.2} />
            <pointLight position={[-5, -5, -5]} intensity={0.4} />

            <SwarmScene count={280} liveClaims={liveClaims} onHover={setHoveredNode} />

            <EffectComposer>
              <DepthOfField 
                target={[0, 0, focusZ]} 
                focalLength={0.4} 
                bokehScale={3.5} 
              />
            </EffectComposer>

            {hoveredNode && hoveredNode.isUnsupported && hoveredNode.triggerInfo && (
              <Html 
                position={[hoveredNode.pos.x, hoveredNode.pos.y + 0.15, hoveredNode.pos.z]} 
                center
                distanceFactor={6}
              >
                <div 
                  className="w-56 p-4 rounded-xl border border-[#e1d4c5] bg-white/80 backdrop-blur-md shadow-lg select-none text-left"
                  style={{
                    boxShadow: '0 20px 40px rgba(28,24,20,0.08)'
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span 
                      className="font-mono text-[8px] font-bold uppercase tracking-wider text-terracotta border border-terracotta/20 bg-terracotta/5 px-2 py-0.5 rounded"
                      style={{ color: CLAY, borderColor: `${CLAY}30`, backgroundColor: `${CLAY}08` }}
                    >
                      Audit Warning
                    </span>
                    <span className="font-display text-xs text-mist">
                      Score: <strong className="text-espresso font-semibold font-mono">{hoveredNode.triggerInfo.score}</strong>
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-mist font-bold">
                    {hoveredNode.triggerInfo.trigger}
                  </p>
                  
                  <p 
                    className="mt-1 text-espresso text-[13px] leading-snug"
                    style={{ fontFamily: 'var(--font-satoshi), system-ui, sans-serif' }}
                  >
                    {hoveredNode.triggerInfo.desc}
                  </p>
                </div>
              </Html>
            )}
          </Canvas>
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/20 via-transparent to-transparent" />
    </div>
  );
}
