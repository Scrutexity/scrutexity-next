"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Download, AlertTriangle, CheckCircle2, ShieldCheck, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

/* ── Data ─────────────────────────────────────────────────── */

const reportMeta = [
  { label: 'Practice name',        value: 'Radiance Medical Spa — Fictional Demonstration' },
  { label: 'Location',             value: 'New York, NY (fictional)' },
  { label: 'Report type',          value: 'NY Med Spa Claim Intelligence Report' },
  { label: 'Audit date',           value: 'June 2026 (demonstration)' },
  { label: 'Pages reviewed',       value: 'Homepage, Treatments, Injections, Weight Loss, About/Team' },
  { label: 'Claims extracted',     value: '12' },
  { label: 'Priority risks',       value: '5' },
  { label: 'Primary risk theme',   value: 'FDA terminology misuse, outcome claims without substantiation, provider visibility gaps' },
  { label: 'Notice',               value: 'This is a fictional demonstration report. Radiance Medical Spa does not exist. No real practice is referenced.' },
];

const claimBreakdown = [
  { status: 'Support found',                count: 3,  dot: 'rgba(94,122,90,0.9)'   },
  { status: 'Weakly supported',             count: 3,  dot: '#D4AF37'               },
  { status: 'Unsupported',                  count: 2,  dot: '#B7896B'               },
  { status: 'Overstated',                   count: 2,  dot: '#B7896B'               },
  { status: 'FDA wording issue',            count: 2,  dot: '#A03A2F'               },
];

const claims = [
  {
    num: '01',
    claim: '"FDA-approved laser treatments for permanent hair removal"',
    category: 'FDA Terminology · Device Wording',
    status: 'FDA wording issue',
    risk: 'High',
    source: 'Treatments page hero',
    supportFound: 'Device brand visible in one photo caption.',
    supportMissing: 'No public device citation. FDA uses "cleared" for devices — "approved" is incorrect terminology for aesthetic devices in most categories.',
    saferRewrite: '"Treatment performed with an FDA-cleared device for eligible patients, subject to individual consultation and provider review."',
    proofRequired: 'FDA 510(k) clearance number for named device, linked on the page next to the claim.',
  },
  {
    num: '02',
    claim: '"Lose up to 30 pounds in 90 days with our medical weight loss program"',
    category: 'Outcome Claim · Weight Loss',
    status: 'Unsupported',
    risk: 'High',
    source: 'Weight Loss page headline',
    supportFound: 'Testimonial carousel present. No statistical base shown.',
    supportMissing: 'No cohort data, no qualification criteria, no disclaimer that results vary. "Up to 30 pounds" is a maximum without a stated sample or timeframe.',
    saferRewrite: '"Our medical weight loss program has helped patients achieve meaningful, clinician-supervised weight reduction. Individual results vary based on health history and program adherence."',
    proofRequired: 'Documented patient cohort with range and median, or removal of the numeric claim.',
  },
  {
    num: '03',
    claim: '"Board-certified physicians on every treatment"',
    category: 'Provider Visibility · Credential Claim',
    status: 'Weakly supported',
    risk: 'High',
    source: 'About page and homepage',
    supportFound: 'One physician listed with credentials on the About page.',
    supportMissing: 'Claim says "every treatment" but only one provider is listed and no procedure-level oversight documentation is visible. If non-physician providers perform treatments, this framing may not reflect actual supervision structure.',
    saferRewrite: '"Our medical director holds board certification in [specialty]. Treatment protocols are developed and reviewed by our clinical team."',
    proofRequired: 'Named medical director, board certification link or number, public disclosure of supervision model.',
  },
  {
    num: '04',
    claim: '"FDA-approved Botox for wrinkle treatment"',
    category: 'FDA Terminology · Neurotoxin',
    status: 'FDA wording issue',
    risk: 'Medium',
    source: 'Injections page',
    supportFound: 'Botox is FDA-approved for specific cosmetic indications — the base medication is approved.',
    supportMissing: 'The page applies "FDA-approved" broadly without specifying the indication. Some listed uses (e.g., jawline slimming, shoulder reduction) may be off-label. Page does not distinguish on-label from off-label use.',
    saferRewrite: '"Botox is FDA-approved for select cosmetic indications. We offer Botox treatment for eligible patients. Some applications are performed off-label at your provider\'s clinical discretion."',
    proofRequired: 'On-label / off-label disclosure visible near the claim.',
  },
  {
    num: '05',
    claim: '"Clinically proven results backed by science"',
    category: 'Evidence Claim · Generic',
    status: 'Overstated',
    risk: 'Medium',
    source: 'Homepage value proposition',
    supportFound: 'No citation visible.',
    supportMissing: '"Clinically proven" requires a named study, journal, or trial. "Backed by science" without citation is marketing language that provides no actual evidence signal.',
    saferRewrite: '"Our treatment protocols are based on published aesthetic medicine research and clinical literature. Your provider will discuss the evidence base during consultation."',
    proofRequired: 'Named study or peer-reviewed citation linked near the claim, or removal of the unsubstantiated language.',
  },
];

