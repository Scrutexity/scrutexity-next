'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Product', href: '/#product' },
  { name: 'Sample Report', href: '/sample-report' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'For Agencies', href: '/agency' },
  { name: 'Methodology', href: '/methodology' },
  { name: 'Verify', href: '/verify' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function SiteNav() {
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Hide the global nav where the page supplies its own chrome. This gate must
  // sit AFTER every hook: it previously preceded useState/useRef, so navigating
  // between '/' and any other route changed the hook count and threw.
  const suppressed = pathname === '/' || pathname === '/redesign';
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const restoreMenuFocusRef = useRef(false);

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

  useEffect(() => {
    if (!isOpen) {
      if (restoreMenuFocusRef.current) {
        restoreMenuFocusRef.current = false;
        menuButtonRef.current?.focus();
      }
      return;
    }

    const drawer = mobileDrawerRef.current;
    const firstLink = drawer?.querySelector<HTMLAnchorElement>('a[href]');
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        restoreMenuFocusRef.current = true;
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !drawer) return;

      const focusable = [
        menuButtonRef.current,
        ...Array.from(drawer.querySelectorAll<HTMLAnchorElement>('a[href]')),
      ].filter((element): element is HTMLButtonElement | HTMLAnchorElement => Boolean(element));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (suppressed) return null;

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
              href="/contact?intent=buyer-narrative-alignment-sprint&source=scrutexity-nav"
              className="rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-paper-light transition-colors hover:bg-accent hover:text-on-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Request the Sprint
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            ref={menuButtonRef}
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
      {isOpen && (
          <div
            ref={mobileDrawerRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
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
                href="/contact?intent=buyer-narrative-alignment-sprint&source=scrutexity-nav"
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 w-full items-center justify-center rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep"
              >
                Request the Sprint
              </Link>
            </div>
          </div>
      )}
    </>
  );
}
