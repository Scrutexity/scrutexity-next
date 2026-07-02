"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, ChevronDown, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

/* ── Enforcement data ─────────────────────────────────────── */

type Region = {
  id: string;
  name: string;
  state: string;
  stats: { label: string; value: string }[];
  notes: string;
  sourceLabel: string;
  sourceUrl: string;
};

const REGIONS: Region[] = [
  {
    id: 'nyc',
    name: 'New York City',
    state: 'NY',
    stats: [
      { label: 'Med spas inspected', value: '15' },
      { label: 'With licensure issues', value: '100%' },
      { label: 'License display problems', value: '93%' },
      { label: 'Missing safety records', value: '86%' },
    ],
    notes: 'NYC DOHMH conducted a targeted sweep of med spas. Administrative materials from the review period show that website advertising, treatment menu language, and provider credentials were reviewed alongside on-site records. Public records and enforcement materials show that websites, brochures, provider visibility, and advertised services can become part of the review surface.',
    sourceLabel: 'NYC DOHMH Med Spa Enforcement Summary, 2024',
    sourceUrl: 'https://www.nyc.gov/site/doh/index.page',
  },
  {
    id: 'nys',
    name: 'New York State',
    state: 'NY',
    stats: [
      { label: 'Total inspections', value: '223' },
      { label: 'Businesses cited', value: '87' },
      { label: 'Citation rate', value: '39%' },
    ],
    notes: 'The Lunar Light Laser Spa proceeding is notable: administrative record shows the investigator reviewed the business\'s public website and printed brochures as part of the evidence record. Public records and enforcement materials from this period show that websites, brochures, provider visibility, and advertised services can become part of the review surface.',
    sourceLabel: 'NY Office of Professional Medical Conduct, 2024–2025',
    sourceUrl: 'https://www.op.nysed.gov/enforcement',
  },
  {
    id: 'nj',
    name: 'New Jersey',
    state: 'NJ',
    stats: [
      { label: 'Regulatory body', value: 'NJ Division of Consumer Affairs' },
      { label: 'Medical Spa Task Force', value: 'Active' },
      { label: 'Focus areas', value: 'Provider credentials, advertising, procedures' },
    ],
    notes: 'New Jersey has an active Medical Spa Task Force operating under the Division of Consumer Affairs. NJ regulations require physician oversight for procedures including laser treatments, injectables, and certain wellness services. Advertising claims that overstate provider qualifications or procedure safety are a documented category of concern in NJ enforcement materials.',
    sourceLabel: 'NJ Division of Consumer Affairs, Medical Spa Guidance',
    sourceUrl: 'https://www.njconsumeraffairs.gov/bme',
  },
];

const CLAIM_CATEGORIES = [
  { label: 'Provider & Credential Claims', risk: 'High', detail: 'Inspectors verify that credentials on your website match the staff performing procedures. Mismatches between website language and filed records are a primary citation trigger in both NY and NJ.' },
  { label: 'FDA-Cleared vs. FDA-Approved', risk: 'High', detail: 'FDA clears devices — it does not approve them for cosmetic use. Conflating the two is a documented FTC and state-board trigger. Every device claim on your site should use the correct terminology.' },
  { label: 'Before/After & Outcome Claims', risk: 'High', detail: 'Outcome claims require individual-results disclaimers, cohort base rates, and qualified language. Uninflected guarantee language is a common claim type cited in NY and NJ enforcement materials.' },
  { label: 'GLP-1 & Weight Loss Claims', risk: 'High', detail: 'Weight loss services are under active FDA and FTC scrutiny. Compound pharmacy restrictions and advertising rules for GLP-1 agonists create significant website claim exposure.' },
  { label: 'Regenerative & Wellness Claims', risk: 'Medium', detail: 'Exosomes, NAD+, peptides, HBOT — emerging therapy claims lack FDA-cleared efficacy language. State boards in NY and NJ are beginning to flag these categories.' },
  { label: 'AI Answer Distortion', risk: 'Medium', detail: 'AI engines crawl your website. If your site contains overstated claims, those claims are repeated in AI-generated answers — creating a visibility liability you cannot directly edit.' },
];

