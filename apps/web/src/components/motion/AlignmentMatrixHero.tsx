'use client';

import React, { useRef, useEffect, useCallback } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
 * AlignmentMatrixHero — WebGL-like Canvas Data Alignment Visual
 *
 * Three faint vertical columns (Boulevard, Mangomint, Zenoti) with
 * misaligned text strings drift rightward. When they cross a crisp
 * Terracotta lens line at center-x, the text instantly snaps into
 * perfectly horizontal, uniformly aligned ledger lines.
 *
 * Design constraints:
 * - No three.js dependency — pure 2D canvas with requestAnimationFrame
 * - Hardware-accelerated via canvas 2D (GPU composited)
 * - Terracotta (#b9825f) lens line, Sage (#7f8f78) completion
 * - 2200ms drift-in, then loops every 3s
 * ────────────────────────────────────────────────────────────────────────── */

const PLATFORM_COLORS: Record<string, string> = {
  boulevard: '#8a7a6a',
  mangomint: '#7a8a7a',
  zenoti: '#7a7a8a',
};

interface DataString {
  text: string;
  platform: 'boulevard' | 'mangomint' | 'zenoti';
  offsetY: number;
  aligned: boolean;
  targetY: number;
  rotation: number;
  colX: number;
}

const SAMPLE_DATA: { text: string; platform: DataString['platform'] }[] = [
  { text: 'Morpheus8 consult req  11:47pm', platform: 'boulevard' },
  { text: ' lip filler quote -- $850', platform: 'mangomint' },
  { text: 'RF Microneedling / 12/3', platform: 'zenoti' },
  { text: 'Laser hair removal --- 6 sessions', platform: 'boulevard' },
  { text: 'Botox units: 32  0:34am', platform: 'mangomint' },
  { text: ' VI peel consult?', platform: 'zenoti' },
  { text: 'CoolSculpting 3 areas?', platform: 'boulevard' },
  { text: ' dysport $12/unit', platform: 'mangomint' },
  { text: 'IPL photofacial --- 350', platform: 'zenoti' },
];

const LENS_X_FRAC = 0.58;
const CYCLE_MS = 2200;
const HOLD_MS = 3000;

export default function AlignmentMatrixHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<DataString[]>([]);
  const animRef = useRef<number>(0);
  const startRef = useRef(0);

  const initData = useCallback((w: number, h: number) => {
    const baseY = h * 0.22;
    const spacing = (h * 0.56) / SAMPLE_DATA.length;
    return SAMPLE_DATA.map((d, i) => ({
      ...d,
      offsetY: (Math.random() - 0.5) * 8,
      aligned: false,
      targetY: baseY + i * spacing,
      rotation: (Math.random() - 0.5) * 0.03,
      colX: w * 0.06,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    let w = parent.clientWidth;
    let h = Math.min(w * 0.4, 320);

    const resize = () => {
      w = parent.clientWidth;
      h = Math.min(w * 0.4, 320);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // Transform is reset when canvas.width/height changes; apply it on next draw
    };
    resize();
    window.addEventListener('resize', resize);

    // Reset data
    dataRef.current = initData(w, h);

    const draw = (timestamp: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Reset transform to ensure correct DPI scaling (prevents accumulation on resize)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const t = Math.min(elapsed / CYCLE_MS, 1);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const lensX = w * LENS_X_FRAC;

      // ── CLEAR ──
      ctx.clearRect(0, 0, w, h);

      // ── BACKGROUND ──
      ctx.fillStyle = 'rgba(255, 250, 242, 0.5)';
      ctx.fillRect(0, 0, w, h);

      // Dot grid
      ctx.fillStyle = '#efe6d7';
      for (let x = 0; x < w; x += 28) {
        for (let y = 0; y < h; y += 28) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── FADE IN ──
      const fadeIn = Math.min(elapsed / 400, 1);
      if (fadeIn < 1) {
        ctx.fillStyle = `rgba(255,250,242,${1 - fadeIn})`;
        ctx.fillRect(0, 0, w, h);
      }

      // ── PLATFORM LABELS (left side, faint) ──
      ctx.save();
      ctx.font = '8px "SF Mono", ui-monospace, monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#b8a898';
      const platforms = ['boulevard', 'mangomint', 'zenoti'];
      const labelYs = [h * 0.12, h * 0.28, h * 0.44];
      // Distribute labels across the height for each group of 3
      for (let gi = 0; gi < 3; gi++) {
        const py = h * 0.14 + gi * (h * 0.24);
        ctx.globalAlpha = 0.35 * fadeIn;
        ctx.fillText(platforms[gi].toUpperCase(), w * 0.01, py);
      }
      ctx.restore();

      // ── DRAW DATA STRINGS ──
      const data = dataRef.current;
      let allAligned = true;

      ctx.font = '13px "SF Mono", ui-monospace, monospace';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const stagger = 0.06 * i;
        const localT = Math.max(0, Math.min(1, (t - stagger) / (1 - stagger)));
        const localEase = localT < 0.5 ? 2 * localT * localT : 1 - Math.pow(-2 * localT + 2, 2) / 2;

        const textWidth = ctx.measureText(d.text).width;
        const startX = -(textWidth + 20);
        const endX = d.colX;
        const currentX = startX + (endX - startX) * localEase;

        // Lens crossing check
        const crossesLens = currentX + textWidth * 0.65 > lensX;
        if (crossesLens && !d.aligned) {
          d.aligned = true;
        }
        if (!d.aligned && localT < 0.95) allAligned = false;

        const displayY = d.aligned ? d.targetY : d.targetY + d.offsetY;
        const rotation = d.aligned ? 0 : d.rotation;
        const itemFade = Math.min(localEase * 2, 1);

        ctx.save();
        ctx.translate(currentX, displayY);
        if (rotation) ctx.rotate(rotation);

        ctx.fillStyle = PLATFORM_COLORS[d.platform];
        ctx.globalAlpha = 0.6 * itemFade;
        ctx.fillText(d.text, 0, 0);

        // Underline for aligned items
        if (d.aligned) {
          ctx.strokeStyle = '#7f8f78';
          ctx.globalAlpha = 0.3 * itemFade;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-2, 6);
          ctx.lineTo(textWidth + 2, 6);
          ctx.stroke();
        }

        ctx.restore();
      }

      // ── LENS LINE ──
      ctx.save();
      ctx.strokeStyle = '#b9825f';
      ctx.globalAlpha = 0.4 + 0.3 * (1 - t);
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(lensX, h * 0.12);
      ctx.lineTo(lensX, h * 0.88);
      ctx.stroke();
      ctx.restore();

      // Lens label
      if (t < 0.85) {
        ctx.save();
        ctx.fillStyle = '#b9825f';
        ctx.globalAlpha = 0.3 * (1 - Math.min(t * 2, 1));
        ctx.font = '8px "SF Mono", ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('ALIGNMENT LENS', lensX, h * 0.10);
        ctx.restore();
      }

      // Completion state
      if (allAligned && t > 0.3) {
        ctx.save();
        ctx.fillStyle = '#7f8f78';
        ctx.globalAlpha = Math.min((t - 0.3) * 4, 0.7);
        ctx.font = 'bold 11px "SF Mono", ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('✓ DATA UNIFIED', w * 0.78, h * 0.88);
        ctx.restore();
      }

      // Loop or continue
      if (t < 1 && !allAligned) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        setTimeout(() => {
          startRef.current = 0;
          dataRef.current = initData(w, h);
          animRef.current = requestAnimationFrame(draw);
        }, HOLD_MS);
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [initData]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto rounded-2xl border border-sand-deep/55 bg-cream shadow-inner"
    />
  );
}
