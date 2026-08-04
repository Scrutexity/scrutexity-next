"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ShieldAlert, Activity } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/utils/analytics';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default function PELandingContent() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsSubmitting(true);
    trackEvent('pe_scan_initiated', { target_url: url });
    
    // Push to the report page, which will execute the actual scan
    router.push(`/private-equity/report?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="min-h-screen bg-ink text-cream font-sans selection:bg-sage-deep/40">
      {/* HERO SECTION */}
      <section className="relative px-6 pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        {/* Subtle background grid/glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sage-deep blur-[120px] opacity-30 rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sage-deep/30 bg-sage-deep/10 text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-8"
            style={{ fontFamily: MONO_STACK }}
          >
            <ShieldAlert size={14} />
            M&A Diligence Leak Detected
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-[5rem] tracking-[-0.03em] leading-[1.05] max-w-4xl"
          >
            Don't acquire an <span className="italic text-sage-deep">AI liability.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-mist/80 leading-[1.6] max-w-2xl"
          >
            Shadow AI and unverified agent transcripts are ticking time bombs in your portfolio. Audit the target company's agent transcripts to quantify compliance exposure before you close the deal.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col sm:flex-row gap-3 max-w-xl"
          >
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mist/40">
                <Activity size={18} />
              </div>
              <input
                type="url"
                required
                placeholder="https://portfolio-clinic.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-bone/5 border border-sand-deep/20 rounded-xl text-cream placeholder:text-mist/30 focus:outline-none focus:border-sage-deep focus:ring-1 focus:ring-sage-deep transition-all"
                style={{ fontFamily: MONO_STACK }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`h-14 px-8 inline-flex items-center justify-center gap-2 bg-sage-deep hover:bg-cream hover:text-ink text-cream rounded-xl text-sm font-semibold transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isSubmitting ? 'Initializing Scanner...' : 'Generate Risk Score'}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>
          </motion.form>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="px-6 py-24 bg-bone/5 border-t border-sand-deep/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="w-10 h-10 rounded-full bg-sage-deep/20 flex items-center justify-center mb-6 text-sage-deep">
              <ShieldAlert size={20} />
            </div>
            <h3 className="font-display text-2xl text-cream tracking-[-0.01em] mb-3">Regulatory Panic</h3>
            <p className="text-mist/70 leading-[1.6] text-sm">
              AI search engines are fabricating medical claims, drawing FDA warning letters. Stop optimizing for visibility; start governing your claims.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-clay-deep/20 flex items-center justify-center mb-6 text-clay-deep">
              <Activity size={20} />
            </div>
            <h3 className="font-display text-2xl text-cream tracking-[-0.01em] mb-3">Valuation Protection</h3>
            <p className="text-mist/70 leading-[1.6] text-sm">
              By offering AuditGPT diagnostics and SHA-256-style audit trails, we sell risk mitigation—protecting your portfolio's multiple.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-sand-deep/20 flex items-center justify-center mb-6 text-sand-deep">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-cream tracking-[-0.01em] mb-3">End the Slop Era</h3>
            <p className="text-mist/70 leading-[1.6] text-sm">
              Operators are exhausted by generic SEO. Demand verifiable truth, audit trails, and concrete demand recovery before you acquire.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
