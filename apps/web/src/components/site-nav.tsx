'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
const links = [
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Methodology', href: '/methodology' },
  { name: 'Sample Report', href: '/sample-report' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Enterprise', href: '/enterprise' },
];
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
export function SiteNav() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? 'hidden' : prev;
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);
  useEffect(() => { setIsOpen(false); }, [pathname]);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || isOpen ? 'border-sand-deep bg-cream py-3.5 shadow-[0_1px_0_rgba(28,24,20,0.06)]' : 'border-sand-deep/0 bg-cream/80 backdrop-blur-[6px] py-5'}`}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <Image src="/logo-wordmark-black.png" alt="Scrutexity" width={160} height={32} priority className="h-[18px] w-auto dark-invert" />
              <span className="hidden h-4 w-px bg-sand-deep lg:block" aria-hidden />
              <span className="hidden text-[10px] tracking-[0.14em] text-mist uppercase lg:inline" style={{ fontFamily: MONO }}>Claim Intelligence — EST 2024</span>
            </Link>
          </div>
          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
            <div className="flex items-center gap-5">
              {links.map((l) => (
                <Link key={l.name} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined} className={`text-[11px] font-medium tracking-[0.08em] uppercase transition-colors ${isActive(l.href) ? 'text-espresso underline decoration-clay underline-offset-8 decoration-1' : 'text-mist hover:text-espresso'}`} style={{ fontFamily: MONO }}>{l.name}</Link>
              ))}
            </div>
            <span aria-hidden className="h-4 w-px bg-sand-deep/60" />
            <ThemeToggle />
            <div className="flex items-center gap-3">
              <Link href="mailto:hello@scrutexity.com" className="px-4 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase text-espresso transition-colors hover:text-clay" style={{ fontFamily: MONO }}>Contact</Link>
              <Link href="/snapshot" className="bg-espresso px-5 py-2.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-cream transition-colors hover:bg-clay-deep" style={{ fontFamily: MONO }}>Run free snapshot</Link>
            </div>
          </nav>
          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle />
            <button type="button" className="flex min-h-11 min-w-11 items-center justify-center text-espresso" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="mobile-navigation">{isOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }} id="mobile-navigation" className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cream px-5 pb-8 pt-20 sm:px-8 xl:hidden">
            <div className="mt-6 border-t border-sand-deep pt-6">
              <nav aria-label="Mobile" className="flex flex-col">
                {links.map((l) => (
                  <Link key={l.name} href={l.href} onClick={() => setIsOpen(false)} className={`border-b border-sand-deep/50 py-4 font-display text-[1.5rem] tracking-[-0.02em] ${isActive(l.href) ? 'text-clay' : 'text-espresso'}`}>{l.name}</Link>
                ))}
              </nav>
            </div>
            <div className="mt-8 space-y-3">
              <Link href="/snapshot" onClick={() => setIsOpen(false)} className="flex min-h-12 w-full items-center justify-center bg-espresso px-6 text-[13px] font-semibold tracking-[0.02em] text-cream" style={{ fontFamily: MONO }}>Run free snapshot</Link>
              <Link href="mailto:hello@scrutexity.com" onClick={() => setIsOpen(false)} className="flex min-h-12 w-full items-center justify-center border border-sand-deep bg-bone px-6 text-[13px] font-semibold text-espresso">Contact</Link>
            </div>
            <p className="mt-8 text-center text-[10px] tracking-[0.12em] text-mist uppercase" style={{ fontFamily: MONO }}>Not a law firm · Not legal advice · Evidence first</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
