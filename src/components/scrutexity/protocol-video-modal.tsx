'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const VIDEO_DURATION = 90; // seconds — the "Watch the protocol · 90s" promise

/**
 * ProtocolVideoModal — cinematic overlay triggered from the hero's
 * "Watch the protocol" button.
 *
 * Features:
 *   - 90-second runtime indicator with progress bar
 *   - Esc closes, backdrop click closes, X button closes
 *   - Focus trap (Tab cycles within modal)
 *   - Auto-advances through 3 "chapters" matching the 3-step protocol
 *   - SSR-safe (only renders when open)
 *   - Reduced-motion: static frames, no auto-advance
 */
export default function ProtocolVideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [chapter, setChapter] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const chapters = [
    {
      num: '01',
      title: 'Diagnostic Audit',
      body: 'We connect read-only to your PMS. Within 24 hours, you see exactly how much demand was left on the table over the last 30 days.',
      badge: 'READ-ONLY',
    },
    {
      num: '02',
      title: 'Authorized Recovery',
      body: 'Our protocol re-engages stalled patients in your clinic\u2019s voice. Every reply is staff-approved before it sends. Clinical questions escalate to humans.',
      badge: 'CLINICAL ESCALATION',
    },
    {
      num: '03',
      title: 'Verification',
      body: 'A booking is only counted once the deposit lands in your PMS. We report deposits, not leads — receipt-grade, tamper-evident, diligence-ready.',
      badge: 'PMS-VERIFIED',
    },
  ];

  // Reset on open — syncs the external `open` prop to internal timer state.
  // This is an intentional setState-in-effect: the modal's timer must reset
  // to zero every time the modal opens, and there's no way to derive this
  // from props alone.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setElapsed(0);
      setChapter(0);
      startRef.current = performance.now();
      // Focus the close button when modal opens
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open]);

  // Auto-advance timer (skipped on reduced-motion)
  useEffect(() => {
    if (!open || reduced) return;

    const tick = (now: number) => {
      const e = (now - startRef.current) / 1000;
      if (e >= VIDEO_DURATION) {
        setElapsed(VIDEO_DURATION);
        return;
      }
      setElapsed(e);
      // 3 chapters, ~30s each
      const c = Math.min(Math.floor(e / (VIDEO_DURATION / 3)), 2);
      setChapter(c);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open, reduced]);

  // Esc to close + focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        // Simple focus trap — cycle through focusable elements in the modal
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [open, handleKeyDown]);

  const progress = (elapsed / VIDEO_DURATION) * 100;
  const remainingSec = Math.max(0, Math.ceil(VIDEO_DURATION - elapsed));
  const mm = String(Math.floor(remainingSec / 60)).padStart(2, '0');
  const ss = String(remainingSec % 60).padStart(2, '0');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="protocol-video-title"
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="relative w-full max-w-4xl bg-cream rounded-2xl overflow-hidden shadow-float"
          >
            {/* Top bar: title + close */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-sand-deep/40">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" aria-hidden />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sage-deep font-semibold">
                  The Protocol · 90s
                </span>
              </div>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close video"
                className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-sand-deep/30 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Video area — staged as a "narrative deck" rather than a real video file.
                In production this would be a <video> element with a hosted mp4.
                For the prototype, it's a cinematic 3-chapter auto-advancing sequence. */}
            <div className="relative aspect-video bg-ink overflow-hidden">
              {/* Ambient gradient that shifts per chapter */}
              <div
                className="absolute inset-0 transition-all duration-1000"
                style={{
                  background:
                    chapter === 0
                      ? 'radial-gradient(ellipse at 30% 40%, rgba(143,169,138,0.35), transparent 70%), radial-gradient(ellipse at 70% 60%, rgba(197,160,89,0.15), transparent 60%)'
                      : chapter === 1
                      ? 'radial-gradient(ellipse at 50% 50%, rgba(197,160,89,0.3), transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(143,169,138,0.2), transparent 60%)'
                      : 'radial-gradient(ellipse at 70% 40%, rgba(143,169,138,0.35), transparent 70%), radial-gradient(ellipse at 30% 70%, rgba(197,160,89,0.25), transparent 60%)',
                }}
                aria-hidden
              />

              {/* Chapter content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={chapter}
                    initial={reduced ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -24 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                    className="max-w-2xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                        {chapters[chapter].num}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-cream/60 px-2.5 py-1 rounded-full border border-cream/20">
                        {chapters[chapter].badge}
                      </span>
                    </div>
                    <h3
                      id="protocol-video-title"
                      className="font-display text-4xl md:text-5xl text-cream leading-[1.05] tracking-[-0.02em]"
                    >
                      {chapters[chapter].title}
                    </h3>
                    <p className="mt-5 font-sans text-base md:text-lg text-cream/80 leading-[1.5] max-w-xl">
                      {chapters[chapter].body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Chapter indicators (bottom-right of video) */}
              <div className="absolute bottom-5 right-6 flex gap-2">
                {chapters.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setChapter(i);
                      if (!reduced) {
                        startRef.current = performance.now() - (i * VIDEO_DURATION * 1000) / 3;
                      }
                    }}
                    aria-label={`Go to chapter ${i + 1}`}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === chapter ? 'w-8 bg-gold' : 'w-1.5 bg-cream/40 hover:bg-cream/60'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Bottom bar: progress + time + CTA */}
            <div className="px-6 py-4 bg-cream-deep">
              {/* Progress bar */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1 rounded-full bg-sand-deep/60 overflow-hidden">
                  <motion.div
                    className="h-full bg-sage-deep origin-left"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
                <span className="font-mono text-[10px] tabular-nums text-mist min-w-[44px] text-right">
                  -{mm}:{ss}
                </span>
              </div>

              {/* CTA */}
              <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mist/70">
                  {chapter < 2 ? 'Next: ' + chapters[chapter + 1].title : 'Ready to start?'}
                </p>
                <a
                  href="#pilot"
                  onClick={onClose}
                  className="sage-cta inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-sans text-xs font-semibold"
                >
                  Start 14-day pilot
                  <span className="ml-1.5" aria-hidden>→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