const proofGapTable = [
  { claim: 'FDA-approved laser',           issue: 'Wrong terminology',           fix: 'Add 510(k) number, change to "FDA-cleared"',            effort: 'Low' },
  { claim: '30 lbs / 90 days',             issue: 'No cohort data',              fix: 'Add range + median + qualification criteria',           effort: 'Medium' },
  { claim: 'Board-certified on every tx',  issue: 'Unsupported supervision claim',fix: 'Add named MD, document oversight model',               effort: 'Medium' },
  { claim: 'FDA-approved Botox (broad)',   issue: 'Off-label use not disclosed',  fix: 'Add on-label / off-label distinction',                  effort: 'Low' },
  { claim: 'Clinically proven results',    issue: 'No citation',                 fix: 'Add named study or remove claim',                       effort: 'Low' },
  { claim: 'Medical director supervision', issue: 'Name not public-facing',      fix: 'Add named MD + board cert link to About page',          effort: 'Low' },
  { claim: 'Compounded semaglutide safe',  issue: 'FDA compound status unclear',  fix: 'Add FDA compound status disclosure',                    effort: 'Medium' },
];

const aiReceipt = {
  engine: 'ChatGPT (GPT-4o)',
  citationLikelihood: 'Low',
  simulatedAnswer: 'When asked "What does Radiance Medical Spa offer in New York?", GPT-4o synthesized public homepage language including the phrase "FDA-approved laser treatments" — repeating the inaccurate terminology verbatim. The weight loss claim of "30 pounds in 90 days" was not cited, but the treatment list was largely accurate. No medical director name was surfaced in the AI-generated answer.',
  strengths: ['Treatment list accurately described', 'Location and contact visible'],
  weaknesses: ['FDA terminology error repeated in AI answer', 'No medical director cited', 'Weight loss claim not surfaced — low entity authority on that page'],
};

const cleanupRecord = [
  { num: '01', action: 'Correct FDA terminology across all pages',    detail: 'Change "approved" to "cleared" for device categories. Add clearance numbers where visible.' },
  { num: '02', action: 'Add named medical director + board cert link', detail: 'One sentence + link on the About page. Resolves provider visibility note.' },
  { num: '03', action: 'Qualify weight loss outcome claim',           detail: 'Add cohort range, median, qualification criteria, and individual-results disclaimer.' },
  { num: '04', action: 'Add on-label / off-label disclosure for Botox', detail: 'Two sentences near the injections claim. Low effort, high-risk reduction.' },
  { num: '05', action: 'Replace "clinically proven" with a citation', detail: 'Name the study or replace with evidence-based language and consultation language.' },
  { num: '06', action: 'Add JSON-LD entity markup with correct claims', detail: 'Feed accurate treatment list, provider name, and location to AI answer engines.' },
];

const STATUS_COLOR: Record<string, string> = {
  'Support found':      '#2F5D4A',
  'Weakly supported':   '#8A6A1E',
  'Unsupported':        '#8A533B',
  'Overstated':         '#8A533B',
  'FDA wording issue':  '#A03A2F',
};

const STATUS_BG: Record<string, string> = {
  'Support found':      'rgba(94,122,90,0.10)',
  'Weakly supported':   'rgba(212,175,55,0.10)',
  'Unsupported':        'rgba(183,137,107,0.10)',
  'Overstated':         'rgba(183,137,107,0.10)',
  'FDA wording issue':  'rgba(160,58,47,0.10)',
};

