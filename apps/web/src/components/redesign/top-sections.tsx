'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CTAButton, GlassCard, Kicker, Reveal } from './motion-kit';

/* ---------------------------------- Nav ---------------------------------- */

const NAV_LINKS = [
  { name: 'Features', href: '#features' },
  { name: 'Showcase', href: '#showcase' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
];

export function MakroNav({
  heroOption = '2',
  setHeroOption,
  isLight = true,
}: {
  heroOption?: '1' | '2' | '3';
  setHeroOption?: (v: '1' | '2' | '3') => void;
  isLight?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
      isLight
        ? 'border-b border-black/5 bg-[#f4f6fa]/80 backdrop-blur-md text-[#14142d]'
        : 'border-b border-white/10 bg-[#14142d]/80 backdrop-blur-md text-[#ebedfa]'
    }`}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d9ff5c] text-[#14142d]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M12 2l-7 7M12 2l7 7" />
            </svg>
          </span>
          <span className={`text-[15px] font-semibold tracking-tight ${isLight ? 'text-[#14142d]' : 'text-[#ebedfa]'}`}>
            Scrutexity
          </span>
        </a>

        {/* Center Navigation Links & Hero options: 1 | 2 | 3 Toggle */}
        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Primary" className="flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className={`text-[13px] font-medium transition-colors ${
                  isLight ? 'text-[#5a6072] hover:text-[#14142d]' : 'text-[#9391b8] hover:text-[#ebedfa]'
                }`}
              >
                {l.name}
              </a>
            ))}
          </nav>

          {/* Hero options pill toggle */}
          {setHeroOption && (
            <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium ${
              isLight ? 'border-black/10 bg-white/80 text-[#5a6072]' : 'border-white/15 bg-white/10 text-[#9391b8]'
            }`}>
              <span>Hero options:</span>
              <div className="flex items-center gap-1 rounded-full bg-[#35363b] p-0.5 text-white">
                {(['1', '2', '3'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setHeroOption(opt)}
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold transition-all ${
                      heroOption === opt
                        ? 'bg-[#d9ff5c] text-[#14142d]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block">
          <CTAButton href="/snapshot" variant={isLight ? 'ghost' : 'lime'} className="px-5 py-2 text-[13px]">
            Get started
          </CTAButton>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border md:hidden ${
            isLight ? 'border-black/10 text-[#14142d]' : 'border-white/10 text-[#ebedfa]'
          }`}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-[#14142d] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#9391b8] hover:bg-white/5 hover:text-[#ebedfa]"
                >
                  {l.name}
                </a>
              ))}
              <div className="mt-2 px-3">
                <CTAButton href="/snapshot" className="w-full py-3">
                  Get started
                </CTAButton>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------------------- Hero --------------------------------- */

export function MakroHero({
  heroOption = '2',
  isLight = true,
}: {
  heroOption?: '1' | '2' | '3';
  isLight?: boolean;
}) {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 sm:pt-44">
      {/* ambient glows */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-[140px] ${
          isLight ? 'bg-blue-100/60' : 'bg-[#33335e]/40'
        }`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-160px] top-40 h-[360px] w-[360px] rounded-full bg-[#d9ff5c]/10 blur-[120px]"
      />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center text-center">
        <Reveal>
          <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-xs ${
            isLight ? 'border-black/10 bg-white text-[#5a6072]' : 'border-white/10 bg-white/[0.06] text-[#9391b8]'
          }`}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#d9ff5c]" />
            Public Claim Intelligence
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className={`mt-6 max-w-[820px] text-[40px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl ${
            isLight ? 'text-[#14142d]' : 'text-[#ebedfa]'
          }`}>
            Know your claims.
            <br />
            <span className={isLight ? 'text-[#5a6072]' : 'text-[#9391b8]'}>Audit with AI.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className={`mt-6 max-w-[560px] text-base leading-relaxed sm:text-lg ${
            isLight ? 'text-[#5a6072]' : 'text-[#9391b8]'
          }`}>
            Scrutexity documents the gap between what a company claims, what
            its evidence supports, and what AI systems say about it — in one
            clean, dated record.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <CTAButton href="/snapshot" variant="lime" className="px-7 py-3 text-[15px]">
              Get started
            </CTAButton>
            <CTAButton href="#showcase" variant="ghost" className="px-8 py-3.5 text-[15px]">
              See how it works
            </CTAButton>
          </div>
        </Reveal>

        {/* Hero dashboard mockup — the signature Makro hero visual */}
        <Reveal delay={0.32} className="mt-16 w-full">
          <div className="relative mx-auto max-w-[980px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[#33335e]/40 blur-[70px]"
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#242426]/80 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
              {/* window chrome */}
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e0c5b6]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d9ff5c]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#b8deff]/70" />
                <span className="ml-4 hidden rounded-md border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] text-[#9391b8] sm:block">
                  app.scrutexity.com/evidence-board
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
                {/* sidebar */}
                <aside className="hidden flex-col gap-1 border-r border-white/[0.07] p-4 md:flex">
                  {['Overview', 'Claims', 'Sources', 'Watch', 'Reports'].map((item, i) => (
                    <span
                      key={item}
                      className={`rounded-lg px-3 py-2 text-[12px] font-medium ${
                        i === 1
                          ? 'bg-[#d9ff5c]/15 text-[#d9ff5c]'
                          : 'text-[#9391b8]'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                  <div className="mt-auto rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-wide text-[#9391b8]">
                      Exposure score
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#d9ff5c]">61</p>
                  </div>
                </aside>

                {/* main panel */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-semibold text-[#ebedfa]">
                        Evidence board — Northway Medical
                      </p>
                      <p className="text-[11px] text-[#9391b8]">
                        Last run: just now · 14 sources
                      </p>
                    </div>
                    <span className="rounded-full bg-[#d9ff5c]/15 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[#d9ff5c]">
                      Live
                    </span>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {[
                      { claim: '“FDA-cleared safety”', status: 'VERIFIED', cls: 'text-[#d9ff5c]' },
                      { claim: '“Clinically proven results”', status: 'GAP', cls: 'text-[#e0c5b6]' },
                      { claim: '“Doctor-recommended”', status: 'UNSUPPORTED', cls: 'text-[#b8deff]' },
                      { claim: '“Scientifically validated”', status: 'VERIFIED', cls: 'text-[#d9ff5c]' },
                    ].map((r) => (
                      <div
                        key={r.claim}
                        className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3"
                      >
                        <span className="text-[13px] text-[#ebedfa]" dangerouslySetInnerHTML={{ __html: r.claim }} />
                        <span className={`text-[10.5px] font-bold tracking-wider ${r.cls}`}>
                          {r.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/[0.07] pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-[#9391b8]">Drift signal</p>
                      <p className="text-lg font-bold text-[#d9ff5c]">+15%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-[#9391b8]">Claims reviewed</p>
                      <p className="text-lg font-bold text-[#ebedfa]">64</p>
                    </div>
                    <div className="ml-auto hidden items-center gap-2 sm:flex">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d9ff5c]" />
                      <span className="text-[11px] text-[#9391b8]">Auto-checking new sources</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- Trusted by ------------------------------ */

const TRUSTEES = ['Counsel', 'Founders', 'Diligence teams', 'Regulators', 'Vendors'];

export function MakroTrustedBy() {
  return (
    <section className="border-y border-white/[0.07] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9391b8]">
            Trusted by counsel, founders and diligence teams
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUSTEES.map((t) => (
              <span
                key={t}
                className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9391b8]/60"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- Case study ------------------------------ */

export function MakroCaseStudy() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <Kicker>Latest case study</Kicker>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-4 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold leading-snug tracking-tight text-[#ebedfa] sm:text-4xl">
                A med-spa&rsquo;s weight-loss claims drifted from its clinical
                evidence. Here&rsquo;s what the record showed.
              </h2>
              <p className="mt-4 max-w-[540px] text-[15px] leading-relaxed text-[#9391b8]">
                One Snapshot review surfaced three claims the clinic had
                repeated for months — none of which its cited studies actually
                supported. The dated, source-linked record let counsel fix the
                wording in a day.
              </p>
              <a
                href="/sample-report"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d9ff5c] transition-colors hover:text-[#e4ff85]"
              >
                Read the case study
                <ArrowRight size={15} />
              </a>
            </div>

            <GlassCard className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9391b8]">
                Snapshot record · #022-41
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { claim: '&ldquo;FDA-cleared safety&rdquo;', status: 'VERIFIED', tone: 'text-[#d9ff5c]' },
                  { claim: '&ldquo;Clinically proven results&rdquo;', status: 'GAP', tone: 'text-[#e0c5b6]' },
                  { claim: '&ldquo;Doctor-recommended&rdquo;', status: 'UNSUPPORTED', tone: 'text-[#b8deff]' },
                ].map((r) => (
                  <div
                    key={r.claim}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-[#242426]/50 px-4 py-3"
                  >
                    <span
                      className="text-[13px] text-[#ebedfa]"
                      dangerouslySetInnerHTML={{ __html: r.claim }}
                    />
                    <span className={`text-[11px] font-bold tracking-wider ${r.tone}`}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
