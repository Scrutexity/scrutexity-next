'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { Bridge, Container, Eyebrow } from '@/components/ui-custom/section';
import { useLowPower } from '@/hooks/use-low-power';

// 3D helix — lazy-loaded, SSR disabled, only mounts on capable devices.
const DnaHelix3D = dynamic(() => import('@/components/three/dna-helix-3d'), {
  ssr: false,
  loading: () => null,
});

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * DnaConnector — a Bridge section between the Hero and the Ledger Moment.
 *
 * A 3D sage DNA double helix that "draws" itself as the user scrolls:
 * rungs fade in from top to bottom, the strands brighten, and a slow
 * rotation gives the scene life. Gold accent rungs every 4th position
 * echo the verified-mark visual language used across the site.
 *
 * Narrative: "Inquiry arrives → value begins escaping → Scrutexity captures
 * it → staff rules govern it → booking + deposit verified." The helix
 * is the visual metaphor for that connected sequence.
 *
 * Progressive enhancement:
 *   - 3D Canvas only mounts when: not low-power, not reduced-motion, in view
 *   - 2D CSS helix fallback for low-power devices (still animated, no WebGL)
 *   - Reduced-motion: static 2D helix, no animation
 */
export default function DnaConnector() {
  const reduced = useReducedMotion();
  const lowPower = useLowPower();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress through this section (0 → 1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Drive the 3D helix's "draw" progress via a ref (avoids re-renders)
  const scrollProgressRef = useRef(0);
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      scrollProgressRef.current = Math.max(0, Math.min(1, v));
    });
  }, [scrollYProgress]);

  // Visible state for lazy-mounting the 3D Canvas
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show3D = !lowPower && !reduced && inView;

  // Caption that fades in mid-scroll
  const captionOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.85, 1], [0, 1, 1, 0]);
  const captionY = useTransform(scrollYProgress, [0.25, 0.5], [20, 0]);

  return (
    <Bridge
      id="dna"
      tone="cream-deep"
      py="loose"
      ref={sectionRef}
      className="!py-24 md:!py-32 relative overflow-hidden border-y border-sand-deep/40"
    >
      {/* Ambient sage glow — pure CSS, no WebGL */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(15,118,110,0.16), transparent 70%), radial-gradient(ellipse 40% 30% at 80% 30%, rgba(197,160,89,0.08), transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        {/* Eyebrow + heading — left-aligned, sits above the helix */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <Eyebrow tone="sage">
            <span className="h-1 w-1 rounded-full bg-sage" />
            The connection
          </Eyebrow>
          <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] text-ink">
            Inquiry arrives. Value escapes.{' '}
            <span className="text-sage-deep italic">Scrutexity captures it.</span>
          </h2>
        </div>

        {/* The helix — 3D on capable devices, 2D CSS fallback otherwise */}
        <div className="relative mx-auto h-[420px] md:h-[520px] w-full max-w-md">
          {show3D ? (
            <DnaHelix3D scrollProgress={scrollProgressRef} />
          ) : (
            <Helix2DFallback reduced={Boolean(reduced)} />
          )}
        </div>

        {/* Caption that fades in mid-scroll — narrative beat */}
        <motion.div
          style={{
            opacity: reduced ? 1 : captionOpacity,
            y: reduced ? 0 : captionY,
          }}
          className="mt-12 md:mt-16 max-w-2xl mx-auto text-center"
        >
          <p className="font-display italic text-xl md:text-2xl text-ink leading-[1.4]">
            Every missed inquiry flows through the same governed sequence —
            <span className="text-sage-deep"> staff-approved, clinically safe, PMS-verified.</span>
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="sage-pill">
              <span className="verified-mark !h-2 !w-2 !text-[7px]" aria-hidden>✓</span>
              Staff-approved
            </span>
            <span className="sage-pill">Clinically governed</span>
            <span className="sage-pill">PMS-verified</span>
          </div>
        </motion.div>
      </Container>
    </Bridge>
  );
}

/**
 * Helix2DFallback — a pure CSS/Canvas 2D DNA helix for low-power devices.
 * Animated via requestAnimationFrame, no WebGL required.
 */
function Helix2DFallback({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    let raf = 0;
    let t = 0;
    const W = () => canvas.width / dpr;
    const H = () => canvas.height / dpr;
    const RUNGS = 22;
    const TURNS = 3.5;

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      const cx = W() / 2;
      const helixHeight = H() * 0.85;
      const helixTop = (H() - helixHeight) / 2;
      const radius = Math.min(W() * 0.18, 70);

      if (!reduced) t += 0.012;

      // Draw rungs (back to front for depth)
      const rungData = [];
      for (let i = 0; i < RUNGS; i++) {
        const u = i / (RUNGS - 1);
        const angle = u * TURNS * Math.PI * 2 + t;
        const y = helixTop + u * helixHeight;
        const xA = cx + Math.cos(angle) * radius;
        const xB = cx + Math.cos(angle + Math.PI) * radius;
        const zA = Math.sin(angle); // -1 to 1, for depth shading
        const zB = Math.sin(angle + Math.PI);
        rungData.push({ xA, xB, y, zA, zB, u, i });
      }

      // Sort by average depth so back rungs draw first
      rungData.sort((a, b) => (a.zA + a.zB) - (b.zA + b.zB));

      rungData.forEach(({ xA, xB, y, zA, zB, i }) => {
        // Depth-based opacity (front = brighter)
        const depthOpacity = ((zA + zB) / 2 + 1) / 2; // 0..1
        const opacity = 0.35 + depthOpacity * 0.65;
        const isGold = i % 4 === 0;

        // Rung line
        ctx.strokeStyle = isGold
          ? `rgba(197, 160, 89, ${opacity})`
          : `rgba(94, 169, 160, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(xA, y);
        ctx.lineTo(xB, y);
        ctx.stroke();

        // Nucleotide spheres
        const drawSphere = (x: number, z: number) => {
          const size = 3 + (z + 1) * 1.5;
          const grd = ctx.createRadialGradient(x - size * 0.3, y - size * 0.3, 0, x, y, size);
          grd.addColorStop(0, `rgba(15, 118, 110, ${opacity})`);
          grd.addColorStop(1, `rgba(11, 88, 83, ${opacity})`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        };
        drawSphere(xA, zA);
        drawSphere(xB, zB);
      });

      // Draw strands as smooth curves through the nucleotide points
      const drawStrand = (phase: number, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let i = 0; i < RUNGS; i++) {
          const u = i / (RUNGS - 1);
          const angle = u * TURNS * Math.PI * 2 + t + phase;
          const y = helixTop + u * helixHeight;
          const x = cx + Math.cos(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };
      drawStrand(0, 'rgba(11, 88, 83, 0.85)');
      drawStrand(Math.PI, 'rgba(15, 118, 110, 0.85)');

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Animated sage DNA double helix"
    />
  );
}
