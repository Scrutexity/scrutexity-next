"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ShieldAlert, Activity, FileText, AlertTriangle, Lock } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/utils/analytics';
import { ClaimCard, type Claim } from './claim-card';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default function AgentAuditContent() {
  const [transcript, setTranscript] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [claims, setClaims] = useState<Claim[] | null>(null);
  const [score, setScore] = useState(0);
  const [auditHash, setAuditHash] = useState<string | null>(null);
  const [auditTimestamp, setAuditTimestamp] = useState<string | null>(null);
  const [auditConfig, setAuditConfig] = useState<any>(null);

  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmittingEmail(true);
    // Track the lead capture
    trackEvent('receipt_email_captured', { email });
    
    // Simulate network request
    await new Promise(r => setTimeout(r, 800));
    
    setIsSubmittingEmail(false);
    setEmailSubmitted(true);
    
    // Auto-trigger the download
    handleDownloadReceipt();
  };

  const handleDownloadReceipt = () => {
    if (!claims || !auditHash) return;
    const receipt = {
      auditHash,
      timestamp: auditTimestamp,
      score,
      config: auditConfig,
      findings: claims
    };
    const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scrutexity-receipt-${auditHash.substring(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!transcript || transcript.trim().length < 20) {
      setError("Please paste a valid transcript snippet (at least 20 characters).");
      return;
    }
    
    setIsSubmitting(true);
    setLoading(true);
    setError(null);
    trackEvent('agent_guardrail_scan_initiated');
    
    // Start scan animation
    const scanMessages = [
      "Extracting raw transcript payload...",
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
        const res = await fetch('/api/auditgpt/transcript', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript })
        });
        
        const data = await res.json();
        
        if (!data.success) {
          throw new Error(data.error || "Failed to scan transcript");
        }
        
        setClaims(data.claims);
        setScore(data.score);
        setAuditHash(data.auditHash);
        setAuditTimestamp(data.timestamp);
        setAuditConfig(data.config);
      } catch (err: any) {
        setError(err.message);
      } finally {
        clearInterval(interval);
        setLoading(false);
        setIsSubmitting(false);
      }
    };

    performScan();
  };

  const scanMessages = [
    "Extracting raw transcript payload...",
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

  if (claims) {
    return (
      <div className="min-h-screen bg-cream text-ink font-sans selection:bg-sage-deep/20">
        <section className="px-6 pt-24 pb-12 md:pt-32 border-b border-sand-deep/20">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-clay-deep font-bold mb-6" style={{ fontFamily: MONO_STACK }}>
              <FileText size={14} />
              Agent Audit Receipt Generated
            </div>
            <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] mb-10">
              Agent Liability Score
            </h1>

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
                  {score < 50 ? 'Severe Clinical Liability' : score < 80 ? 'Requires Guardrails' : 'Governed'}
                </span>
              </div>

              {/* Meta Data */}
              <div className="col-span-1 md:col-span-2 rounded-2xl border border-sand-deep/30 p-6 flex flex-col justify-center">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Audit Hash (SHA-256 equivalent)</dt>
                    <dd className="text-xs text-ink/80 font-mono">{auditHash || '...'}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Timestamp</dt>
                    <dd className="text-xs text-ink/80 font-mono">{auditTimestamp ? new Date(auditTimestamp).toUTCString() : '...'}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Claims Scanned</dt>
                    <dd className="text-sm text-ink/80 font-semibold">{claims.length} Findings in Transcript</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Engine</dt>
                    <dd className="text-sm text-ink/80 font-semibold">{auditConfig ? `AuditGPT ${auditConfig.engineVersion}` : 'AuditGPT'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto space-y-6">
            <h2 className="font-display text-2xl mb-8">Identified Transcript Gaps</h2>
            {claims.length === 0 ? (
              <div className="p-8 border border-sand-deep/30 rounded-2xl text-center">
                <p className="text-mist">No high-risk claims identified in this transcript snippet.</p>
              </div>
            ) : (
              claims.map((c, i) => (
                <ClaimCard key={i} claim={c} index={i} />
              ))
            )}
          </div>
        </section>

        <section className="px-6 py-20 bg-ink text-cream border-t border-sand-deep/15">
          <div className="max-w-2xl mx-auto text-center">
            {claims.length > 0 ? (
              <>
                <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mb-4">
                  {claims.length} substantiation {claims.length === 1 ? 'gap' : 'gaps'} found in this transcript.
                </h2>
                <p className="text-mist/80 mb-10 text-sm md:text-base leading-relaxed">
                  You're seeing the summary. The full sealed receipt lists each flagged claim, the stance analysis behind it, and a verification link you can hand to a client or a buyer.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mb-4 text-sage-deep">
                  No substantiation gaps found. This one's clean.
                </h2>
                <p className="text-mist/80 mb-10 text-sm md:text-base leading-relaxed">
                  That's a result worth keeping. The sealed receipt is proof you can show a client — or a buyer in diligence — that the AI on their site isn't overclaiming.
                </p>
              </>
            )}

            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="max-w-lg mx-auto flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="you@agency.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-14 px-4 bg-bone/5 border border-sand-deep/20 rounded-xl text-cream placeholder:text-mist/30 focus:outline-none focus:border-sage-deep focus:ring-1 focus:ring-sage-deep transition-all"
                    style={{ fontFamily: MONO_STACK }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingEmail}
                    className={`h-14 px-8 inline-flex items-center justify-center gap-2 bg-sage-deep hover:bg-cream hover:text-ink text-cream rounded-xl text-sm font-semibold transition-all duration-300 ${isSubmittingEmail ? 'opacity-70 cursor-wait' : ''}`}
                  >
                    {isSubmittingEmail ? 'Sending...' : 'Email me the sealed receipt'}
                    {!isSubmittingEmail && <ArrowRight size={16} />}
                  </button>
                </div>
                <p className="text-xs text-mist/60 mt-2 max-w-md mx-auto leading-relaxed">
                  We send the receipt to this address and may follow up once to ask what you thought. Never a list, never sold — <Link href="/data-handling" className="text-sage-deep hover:underline">here's how we handle your data</Link>.
                </p>
              </form>
            ) : (
              <div className="p-6 bg-sage-deep/10 border border-sage-deep/20 rounded-2xl">
                <p className="text-sage-deep font-semibold mb-2">Receipt Sent & Downloaded!</p>
                <p className="text-sm text-mist/80">Check your email ({email}) or your downloads folder for the sealed JSON artifact.</p>
                <button
                  onClick={handleDownloadReceipt}
                  className="mt-4 text-xs underline underline-offset-4 text-mist/60 hover:text-cream transition-colors"
                >
                  Download again
                </button>
              </div>
            )}

            <div className="mt-12">
              <button 
                onClick={() => {
                  setClaims(null);
                  setEmailSubmitted(false);
                  setEmail('');
                }}
                className="text-xs text-mist/60 hover:text-cream underline underline-offset-4 font-mono transition-colors"
              >
                Scan another transcript
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-cream font-sans selection:bg-sage-deep/40">
      {/* HERO SECTION */}
      <section className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sage-deep/30 bg-sage-deep/10 text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-8"
            style={{ fontFamily: MONO_STACK }}
          >
            <ShieldAlert size={14} />
            Agent Audit Receipt
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-[4.75rem] tracking-[-0.03em] leading-[1.05] max-w-4xl"
          >
            Verify what your AI is allowed to promise <span className="italic text-sage-deep">before you deploy it.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-mist/80 leading-[1.6] max-w-2xl"
          >
            Everyone's worried about staff pasting PHI into ChatGPT. The quieter, more expensive liability is the bot on your homepage making clinical promises no one approved.
          </motion.p>
        </div>
      </section>

      {/* TRANSCRIPT INTAKE SECTION */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="bg-bone/5 border border-sand-deep/20 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl">Bring-your-own-transcript</h2>
              <span className="text-[10px] uppercase tracking-[0.16em] text-mist/50" style={{ fontFamily: MONO_STACK }}>
                Secure intake
              </span>
            </div>
            
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-clay-deep/10 border border-clay-deep/20 flex items-start gap-3 text-clay-deep">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="transcript" className="block text-[11px] uppercase tracking-[0.16em] text-mist/70 mb-3" style={{ fontFamily: MONO_STACK }}>
                  Paste a recent conversation log from your AI voice agent or chatbot
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4 text-mist/30">
                    <FileText size={20} />
                  </div>
                  <textarea
                    id="transcript"
                    required
                    rows={8}
                    placeholder="Patient: Can you guarantee I'll lose 20lbs on Semaglutide?&#10;Bot: Yes! Our patients see guaranteed results..."
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-ink border border-sand-deep/20 rounded-xl text-sm text-cream placeholder:text-mist/30 focus:outline-none focus:border-sage-deep focus:ring-1 focus:ring-sage-deep transition-all resize-none font-mono"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                <div className="text-xs text-mist/60 max-w-md space-y-1">
                  <strong>Privacy Notice:</strong>
                  <p>When you paste a transcript, we strip identifying details before anything is analyzed. We don't store the transcript after the audit runs. We never sell or share your data.</p>
                  <Link href="/data-handling" className="text-sage-deep hover:underline">Read our full Data Handling policy.</Link>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto h-14 px-8 inline-flex items-center justify-center gap-2 bg-sage-deep hover:bg-cream hover:text-ink text-cream rounded-xl text-sm font-semibold transition-all duration-300 shrink-0 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isSubmitting ? 'Initializing Scanner...' : 'Audit Transcript'}
                  {!isSubmitting && <ArrowRight size={16} />}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* VALUE PROPS */}
      <section className="px-6 py-24 border-t border-sand-deep/10 bg-ink">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="w-10 h-10 rounded-full bg-sage-deep/20 flex items-center justify-center mb-6 text-sage-deep">
              <ShieldAlert size={20} />
            </div>
            <h3 className="font-display text-2xl text-cream tracking-[-0.01em] mb-3">Stop Clinical Hallucinations</h3>
            <p className="text-mist/70 leading-[1.6] text-sm">
              LLMs invent studies and misstate clinical facts. Discover exactly what your bot is saying to patients before a regulator does.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-clay-deep/20 flex items-center justify-center mb-6 text-clay-deep">
              <Activity size={20} />
            </div>
            <h3 className="font-display text-2xl text-cream tracking-[-0.01em] mb-3">Diligence-Grade Scans</h3>
            <p className="text-mist/70 leading-[1.6] text-sm">
              We grade every transcript against strict FDA Section 5a guidelines, returning an explicit risk score you can action.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-sand-deep/20 flex items-center justify-center mb-6 text-sand-deep">
              <Lock size={20} />
            </div>
            <h3 className="font-display text-2xl text-cream tracking-[-0.01em] mb-3">Prove It Works</h3>
            <p className="text-mist/70 leading-[1.6] text-sm">
              Don't trust the vendor's dashboard. Audit the raw transcripts yourself to prove your marketing stack is governed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
