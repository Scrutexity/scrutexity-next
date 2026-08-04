'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'METHODOLOGY', href: '/methodology' },
  { name: 'PROOF', href: '/proof' },
  { name: 'ENTERPRISE', href: '/enterprise' },
  { name: 'PRICING', href: '/pricing' },
  { name: 'AUDITGPT', href: '/audit' },
];

export function SiteNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || isOpen ? 'bg-cream/95 backdrop-blur-md border-b border-sand-deep/20 py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity z-50">
            <Image
              src="/logo-wordmark-black.png"
              alt="Scrutexity"
              width={180}
              height={38}
              className="h-5 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-mono text-[11px] font-medium tracking-[0.15em] transition-colors ${
                      isActive ? 'text-espresso border-b border-espresso pb-0.5' : 'text-mist hover:text-espresso'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <Link
              href="https://auditgpt.ai/snapshot?source=scrutexity-nav"
              className="rounded-full border border-sand-deep/45 bg-transparent px-5 py-2 font-mono text-[11px] font-medium uppercase tracking-widest text-espresso transition-colors hover:bg-bone/50"
            >
              RUN AUDITGPT
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="flex items-center justify-center p-2 text-espresso md:hidden z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-cream pt-24 pb-8 px-6 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-3xl tracking-tight ${
                    pathname === link.href ? 'text-sage-deep' : 'text-espresso'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-12 pt-8 border-t border-sand-deep/20">
              <Link
                href="https://auditgpt.ai/snapshot?source=scrutexity-nav"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-espresso px-6 py-4 font-mono text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-espresso/90"
              >
                RUN AUDITGPT &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
