'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * ScanWebGL — WebGL scanning-state visual (MX brief).
 *
 * A lightweight fullscreen-triangle shader that draws an analysis grid in the
 * brand accent (#3F6B5C): a wireframe lattice, a traveling wave band, and a
 * scanning sweep with trailing glow. Runs during scanning to prove real
 * processing is happening while the backend works. Zero dependencies — raw
 * WebGL2 with a WebGL1 fallback (no three.js), GLSL ES 1.0 (no derivatives).
 *
 * Design-system compliance:
 * - Color is passed as the `accent` token's RGB (0.247, 0.420, 0.361 = #3F6B5C)
 * - Designed to sit inside `GlassCard tone="sage"` (the locked glass system)
 * - pointer-events-none + aria-hidden; reduced-motion renders one static frame
 * - Canvas is sized by its container via ResizeObserver + devicePixelRatio
 */
export default function ScanWebGL({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Non-null aliases so closures keep definite types.
    const cv = canvas;

    const glRaw =
      canvas.getContext('webgl2', { alpha: true, antialias: true }) ||
      canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!glRaw) return;
    // Non-null alias so closures keep a definite type.
    const gl = glRaw as WebGLRenderingContext | WebGL2RenderingContext;

    // ── Shaders ──────────────────────────────────────────────────────────
    const VERT = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;
    const FRAG = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec3 u_color;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        float aspect = u_res.x / u_res.y;

        // Square grid cells, density scaled by aspect
        float cols = 26.0;
        vec2 cell = vec2(1.0 / cols, 1.0 / (cols * aspect));
        vec2 fc = abs(fract(uv / cell) - 0.5);
        float d = max(fc.x * cell.x, fc.y * cell.y);
        float lw = 1.2 / min(u_res.x, u_res.y);
        float grid = 1.0 - smoothstep(lw * 0.6, lw * 2.0, d);

        // Traveling wave band
        float waveY = 0.32 + 0.22 * sin(uv.x * 6.28318 * 2.0 - u_time * 1.7);
        float wave = smoothstep(0.02, 0.0, abs(uv.y - waveY));

        // Scan sweep left→right with trailing glow
        float s = fract(uv.x + u_time * 0.16);
        float sweep = pow(max(0.0, 1.0 - s), 26.0);

        // Pulse dots at wave/grid intersections
        float pulse = grid * wave;

        vec3 col = u_color * (grid * 0.35 + wave * 0.85 + sweep * 0.5 + pulse * 0.9);
        float alpha = clamp(grid * 0.5 + wave + sweep * 0.7 + pulse, 0.0, 1.0);
        gl_FragColor = vec4(col, alpha * 0.9);
      }
    `;

    function compile(type: number, src: string) {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error('ScanWebGL shader error:', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error('ScanWebGL link error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Fullscreen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uColor = gl.getUniformLocation(prog, 'u_color');

    // Read --color-accent at runtime rather than baking a literal. A hex
    // hardcoded as normalized floats is invisible to a colour audit: this
    // previously shipped #3F6B5C, the teal from an abandoned direction, and
    // no hex grep could find it. Falls back to the lime accent.
    const accentHex = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent')
      .trim() || '#D9FF5C';
    const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(accentHex);
    const [ar, ag, ab] = m
      ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
      : [0.851, 1, 0.361];
    gl.uniform3f(uColor, ar, ag, ab);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    let running = true;
    const start = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth || 1;
      const h = cv.clientHeight || 1;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uRes, cv.width, cv.height);
    }

    function frame(now: number) {
      if (!running) return;
      const t = reduce ? 0 : (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => {
      resize();
      // redraw immediately so a static (reduced-motion) frame stays current
      if (reduce) frame(performance.now());
    });
    ro.observe(cv.parentElement || cv);

    function onLost(e: Event) {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
    }
    cv.addEventListener('webglcontextlost', onLost, false);

    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener('webglcontextlost', onLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