function ClaimRow({ claim, index }: { claim: typeof claims[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const color = STATUS_COLOR[claim.status] ?? '#1C1814';
  const bg    = STATUS_BG[claim.status]    ?? 'rgba(107,98,89,0.08)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className="border border-sand-deep/30 rounded-xl overflow-hidden"
    >
      <button
        className="w-full flex items-start justify-between gap-4 p-5 text-left bg-bone hover:bg-cream transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-start gap-4 min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-mist shrink-0 mt-1">{claim.num}</span>
          <div className="min-w-0">
            <p className="font-display text-lg text-espresso leading-snug italic">{claim.claim}</p>
            <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-mist mt-1">{claim.category} · <span className="font-semibold">Source: {claim.source}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="hidden sm:inline-flex px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-[0.14em] font-bold border"
            style={{ color, background: bg, borderColor: `${color}30` }}
          >
            {claim.status}
          </span>
          <span
            className="hidden sm:inline-flex px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider font-bold"
            style={{ color: claim.risk === 'High' ? '#8A533B' : '#8A6A1E', background: claim.risk === 'High' ? 'rgba(183,137,107,0.12)' : 'rgba(212,175,55,0.10)' }}
          >
            {claim.risk}
          </span>
          <ChevronDown size={16} className={`text-mist transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-sand-deep/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-sand-deep/15">
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-sage-deep mb-1">Support found</p>
                  <p className="text-sm text-espresso/85 leading-relaxed">{claim.supportFound}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-clay mb-1">Support missing</p>
                  <p className="text-sm text-mist leading-relaxed">{claim.supportMissing}</p>
                </div>
              </div>
              <div className="p-5 space-y-4 bg-bone/50">
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-sage-deep mb-1">Safer rewrite</p>
                  <p className="text-sm text-espresso italic leading-relaxed font-display">{claim.saferRewrite}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-mist mb-1">Proof required</p>
                  <p className="text-xs text-mist leading-relaxed">{claim.proofRequired}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */

export default function SampleReportContent() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans">

      {/* FICTIONAL BANNER */}
      <div className="bg-espresso text-cream text-center py-2.5 px-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-cream/70">
          Fictional demonstration · Radiance Medical Spa does not exist · Not a real client audit
        </p>
      </div>

      {/* HERO */}
      <section className="relative px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sage-deep"
            style={{ fontFamily: MONO }}
          >
            <FileText size={12} className="text-sage-deep" />
            AuditGPT by Scrutexity · Sample NY Med Spa Report
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[4.2rem] text-ink tracking-[-0.03em] leading-[1.04] max-w-4xl"
          >
            Sample NY Med Spa{' '}
            <span className="italic text-sage-deep">Claim Intelligence Report.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-mist leading-[1.55] font-sans max-w-2xl"
          >
            Radiance Medical Spa — a fictional New York practice — shows how AuditGPT extracts claims,
            maps visible support, and identifies the specific language that creates proof gaps.
          </motion.p>
        </div>
      </section>

      {/* REPORT HEADER */}
      <section className="px-6 py-10 md:py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-2xl bg-bone border border-sand-deep/30 overflow-hidden"
            style={{ boxShadow: '0 18px 44px -18px rgba(28,24,20,0.10), inset 0 1px 1px rgba(255,255,255,0.6)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-7 md:p-9">
                <span className="text-[10px] uppercase tracking-[0.18em] text-mist/65 block mb-5" style={{ fontFamily: MONO }}>
                  Report header
                </span>
                <dl className="divide-y divide-sand-deep/20">
                  {reportMeta.map((row) => (
                    <div key={row.label} className="py-3 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                      <dt className="md:col-span-4 text-[10px] uppercase tracking-[0.16em] text-mist/65" style={{ fontFamily: MONO }}>{row.label}</dt>
                      <dd className={`md:col-span-8 text-sm leading-[1.55] ${row.label === 'Notice' ? 'text-clay font-semibold' : 'text-ink/85'}`}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-sand-deep/25 p-7 md:p-9 flex flex-col items-center justify-center bg-cream">
                <span className="text-[10px] uppercase tracking-[0.18em] text-mist/65 block text-center mb-2" style={{ fontFamily: MONO }}>
                  Claim Risk Score
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-7xl text-ink tabular-nums tracking-[-0.03em] leading-none">61</span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-mist/60" style={{ fontFamily: MONO }}>/ 100</span>
                </div>
                <div className="mt-3 h-px w-12 bg-clay" />
                <span className="mt-3 text-[10px] uppercase tracking-[0.14em] text-clay-deep text-center" style={{ fontFamily: MONO }}>
                  Priority review required
                </span>
                <p className="mt-4 text-xs text-mist text-center leading-relaxed">5 of 12 claims require immediate rewrite or proof before next marketing push</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLAIM BREAKDOWN */}
      <section className="px-6 py-16 border-t border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5" style={{ fontFamily: MONO }}>
            Claim breakdown
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-[1.1] mb-8">
            12 claims extracted · 5 priority risks.
          </h2>
          <div className="rounded-2xl bg-bone border border-sand-deep/30 overflow-hidden" style={{ boxShadow: '0 12px 32px -14px rgba(28,24,20,0.08)' }}>
            <div className="divide-y divide-sand-deep/20">
              {claimBreakdown.map((row) => (
                <div key={row.status} className="grid grid-cols-12 items-center gap-3 px-5 py-4">
                  <div className="col-span-6 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: row.dot }} />
                    <span className="text-[11px] uppercase tracking-[0.16em] font-semibold" style={{ fontFamily: MONO, color: STATUS_COLOR[row.status] ?? '#1C1814' }}>
                      {row.status}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(217,204,176,0.45)' }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${(row.count / 12) * 100}%`, background: row.dot }} />
                    </div>
                  </div>
                  <div className="col-span-2 text-right tabular-nums text-sm text-ink/85" style={{ fontFamily: MONO }}>{row.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 PRIORITY CLAIM CARDS */}
      <section className="px-6 py-20 border-t border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <span className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5" style={{ fontFamily: MONO }}>
              Priority claim records
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              5 priority claims,{' '}
              <span className="italic text-sage-deep">each reviewed against visible support.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {claims.map((c, i) => <ClaimRow key={i} claim={c} index={i} />)}
          </div>
        </div>
      </section>

      {/* PROOF-GAP TABLE */}
      <section className="px-6 py-20 border-t border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5" style={{ fontFamily: MONO }}>
            Proof-gap table
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-[1.1] mb-8">
            What is missing, and how to close each gap.
          </h2>
          <div className="rounded-2xl border border-sand-deep/30 overflow-hidden bg-bone">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-sand-deep/30 bg-cream/60">
              {['Claim', 'Issue', 'Fix required', 'Effort'].map((h, i) => (
                <span key={h} className={`text-[9px] uppercase tracking-[0.18em] text-mist font-semibold ${i === 0 ? 'col-span-3' : i === 1 ? 'col-span-3' : i === 2 ? 'col-span-5' : 'col-span-1'}`} style={{ fontFamily: MONO }}>{h}</span>
              ))}
            </div>
            {proofGapTable.map((row, i) => (
              <div key={i} className="grid grid-cols-12 px-5 py-4 border-b border-sand-deep/15 last:border-0 hover:bg-cream/40 transition-colors">
                <span className="col-span-3 text-xs text-espresso font-semibold leading-snug pr-2">{row.claim}</span>
                <span className="col-span-3 text-xs text-clay leading-snug pr-2">{row.issue}</span>
                <span className="col-span-5 text-xs text-mist leading-snug pr-2">{row.fix}</span>
                <span className={`col-span-1 text-[9px] font-mono uppercase font-bold ${row.effort === 'Low' ? 'text-sage-deep' : 'text-[#8A6A1E]'}`}>{row.effort}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI ANSWER REALITY RECEIPT */}
      <section className="px-6 py-20 border-t border-sand-deep/15 bg-espresso text-cream">
        <div className="max-w-5xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.18em] text-sage-soft block mb-5" style={{ fontFamily: MONO }}>
            AI Answer Reality Receipt
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-cream tracking-[-0.02em] leading-[1.1] mb-8">
            How ChatGPT describes{' '}
            <span className="italic text-sage-soft">Radiance Medical Spa.</span>
          </h2>
          <div className="rounded-2xl border border-cream/10 bg-cream/5 p-7 md:p-9">
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="font-display text-xl text-cream">{aiReceipt.engine}</p>
              <span className="px-3 py-1 bg-clay/20 text-clay border border-clay/30 text-[9px] font-mono uppercase tracking-wider rounded-md">
                {aiReceipt.citationLikelihood} citation likelihood
              </span>
            </div>
            <p className="text-sm text-cream/75 leading-relaxed mb-7 max-w-3xl">
              {aiReceipt.simulatedAnswer}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-sage-soft mb-3">Strengths surfaced</p>
                <ul className="space-y-2">
                  {aiReceipt.strengths.map(s => (
                    <li key={s} className="flex items-start gap-2 text-sm text-cream/70">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-sage-soft" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-clay mb-3">Weaknesses surfaced</p>
                <ul className="space-y-2">
                  {aiReceipt.weaknesses.map(w => (
                    <li key={w} className="flex items-start gap-2 text-sm text-cream/70">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0 text-clay" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLAIM CLEANUP RECORD */}
      <section className="px-6 py-24 border-t border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5" style={{ fontFamily: MONO }}>
              Optional add-on to the $497 Audit
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              Claim Cleanup Record{' '}
              <span className="italic text-sage-deep">— $1,997.</span>
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.65] max-w-xl">
              A structured record showing what was changed, why it was changed, and what public support now backs each priority claim. Not website cleanup — a defensible business artifact.
            </p>
          </div>
          <ol className="divide-y divide-sand-deep/20 border-t border-sand-deep/20">
            {cleanupRecord.map((item) => (
              <li key={item.num} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
                <div className="md:col-span-1">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-sage-deep tabular-nums" style={{ fontFamily: MONO }}>{item.num}</span>
                </div>
                <div className="md:col-span-11">
                  <h3 className="font-display text-xl text-ink tracking-[-0.01em] leading-snug">{item.action}</h3>
                  <p className="mt-2 text-sm text-mist leading-[1.65]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-2xl border border-sage-deep/25 bg-sage/5 p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl text-espresso">Claim Cleanup Record — $1,997</p>
              <p className="mt-2 text-sm text-mist leading-relaxed max-w-lg">
                Delivered as a structured PDF documenting every changed claim, the evidence now backing it, and the safer framing used. Can be retained as a business record.
              </p>
            </div>
            <Link
              href="/contact?intent=claim-cleanup-record&source=sample-report"
              className="shrink-0 group px-6 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl text-sm inline-flex items-center gap-2 transition-all"
            >
              Book Claim Cleanup Record
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-6 py-10 border-t border-sand-deep/15">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.14em] text-mist/55 leading-[1.7]" style={{ fontFamily: MONO }}>
            This is a fictional demonstration report. Radiance Medical Spa does not exist and is not a real client. No specific practice is referenced or audited. AuditGPT Claim Audits review public-facing claim language and visible proof; they are not legal, medical, clinical, or regulatory advice and do not constitute compliance certification of any kind.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 border-t border-sand-deep/15 text-center">
        <div className="max-w-2xl mx-auto">
          <ShieldCheck size={28} className="text-sage-deep mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
            Want this for{' '}
            <span className="italic text-sage-deep">your practice?</span>
          </h2>
          <p className="mt-5 text-base text-mist leading-[1.6] max-w-xl mx-auto">
            The free snapshot surfaces your top 3 claim exposures. The $497 Claim Risk + AI Distortion Receipt goes deeper — every claim on one public page scored, enforcement-pattern matches, AI distortion snapshot, and safer rewrites with source references. Delivered in 72 hours.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
             href="https://auditgpt.ai/snapshot?source=sample-report&intent=paid"
             className="group px-7 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-xs"
            >
             <Download size={14} />
             Get the $497 Receipt
             <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="https://auditgpt.ai/snapshot?source=ny-sample-report&intent=paid"
              className="group text-sm font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              <Download size={14} />
              Get the $497 Audit
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
