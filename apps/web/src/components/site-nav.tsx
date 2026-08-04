'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const links = [
  { name: 'Product', href: '/#product' },
  { name: 'Sample Report', href: '/sample-report' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'For Agencies', href: '/agency' },
  { name: 'Methodology', href: '/methodology' },
  { name: 'Contact', href: '/contact' },
];

export function SiteNav() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isOpen ? 'hidden' : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
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
              priority
              className="h-5 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs font-medium transition-colors ${
                      isActive ? 'text-espresso border-b border-espresso pb-0.5' : 'text-mist hover:text-espresso'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/contact?intent=claim-support-review&source=scrutexity-nav"
              className="rounded-md bg-espresso px-4 py-2.5 text-xs font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Get a Claim Snapshot
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-espresso lg:hidden z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
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
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            id="mobile-navigation"
            className="fixed inset-0 z-40 flex flex-col bg-cream pt-24 pb-8 px-6 lg:hidden overflow-y-auto"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-5">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-3xl ${
                    pathname === link.href ? 'text-sage-deep' : 'text-espresso'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-12 pt-8 border-t border-sand-deep/20">
              <Link
                href="/contact?intent=claim-support-review&source=scrutexity-nav"
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 w-full items-center justify-center rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep"
              >
                Get a Claim Snapshot
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
