"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { trackEvent } from "@/utils/analytics";
import { LiveDemoEngine } from "@/components/scrutexity/motion/live-demo-engine";
import { EngineContainer } from "@/components/scrutexity/funnel/EngineContainer";
import { ClaimDriftTimeline } from "@/components/scrutexity/motion/claim-drift-timeline";
import { ProofArtifactShelf } from "@/components/scrutexity/motion/proof-artifact-shelf";
import { CounselAdvisory } from "@/components/scrutexity/CounselAdvisory";

const SNAPSHOT_URL = "/snapshot";
/** One label per intent. Matches the header CTA in site-nav verbatim so the
 *  page never offers two different words for the same action. */
const PRIMARY_CTA = "Run free snapshot";

/** Luxury ease. Slow out, no bounce: confident rather than springy. */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ────────────────────────────────────────────────────────────────────────
   Motion primitives
   Every variant below exists to stage hierarchy: the reader should meet the
   message, then the proof, in that order, rather than all at once.
   ──────────────────────────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const riseIn = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Eyebrow above a section heading. Used at most twice on the page. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      {children}
    </p>
  );
}

export default function UmbrellaHomepage() {
  const reduce = useReducedMotion();
  const [scanState, setScanState] = useState<{
    isScanning: boolean;
    scanId: string | null;
    isDemo: boolean;
    token: string | null;
  }>({ isScanning: false, scanId: null, isDemo: false, token: null });

  /* Scroll-linked rule in the evidence section. Motivated: it reports how far
     through the evidence sequence the reader is, which a static divider cannot.
     Driven by useScroll, never a scroll event listener. */
  const evidenceRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: evidenceRef,
    offset: ["start end", "end start"],
  });
  const ruleScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleScan = async (url: string, industry: string) => {
    setScanState({ isScanning: true, scanId: null, isDemo: false, token: null });
    try {
      const res = await fetch("/api/funnel/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: url }),
      });
      if (!res.ok) throw new Error("Failed to scan");
      const { scanId, scanToken, isDemo } = await res.json();
      // Held in state and passed to EngineContainer directly. Reading it back
      // from sessionStorage raced the container's first fetch, producing a
      // wasted 401 before the retry succeeded. Still persisted so a reload
      // inside the same tab can resume the scan.
      if (scanToken) sessionStorage.setItem("scrutexity_scan_token", scanToken);
      setScanState({ isScanning: false, scanId, isDemo, token: scanToken ?? null });
      trackEvent("demo_scan_complete", { url, industry });
    } catch (error) {
      console.error("Scan initialization failed:", error);
      setScanState({ isScanning: false, scanId: null, isDemo: false, token: null });
    }
  };

  const outcomes = [
    {
      term: "Exposure",
      copy: "The claims your public pages make that your evidence does not currently support.",
    },
    {
      term: "Wording",
      copy: "Replacement language that keeps the commercial point and drops the regulatory risk.",
    },
    {
      term: "Record",
      copy: "A dated, hash-chained record of what the page said and when it changed.",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-paper text-ink font-sans">
      {/* ═══ 1. Hero — asymmetric split ═══════════════════════════════════
          Message left, live product right. The right column is the real scan
          engine, not a mock: the strongest available proof is the thing
          itself working. */}
      <section className="relative border-b border-hairline">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-20 pb-20 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:pt-24 lg:pb-28">
          <motion.div
            variants={reduce ? undefined : stagger}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
          >
            <motion.div variants={reduce ? undefined : riseIn}>
              <Eyebrow>Claim evidence intelligence</Eyebrow>
            </motion.div>

            <motion.h1
              variants={reduce ? undefined : riseIn}
              className="font-display mt-5 max-w-[15ch] text-4xl font-medium text-ink sm:text-5xl lg:text-6xl"
            >
              Keep your clients&rsquo; claims{" "}
              <span className="text-accent">defensible</span>.
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : riseIn}
              className="mt-6 max-w-[52ch] text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              We review public marketing claims and AI answers, flag what the
              evidence does not support, and return safer wording.
            </motion.p>

            <motion.div
              variants={reduce ? undefined : riseIn}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                href={SNAPSHOT_URL}
                onClick={() =>
                  trackEvent("cta_click", { cta_label: PRIMARY_CTA, section: "hero" })
                }
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-paper transition-[background-color,transform] duration-300 hover:bg-accent-bright active:scale-[0.98]"
              >
                {PRIMARY_CTA}
                <ArrowRight size={15} aria-hidden className="btn-arrow" />
              </Link>

              <Link
                href="/sample-report"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-hairline decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent"
              >
                See a sample report
                <ArrowUpRight size={15} aria-hidden className="btn-arrow" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Real product, framed as an instrument panel. */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="rounded-xl border border-hairline bg-raised p-4 shadow-[var(--shadow-card)] sm:p-6"
          >
            <LiveDemoEngine onScan={handleScan} isScanning={scanState.isScanning} />
            {scanState.scanId && (
              <div className="mt-4">
                <EngineContainer
                  scanId={scanState.scanId}
                  isDemo={scanState.isDemo}
                  token={scanState.token}
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. Scope band — a single hairline strip, not a card row ═══════ */}
      <section className="border-b border-hairline bg-paper-light">
        <div className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8">
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.14em] text-muted uppercase">
            Public pages only. Source linked. Not legal advice.
          </p>
        </div>
      </section>

      {/* ═══ 3. What a review returns — asymmetric definition list ═════════
          Sticky heading left, content right. Replaces the three equal cards. */}
      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:py-32">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The deliverable</Eyebrow>
            <h2 className="font-display mt-5 text-3xl font-medium text-ink sm:text-4xl">
              What a review returns.
            </h2>
          </div>

          <motion.dl
            variants={reduce ? undefined : stagger}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline"
          >
            {outcomes.map((item) => (
              <motion.div
                key={item.term}
                variants={reduce ? undefined : riseIn}
                className="group bg-paper p-8 transition-colors duration-300 hover:bg-paper-light sm:p-10"
              >
                <dt className="font-display text-xl font-medium text-ink sm:text-2xl">
                  {item.term}
                </dt>
                <dd className="mt-3 max-w-[56ch] text-base leading-relaxed text-muted">
                  {item.copy}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>

      <CounselAdvisory />

      {/* ═══ 4. Claim drift ═══════════════════════════════════════════════
          ClaimDriftTimeline renders its own heading, so this section
          contributes only the scroll-linked rule. Adding a heading here would
          stack two headings, which is what shipped previously. */}
      <section ref={evidenceRef} className="relative border-b border-hairline py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="h-px w-full bg-hairline">
            <motion.div
              style={reduce ? undefined : { scaleX: ruleScale }}
              className="h-px w-full origin-left bg-accent"
            />
          </div>
        </div>
        <div className="mt-16">
          <ClaimDriftTimeline />
        </div>
      </section>

      {/* ═══ 5. Artifacts — component owns its own heading ════════════════ */}
      <section className="border-b border-hairline bg-paper-light py-24 lg:py-32">
        <ProofArtifactShelf />
      </section>

      {/* ═══ 6. Closing — full-bleed band, distinct from the hero ═════════ */}
      <section id="snapshot" className="px-5 py-28 sm:px-8 lg:py-36">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto flex max-w-[1400px] flex-col gap-8 border-t border-hairline pt-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <h2 className="font-display max-w-[18ch] text-3xl font-medium text-ink sm:text-4xl lg:text-5xl">
            See what your site is claiming today.
          </h2>

          <Link
            href={SNAPSHOT_URL}
            onClick={() =>
              trackEvent("cta_click", { cta_label: PRIMARY_CTA, section: "final-cta" })
            }
            className="group inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-accent px-8 text-sm font-semibold text-paper transition-[background-color,transform] duration-300 hover:bg-accent-bright active:scale-[0.98] lg:self-auto"
          >
            {PRIMARY_CTA}
            <ArrowRight size={15} aria-hidden className="btn-arrow" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
