'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/**
 * RecoveryField — topographic luxury hero background.
 *
 * Slow champagne contour lines on warm-white field. Custom GLSL fragment shader
 * computes layered FBM noise → fractional contour value → thin gold lines.
 * Lines "settle" subtly in the cursor's wake (mouseFalloff uniform).
 *
 * Mobile: same shader at low DPR. prefers-reduced-motion freezes time uniform.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// FBM noise + topographic contour lines + champagne tint + mouse-wake smoothing.
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_lineDensity;

  // hash + value-noise — cheap and good enough for topographic feel
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.05;
      a *= 0.55;
    }
    return v;
  }

  void main() {
    // Aspect-corrected uv so contours don't squash on wide viewports
    vec2 uv = vUv;
    vec2 aUv = uv;
    aUv.x *= u_resolution.x / u_resolution.y;

    // Slow viscous time
    float t = u_time * 0.045;

    // Layered noise — produces gentle pressure-map shape
    float n = fbm(aUv * 1.4 + vec2(t, t * 0.6));
    n += 0.5 * fbm(aUv * 2.8 - vec2(t * 0.4, t));
    n = n * 0.5 + 0.5; // normalize to ~0..1 range

    // Contour lines from fractional crossings
    float contour = abs(fract(n * u_lineDensity) - 0.5);
    // Anti-aliased line width via fwidth
    float lineW = fwidth(contour) * 1.4;
    float line = 1.0 - smoothstep(0.0, lineW, contour);

    // Mouse wake — smooth lines near cursor (represents recovery / settling)
    float mouseDist = distance(uv, u_mouse);
    float mouseFalloff = smoothstep(0.0, 0.32, mouseDist); // 0 near cursor, 1 far
    line *= mix(0.3, 1.0, mouseFalloff);

    // Edge vignette so the field hugs the section center
    float vignette = smoothstep(0.85, 0.4, distance(uv, vec2(0.5)));
    line *= vignette;

    // Palette: warm white base, champagne lines
    vec3 base = vec3(0.973, 0.969, 0.953);          // #F8F7F3
    vec3 champagne = vec3(0.831, 0.686, 0.216);     // #D4AF37

    // Subtle warm wash variation across the field (mocha hint)
    vec3 warmWash = mix(base, vec3(0.96, 0.93, 0.88), smoothstep(0.45, 0.7, n)) ;

    vec3 color = mix(warmWash, champagne, line * 0.42);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Field({ reduced }: { reduced: boolean }) {
  const { size, viewport } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.6));

  const uniforms = useMemo(
    () => ({
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.6) },
      u_lineDensity: { value: 16 },
    }),
    [size.width, size.height]
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    if (!reduced) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
    // Smooth lerp the mouse position so wake feels viscous
    const currentMouse = matRef.current.uniforms.u_mouse.value as THREE.Vector2;
    currentMouse.lerp(mouseTarget.current, 0.04);
  });

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      onPointerMove={(e) => {
        // e.uv exists when ray intersects geometry; in NDC the plane covers everything
        if (e.uv) mouseTarget.current.set(e.uv.x, e.uv.y);
      }}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={false}
      />
    </mesh>
  );
}

export default function RecoveryField() {
  // prefers-reduced-motion check — freezes the noise
  const reduced = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      orthographic
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 1], zoom: 1 }}
      gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
      style={{ position: 'absolute', inset: 0, willChange: 'transform' }}
    >
      <Field reduced={!!reduced} />
    </Canvas>
  );
}
