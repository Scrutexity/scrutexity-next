'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import GovButton from '@/components/GovButton';
import { ChevronDown } from 'lucide-react';

const LINKS = [
  ['Pricing', '/pricing'],
  ['Intelligence', '/intelligence'],
  ['Trust', '/trust'],
];

const SOLUTIONS = [
  { label: 'Platform', href: '/platform', desc: 'How lead recovery works' },
  { label: "What's Coming", href: '/roadmap', desc: 'Yield Engine, Post-Care Triage, GLP-1 Bridge' },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const solutionsActive = SOLUTIONS.some((s) => isActive(s.href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-lg transition-all duration-300 ${
        scrolled
          ? 'bg-[#f7f2ea]/92 border-[#e1d4c5]/85 shadow-[0_10px_34px_-18px_rgba(34,31,27,0.22)]'
          : 'bg-[#f7f2ea]/72 border-[#e1d4c5]/50'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image src="/logo-icon.png" alt="Scrutexity icon" width={44} height={44} className="h-8 w-auto sm:h-9" priority />
          <Image src="/logo-text-only.png" alt="Scrutexity" width={156} height={44} className="hidden h-7 w-auto sm:block sm:h-8" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">

          {/* Solutions dropdown */}
          <div className="relative" onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
            <button
              className={`group relative flex items-center gap-1 text-sm font-medium transition-colors ${
                solutionsActive ? 'text-[#221f1b]' : 'text-[#6b6259] hover:text-[#221f1b]'
              }`}
            >
              Solutions
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
              <span className={`absolute -bottom-1.5 left-0 h-[1.5px] rounded bg-terracotta transition-all duration-300 ${solutionsActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>

            {solutionsOpen && (
              <div className="absolute left-0 top-full pt-3 w-64 z-50">
                <div className="rounded-[1.25rem] border border-[#e1d4c5] bg-[#fbf7ef]/98 shadow-[0_16px_40px_-12px_rgba(34,31,27,0.18)] backdrop-blur-xl overflow-hidden">
                  {SOLUTIONS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-5 py-3.5 no-underline transition-colors hover:bg-[#f3eadf] ${
                        isActive(item.href) ? 'bg-terracotta/8' : ''
                      }`}
                    >
                      <p className={`text-sm font-semibold ${isActive(item.href) ? 'text-terracotta' : 'text-[#221f1b]'}`}>{item.label}</p>
                      <p className="text-xs text-[#7a7066] mt-0.5">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`group relative text-sm font-medium transition-colors ${
                isActive(href) ? 'text-[#221f1b]' : 'text-[#6b6259] hover:text-[#221f1b]'
              }`}
            >
              {label}
              <span className={`absolute -bottom-1.5 left-0 h-[1.5px] rounded bg-terracotta transition-all duration-300 ${isActive(href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}

          <GovButton href="/pilot" label="Request audit →" />
        </nav>

        {/* Mobile: hamburger + CTA */}
        <div className="flex items-center gap-3 lg:hidden">
          <GovButton href="/pilot" label="Audit" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#e1d4c5]/30"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="flex w-5 flex-col gap-[5px]">
              <span className={`block h-[1.5px] rounded bg-[#221f1b] transition-all duration-300 ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] rounded bg-[#221f1b] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] rounded bg-[#221f1b] transition-all duration-300 ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-72 bg-[#fbf7ef] border-l border-[#e1d4c5] shadow-2xl transition-transform duration-300 ease-lux lg:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-1 px-6 pt-28">
          <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b6a51]">Solutions</p>
          {SOLUTIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition-all no-underline ${
                isActive(item.href)
                  ? 'bg-terracotta/8 text-[#221f1b] border border-terracotta/20'
                  : 'text-[#6b6259] hover:bg-[#e1d4c5]/20 hover:text-[#221f1b] border border-transparent'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-[#e1d4c5]" />
          {LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-xl px-4 py-3 text-base font-medium transition-all no-underline ${
                isActive(href)
                  ? 'bg-terracotta/8 text-[#221f1b] border border-terracotta/20'
                  : 'text-[#6b6259] hover:bg-[#e1d4c5]/20 hover:text-[#221f1b] border border-transparent'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
