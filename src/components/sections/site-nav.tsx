'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Menu, X, Lock } from 'lucide-react';
import Image from 'next/image';
import { useStore } from '@/lib/store';

const EASE = [0.16, 1, 0.3, 1] as const;

const navLinks: { label: string; href: string; subLinks?: { label: string; href: string }[] }[] = [
  { label: 'Methodology', href: '/methodology' },
  { label: 'Proof',       href: '/proof' },
  { label: 'Enterprise',  href: '/enterprise' },
  { label: 'Pricing',     href: '/pricing' },
  { label: 'AuditGPT',    href: 'https://auditgpt.ai/snapshot?source=scrutexity-nav' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Monitor scroll height to trigger floating bar shrink state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync block ticking countdown timer on client mount
  useEffect(() => {
    const epoch = new Date('2026-06-10').getTime();
    const days = Math.floor((Date.now() - epoch) / (24 * 60 * 60 * 1000));
    const seededBlock = 89427 + days * 40;
    
    useStore.setState({ blockNumber: seededBlock });

    const interval = setInterval(() => {
      const state = useStore.getState();
      if (state.timeLeft <= 1) {
        useStore.setState({ 
          blockNumber: state.blockNumber + 1,
          timeLeft: 60 
        });
      } else {
        useStore.setState({ 
          timeLeft: state.timeLeft - 1 
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Close drawer on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
      
      {/* FLOATING GLASSMORPHIC NAVIGATION PILL */}
      <div className="relative w-full flex justify-center mt-2 px-4">
        <motion.nav 
          animate={{ 
            y: scrolled ? 2 : 10,
            scale: scrolled ? 0.98 : 1,
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="w-full max-w-5xl flex items-center justify-between border border-sand-deep/20 bg-white/30 backdrop-blur-xl px-5 py-2 rounded-full ring-1 ring-inset ring-white/45 sm:px-6 pointer-events-auto transition-shadow duration-300 h-14"
          style={{
            boxShadow: scrolled 
              ? '0 16px 48px -12px rgba(28,24,20,0.14), inset 0 1px 1px rgba(255,255,255,0.7)' 
              : '0 10px 34px -16px rgba(28,24,20,0.12), inset 0 1px 1px rgba(255,255,255,0.7)'
          }}
        >
          {/* Brand Wordmark Logo */}
          <a href="/" className="flex items-center hover:scale-[1.01] transition-transform duration-300">
            <Image
              src="/logo-wordmark-black.png"
              alt="Scrutexity"
              width={160}
              height={32}
              priority
              className="h-6.5 w-auto"
            />
          </a>

          {/* Desktop Navigation Links with sliding underline */}
          <div 
            className="hidden items-center gap-7 md:flex relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, idx) => (
              <div
                key={link.label}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative group"
              >
                <a
                  href={link.href}
                  className="font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] text-mist/85 hover:text-ink transition-colors relative py-1.5 focus:outline-none flex items-center gap-1"
                >
                  {link.label}
                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="nav-hover-line"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-sage-deep rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
                
                {link.subLinks && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="bg-bone border border-sand-deep/30 rounded-xl p-2 shadow-xl flex flex-col min-w-[160px]">
                      {link.subLinks.map(sub => (
                        <a 
                          key={sub.label} 
                          href={sub.href}
                          className="px-3 py-2 text-[10px] font-sans font-bold uppercase tracking-[0.12em] text-mist hover:text-sage-deep hover:bg-cream-deep rounded-lg transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Primary CTA — Run AuditGPT */}
          <div className="hidden md:flex items-center">
            <a
              href="https://auditgpt.ai/snapshot?source=scrutexity-nav"
              className="relative inline-flex items-center justify-center rounded-full bg-bark px-5 py-2.5 font-sans text-[10px] font-extrabold uppercase tracking-[0.16em] text-sage border border-ink/30 ring-1 ring-inset ring-cream/5 hover:bg-ink hover:text-sage-soft hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group/btn"
              style={{ boxShadow: '0 10px 24px -10px rgba(28,24,20,0.35)' }}
            >
              Run AuditGPT
              <span className="ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden>→</span>
            </a>
          </div>

          {/* Mobile hamburger menu button */}
          <button
            className="md:hidden p-2 text-ink hover:bg-ink/5 rounded-full transition-colors focus:outline-none"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </motion.nav>
      </div>

      {/* Scroll progress bar (placed at bottom of top strip) */}
      {!reduced && (
        <motion.div
          className="h-[1.5px] bg-clay origin-left fixed top-[32px] left-0 right-0 pointer-events-auto"
          style={{ scaleX }}
        />
      )}

      {/* Floating modular mobile menu drawer overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-40 md:hidden pointer-events-auto"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="fixed right-4 top-[84px] bottom-4 z-50 w-72 rounded-2xl border border-sand-deep/40 bg-white/50 backdrop-blur-xl p-6 shadow-2xl flex flex-col justify-between md:hidden pointer-events-auto ring-1 ring-inset ring-white/45"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between">
                <Image
                  src="/logo-wordmark-black.png"
                  alt="Scrutexity"
                  width={140}
                  height={30}
                  className="h-6 w-auto"
                />
                <button
                  className="p-1.5 text-ink hover:bg-ink/5 rounded-full focus:outline-none"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-2 mt-8 overflow-y-auto pb-6 scrollbar-hide">
                {navLinks.map((link, idx) => (
                  <div key={link.label} className="flex flex-col">
                    <a
                      href={link.href !== '#' ? link.href : undefined}
                      onClick={link.href !== '#' ? () => setOpen(false) : undefined}
                      className="font-display text-2xl text-ink py-2 border-b border-sand-deep/20 hover:text-sage-deep transition-colors flex items-center justify-between"
                    >
                      {link.label}
                      <span className="font-mono text-[9px] text-sage-deep tracking-wider font-bold">0{idx + 1}</span>
                    </a>
                    {link.subLinks && (
                      <div className="flex flex-col pl-4 border-b border-sand-deep/20 pb-2">
                        {link.subLinks.map(sub => (
                          <a 
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="font-display text-lg text-mist py-1.5 hover:text-sage-deep transition-colors"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Drawer Footer Actions */}
              <div className="mt-auto pt-6 flex flex-col gap-4">
                <a
                  href="https://auditgpt.ai/snapshot?source=scrutexity-mobile-nav"
                  onClick={() => setOpen(false)}
                  className="relative inline-flex items-center justify-center rounded-full bg-sage-deep py-3.5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-cream border border-ink/30 ring-1 ring-inset ring-cream/10 text-center"
                  style={{ boxShadow: '0 8px 22px -8px rgba(28,24,20,0.32)' }}
                >
                  Run AuditGPT →
                </a>
                <a
                  href="/methodology"
                  onClick={() => setOpen(false)}
                  className="text-center text-xs font-sans font-semibold uppercase tracking-[0.14em] text-ink hover:text-sage-deep transition-colors"
                >
                  View Methodology
                </a>
                <div className="flex items-center justify-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-mist/70">
                  <Lock size={8} className="text-sage" /> PUBLIC SOURCES ONLY
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
