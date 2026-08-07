"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, ChevronDown, AlertTriangle, CheckCircle2, Minus } from "lucide-react";
import { SupplierDiligenceChecklist } from "@/components/scrutexity/supplier-diligence-checklist";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

/* ── Risk Matrix ───────────────────────────────────────── */

const RISK_MATRIX = [
  {
    tier: 'green',
    label: 'Lower-risk starting point',
    color: 'var(--color-sage-deep)',
    bg: 'rgba(94,122,90,0.08)',
    border: 'rgba(94,122,90,0.30)',
    dot: 'bg-sage-deep',
    categories: [
      { name: 'Hair-growth laser caps and helmets', note: 'FDA 510(k)-cleared devices exist in this category for specific androgenic alopecia indications. Claims must match cleared indication and population exactly.' },
      { name: 'Selected red-light therapy products', note: 'Where specific evidence exists for a specific use and device, careful claim framing is possible. Evidence must be product-specific, not category-level.' },
    ],
  },
  {
    tier: 'yellow',
    label: 'Requires careful claim framing',
    color: 'var(--color-amber-badge)',
    bg: 'rgba(212,175,55,0.08)',
    border: 'rgba(212,175,55,0.30)',
    dot: 'bg-[var(--color-amber-badge)]',
    categories: [
      { name: 'PEMF mats', note: 'Some cleared indications exist. Claims must be restricted to cleared uses; wellness and anti-aging positioning requires careful framing.' },
      { name: 'Body-contouring-adjacent devices', note: 'Fat-reduction claims must cite specific cleared device, specific indication, and avoid weight-loss or permanence framing.' },
      { name: 'General wellness red-light positioning', note: 'Broad "wellness" framing is defensible only when claims are evidence-backed, device-specific, and do not imply treatment of disease.' },
      { name: 'RF microneedling', note: 'FDA safety notices have highlighted serious adverse events. "No downtime," "painless," and "safe for everyone" language requires specific patient-selection and risk disclosures.' },
    ],
  },
  {
    tier: 'red',
    label: 'High-risk — review required before any public claim',
    color: 'var(--color-amber-badge)',
    bg: 'rgba(183,137,107,0.10)',
    border: 'rgba(183,137,107,0.35)',
    dot: 'bg-clay',
    categories: [
      { name: 'EMS weight-loss or girth-reduction claims', note: 'Claims implying weight loss, fat elimination, or permanent girth reduction from EMS devices are a red-zone category. These claims lack adequate substantiation for most marketed outcomes and are a documented FTC/FDA concern.' },
      { name: 'Exosome or stem-cell products marketed as approved therapies', note: 'FDA public safety notices state there are no FDA-approved exosome products for any use. Marketing these as approved, clinical, or disease-treating is directly contradicted by public FDA guidance.' },
      { name: 'Any device claiming to cure, treat, reverse, or prevent disease', note: 'Drug or disease claims on devices require FDA approval or clearance for that specific indication. "Reverses aging," "cures acne," "treats depression" applied to devices without FDA clearance creates significant regulatory exposure.' },
      { name: 'Compounded drug + device combination claims', note: 'If a device claim is bundled with a compounded drug claim, both layers of risk compound. Treat each claim surface separately.' },
    ],
  },
];

/* ── What gets reviewed ─────────────────────────────────── */

const REVIEW_ITEMS = [
  { label: 'Supplier claim language', detail: 'Public claims made by the supplier or manufacturer, including catalogs, websites, and sales materials.' },
  { label: 'FDA-status language check', detail: 'Whether 510(k) clearance numbers, cleared indications, exemptions, or registration data are accurately reflected in marketing language.' },
  { label: 'Cleared indication vs. marketed use', detail: 'Whether the specific use being marketed matches the specific use the device was cleared for — these often diverge.' },
  { label: 'Before/after gallery claims', detail: 'Result implication language, typicality disclosure, and outcome framing in device before/after galleries.' },
  { label: 'Safety and downtime claims', detail: '"No downtime," "painless," "non-invasive," and "safe for all skin types" language reviewed against device labeling and adverse-event disclosures.' },
  { label: 'AI answer distortion', detail: 'Whether AI search engines repeat inaccurate device claims or FDA-status language from your public pages.' },
  { label: 'Supplier diligence materials', detail: 'Where provided: QMS documentation, test reports, 510(k) numbers, labeling files, and country-of-origin marking.' },
];