const OFFER_STEPS = [
  { step: 1, name: 'Free NY/NJ Claim Snapshot', price: '$0', highlight: 'Start here', detail: 'Submit your URL. We surface the top 3 claim exposures on your public-facing pages — credential language, FDA terminology, outcome claims, or AI answer distortion.', cta: 'Run Free Snapshot', href: 'https://auditgpt.ai/snapshot?source=ny-nj-landing' },
  { step: 2, name: 'NY/NJ Claim Intelligence Report', price: '$497', highlight: null, detail: 'Full claim inventory of your homepage and top service pages. Every flagged claim gets: evidence map, risk label, safer rewrite, and proof requirement.', cta: 'Get the $497 Audit', href: 'https://auditgpt.ai/snapshot?source=ny-nj-landing&intent=paid' },
  { step: 3, name: 'Claim Cleanup Record', price: '$1,997', highlight: 'Best value', detail: 'Done-for-you: safer rewrites executed, proof-gap table delivered, AI Answer Reality Receipt, medical-director visibility check, and a final Claim Cleanup Record PDF — a structured record of what changed and why.', cta: 'Book Claim Cleanup Record', href: '/contact?intent=claim-cleanup-record&source=ny-nj-landing' },
  { step: 4, name: 'Guardian Monitoring', price: 'from $1,497/mo', highlight: 'Ongoing', detail: 'Monthly AuditGPT pass with risk delta. Claim drift alerts as your marketing team publishes. Ongoing evidence updates.', cta: 'Start Monitoring', href: '/pricing?source=ny-nj-landing#monitoring' },
];

const FAQS = [
  { q: 'Is this legal advice or compliance certification?', a: 'No. AuditGPT reviews public-facing claim language and visible proof. It does not provide legal advice, regulatory certification, or compliance guarantees. Use findings as input for your attorney or compliance officer.' },
  { q: 'What does "review-ready" mean?', a: 'We use "review-ready" and "claim-reviewed" to describe the output. Your Claim Cleanup Record documents what was changed, why, and what proof now backs each claim. That record exists as a business document — how any party interprets it is determined by your legal counsel.' },
  { q: 'How is this different from LegitScript?', a: 'LegitScript certifies that your advertising meets their network requirements. AuditGPT reviews the claim layer underneath that — the specific language on your site, what proof backs it, and what needs safer framing. Many practices use AuditGPT before pursuing LegitScript certification.' },
  { q: 'Can agencies use this for med-spa clients?', a: 'Yes. Agencies can white-label AuditGPT audits for clients through the Partner OS program ($1,497/mo). You get client-ready reports, safer rewrite packs, and quarterly drift reviews as a billable product.' },
];

/* ── Interactive Map ─────────────────────────────────────── */

