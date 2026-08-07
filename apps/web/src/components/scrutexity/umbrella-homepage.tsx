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
import { InstantPreview } from "@/components/scrutexity/motion/instant-preview";

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
      {/* ═══ 1. Hero — centred statement over a live instrument ═══════════
          The value has to land before the fold. Rather than describing the
          product beside a form, the page states the question at display scale
          and puts a working read of the visitor's own page directly beneath
          it. Everything below the input is generated from their site. */}
      <section className="relative border-b border-hairline">
        <div className="mx-auto max-w-[1200px] px-5 pt-16 pb-20 sm:px-8 lg:pt-20 lg:pb-28">
          <motion.div
            variants={reduce ? undefined : stagger}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={reduce ? undefined : riseIn}>
              <Eyebrow>Claim evidence intelligence</Eyebrow>
            </motion.div>

            <motion.h1
              variants={reduce ? undefined : riseIn}
              className="font-display mx-auto mt-6 max-w-[16ch] text-[2.75rem] font-medium leading-[0.98] text-ink sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            >
              See what your site is{" "}
              <span className="text-accent-text">actually claiming</span>.
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : riseIn}
              className="mx-auto mt-7 max-w-[54ch] text-lg leading-relaxed text-ink-soft sm:text-xl"
            >
              Paste your address. We read the page and quote back the exact
              language a reviewer would stop on.
            </motion.p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
            className="mx-auto mt-12 max-w-4xl"
          >
            <InstantPreview />
          </motion.div>

          {/* Boundary notice, promoted out of footer small print. For a
              regulated buyer the stated limits are part of the credibility. */}
          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            className="boundary-note mx-auto mt-8 max-w-4xl px-7 py-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-text">
              Scope of this instrument
            </p>
            <p className="mt-3 max-w-[78ch] text-sm leading-relaxed text-ink-soft">
              Designed as an operating risk screen over public pages. It reports
              observed language and the evidence visible alongside it. It is not
              a determination of accuracy or compliance, and not a substitute
              for counsel.
            </p>
          </motion.aside>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            <Link
              href={SNAPSHOT_URL}
              onClick={() =>
                trackEvent("cta_click", { cta_label: PRIMARY_CTA, section: "hero" })
              }
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-hairline decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent"
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
        </div>
      </section>

      {/* ═══ 1b. Full engine, below the instant read ══════════════════════ */}
      <section className="border-b border-hairline bg-paper-light">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <LiveDemoEngine onScan={handleScan} isScanning={scanState.isScanning} />
          {scanState.scanId && (
            <div className="mt-6">
              <EngineContainer
                scanId={scanState.scanId}
                isDemo={scanState.isDemo}
                token={scanState.token}
              />
            </div>
          )}
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
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-32 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24 lg:py-44">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The deliverable</Eyebrow>
            <h2 className="font-display mt-5 text-3xl font-medium text-ink sm:text-4xl">
              What a review returns.
            </h2>
          </div>

          {/* Set as an index rather than a card row: rigid left-justified
              grid, hairline rules, term and definition on a shared baseline.
              A table of contents reads as authored; three equal cards read as
              a template. */}
          <motion.dl
            variants={reduce ? undefined : stagger}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.25 }}
            className="border-t border-hairline"
          >
            {outcomes.map((item) => (
              <motion.div
                key={item.term}
                variants={reduce ? undefined : riseIn}
                className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-hairline py-10 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:py-12"
              >
                <dt className="font-display text-xl font-medium tracking-tight text-accent-text sm:text-2xl">
                  {item.term}
                </dt>
                <dd className="max-w-[62ch] text-base leading-relaxed text-ink-soft sm:text-lg">
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
      <section ref={evidenceRef} className="relative border-b border-hairline py-32 lg:py-44">
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
      <section className="border-b border-hairline bg-paper-light py-32 lg:py-44">
        <ProofArtifactShelf />
      </section>

      {/* ═══ 6. Closing — full-bleed band, distinct from the hero ═════════ */}
      <section id="snapshot" className="px-5 py-36 sm:px-8 lg:py-48">
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
            className="group inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-accent px-8 text-sm font-semibold text-on-accent transition-[background-color,transform] duration-300 hover:bg-accent-bright active:scale-[0.98] lg:self-auto"
          >
            {PRIMARY_CTA}
            <ArrowRight size={15} aria-hidden className="btn-arrow" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
