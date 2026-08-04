'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion, type PanInfo } from 'framer-motion';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/**
 * TestimonialCarousel — warm-palette social proof.
 *
 * Compliance: per the locked CPOM/FTC discipline (DESIGN_SYSTEM.md §6),
 * we cannot ship fabricated or named-but-fake testimonials. Until real
 * clients have provided written consent + verifiable receipts, these
 * three rows are shipped as ILLUSTRATIVE scenarios — anonymized roles,
 * generic locations, no specific dollar claims. A section disclaimer
 * states this plainly. Swap in real testimonials when ready.
 */

interface Testimonial {
  id: number;
  quote: string;
  role: string;
  clinic: string;
  metricLabel: string;
  metricValue: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "What sold us on the pilot was the strict clinical stop-rule — anything that smelled like a medical question got handed back to our staff inside Boulevard. It surfaces missed-demand without doing anything our medical director couldn't sign off on.",
    role: 'Medical Director',
    clinic: 'Multi-location NYC med spa',
    metricLabel: 'Pilot outcome',
    metricValue: 'Deposits captured',
  },
  {
    id: 2,
    quote:
      'Read-only bridge to Boulevard meant we didn’t have to retrain the front desk on a new tool. The recovered consults just showed up as deposit-paid bookings on our calendar.',
    role: 'Operations Manager',
    clinic: 'West-coast aesthetics group',
    metricLabel: 'Integration',
    metricValue: 'Zero migration',
  },
  {
    id: 3,
    quote:
      'After-hours and weekend inquiries used to disappear into the void. The triage routes clinical questions straight to my staff and locks down a deposit on the rest before anyone is back in the office.',
    role: 'Practice Owner',
    clinic: 'Midwest single-location clinic',
    metricLabel: 'When recovery happens',
    metricValue: 'Nights + weekends',
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const reduced = useReducedMotion();

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (reduced) return;
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) handleNext();
    else if (info.offset.x > swipeThreshold) handlePrev();
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-cream px-5 py-24 sm:px-8 lg:py-28"
      aria-roledescription="carousel"
    >
      {/* Warm radial wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(184,125,107,0.10),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(47,93,74,0.10),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mb-14 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mist">
            What operators say
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-espresso md:text-4xl">
            Built for the operators who run the floor.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-mist">
            Illustrative scenarios drawn from pilot conversations &mdash; verbatim, named, consented client testimonials will appear here as pilots close.
          </p>
        </motion.div>

        {/* Carousel track */}
        <div
          className="relative flex h-[440px] w-full items-center justify-center sm:h-[400px]"
          style={{ perspective: '1000px' }}
          aria-live="polite"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {testimonials.map((testimonial, index) => {
              const isCenter = index === currentIndex;
              const isLeft =
                index === (currentIndex - 1 + testimonials.length) % testimonials.length;
              const isRight = index === (currentIndex + 1) % testimonials.length;

              if (reduced && !isCenter) return null;
              if (!reduced && !isCenter && !isLeft && !isRight) return null;

              let xPosition = '0%';
              let scale = 1;
              let zIndex = 20;
              let opacity = 1;
              let blur = 'blur(0px)';

              if (isLeft) {
                xPosition = '-105%';
                scale = 0.85;
                zIndex = 10;
                opacity = 0.3;
                blur = 'blur(6px)';
              } else if (isRight) {
                xPosition = '105%';
                scale = 0.85;
                zIndex = 10;
                opacity = 0.3;
                blur = 'blur(6px)';
              }

              return (
                <motion.article
                  key={testimonial.id}
                  className="absolute w-full max-w-2xl cursor-grab px-4 outline-none active:cursor-grabbing"
                  drag={!reduced ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0}
                  onDragEnd={handleDragEnd}
                  initial={{
                    x: xPosition,
                    scale: reduced ? 1 : 0.85,
                    opacity: 0,
                    filter: reduced ? 'blur(0px)' : 'blur(8px)',
                  }}
                  animate={{
                    x: xPosition,
                    scale,
                    opacity: isCenter ? 1 : opacity,
                    filter: blur,
                    zIndex,
                    pointerEvents: isCenter ? 'auto' : 'none',
                  }}
                  exit={{
                    opacity: 0,
                    scale: reduced ? 1 : 0.85,
                    filter: reduced ? 'blur(0px)' : 'blur(8px)',
                  }}
                  transition={{ duration: 0.8, ease: cinematicEase }}
                  aria-hidden={!isCenter}
                  tabIndex={isCenter ? 0 : -1}
                >
                  {/* Warm glass card */}
                  <div
                    className="rounded-3xl border border-sand bg-cream/85 p-8 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(61,43,31,0.20),inset_0_1px_1px_rgba(255,255,255,0.7)] sm:p-12"
                  >
                    <Quote
                      className="mb-7"
                      size={36}
                      strokeWidth={1.4}
                      style={{ color: 'rgba(184, 125, 107, 0.6)' }}
                    />

                    <p className="mb-9 font-display text-xl leading-[1.45] text-espresso sm:text-2xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <div className="flex flex-col gap-6 border-t border-sand pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                      <div>
                        <h4 className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-espresso">
                          {testimonial.role}
                        </h4>
                        <p className="text-sm text-mist">{testimonial.clinic}</p>
                        <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-mist/70">
                          Illustrative &mdash; pending verified client opt-in
                        </p>
                      </div>

                      {/* Metric chip — qualitative, not dollar-specific */}
                      <div
                        className="flex flex-col items-start rounded-xl border border-[#2F5D4A]/25 bg-[#f4f8f4] px-4 py-3 sm:items-end"
                      >
                        <span className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-sage-deep">
                          {testimonial.metricLabel}
                        </span>
                        <span className="font-display text-xl tracking-tight text-sage-deep">
                          {testimonial.metricValue}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: cinematicEase }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <NavButton onClick={handlePrev} ariaLabel="Previous testimonial">
            <ArrowLeft className="h-5 w-5" />
          </NavButton>

          <div className="flex items-center gap-2 px-4" role="tablist" aria-label="Testimonial pagination">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to testimonial ${idx + 1}`}
                className="h-1.5 rounded-full transition-all duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B87D6B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E8]"
                style={{
                  width: idx === currentIndex ? '32px' : '8px',
                  backgroundColor: idx === currentIndex ? '#B87D6B' : 'rgba(139, 125, 107, 0.30)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ))}
          </div>

          <NavButton onClick={handleNext} ariaLabel="Next testimonial">
            <ArrowRight className="h-5 w-5" />
          </NavButton>
        </motion.div>
      </div>
    </section>
  );
}

/** Magnetic nav button — cinematic tween, no spring. */
function NavButton({
  onClick,
  children,
  ariaLabel,
}: {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current || reduced) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({
      x: (clientX - (left + width / 2)) * 0.18,
      y: (clientY - (top + height / 2)) * 0.18,
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ duration: 0.4, ease: cinematicEase }}
      style={{ position: 'relative', zIndex: 50 }}
    >
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-sand bg-cream text-espresso transition-colors hover:border-[#B87D6B]/50 hover:text-[#B87D6B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B87D6B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E8]"
      >
        {children}
      </button>
    </motion.div>
  );
}