/* ── Supplier Diligence Checklist ──────────────────────── */

const CHECKLIST_FIELDS = [
  { section: 'Identity', items: [
    { field: 'Supplier name', status: 'required' },
    { field: 'Factory location (city, country)', status: 'required' },
    { field: 'Product model and SKU', status: 'required' },
    { field: 'Device category', status: 'required' },
    { field: 'Intended use (as stated by supplier)', status: 'required' },
    { field: 'U.S. agent or importer of record', status: 'required' },
  ]},
  { section: 'Regulatory status', items: [
    { field: 'FDA registration number (if applicable)', status: 'required' },
    { field: '510(k) premarket notification number', status: 'if applicable' },
    { field: 'Cleared indication (verbatim from 510(k) if available)', status: 'if applicable' },
    { field: 'Exemption rationale (if claiming Class I exemption)', status: 'if applicable' },
    { field: 'FDA device listing number', status: 'if applicable' },
  ]},
  { section: 'Documentation', items: [
    { field: 'QMS documentation (ISO 13485 or equivalent)', status: 'requested' },
    { field: 'Device labeling files (IFU, labels)', status: 'requested' },
    { field: 'Claims library — what the supplier states can/cannot be claimed', status: 'requested' },
    { field: 'Biocompatibility or safety test reports', status: 'requested' },
    { field: 'Country-of-origin marking compliance', status: 'required' },
  ]},
  { section: 'Commercial terms', items: [
    { field: 'MOQ (minimum order quantity)', status: 'required' },
    { field: 'Lead time (standard and rush)', status: 'required' },
    { field: 'Sample QA process', status: 'required' },
    { field: 'Warranty and replacement terms', status: 'required' },
  ]},
];

/* ── Evidence Pack fields ───────────────────────────────── */

const EVIDENCE_PACK_FIELDS = [
  { label: 'Device category', example: 'Hair-growth laser cap — Class II device' },
  { label: 'Intended use', example: 'Treatment of androgenic alopecia in adult patients, as cleared' },
  { label: 'Supplier claims reviewed', example: '6 claims from supplier catalog and website' },
  { label: 'FDA-status language check', example: '510(k) number K213456 reviewed; indication matches cleared use' },
  { label: '510(k) / exemption notes', example: 'Cleared for home use in LLLT hair-growth indication; off-label scalp conditions not covered' },
  { label: 'Evidence summary', example: '3 peer-reviewed studies cited by supplier; cohort sizes and endpoints reviewed' },
  { label: 'Known claim boundaries', example: 'Cannot claim hair regrowth "for all patients"; cannot claim treatment of alopecia areata' },
  { label: 'Red/yellow/green claim list', example: '2 green, 3 yellow (qualify with indication), 1 red (remove)' },
  { label: 'Clinic-safe marketing copy', example: 'Safer rewrite pack delivered per claim' },
  { label: 'Supplier diligence checklist', example: 'Completed; 3 items pending (QMS docs, labeling file, U.S. agent confirmation)' },
];

/* ── FAQ ─────────────────────────────────────────────────── */

