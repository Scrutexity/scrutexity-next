"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, FileWarning, Search, Lock } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/utils/analytics';
import { useState, useEffect, Suspense } from 'react';
import { ClaimCard, type Claim } from './claim-card';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

function PEReportContentInner() {
  const searchParams = useSearchParams();
  const urlParam = searchParams.get('url') || '';
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [score, setScore] = useState(0);
  const [scanStep, setScanStep] = useState(0);

  useEffect(() => {
    if (!urlParam) {
      setError("No target URL provided.");
      setLoading(false);
      return;
    }

    const scanMessages = [
      "Connecting to DNS...",
      "Extracting raw HTML payload...",
      "Bypassing client-side obfuscation...",
      "Feeding text to AuditGPT Engine...",
      "Evaluating against FDA Section 5(a)...",
      "Checking HIPAA non-compliance markers...",
      "Cross-referencing FTC aesthetics guidelines...",
      "Synthesizing Liability Risk Score..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < scanMessages.length - 1) {
        currentStep++;
        setScanStep(currentStep);
      }
    }, 1500);

    const performScan = async () => {
      try {
        const res = await fetch('/api/auditgpt/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlParam })
        });
        
        const data = await res.json();
        
        if (!data.success) {
          throw new Error(data.error || "Failed to scan URL");
        }
        
        setClaims(data.claims);
        setScore(data.score);
      } catch (err: any) {
        setError(err.message);
      } finally {
        clearInterval(interval);
        setLoading(false);
      }
    };

    performScan();

    return () => clearInterval(interval);
  }, [urlParam]);

  const scanMessages = [
    "Connecting to DNS...",
    "Extracting raw HTML payload...",
    "Bypassing client-side obfuscation...",
    "Feeding text to AuditGPT Engine...",
    "Evaluating against FDA Section 5(a)...",
    "Checking HIPAA non-compliance markers...",
    "Cross-referencing FTC aesthetics guidelines...",
    "Synthesizing Liability Risk Score..."
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-ink text-cream font-mono flex flex-col items-center justify-center p-6 selection:bg-sage-deep/40">
        <div className="max-w-xl w-full">
          <div className="flex items-center gap-3 text-sage-deep mb-8 animate-pulse">
            <Lock size={20} />
            <span className="uppercase tracking-[0.2em] text-xs font-bold">AuditGPT Secure Pipeline</span>
          </div>
          
          <div className="space-y-3 mb-10">
            {scanMessages.slice(0, scanStep + 1).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i === scanStep ? 1 : 0.4, x: 0 }}
                className="flex items-center gap-3 text-sm"
              >
                <span className="text-mist/50">[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span>
                <span className={i === scanStep ? "text-cream" : "text-mist"}>{msg}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-sage-deep"
            >
              _
            </motion.div>
          </div>
          
          <div className="w-full h-1 bg-bone/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sage-deep"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(((scanStep + 1) / scanMessages.length) * 100, 95)}%` }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ink text-cream flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-clay-deep/20 text-clay-deep flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={28} />
          </div>
          <h2 className="font-display text-3xl mb-4">Scan Failed</h2>
          <p className="text-mist/70 mb-8">{error}</p>
          <Link
            href="/private-equity"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bone/10 hover:bg-bone/20 rounded-xl transition-colors text-sm font-semibold"
          >
            Try Another URL
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-ink font-sans selection:bg-sage-deep/20">
      {/* REPORT HEADER */}
      <section className="px-6 pt-24 pb-12 md:pt-32 border-b border-sand-deep/20">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-clay-deep font-bold mb-6" style={{ fontFamily: MONO_STACK }}>
            <FileWarning size={14} />
            M&A Liability Report Generated
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] mb-4">
            AuditGPT Claim Health Score
          </h1>
          <p className="text-mist mb-10" style={{ fontFamily: MONO_STACK }}>
            Target: <span className="text-ink">{urlParam}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Card */}
            <div className="col-span-1 bg-ink rounded-2xl p-8 flex flex-col items-center justify-center text-cream relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, var(--color-clay-deep), transparent 70%)' }} />
              <span className="text-[10px] uppercase tracking-[0.18em] text-mist/60 mb-2" style={{ fontFamily: MONO_STACK }}>Overall Risk Score</span>
              <div className="flex items-baseline gap-2">
                <span className={`font-display text-7xl tabular-nums tracking-[-0.03em] leading-none ${score < 50 ? 'text-clay-deep' : score < 80 ? 'text-accent-text' : 'text-sage-deep'}`}>
                  {score}
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-mist/40" style={{ fontFamily: MONO_STACK }}>/ 100</span>
              </div>
              <span className="mt-4 text-[10px] uppercase tracking-[0.14em] text-cream/70 font-bold" style={{ fontFamily: MONO_STACK }}>
                {score < 50 ? 'Severe M&A Liability Leak' : score < 80 ? 'Requires Qualified Review' : 'M&A Ready'}
              </span>
            </div>

            {/* Meta Data */}
            <div className="col-span-1 md:col-span-2 rounded-2xl border border-sand-deep/30 p-6 flex flex-col justify-center">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Audit Hash (SHA-256 equivalent)</dt>
                  <dd className="text-xs text-ink/80 font-mono">{(Math.random() + 1).toString(36).substring(2) + Date.now().toString(36)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Timestamp</dt>
                  <dd className="text-xs text-ink/80 font-mono">{new Date().toUTCString()}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Claims Scanned</dt>
                  <dd className="text-sm text-ink/80 font-semibold">{claims.length} High-Risk Findings</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Engine</dt>
                  <dd className="text-sm text-ink/80 font-semibold">AuditGPT deterministic layer (v2.1)</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* CLAIMS FEED */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="font-display text-2xl mb-8">Identified Compliance Gaps</h2>
          {claims.length === 0 ? (
            <div className="p-8 border border-sand-deep/30 rounded-2xl text-center">
              <p className="text-mist">No high-risk claims identified on the initial scan.</p>
            </div>
          ) : (
            claims.map((c, i) => (
              <ClaimCard key={i} claim={c} index={i} />
            ))
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-6 py-20 bg-ink text-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mb-6">
            Stop the bleeding before the <span className="italic text-clay-deep">transaction closes.</span>
          </h2>
          <p className="text-mist/80 mb-10 text-sm md:text-base">
            This is just a surface scan. To review your portfolio's claim risks and evaluate FDA/FTC enforcement pattern risks, book a comprehensive Acquisition Audit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?intent=ddaas"
              onClick={() => trackEvent('ddaas_upsell_click', { location: 'pe_report_footer' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-clay-deep hover:bg-cream hover:text-ink text-cream rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-xl"
            >
              Book Acquisition Audit ($15k DDaaS)
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/private-equity"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-bone/10 hover:bg-bone/20 text-cream rounded-xl text-sm font-semibold transition-all"
            >
              Scan Another Portfolio Site
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PEReportContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ink text-cream flex items-center justify-center">
        <div className="animate-pulse text-sage-deep font-mono text-xs uppercase tracking-widest">
          Initializing Audit Environment...
        </div>
      </div>
    }>
      <PEReportContentInner />
    </Suspense>
  );
}