function NyNjMap({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const regions = {
    ny: {
      // Simplified NY state path (rough outline for illustration)
      path: "M 165 40 L 310 30 L 340 45 L 350 70 L 330 95 L 310 110 L 295 140 L 285 175 L 260 195 L 240 220 L 225 235 L 195 245 L 175 250 L 155 240 L 140 220 L 125 200 L 110 180 L 100 155 L 95 130 L 105 105 L 120 80 L 140 60 Z",
      label: { x: 200, y: 130 },
      cities: [
        { id: 'nyc', name: 'NYC', x: 250, y: 218, dot: 12 },
        { id: 'nys', name: 'NY State', x: 175, y: 115, dot: 8 },
      ],
    },
    nj: {
      path: "M 255 220 L 270 215 L 285 220 L 295 240 L 300 265 L 295 295 L 280 318 L 260 330 L 245 320 L 235 300 L 235 275 L 240 250 Z",
      label: { x: 265, y: 270 },
      cities: [
        { id: 'nj', name: 'NJ', x: 265, y: 270, dot: 10 },
      ],
    },
  };

  const isNYSelected = selected === 'nyc' || selected === 'nys';
  const isNJSelected = selected === 'nj';

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <svg viewBox="60 20 310 330" className="w-full h-auto" style={{ filter: 'drop-shadow(0 8px 24px rgba(28,24,20,0.12))' }}>
        {/* NJ */}
        <path
          d={regions.nj.path}
          fill={isNJSelected ? 'rgba(94,122,90,0.85)' : 'rgba(94,122,90,0.18)'}
          stroke={isNJSelected ? 'rgba(94,122,90,1)' : 'rgba(94,122,90,0.45)'}
          strokeWidth="1.5"
          className="cursor-pointer transition-all duration-400"
          onClick={() => onSelect('nj')}
        />
        {/* NY */}
        <path
          d={regions.ny.path}
          fill={isNYSelected ? 'rgba(94,122,90,0.75)' : 'rgba(94,122,90,0.14)'}
          stroke={isNYSelected ? 'rgba(94,122,90,1)' : 'rgba(94,122,90,0.45)'}
          strokeWidth="1.5"
          className="cursor-pointer transition-all duration-400"
          onClick={() => onSelect('nys')}
        />

        {/* State labels */}
        <text x={regions.ny.label.x} y={regions.ny.label.y} textAnchor="middle" className="font-mono" fontSize="11" fontWeight="600" fill={isNYSelected ? '#fff' : 'rgba(28,24,20,0.55)'} style={{ fontFamily: MONO, pointerEvents: 'none', userSelect: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>NY</text>
        <text x={regions.nj.label.x} y={regions.nj.label.y + 4} textAnchor="middle" className="font-mono" fontSize="10" fontWeight="600" fill={isNJSelected ? '#fff' : 'rgba(28,24,20,0.55)'} style={{ fontFamily: MONO, pointerEvents: 'none', userSelect: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>NJ</text>

        {/* City dots for NY */}
        {regions.ny.cities.map((city) => (
          <g key={city.id} className="cursor-pointer" onClick={() => onSelect(city.id)}>
            <circle cx={city.x} cy={city.y} r={city.dot} fill={selected === city.id ? 'rgba(94,122,90,0.95)' : 'rgba(183,137,107,0.7)'} stroke="white" strokeWidth="2" className="transition-all duration-300" />
            {selected === city.id && (
              <circle cx={city.x} cy={city.y} r={city.dot + 5} fill="none" stroke="rgba(94,122,90,0.4)" strokeWidth="1.5" />
            )}
            <text x={city.x} y={city.y - city.dot - 4} textAnchor="middle" fontSize="8" fontWeight="700" fill={selected === city.id ? 'rgba(94,122,90,1)' : 'rgba(28,24,20,0.7)'} style={{ fontFamily: MONO, userSelect: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {city.name}
            </text>
          </g>
        ))}

        {/* NJ dot */}
        {regions.nj.cities.map((city) => (
          <g key={city.id} className="cursor-pointer" onClick={() => onSelect(city.id)}>
            <circle cx={city.x} cy={city.y} r={city.dot} fill={selected === city.id ? 'rgba(94,122,90,0.95)' : 'rgba(183,137,107,0.7)'} stroke="white" strokeWidth="2" className="transition-all duration-300" />
            {selected === city.id && (
              <circle cx={city.x} cy={city.y} r={city.dot + 4} fill="none" stroke="rgba(94,122,90,0.4)" strokeWidth="1.5" />
            )}
          </g>
        ))}
      </svg>

      {/* Tap hints */}
      <p className="text-center text-[9px] text-mist/50 mt-2" style={{ fontFamily: MONO }}>
        Select a region to see enforcement details
      </p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sand-deep/20">
      <button className="w-full flex items-start justify-between gap-4 py-5 text-left" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="font-display text-lg text-espresso leading-snug">{q}</span>
        <ChevronDown size={18} className={`shrink-0 mt-1 text-mist transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
            <p className="pb-5 text-sm text-mist leading-[1.7] max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */

export default function NYMedSpaClaimAuditPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>('nyc');
  const activeRegion = REGIONS.find(r => r.id === selectedRegion) ?? REGIONS[0];

  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <title>New York & New Jersey Med Spa Claim Audit | AuditGPT by Scrutexity</title>
      <meta name="description" content="Public records and enforcement materials show that websites, brochures, treatment claims, provider credentials, and safety records can become part of the review surface for NY and NJ med spas. AuditGPT reviews your public claims and gives safer rewrite options." />

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-44 md:pb-28 bg-cream-deep border-b border-sand-deep/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_-10%,rgba(183,137,107,0.07),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none [background-image:linear-gradient(rgba(92,70,51,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(92,70,51,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="inline-flex items-center gap-2 mb-6" style={{ fontFamily: MONO }}>
            <MapPin size={14} className="text-clay" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-clay font-semibold">New York & New Jersey · Active Review Period</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.08 }} className="font-display text-4xl md:text-6xl lg:text-[4.2rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl">
            NY & NJ Med Spa Claim Audit.{' '}
            <span className="italic text-sage-deep">Before unsupported claims become a business risk.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.18 }} className="mt-6 text-base md:text-lg text-mist leading-[1.65] max-w-2xl">
            New York and New Jersey med-spa enforcement has made public-facing treatment claims, provider visibility, brochures, and website language harder to ignore. AuditGPT reviews your public claims, maps visible proof gaps, and gives safer rewrite options before unsupported language becomes a business risk.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.28 }} className="mt-8 flex flex-wrap gap-4">
            <Link href="https://auditgpt.ai/snapshot?source=ny-nj-hero" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.55)]">
              Run Free NY Claim Snapshot
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="https://auditgpt.ai/snapshot?source=ny-nj-hero&intent=paid" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              Get the $497 Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-5 text-xs text-mist/55" style={{ fontFamily: MONO }}>
            Not legal advice. Not regulatory certification. Claim language review, not compliance guarantee.
          </motion.p>
        </div>
      </section>

      {/* INTERACTIVE MAP + STATS */}
      <section className="px-6 py-20 bg-espresso text-cream border-b border-espresso/80">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.2em] text-cream/50 mb-10" style={{ fontFamily: MONO }}>
            NY & NJ Enforcement Overview · 2024–2025 Public Records
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
            {/* Map */}
            <div>
              <NyNjMap selected={selectedRegion} onSelect={setSelectedRegion} />

              {/* Region selector tabs */}
              <div className="mt-6 flex gap-2 justify-center flex-wrap">
                {REGIONS.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegion(r.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-[0.14em] font-semibold transition-all duration-300 ${selectedRegion === r.id ? 'bg-sage-deep text-cream' : 'bg-cream/10 text-cream/60 hover:bg-cream/20'}`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Region detail panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-2.5 py-1 bg-sage-deep/30 text-sage-soft border border-sage-deep/40 text-[9px] font-mono uppercase tracking-[0.14em] rounded-md">{activeRegion.state}</span>
                  <h2 className="font-display text-2xl text-cream">{activeRegion.name}</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {activeRegion.stats.map((stat, i) => (
                    <div key={i} className="border-l-2 border-clay/50 pl-4">
                      <p className="font-display text-2xl md:text-3xl text-cream">{stat.value}</p>
                      <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-cream/55 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-cream/70 leading-[1.7] mb-5 max-w-xl">{activeRegion.notes}</p>

                <a href={activeRegion.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-cream/40 hover:text-cream/70 transition-colors">
                  {activeRegion.sourceLabel} <ExternalLink size={11} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* WHAT GETS REVIEWED */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Claim categories under review</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              What your website is saying that your proof may not support.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CLAIM_CATEGORIES.map((cat, i) => (
              <motion.div key={cat.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
                className="rounded-2xl border border-sand-deep/30 bg-bone p-6 hover:border-sage-deep/40 transition-colors">
                <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-[0.14em] font-bold border mb-4 ${cat.risk === 'High' ? 'bg-clay/10 text-clay border-clay/20' : 'bg-[#D4AF37]/10 text-[#8A6A1E] border-[#D4AF37]/25'}`}>{cat.risk} risk</span>
                <h3 className="font-display text-lg text-espresso mb-2 leading-snug">{cat.label}</h3>
                <p className="text-xs text-mist leading-relaxed">{cat.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE REPORT LINK */}
      <section className="px-6 py-12 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl border border-sage-deep/25 bg-sage/5 p-7">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-sage-deep mb-2">See a real report format</p>
            <h3 className="font-display text-xl text-espresso">Sample NY Med Spa Claim Intelligence Report</h3>
            <p className="mt-1 text-sm text-mist">Fictional Radiance Medical Spa — 12 claims, 5 priority risks, proof-gap table, AI receipt, and Claim Cleanup Record.</p>
          </div>
          <Link href="/sample-report" className="shrink-0 group px-5 py-3 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl text-sm inline-flex items-center gap-2 transition-all">
            View Sample Report <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* OFFER LADDER */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Offer stack</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Start with the free snapshot.{' '}
              <span className="italic text-sage-deep">Graduate through the system.</span>
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-stretch relative">
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px bg-sand-deep/25 z-0" />
            {OFFER_STEPS.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                className="relative z-10 flex-1 flex flex-col rounded-2xl border border-sand-deep/35 bg-bone p-6 hover:border-sage-deep/40 hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-7 h-7 rounded-full bg-cream border border-sand-deep/40 flex items-center justify-center font-mono text-[10px] font-bold text-mist group-hover:text-sage-deep group-hover:border-sage-deep transition-colors">{s.step}</div>
                  {s.highlight && <span className="px-2 py-1 bg-sage-soft/15 text-sage-deep border border-sage-deep/20 text-[9px] font-mono uppercase tracking-[0.14em] rounded-sm">{s.highlight}</span>}
                </div>
                <h3 className="font-display text-base text-espresso mb-1 leading-tight">{s.name}</h3>
                <p className="font-display text-2xl text-espresso font-bold mb-3">{s.price}</p>
                <p className="text-xs text-mist leading-relaxed flex-1 mb-5">{s.detail}</p>
                <Link href={s.href} className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 group/btn ${s.step === 1 ? 'bg-sage-deep hover:bg-espresso text-cream' : s.step === 3 ? 'bg-clay hover:bg-clay-deep text-cream' : 'bg-cream hover:bg-cream/80 border border-sand-deep/40 text-espresso'}`}>
                  {s.cta} <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENCY CTA */}
      <section className="px-6 py-16 bg-espresso/95 text-cream">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.18em] text-cream/50 mb-3" style={{ fontFamily: MONO }}>For Agencies</p>
            <h2 className="font-display text-2xl md:text-3xl text-cream leading-snug">
              You build the growth engine.{' '}
              <span className="italic text-sage-soft">AuditGPT is the claim-risk layer.</span>
            </h2>
            <p className="mt-3 text-sm text-cream/65 leading-relaxed">
              Turn claim audits into a billable product for every NY/NJ med-spa client. Founding partner rate: $1,497/mo for the first five agencies.
            </p>
          </div>
          <Link href="/partner-os?source=ny-nj-landing" className="shrink-0 group px-6 py-3.5 bg-sage-deep hover:bg-sage-deep/80 text-cream font-semibold rounded-xl text-sm inline-flex items-center gap-2 transition-all">
            Apply for Partner OS <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-cream border-t border-sand-deep/15">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-6" style={{ fontFamily: MONO }}>Questions</p>
          <h2 className="font-display text-3xl text-espresso tracking-[-0.02em] mb-10">What to know before you run a snapshot.</h2>
          {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 bg-bone border-t border-sand-deep/15 text-center">
        <div className="max-w-2xl mx-auto">
          <ShieldCheck size={32} className="text-sage-deep mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
            Claim-reviewed med-spa marketing.{' '}
            <span className="italic text-sage-deep">Before your next launch.</span>
          </h2>
          <p className="mt-4 text-sm text-mist leading-[1.65] max-w-xl mx-auto">The free snapshot takes a URL and 90 seconds. You keep the output regardless of what you do next.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="https://auditgpt.ai/snapshot?source=ny-nj-bottom" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.45)]">
              Run Free NY/NJ Claim Snapshot <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/glp-1-weight-loss-claim-audit" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              GLP-1 Claim Audit <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/agency/claim-intelligence-receipt?source=ny-nj-bottom" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              Agency Receipt <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact?intent=claim-cleanup-record&source=ny-nj-bottom" className="group px-7 py-4 bg-cream hover:bg-cream/80 border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              Book a Claim Cleanup Record Call
            </Link>
          </div>
          <p className="mt-6 text-[10px] text-mist/50 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: MONO }}>
            Not legal advice. Not medical advice. Not regulatory certification. AuditGPT reviews public-facing claim language only. Consult your attorney and compliance officer for regulatory guidance.
          </p>
        </div>
      </section>
    </div>
  );
}