const FAQS = [
  {
    q: 'Does this certify a device for sale or clinical use?',
    a: 'No. AuditGPT reviews claim language, visible evidence, and supplier-provided materials. It does not certify devices, suppliers, claims, imports, or compliance with FDA, FTC, customs, or any other regulatory requirement.',
  },
  {
    q: 'Can you tell me if a device is FDA-cleared or approved?',
    a: 'We review publicly available FDA data and supplier-provided 510(k) numbers or exemption rationales. We do not independently verify FDA clearance status — that determination requires review of the actual 510(k) order and device labeling by qualified counsel or regulatory affairs professionals.',
  },
  {
    q: 'Is EMS for weight loss worth pursuing?',
    a: 'EMS weight-loss and girth-reduction claims are a red-zone category. Outcome claims in this space frequently outrun available evidence and cleared indications. We recommend reviewing AuditGPT\'s claim-risk assessment before any public EMS weight-loss claim is published.',
  },
  {
    q: 'What if our supplier says the device is FDA-approved?',
    a: 'That claim requires verification. A supplier\'s assertion that a device is "FDA-approved" does not make it so. We review the 510(k) number, the cleared indication, and whether "approved" is the accurate FDA-status language for that device.',
  },
  {
    q: 'Can this be used for supplier diligence before a purchase order?',
    a: 'Yes — the Supplier Diligence Checklist is designed to support that process. It is a documentation framework, not an approval or clearance certification.',
  },
];

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

