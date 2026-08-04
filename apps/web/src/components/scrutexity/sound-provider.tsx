'use client';

import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

/**
 * SoundProvider — Web Audio synthesized micro-interactions.
 *
 * NO audio files needed — all sounds synthesized via Web Audio API.
 * Gated behind user-initiated unmute (never autoplay — trust requirement).
 *
 * Signature sounds:
 *  - dock: soft mechanical click when a deposit "docks" (hero particles)
 *  - verify: tonal shift when a verified stamp appears (evidence chain)
 *  - hover: subtle tick on CTA hover (optional, very quiet)
 *
 * The "verify" sound is the signature — it should feel identical everywhere
 * a deposit is confirmed (cohesive motion signature, item 7).
 */

type SoundType = 'dock' | 'verify' | 'hover' | 'gate';

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => {},
  play: () => {},
});

export const useSound = () => useContext(SoundContext);

export default function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext lazily on first user gesture
  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch {
        return null;
      }
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback((type: SoundType) => {
    if (!enabled) return;
    const ctx = ensureCtx();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'dock') {
      // Soft mechanical click — short sine pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'verify') {
      // Tonal shift — two-note ascending chime (the signature "verified" sound)
      // Identical everywhere a deposit confirms — cohesive motion signature
      [659.25, 987.77].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + i * 0.06;
        osc.frequency.setValueAtTime(freq, start);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.08, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(start); osc.stop(start + 0.3);
      });
    } else if (type === 'gate') {
      // Gate pass — soft low thunk
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.15);
    } else if (type === 'hover') {
      // Subtle tick — very quiet
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.04);
    }
  }, [enabled, ensureCtx]);

  const toggle = useCallback(() => {
    if (!enabled) {
      ensureCtx(); // Initialize on user gesture
    }
    setEnabled((v) => !v);
  }, [enabled, ensureCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}
