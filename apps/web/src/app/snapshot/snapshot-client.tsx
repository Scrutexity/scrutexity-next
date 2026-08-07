"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/utils/analytics";
import { LiveDemoEngine } from "@/components/scrutexity/motion/live-demo-engine";
import { EngineContainer } from "@/components/scrutexity/funnel/EngineContainer";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The free snapshot intake.
 *
 * This page previously simulated a scan: the submit handler ran a 3.2s
 * setTimeout and pushed to a static /snapshot/result page carrying hardcoded
 * findings ("We found 1 evidence gap. There are 14 more on your site."). No
 * request was ever made. For a company that sells claim substantiation, a
 * free tool that invents its own findings is the exact failure mode the
 * product exists to catch.
 *
 * It now drives the same engine the homepage uses: a real POST to
 * /api/funnel/scan, then EngineContainer, which owns the genuine
 * locked -> partial -> unlocked progression including the embedded checkout.
 */
export default function SnapshotClient() {
  const reduce = useReducedMotion();
  const [scanState, setScanState] = useState<{
    isScanning: boolean;
    scanId: string | null;
    isDemo: boolean;
    error: string | null;
  }>({ isScanning: false, scanId: null, isDemo: false, error: null });

  const handleScan = async (url: string, industry: string) => {
    setScanState({ isScanning: true, scanId: null, isDemo: false, error: null });
    try {
      const res = await fetch("/api/funnel/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: url }),
      });
      if (!res.ok) throw new Error("Scan failed");
      const { scanId, scanToken, isDemo } = await res.json();
      // Store the token for demo scans too. /api/funnel/result/[scanId]
      // requires a bearer token unconditionally, so skipping this for demos
      // made every demo scan 401 and render nothing. The token is scoped to
      // this scanId, so storing it grants no extra access.
      if (scanToken) sessionStorage.setItem("scrutexity_scan_token", scanToken);
      setScanState({ isScanning: false, scanId, isDemo, error: null });
      trackEvent("snapshot_scan_complete", { url, industry });
    } catch (error) {
      console.error("Snapshot scan failed:", error);
      setScanState({
        isScanning: false,
        scanId: null,
        isDemo: false,
        error: "We could not reach that page. Check the URL and try again.",
      });
    }
  };

  return (
    <div className="bg-paper text-ink">
      <section className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Free snapshot
          </p>
          <h1 className="font-display mt-5 max-w-[18ch] text-4xl font-medium sm:text-5xl">
            See what your site is claiming.
          </h1>
          <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-ink-soft sm:text-lg">
            Paste any public marketing URL. We review the claims on the page and
            flag the ones your visible evidence does not support.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-10 rounded-xl border border-hairline bg-raised p-4 shadow-[var(--shadow-card)] sm:p-6"
        >
          <LiveDemoEngine onScan={handleScan} isScanning={scanState.isScanning} />

          {scanState.error && (
            <p
              role="alert"
              className="mt-4 text-sm text-exposure-red"
            >
              {scanState.error}
            </p>
          )}

          {scanState.scanId && (
            <div className="mt-6">
              <EngineContainer scanId={scanState.scanId} isDemo={scanState.isDemo} />
            </div>
          )}
        </motion.div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Public pages only. Source linked. Not legal advice.
        </p>
      </section>
    </div>
  );
}