export default function AestheticDeviceClaimAuditPage() {
  const [openSection, setOpenSection] = useState<string | null>('Identity');

  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-44 md:pb-28 bg-cream-deep border-b border-sand-deep/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_-10%,rgba(94,122,90,0.05),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none [background-image:linear-gradient(rgba(92,70,51,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(92,70,51,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="inline-flex items-center gap-2 mb-6" style={{ fontFamily: MONO }}>
            <span className="text-[11px] uppercase tracking-[0.2em] text-sage-deep font-semibold">Device Claim Review · AuditGPT</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.08 }} className="font-display text-4xl md:text-6xl lg:text-[4.2rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl">
            Before your clinic sells a device,{' '}
            <span className="italic text-sage-deep">know what you can safely claim about it.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.18 }} className="mt-6 text-base md:text-lg text-mist leading-[1.65] max-w-2xl">
            AuditGPT reviews device pages, supplier claims, FDA-status language, evidence gaps, and AI answer risk for red light, hair-growth, PEMF, body-contouring, EMS, RF microneedling, and aesthetic-device offers.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.28 }} className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact?intent=claim-support-review&source=device-page" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.55)]">
              Start a Claim Review
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/sample-report" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              View the sample report
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-5 text-xs text-mist/55" style={{ fontFamily: MONO }}>
            Not legal, regulatory, FDA, import, customs, or clinical advice. Claim language and evidence review only.
          </motion.p>
        </div>
      </section>

      {/* WHY DEVICE CLAIMS ARE RISKY */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Why device claims are risky</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Cleared for a specific use — marketed for everything.
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.65]">
              FDA 510(k) clearance applies to a specific device, for a specific intended use, in a specific patient population. When clinics and suppliers market those same devices for broader uses — "tightens all skin," "eliminates fat permanently," "reverses aging" — the claim has moved past what the clearance supports.
            </p>
            <p className="mt-4 text-sm text-mist leading-[1.6]">
              AI search engines then crawl those pages and repeat the overclaim in AI-generated answers to patient questions — creating a second layer of distortion that the clinic cannot directly edit.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Cleared ≠ approved ≠ safe for all', detail: 'FDA "clearance" through 510(k) means a device is substantially equivalent to a predicate. It does not mean FDA approved the treatment outcome, the patient population, or every marketed application.' },
              { label: '"Non-invasive" is often inaccurate', detail: 'RF microneedling uses needles that penetrate skin. Laser treatments create thermal injury. "Non-invasive" applied to these procedures can be directly inaccurate.' },
              { label: 'EMS weight-loss is a red-zone category', detail: 'Girth reduction, fat elimination, or weight-loss outcome claims applied to EMS devices frequently outrun the cleared indication and available evidence.' },
              { label: 'Exosome products have no FDA approval', detail: 'FDA public safety notices state there are no FDA-approved exosome products for any use. Marketing them as "FDA-reviewed regenerative therapy" is not supportable.' },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-xl border border-sand-deep/30 bg-bone hover:border-clay/30 transition-colors">
                <AlertTriangle size={18} className="text-clay shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-espresso text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-mist leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY RISK MATRIX */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Category risk matrix</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Not all device categories carry the same claim risk.
            </h2>
            <p className="mt-4 text-sm text-mist leading-[1.6]">This matrix reflects the current claim-review risk profile, not FDA clearance status. A green-tier device can still have individual claims that require rewrite.</p>
          </div>

          <div className="space-y-5">
            {RISK_MATRIX.map((tier, ti) => (
              <motion.div key={tier.tier} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: ti * 0.1 }}
                className="rounded-2xl border overflow-hidden" style={{ borderColor: tier.border, background: tier.bg }}>
                <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: tier.border }}>
                  <span className={`w-3 h-3 rounded-full shrink-0 ${tier.dot}`} />
                  <span className="text-[10px] uppercase tracking-[0.18em] font-bold" style={{ fontFamily: MONO, color: tier.color }}>{tier.label}</span>
                </div>
                <div className="divide-y" style={{ borderColor: tier.border }}>
                  {tier.categories.map((cat, ci) => (
                    <div key={ci} className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 gap-3">
                      <div className="md:col-span-4">
                        <p className="font-semibold text-espresso text-sm">{cat.name}</p>
                      </div>
                      <div className="md:col-span-8">
                        <p className="text-xs text-mist leading-relaxed">{cat.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT GETS REVIEWED */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>What gets reviewed</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Seven claim surfaces reviewed on every device page.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEW_ITEMS.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
                className="rounded-2xl border border-sand-deep/30 bg-bone p-6 hover:border-sage-deep/40 transition-colors">
                <p className="font-semibold text-espresso text-sm mb-2">{item.label}</p>
                <p className="text-xs text-mist leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVICE EVIDENCE PACK */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Device Evidence Pack</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              A structured record of what the device can and cannot claim.
            </h2>
            <p className="mt-4 text-sm text-mist leading-[1.6]">
              The Device Evidence Pack documents the claim-review process for a specific device — what the supplier claims, what FDA-status language is accurate, what evidence exists, and what clinic-safe marketing copy looks like. Not a regulatory approval. A documented evidence record.
            </p>
          </div>

          <div className="rounded-2xl border border-sand-deep/30 bg-cream overflow-hidden" style={{ boxShadow: '0 16px 40px -16px rgba(28,24,20,0.10)' }}>
            <div className="px-6 py-4 border-b border-sand-deep/25 bg-bone/60">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-sage-deep font-semibold">Device Evidence Pack — fields</p>
            </div>
            <div className="divide-y divide-sand-deep/15">
              {EVIDENCE_PACK_FIELDS.map((field, i) => (
                <motion.div key={field.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-bone/40 transition-colors">
                  <dt className="col-span-4 text-[9px] uppercase tracking-[0.16em] text-mist/65 font-semibold pt-0.5" style={{ fontFamily: MONO }}>{field.label}</dt>
                  <dd className="col-span-8 text-xs text-espresso/80 leading-relaxed italic">{field.example}</dd>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact?intent=claim-support-review&source=device-page" className="group px-6 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl text-sm inline-flex items-center gap-2 transition-all">
              Start a Claim Review <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/sample-report" className="group px-6 py-3.5 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl text-sm inline-flex items-center gap-2 transition-all">
              View the sample report
            </Link>
          </div>
        </div>
      </section>

      {/* SUPPLIER DILIGENCE CHECKLIST ── D6 */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Supplier Diligence Checklist</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Document what you collected from the supplier before you committed.
            </h2>
            <p className="mt-4 text-sm text-mist leading-[1.6]">
              This checklist is a documentation framework, not a supplier approval or regulatory certification. Completing it means you asked the right questions — not that the answers were independently verified.
            </p>
          </div>

          <SupplierDiligenceChecklist />
          <p className="mt-5 text-xs text-mist/60 italic" style={{ fontFamily: MONO }}>
            This checklist is a diligence documentation aid. It does not constitute approval, certification, or regulatory clearance of any supplier, device, or claim.
          </p>
        </div>
      </section>

      {/* CLAIM CLEANUP RECORD HANDOFF */}
      <section className="px-6 py-16 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 rounded-2xl border border-sage-deep/25 bg-sage/5 p-7 md:p-9">
          <div className="max-w-xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-sage-deep mb-2">Claim Support Review handoff</p>
            <h3 className="font-display text-xl md:text-2xl text-espresso leading-snug">
              Evidence gaps surfaced. Safer framing drafted.
            </h3>
            <p className="mt-3 text-sm text-mist leading-relaxed">
              A focused review records what each device claim says, what visible support exists,
              and what safer framing looks like. $99 · one public page.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link href="/contact?intent=claim-support-review&source=device-page" className="group px-6 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl text-sm inline-flex items-center gap-2 transition-all">
              Start a Claim Review <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/agency/claim-intelligence-receipt?source=device-page" className="group px-6 py-3 text-sm text-espresso hover:text-sage-deep transition-colors inline-flex items-center gap-1.5">
              Agency Claim Intelligence Receipt <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS BLOCK ── D7 */}
      <section className="px-6 py-12 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="https://auditgpt.ai/snapshot?source=device-internal" className="group rounded-xl border border-sand-deep/30 bg-bone p-5 hover:border-sage-deep/40 transition-colors">
            <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-sage-deep mb-2">Free snapshot</p>
            <p className="font-display text-base text-espresso group-hover:text-sage-deep transition-colors">Run a free device claim snapshot</p>
          </Link>
          <Link href="/agency/claim-intelligence-receipt?source=device-internal" className="group rounded-xl border border-sand-deep/30 bg-bone p-5 hover:border-sage-deep/40 transition-colors">
            <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-sage-deep mb-2">Agency product</p>
            <p className="font-display text-base text-espresso group-hover:text-sage-deep transition-colors">Claim Intelligence Receipt for agencies</p>
          </Link>
          <Link href="/glp-1-weight-loss-claim-audit?source=device-internal" className="group rounded-xl border border-sand-deep/30 bg-bone p-5 hover:border-sage-deep/40 transition-colors">
            <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-sage-deep mb-2">Related vertical</p>
            <p className="font-display text-base text-espresso group-hover:text-sage-deep transition-colors">GLP-1 & Medical Weight Loss Claim Audit</p>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-6" style={{ fontFamily: MONO }}>Questions</p>
          <h2 className="font-display text-3xl text-espresso tracking-[-0.02em] mb-10">What to know before submitting a device page.</h2>
          {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* DISCLAIMER + CTA */}
      <section className="px-6 py-20 bg-cream text-center">
        <div className="max-w-2xl mx-auto">
          <ShieldCheck size={28} className="text-sage-deep mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
            Claim-reviewed device marketing.{' '}
            <span className="italic text-sage-deep">Before launch.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="https://auditgpt.ai/snapshot?source=device-bottom" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.45)]">
              Run Free Device Claim Snapshot <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mt-6 text-[10px] text-mist/50 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: MONO }}>
            AuditGPT does not provide legal, medical, regulatory, FDA, import, customs, or clinical advice. It does not certify devices, suppliers, claims, imports, or compliance. It reviews public-facing claims, visible evidence, supplier-provided materials, and FDA-status language to identify proof gaps and safer marketing options.
          </p>
        </div>
      </section>
    </div>
  );
}
