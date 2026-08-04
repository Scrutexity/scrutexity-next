'use client';

import React, { useRef, useEffect, useCallback } from 'react';

/**
 * MODULE 1 — Ambient WebGL-style Background (Canvas 2D)
 * 
 * Golden/copper particle wave that evokes "missed opportunities floating until caught."
 * Particles drift slowly upward, some gently attracted toward a central convergence point.
 * Mouse-reactive: particles repel softly from cursor.
 * 
 * Performance:
 *  - Canvas 2D (no Three.js overhead)
 *  - devicePixelRatio capped at 2
 *  - Particle count halved on mobile
 *  - respects prefers-reduced-motion
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  /** Lifetime phase for subtle pulsing */
  phase: number;
  phaseSpeed: number;
}

const COLORS = [
  'rgba(216,177,122,',   // soft-gold
  'rgba(185,130,95,',    // terracotta
  'rgba(230,177,126,',   // gold accent
  'rgba(200,160,110,',   // warm copper
  'rgba(240,210,170,',   // pale gold
];

function createParticle(width: number, height: number): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const baseOpacity = 0.12 + Math.random() * 0.28;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.15,
    vy: -(0.08 + Math.random() * 0.18), // drift upward
    radius: 1.2 + Math.random() * 2.8,
    opacity: baseOpacity,
    baseOpacity,
    color,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.003 + Math.random() * 0.006,
  };
}

export default function AmbientParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const reducedMotionRef = useRef(false);

  const handleMouse = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const mqHandler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener('change', mqHandler);

    if (reducedMotionRef.current) {
      // Static gradient fallback — no animation loop
      return () => mq.removeEventListener('change', mqHandler);
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 60 : 120;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const rect = canvas.getBoundingClientRect();
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(rect.width, rect.height)
    );

    // Convergence point — center-ish, represents "catching" the opportunity
    const convergenceX = rect.width * 0.5;
    const convergenceY = rect.height * 0.45;

    // Mouse events
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let lastTime = performance.now();

    function animate(currentTime: number) {
      if (reducedMotionRef.current) return;
      if (!canvas || !ctx) return;

      const dt = Math.min((currentTime - lastTime) / 16.667, 3); // normalize to 60fps
      lastTime = currentTime;

      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        // Phase pulse
        p.phase += p.phaseSpeed * dt;
        p.opacity = p.baseOpacity + Math.sin(p.phase) * 0.06;

        // Gentle attraction toward convergence (the "catching" narrative)
        const dxConv = convergenceX - p.x;
        const dyConv = convergenceY - p.y;
        const distConv = Math.sqrt(dxConv * dxConv + dyConv * dyConv);
        if (distConv > 40) {
          p.vx += (dxConv / distConv) * 0.002 * dt;
          p.vy += (dyConv / distConv) * 0.002 * dt;
        }

        // Mouse repulsion
        const dxMouse = p.x - mx;
        const dyMouse = p.y - my;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 100 && distMouse > 0) {
          const force = (100 - distMouse) / 100 * 0.04;
          p.vx += (dxMouse / distMouse) * force * dt;
          p.vy += (dyMouse / distMouse) * force * dt;
        }

        // Velocity dampening
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.4) {
          p.vx = (p.vx / speed) * 0.4;
          p.vy = (p.vy / speed) * 0.4;
        }

        // Move
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap around edges with margin
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.opacity)).toFixed(3)})`;
        ctx.fill();
      }

      // Draw subtle connection lines between nearby particles (mesh feel)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const lineOpacity = (1 - dist / 80) * 0.06;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(216,177,122,${lineOpacity.toFixed(4)})`;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      mq.removeEventListener('change', mqHandler);
    };
  }, [handleMouse, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      style={{ mixBlendMode: 'multiply' }}
      aria-hidden="true"
    />
  );
}
