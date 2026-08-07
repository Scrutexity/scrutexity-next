"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck, Lock } from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { LiveDemoEngine } from "@/components/scrutexity/motion/live-demo-engine";
import { EngineContainer } from "@/components/scrutexity/funnel/EngineContainer";
import { ClaimDriftTimeline } from "@/components/scrutexity/motion/claim-drift-timeline";
import { ProofArtifactShelf } from "@/components/scrutexity/motion/proof-artifact-shelf";
import { ForensicBriefsGrid } from "@/components/scrutexity/ForensicBriefsGrid";
import { motion } from "framer-motion";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
const SNAPSHOT_URL = "/snapshot";

function IndexLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-[10px] font-mono tracking-[0.14em] uppercase text-muted" style={{ fontFamily: MONO }}>
      <span className="text-bureau-sage">{num}</span>
      <span className="h-px w-6 bg-sand-deep/40" aria-hidden />
      <span>{text}</span>
    </div>
  );
}

export default function UmbrellaHomepage() {
  const [scanState, setScanState] = useState<{ 
    isScanning: boolean; 
    scanId: string | null;
    isDemo: boolean;
  }>({
    isScanning: false,
    scanId: null,
    isDemo: false
  });

  const handleScan = async (url: string, industry: string) => {
    setScanState({ isScanning: true, scanId: null, isDemo: false });
    
    try {
      const res = await fetch('/api/funnel/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl: url })
      });
      
      if (!res.ok) throw new Error("Failed to scan");
      
      const { scanId, scanToken, isDemo } = await res.json();
      
      if (!isDemo) {
        sessionStorage.setItem("scrutexity_scan_token", scanToken);
      }
      
      setScanState({ isScanning: false, scanId, isDemo });
      trackEvent("demo_scan_complete", { url, industry });
    } catch (error) {
      console.error("Scan initialization failed:", error);
      setScanState({ isScanning: false, scanId: null, isDemo: false });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink font-sans selection:bg-bureau-sage/30">
      
      {/* ── 1 & 2. Hero + Engine Section ── */}
      <section className="relative overflow-hidden border-b border-sand-deep/20 pt-32 pb-24 sm:pt-40 sm:pb-32 px-5 sm:px-8">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-bureau-sage/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-5xl relative z-10 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sand-deep/40 bg-paper-light/50 backdrop-blur-sm mb-8">
            <ShieldCheck size={14} className="text-bureau-sage" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted" style={{ fontFamily: MONO }}>
              Claim Evidence Intelligence
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-tight">
            Forensic intelligence for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink via-ink to-muted">public marketing claims.</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl font-light leading-relaxed">
            Scrutexity monitors web copy, flags FTC/FDA pattern mismatches and AI distortions, and produces dated, immutable audit records.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-mono text-muted uppercase tracking-widest" style={{ fontFamily: MONO }}>
            <span>No Code Required</span>
            <span className="h-1 w-1 rounded-full bg-sand-deep" />
            <span>Confidential Default</span>
          </div>

          {/* Live Demo Engine */}
          <LiveDemoEngine onScan={handleScan} isScanning={scanState.isScanning} />
          
          {/* Result Preview (Triggered by Engine) */}
          <div className="w-full mt-4 min-h-[400px]">
            {scanState.scanId ? (
              <EngineContainer scanId={scanState.scanId} isDemo={scanState.isDemo} />
            ) : (
              /* Floating Exhibit Preview (Default State) */
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-16 inline-flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="bg-paper-light border border-sand-deep/40 p-4 rounded-xl shadow-2xl backdrop-blur-sm text-left max-w-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-bureau-sage bg-bureau-sage/10 px-2 py-0.5 rounded" style={{ fontFamily: MONO }}>Exhibit A Preview</span>
                    <Lock size={12} className="text-muted" />
                  </div>
                  <p className="text-xs text-muted font-mono leading-relaxed truncate" style={{ fontFamily: MONO }}>
                    SHA256: e3b0c44298fc1c149afbf4c8996fb...
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Forensic Briefs Grid */}
          <ForensicBriefsGrid />

        </div>
      </section>

      {/* ── 3. Three Outcomes (Re-themed for Dark) ── */}
      <section className="border-b border-sand-deep/20 bg-paper-light/30 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <IndexLabel num="02" text="Platform Architecture" />
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-ink font-normal">
              Intelligence, not just a score.
            </h2>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Designed for General Counsel, deal teams, and growth leaders to quantify risk without slowing down go-to-market execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-paper border border-sand-deep/30 p-8 rounded-2xl hover:border-bureau-sage/30 transition-colors">
              <span className="text-[10px] font-mono text-muted uppercase tracking-[0.14em]" style={{ fontFamily: MONO }}>
                01 / EXPOSURE
              </span>
              <h3 className="mt-4 font-display text-xl text-ink font-normal">Find Exposure First</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted font-light">
                Identify unsubstantiated biological mechanism claims, absolute safety promises, or guaranteed ROI statements before regulators or buyers do.
              </p>
            </div>

            <div className="bg-paper border border-sand-deep/30 p-8 rounded-2xl hover:border-bureau-sage/30 transition-colors">
              <span className="text-[10px] font-mono text-muted uppercase tracking-[0.14em]" style={{ fontFamily: MONO }}>
                02 / REMEDIATION
              </span>
              <h3 className="mt-4 font-display text-xl text-ink font-normal">Correct Language</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted font-light">
                Replace weak or overstated claims with evidence-anchored phrasing that preserves commercial power while eliminating legal risk.
              </p>
            </div>

            <div className="bg-paper border border-sand-deep/30 p-8 rounded-2xl hover:border-bureau-sage/30 transition-colors">
              <span className="text-[10px] font-mono text-muted uppercase tracking-[0.14em]" style={{ fontFamily: MONO }}>
                03 / PROVENANCE
              </span>
              <h3 className="mt-4 font-display text-xl text-ink font-normal">Keep Record Current</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted font-light">
                Maintain a dated, hash-chained record of public copy changes and evidentiary updates over time with automated S-Mark verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Claim Drift Timeline ── */}
      <section className="border-b border-sand-deep/20 bg-paper py-24 sm:py-32">
        <div className="text-center mb-16">
          <IndexLabel num="03" text="The Record" />
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-ink font-normal">Track evidence changes over time.</h2>
        </div>
        <ClaimDriftTimeline />
      </section>

      {/* ── 5. Proof Artifact Shelf ── */}
      <section className="border-b border-sand-deep/20 bg-paper-light/30 py-24 sm:py-32">
        <div className="text-center mb-16">
          <IndexLabel num="04" text="Artifacts" />
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-ink font-normal">Institutional evidence documents.</h2>
        </div>
        <ProofArtifactShelf />
      </section>

      {/* ── 6. Final Scan CTA ── */}
      <section id="snapshot" className="relative bg-paper px-5 py-24 sm:px-8 md:py-32 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-bureau-sage/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-4xl border border-sand-deep/30 bg-paper-light/50 backdrop-blur-md p-10 sm:p-16 text-center rounded-3xl relative z-10">
          <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal leading-tight">
            Know what your public site is actually claiming.
          </h2>
          <p className="mt-6 text-base text-muted max-w-xl mx-auto font-light">
            Paste any public marketing URL. Scrutexity generates a free point-in-time claim snapshot delivered to your inbox.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={SNAPSHOT_URL}
              onClick={() => trackEvent("cta_click", { cta_label: "Run Free Snapshot", section: "final-cta" })}
              className="inline-flex min-h-12 items-center gap-2 bg-bureau-sage px-8 py-3.5 text-xs font-semibold tracking-wider text-[#070708] rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-shadow"
            >
              Run Free Snapshot <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
