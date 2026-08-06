"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent, Suspense } from 'react';
import { trackEvent } from '@/utils/analytics';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

type OfferKey = 'free' | 'full' | 'rescan' | 'agency';

const offers: Array<{
  key: OfferKey;
  name: string;
  price: string;
  cadence: string;
  audience: string;
  includes: string[];
  highlighted?: boolean;
  badge?: string;
}> = [
  {
    key: 'free',
    name: 'Free 3-Point Claim Snapshot',
    price: '$0',
    cadence: 'one-time',
    audience: 'A quick read on one public page before you purchase.',
    includes: [
      'One exposed claim pattern',
      'One evidence or wording gap',
      'One safer rewrite direction',
    ],
  },
  {
    key: 'full',
    name: 'Claim Support Review',
    price: '$99',
    cadence: 'one-time',
    audience: 'Operators reviewing one public page before the next campaign.',
    highlighted: true,
    badge: 'Focused review',
    includes: [
      'Public URL claim-language review',
      'Evidence map with visible support notes',
      'Flagged phrases with page context',
      'Safer framing drafts',
      'Dated review record',
      '48-hour target turnaround',
    ],
  },
  {
    key: 'rescan',
    name: 'Monitoring Pilot',
    price: 'By scope',
    cadence: 'selected customers',
    audience: 'Teams that update landing pages, offers, ads, or FAQs regularly.',
    includes: [
      'Monthly review of selected public pages',
      'Claim drift notes and rewrite queue',
      'Source-linked change record',
      'Review-current status notes',
    ],
  },
  {
    key: 'agency',
    name: 'Agency Claim QA',
    price: 'from $1,500',
    cadence: 'per engagement',
    audience: 'Agencies shipping sensitive pages, ads, and launch copy for clients.',
    includes: [
      'Client-site claim reviews',
      'White-label review notes',
      'Safer rewrite blocks',
      'Client-ready approval language',
      'Confirmed turnaround',
      'Source-linked pattern references',
    ],
  },
];

const companyTypes = [
  'Medical / Wellness',
  'Med-Spa / Aesthetic Clinic',
  'Telehealth / Compounding Operator',
  'Agency',
  'Health / Supplement Brand',
  'Compliance / Legal Services',
  'AI / SaaS',
  'Local Service Business',
  'Other',
];

const primaryGoals = [
  'Warning letter exposure review',
  'GLP-1 claim language review',
  'Safer landing page rewrites',
  'Ad / campaign preflight',
  'Agency white-label',
  'Data feed / enforcement tracker',
  'Not sure',
];

function getIntentDefaults(intent: string | null): {
  selected: OfferKey;
  primaryGoal: string;
  isAgency: boolean;
  isMedicalOperator: boolean;
} {
  if (intent === 'agency') {
    return { selected: 'agency', primaryGoal: 'Agency white-label', isAgency: true, isMedicalOperator: false };
  }
  if (intent === 'contento') {
    return { selected: 'full', primaryGoal: 'Safer landing page rewrites', isAgency: false, isMedicalOperator: false };
  }
  if (intent === 'ai-visibility') {
    return { selected: 'full', primaryGoal: 'Warning letter exposure review', isAgency: false, isMedicalOperator: false };
  }
  if (intent === 'recovery') {
    return { selected: 'full', primaryGoal: 'GLP-1 claim language review', isAgency: false, isMedicalOperator: true };
  }
  if (intent === 'claim-audit' || intent === 'auditgpt') {
    return { selected: 'full', primaryGoal: 'Warning letter exposure review', isAgency: false, isMedicalOperator: false };
  }
  if (intent === 'partner_referral') {
    return { selected: 'agency', primaryGoal: 'Partner referral', isAgency: false, isMedicalOperator: false };
  }
  return { selected: 'full', primaryGoal: 'Warning letter exposure review', isAgency: false, isMedicalOperator: false };
}

