'use client';

import { ArrowRight } from 'lucide-react';
import { CTAButton, Reveal } from './motion-kit';

/* --------------------------------- Final CTA ------------------------------- */

export function MakroFinalCTA() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[#d9ff5c]/25 bg-gradient-to-b from-[#33335e]/60 to-[#242426]/60 px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9ff5c]/15 blur-[100px]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-[720px] text-3xl font-bold leading-tight tracking-tight text-[#ebedfa] sm:text-5xl">
                Ready to take control of your claim evidence?
              </h2>
              <p className="mx-auto mt-4 max-w-[480px] text-[15px] text-[#9391b8]">
                Start with a free snapshot. See the gap between what&rsquo;s
                claimed and what&rsquo;s proven — in minutes.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CTAButton href="/snapshot" className="px-9 py-4 text-[15px]">
                  Get started — it&rsquo;s free
                  <ArrowRight size={16} />
                </CTAButton>
                <CTAButton href="/contact" variant="ghost" className="px-9 py-4 text-[15px]">
                  Talk to us
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Footer --------------------------------- */

const FOOTER_COLS = [
  {
    title: 'Index',
    links: [
      ['Features', '#features'],
      ['Pricing', '#pricing'],
      ['Testimonials', '#testimonials'],
      ['FAQ', '#faq'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Updates', '/insights'],
      ['Contact', '/contact'],
      ['Blog', '/insights'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Terms', '/terms'],
      ['Privacy', '/privacy'],
      ['Proof', '/proof'],
      ['Verify a record', '/verify'],
    ],
  },
];

export function MakroFooter() {
  return (
    <footer className="border-t border-white/[0.07] px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d9ff5c] text-[#14142d]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M12 2l-7 7M12 2l7 7" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-[#ebedfa]">
                Scrutexity
              </span>
            </div>
            <p className="mt-4 max-w-[260px] text-[12.5px] leading-relaxed text-[#9391b8]">
              Claim Evidence Intelligence. Documents the gap between what&rsquo;s
              claimed and what&rsquo;s proven.
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9391b8]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[13px] text-[#ebedfa]/80 transition-colors hover:text-[#d9ff5c]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-6">
          <p className="text-[12px] text-[#9391b8]">
            © 2026 Scrutexity. Not a law firm; records are not legal advice.
          </p>
          <p className="text-[11px] text-[#9391b8]/50">
            Design concept — Makro-inspired reference build
          </p>
        </div>
      </div>
    </footer>
  );
}
