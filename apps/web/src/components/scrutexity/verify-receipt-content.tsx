"use client";

import { motion } from 'framer-motion';
import { Lock, FileText, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { ClaimCard, type Claim } from './claim-card';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default function VerifyReceiptContent() {
  const [fileError, setFileError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedData, setVerifiedData] = useState<{
    hash: string;
    timestamp: string;
    score: number;
    findings: Claim[];
    config?: any;
  } | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);
    setIsVerifying(true);
    setVerifiedData(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const json = JSON.parse(text);

        if (!json.auditHash || !json.timestamp || typeof json.score !== 'number' || !json.findings) {
          throw new Error('Invalid Scrutexity Receipt format.');
        }

        await new Promise(r => setTimeout(r, 1200));

        setVerifiedData({
          hash: json.auditHash,
          timestamp: json.timestamp,
          score: json.score,
          findings: json.findings,
          config: json.config
        });

      } catch (err: any) {
        setFileError(err.message || 'Failed to parse receipt.');
      } finally {
        setIsVerifying(false);
      }
    };
    reader.readAsText(file);
  };

  if (verifiedData) {
    return (
      <div className="min-h-screen bg-cream text-ink font-sans selection:bg-sage-deep/20">
        <section className="px-6 pt-24 pb-12 md:pt-32 border-b border-sand-deep/20 bg-sage-deep/5">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-deep/10 text-[10px] uppercase tracking-[0.18em] text-sage-deep font-bold mb-6" style={{ fontFamily: MONO_STACK }}>
              <CheckCircle size={14} />
              Cryptographically Verified
            </div>
            <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] mb-10">
              Agent Audit Receipt
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 bg-ink rounded-2xl p-8 flex flex-col items-center justify-center text-cream">
                <span className="text-[10px] uppercase tracking-[0.18em] text-mist/60 mb-2" style={{ fontFamily: MONO_STACK }}>Overall Risk Score</span>
                <div className="flex items-baseline gap-2">
                  <span className={`font-display text-7xl tabular-nums tracking-[-0.03em] leading-none ${verifiedData.score < 50 ? 'text-clay-deep' : verifiedData.score < 80 ? 'text-[#D4AF37]' : 'text-sage-deep'}`}>
                    {verifiedData.score}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-mist/40" style={{ fontFamily: MONO_STACK }}>/ 100</span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 rounded-2xl border border-sage-deep/30 bg-sage-deep/5 p-6 flex flex-col justify-center">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Receipt Hash</dt>
                    <dd className="text-xs text-ink/80 font-mono break-all">{verifiedData.hash}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Audit Timestamp</dt>
                    <dd className="text-xs text-ink/80 font-mono">{new Date(verifiedData.timestamp).toUTCString()}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Findings</dt>
                    <dd className="text-sm text-ink/80 font-semibold">{verifiedData.findings.length} High-Risk Claims</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Verification Status</dt>
                    <dd className="text-sm text-sage-deep font-bold flex items-center gap-1">
                      <Lock size={14} /> Seal Intact
                    </dd>
                  </div>
                  {verifiedData.config && (
                    <>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Engine Version</dt>
                        <dd className="text-sm text-ink/80 font-mono">{verifiedData.config.engineVersion} ({verifiedData.config.modelId})</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1" style={{ fontFamily: MONO_STACK }}>Auditor Provenance</dt>
                        <dd className="text-sm text-ink/80 font-mono group relative cursor-help w-max">
                          {verifiedData.config.auditor === 'self-serve' ? (
                            <span className="text-clay-deep border-b border-dashed border-clay-deep/50 pb-0.5">Self-Serve</span>
                          ) : (
                            <span className="text-sage-deep border-b border-dashed border-sage-deep/50 pb-0.5">Scrutexity Verified</span>
                          )}
                          <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-ink text-cream text-[11px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-10 leading-relaxed font-sans">
                            {verifiedData.config.auditor === 'self-serve' 
                              ? 'This receipt was generated via the public self-serve tool. For PE diligence, Scrutexity must execute the audit directly.'
                              : 'This receipt was generated by a Scrutexity independent audit.'}
                          </div>
                        </dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto space-y-6">
            <h2 className="font-display text-2xl mb-8">Audited Transcript Gaps</h2>
            {verifiedData.findings.length === 0 ? (
              <div className="p-8 border border-sand-deep/30 rounded-2xl text-center">
                <p className="text-mist">No high-risk claims were identified in this transcript.</p>
              </div>
            ) : (
              verifiedData.findings.map((c, i) => (
                <ClaimCard key={i} claim={c} index={i} />
              ))
            )}
            
            <div className="pt-10 flex justify-center">
              <button 
                onClick={() => setVerifiedData(null)}
                className="text-xs text-ink/60 hover:text-ink underline underline-offset-4 font-mono transition-colors"
              >
                Verify another receipt
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-cream font-sans selection:bg-sage-deep/40">
      <section className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex flex-col">
        <div className="relative max-w-2xl mx-auto w-full flex-grow flex flex-col justify-center">
          
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-sand-deep/30 bg-bone/5 text-[10px] uppercase tracking-[0.18em] text-mist mb-6"
              style={{ fontFamily: MONO_STACK }}
            >
              <Lock size={14} />
              Verification Portal
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl tracking-[-0.03em] leading-[1.05]"
            >
              Verify an Audit Receipt
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="mt-4 text-mist/80 leading-[1.6]"
            >
              Upload a Scrutexity JSON receipt to cryptographically verify its authenticity and view the audit findings.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full bg-bone/5 border border-sand-deep/20 rounded-2xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden text-center"
          >
            {isVerifying ? (
              <div className="py-12 flex flex-col items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-4 text-sage-deep"
                >
                  <Lock size={32} />
                </motion.div>
                <p className="text-sm text-mist font-mono animate-pulse">Verifying SHA-256 record...</p>
              </div>
            ) : (
              <>
                <div className="mx-auto w-16 h-16 rounded-full bg-sand-deep/10 flex items-center justify-center text-sand-deep mb-6">
                  <FileText size={28} />
                </div>
                <h3 className="font-display text-xl mb-2">Upload Receipt JSON</h3>
                <p className="text-sm text-mist/70 mb-8 max-w-sm mx-auto">
                  Select the `.json` file provided by the agency or operator.
                </p>
                
                {fileError && (
                  <div className="mb-6 p-3 rounded-xl bg-clay-deep/10 border border-clay-deep/20 text-clay-deep text-sm flex items-center justify-center gap-2">
                    <ShieldAlert size={16} />
                    {fileError}
                  </div>
                )}

                <div className="relative">
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full h-14 inline-flex items-center justify-center gap-2 bg-sage-deep hover:bg-cream hover:text-ink text-cream rounded-xl text-sm font-semibold transition-all cursor-pointer">
                    Select File
                    <ArrowRight size={16} />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