function ClaimAuditContentInner() {
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent');
  const intentDefaults = getIntentDefaults(intent);
  const [selected, setSelected] = useState<OfferKey>(intentDefaults.selected);
  const [submitted, setSubmitted] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const [isUrlFocused, setIsUrlFocused] = useState(false);

  // Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [worry, setWorry] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState(intentDefaults.primaryGoal);
  const [isAgency, setIsAgency] = useState(intentDefaults.isAgency);
  const [isMedicalOperator, setIsMedicalOperator] = useState(intentDefaults.isMedicalOperator);

  const isTechWeek = searchParams.get('source') === 'techweek';

  const handleInputChange = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackEvent('form_start', {
        intent: searchParams.get('intent') || 'claim-audit',
        source: searchParams.get('source') || 'unknown',
      });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    trackEvent('form_submit', {
      intent: searchParams.get('intent') || 'claim-audit',
      source: searchParams.get('source') || 'unknown',
      selected_tier: selected,
      company_type: companyType,
      primary_goal: primaryGoal,
      is_agency: isAgency,
      is_medical: isMedicalOperator,
      budget: budget || 'not_provided',
    });

    try {
      const res = await fetch('/api/claim-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          websiteUrl,
          companyType,
          worry,
          phone,
          budget,
          primaryGoal,
          selectedTier: selected,
        }),
      });

      const data = await res.json();
      
      if (data.redirectUrl) {
        // Redirect to Stripe or external payment link
        window.location.href = data.redirectUrl;
        return;
      }
      
      setSubmitted(true);
    } catch (err) {
      console.error('Submission failed', err);
      // Fallback to submitted state even if there's an error so the user isn't stuck
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink font-sans">
      {/* CLAIM EXPOSURE INGESTION */}
      <section className="relative min-h-screen px-6 py-28 md:py-36 bg-scrutexity-ivory flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_42%_at_72%_16%,rgba(226,114,91,0.08),transparent_66%),radial-gradient(ellipse_42%_34%_at_18%_18%,rgba(111,135,114,0.10),transparent_62%)] pointer-events-none" />
        <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-scrutexity-charcoal"
          >
            <div
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-scrutexity-sage"
              style={{ fontFamily: MONO_STACK }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-scrutexity-sage" />
              AuditGPT by Scrutexity
            </div>

            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-[4.75rem] tracking-[-0.03em] leading-[1.02] max-w-3xl">
              Map your public claims against{' '}
              <span className="italic text-scrutexity-sage">current enforcement patterns.</span>
            </h1>

            <p className="mt-7 text-base md:text-lg text-scrutexity-charcoal/75 leading-[1.6] max-w-2xl">
              Submit a high-traffic marketing URL. Scrutexity reviews the public language against source-linked FDA/FTC claim patterns and returns flagged phrases, safer replacement language, and a dated review record.
            </p>

            <ul className="mt-9 space-y-4 border-t border-scrutexity-border pt-7">
              {[
                'Public materials only; no login or system access required.',
                'Source-linked pattern matching against known enforcement language.',
                'Safer rewrite artifacts delivered for campaign and page updates.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-scrutexity-sage shrink-0" />
                  <span className="text-sm tracking-wide text-scrutexity-charcoal/80">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-xs text-scrutexity-charcoal/45 leading-relaxed max-w-xl">
              Not legal, clinical, regulatory, FDA, ranking, or revenue advice. Review notes describe public claim-language patterns and practical rewrite options.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className={`bg-scrutexity-surface p-7 md:p-10 rounded-2xl border border-scrutexity-border transition-shadow duration-500 ${
              isUrlFocused ? 'shadow-ambient-glow' : 'shadow-soft-float'
            }`}
          >
            <div className="mb-8">
              <p
                className="text-[10px] uppercase tracking-[0.18em] text-scrutexity-sage mb-3"
                style={{ fontFamily: MONO_STACK }}
              >
                Claim Exposure Intake
              </p>
              <h2 className="font-display text-3xl text-scrutexity-charcoal tracking-[-0.02em] leading-tight">
                Start the review run.
              </h2>
              <p className="mt-3 text-sm text-scrutexity-charcoal/60 leading-[1.6]">
                Enter the target URL and contact details. Paid reviews route through checkout; free snapshots enter the same intake queue.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-xl border border-scrutexity-sage/25 bg-scrutexity-sage/10 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-scrutexity-sage shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-scrutexity-charcoal">Request registered.</h3>
                    <p className="mt-2 text-sm text-scrutexity-charcoal/65 leading-[1.6]">
                      We received your URL and will follow up with next steps.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} onChange={handleInputChange}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Contact name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Field label="Corporate email" name="email" type="email" placeholder="ops@yourclinic.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <Field label="Company" name="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />

                <div>
                  <label
                    htmlFor="heroWebsiteUrl"
                    className="block text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-2"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Target asset URL <span className="text-clay-deep ml-1">*</span>
                  </label>
                  <input
                    id="heroWebsiteUrl"
                    name="websiteUrl"
                    type="url"
                    placeholder="https://yourclinic.com/glp-1"
                    required
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    onFocus={() => setIsUrlFocused(true)}
                    onBlur={() => setIsUrlFocused(false)}
                    className="w-full rounded-xl bg-scrutexity-ivory border border-scrutexity-border px-4 py-3 text-sm text-scrutexity-charcoal placeholder:text-scrutexity-charcoal/35 focus:outline-none focus:border-scrutexity-sage focus:ring-2 focus:ring-scrutexity-sage/15 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="heroWorry"
                    className="block text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-2"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Focus area
                  </label>
                  <textarea
                    id="heroWorry"
                    name="worry"
                    rows={3}
                    value={worry}
                    onChange={(e) => setWorry(e.target.value)}
                    placeholder="Example: compounded GLP-1 page, FDA-approved wording, outcome claims, before/after language."
                    className="w-full rounded-xl bg-scrutexity-ivory border border-scrutexity-border px-4 py-3 text-sm text-scrutexity-charcoal placeholder:text-scrutexity-charcoal/35 focus:outline-none focus:border-scrutexity-sage focus:ring-2 focus:ring-scrutexity-sage/15 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField
                    label="Review type"
                    name="primaryGoal"
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    options={primaryGoals}
                  />
                  <div>
                    <label
                      htmlFor="heroSelectedTier"
                      className="block text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-2"
                      style={{ fontFamily: MONO_STACK }}
                    >
                      Offer
                    </label>
                    <select
                      id="heroSelectedTier"
                      name="selectedTier"
                      value={selected}
                      onChange={(e) => setSelected(e.target.value as OfferKey)}
                      className="w-full rounded-xl bg-cream border border-sand-deep/40 px-4 py-3 text-sm text-ink focus:outline-none focus:border-sage-deep focus:ring-2 focus:ring-sage-deep/15 transition-all"
                    >
                      {offers.map((offer) => (
                        <option key={offer.key} value={offer.key}>
                          {offer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-scrutexity-sage text-white rounded-xl px-4 py-3.5 text-sm font-medium hover:bg-sage-deep transition-all mt-2 ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
                >
                  {isSubmitting ? 'Submitting review request...' : 'Request Claim Exposure Review'}
                </button>

                <p
                  className="text-center text-[10px] uppercase tracking-[0.16em] text-scrutexity-charcoal/40"
                  style={{ fontFamily: MONO_STACK }}
                >
                  $99 · 48-hour target turnaround · sample report available
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* OFFER CARDS */}
      <section className="px-6 py-16 md:py-20 border-t border-sand-deep/15">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl mb-12"
          >
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Pick your tier
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              Free preview.{' '}
              <span className="italic text-sage-deep">Pay only when you need the full report.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {offers.map((o, i) => {
              const isSel = selected === o.key;
              return (
                <motion.button
                  key={o.key}
                  type="button"
                  onClick={() => {
                    setSelected(o.key);
                    trackEvent('pricing_plan_click', {
                      plan_name: o.name,
                      section: 'claim_audit_tiers'
                    });
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                  className={`relative rounded-2xl p-6 text-left transition-all duration-300 ${
                    isSel
                      ? 'bg-bone border-2 border-sage-deep'
                      : 'bg-bone border border-sand-deep/30 hover:border-sage-deep/50'
                  }`}
                  style={{
                    boxShadow: isSel
                      ? '0 18px 44px -16px rgba(94,122,90,0.22), inset 0 1px 1px rgba(255,255,255,0.6)'
                      : '0 10px 28px -14px rgba(28,24,20,0.08), inset 0 1px 1px rgba(255,255,255,0.6)',
                  }}
                >
                  {o.badge && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border whitespace-nowrap bg-bone"
                      style={{
                        borderColor: 'rgba(212,175,55,0.55)',
                        fontFamily: MONO_STACK,
                        color: '#9C7A1E',
                        boxShadow: '0 6px 14px -6px rgba(212,175,55,0.22)',
                      }}
                    >
                      <span className="text-[9px] uppercase tracking-[0.16em] font-semibold">
                        {o.badge}
                      </span>
                    </span>
                  )}
                  <span
                    className="text-[10px] uppercase tracking-[0.16em] text-sage-deep block"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    {o.name}
                  </span>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl text-ink tracking-[-0.02em] tabular-nums leading-none">
                      {o.price}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-[0.14em] text-mist/70"
                      style={{ fontFamily: MONO_STACK }}
                    >
                      {o.cadence}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-mist leading-[1.55]">{o.audience}</p>
                  <ul className="mt-5 space-y-2">
                    {o.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-xs text-ink/85 leading-[1.55]">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-sage-deep shrink-0 animate-pulse" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTAKE FORM */}
      <section className="px-6 py-24 md:py-28 border-t border-sand-deep/15">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-10"
          >
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Intake Request
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              Tell us what to{' '}
              <span className="italic text-sage-deep">review.</span>
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.6] max-w-xl">
              We&rsquo;ll scan the URL you give us, plus the founder and product
              pages we can find from it. Results return within 72 hours.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="rounded-2xl bg-bone border border-sage-deep/30 p-8 md:p-10"
              style={{
                boxShadow:
                  '0 20px 48px -12px rgba(94,122,90,0.22), inset 0 1px 1px rgba(255,255,255,0.7)',
              }}
            >
              <div className="flex items-center gap-3 text-sage-deep mb-6">
                <CheckCircle2 size={32} className="shrink-0" />
                <div>
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] text-sage-deep font-bold block"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Request Registered
                  </span>
                  <h3 className="font-display text-2xl text-ink tracking-[-0.01em] mt-0.5">
                    Your AuditGPT request is in.
                  </h3>
                </div>
              </div>
              
              <div className="space-y-4 text-sm text-mist leading-[1.6] border-t border-sand-deep/15 pt-6">
                <p>
                  We&rsquo;ll review your site and follow up with next steps.
                </p>
                <div className="p-4 bg-cream/50 rounded-xl border border-sand-deep/20 space-y-2">
                  <p className="text-xs font-semibold text-ink uppercase tracking-wider font-mono">
                    Expectations & Details:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-mist/90">
                    <li>Expected response window: <strong>72 hours</strong></li>
                    <li>Reminder: this report is for strategy purposes and does not constitute formal legal, clinical, or regulatory advice.</li>
                  </ul>
                </div>
                
                <div className="pt-4 flex items-center justify-between">
                  {isTechWeek ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                      <Link
                        href="/contact?intent=ddaas"
                        onClick={() => trackEvent('ddaas_upsell_click', { location: 'techweek_confirmation' })}
                        className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink hover:bg-sage-deep text-cream rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl"
                      >
                        Book Acquisition Audit ($15k DDaaS)
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        href="/partners"
                        className="text-xs font-semibold text-ink/75 hover:text-sage-deep transition-colors"
                      >
                        Ask about agency reviews
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/sample-report"
                        onClick={() => trackEvent('sample_report_click', { location: 'confirmation_screen' })}
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-sage-deep hover:bg-ink text-cream rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                      >
                        View Sample Report
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      
                      <Link
                        href="/"
                        className="text-xs font-semibold text-ink/75 hover:text-sage-deep transition-colors"
                      >
                        Return Home
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onChange={handleInputChange}
              className="rounded-2xl bg-bone border border-sand-deep/30 p-7 md:p-9 space-y-5"
              style={{
                boxShadow:
                  '0 14px 36px -16px rgba(28,24,20,0.08), inset 0 1px 1px rgba(255,255,255,0.6)',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <Field label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Field label="Company" name="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
                <Field
                  label="Website URL"
                  name="websiteUrl"
                  type="url"
                  placeholder="https://"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  required
                />
                
                <SelectField
                  label="Company type"
                  name="companyType"
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  options={companyTypes}
                  required
                />

                <SelectField
                  label="Primary Goal (Optional)"
                  name="primaryGoal"
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  options={primaryGoals}
                />

                <Field label="Phone (Optional)" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                
                <Field 
                  label="Monthly budget range (Optional)" 
                  name="budget" 
                  type="text" 
                  placeholder="e.g. $2k-$5k/mo" 
                  value={budget} 
                  onChange={(e) => setBudget(e.target.value)} 
                />
              </div>

              <div>
                <label
                  htmlFor="worry"
                  className="block text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-2"
                  style={{ fontFamily: MONO_STACK }}
                >
                  What are you most worried about? <span className="text-clay-deep">*</span>
                </label>
                <textarea
                  id="worry"
                  name="worry"
                  rows={4}
                  required
                  value={worry}
                  onChange={(e) => setWorry(e.target.value)}
                  placeholder="A specific claim, page, founder statement, or comparison you want us to focus on."
                  className="w-full rounded-xl bg-cream border border-sand-deep/40 px-4 py-3 text-sm text-ink placeholder:text-mist/45 focus:outline-none focus:border-sage-deep focus:ring-2 focus:ring-sage-deep/15 transition-all"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-sand-deep/10">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAgency"
                    checked={isAgency}
                    onChange={(e) => setIsAgency(e.target.checked)}
                    className="w-4 h-4 rounded border-ink/30 text-sage-deep focus:ring-sage-deep/30"
                  />
                  <span className="text-xs text-mist font-semibold leading-[1.6]">
                    Are you an agency? (Interested in White Label options)
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isMedicalOperator"
                    checked={isMedicalOperator}
                    onChange={(e) => setIsMedicalOperator(e.target.checked)}
                    className="w-4 h-4 rounded border-ink/30 text-sage-deep focus:ring-sage-deep/30"
                  />
                  <span className="text-xs text-mist font-semibold leading-[1.6]">
                    Are you a medical/wellness operator? (Interested in GLP-1 or health-claim review)
                  </span>
                </label>
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-1 w-4 h-4 rounded border-ink/30 text-sage-deep focus:ring-sage-deep/30"
                />
                <span className="text-xs text-mist leading-[1.6]">
                  I understand a Scrutexity Claim Audit is a claim-support and
                  marketing-risk review of public materials. It is not legal,
                  clinical, or regulatory advice. <span className="text-clay-deep">*</span>
                </span>
              </label>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group inline-flex items-center gap-2 px-7 py-3.5 bg-sage-deep hover:bg-ink text-cream rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
                  style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
                >
                  {isSubmitting ? 'Processing...' : (
                    <>
                      Request audit · {offers.find((o) => o.key === selected)?.name}
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                <Link
                  href="/sample-report"
                  onClick={() => trackEvent('sample_report_click', { location: 'form_bottom' })}
                  className="group text-sm font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
                >
                  View Sample Report
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ClaimAuditContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-ink/40 font-mono text-xs uppercase tracking-wider animate-pulse flex items-center gap-2">
          <Sparkles size={16} className="animate-spin" />
          Loading AuditGPT Intake System...
        </div>
      </div>
    }>
      <ClaimAuditContentInner />
    </Suspense>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  value,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-2"
        style={{ fontFamily: MONO_STACK }}
      >
        {label}
        {required ? <span className="text-clay-deep ml-1">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl bg-cream border border-sand-deep/40 px-4 py-3 text-sm text-ink placeholder:text-mist/45 focus:outline-none focus:border-sage-deep focus:ring-2 focus:ring-sage-deep/15 transition-all"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectField({
  label,
  name,
  options,
  required,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-2"
        style={{ fontFamily: MONO_STACK }}
      >
        {label}
        {required ? <span className="text-clay-deep ml-1">*</span> : null}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl bg-cream border border-sand-deep/40 px-4 py-3 text-sm text-ink focus:outline-none focus:border-sage-deep focus:ring-2 focus:ring-sage-deep/15 transition-all"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
