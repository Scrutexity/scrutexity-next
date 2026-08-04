"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/utils/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const PRESET_QUERIES = [
  "Is [Clinic] GLP-1 weight loss verified?",
  "Does [Clinic] guarantee results?",
  "Is [Clinic]'s treatment FDA approved?",
];

type SimulatedAnswer = {
  intro: string;
  flags: { label: string; text: string }[];
  verdict: "reviewed" | "warning";
};

function simulateAnswer(query: string): SimulatedAnswer {
  const q = query.toLowerCase();
  const flags: { label: string; text: string }[] = [];

  if (q.includes("glp-1") || q.includes("weight loss") || q.includes("semaglutide")) {
    flags.push({
      label: "Outcome claim",
      text: "Page states numeric weight-loss outcomes without visible cohort data or protocol citation.",
    });
  }
  if (q.includes("guarantee") || q.includes("results")) {
    flags.push({
      label: "Guarantee language",
      text: "Guaranteed outcome language found; no documented basis published on the reviewed surface.",
    });
  }
  if (q.includes("fda") || q.includes("approved") || q.includes("cleared")) {
    flags.push({
      label: "FDA-status wording",
      text: "FDA-status language present; cleared vs approved distinction not verifiable on the page.",
    });
  }
  if (flags.length === 0) {
    flags.push({
      label: "Proof gap",
      text: "Key treatment claims lack visible supporting evidence on the reviewed public surface.",
    });
  }

  return {
    intro:
      "Based on the clinic's public pages, several treatment claims appear without visible supporting evidence. Prospective patients may see these statements repeated by AI assistants without the necessary context.",
    flags,
    verdict: "warning",
  };
}

export function AIAnswerRealityPreview() {
  const [query, setQuery] = useState(PRESET_QUERIES[0]);
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState<SimulatedAnswer | null>(null);

  const run = () => {
    setSubmitted(true);
    setAnswer(simulateAnswer(query));
  };

  return (
    <section className="border-t border-sand-deep/15 bg-bone/50 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-2xl mx-auto">
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-sage-deep font-semibold mb-4"
            style={{ fontFamily: MONO_STACK }}
          >
            AI Answer Reality Preview
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
            What do AI assistants tell patients about{" "}
            <span className="italic text-sage-deep">your claims?</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-mist leading-relaxed">
            AI answer engines synthesize your public pages. Unsupported claims can be repeated without
            context. Preview how a simulated review surfaces proof gaps.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-sand-deep/30 bg-cream p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSubmitted(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && run()}
                placeholder="Ask how AI might describe a clinic claim..."
                className="w-full bg-bone/60 border border-sand-deep/40 rounded-xl pl-10 pr-4 py-3 text-sm text-espresso placeholder-mist/60 outline-none focus:border-sage-deep/50 transition-colors"
              />
            </div>
            <button
              onClick={run}
              className="shrink-0 group inline-flex items-center justify-center gap-2 px-6 py-3 bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm hover:-translate-y-0.5 shadow-lg"
            >
              Preview AI Answer Reality
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {PRESET_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuery(q);
                  setSubmitted(false);
                  setAnswer(null);
                }}
                className={`text-[10px] font-mono px-3 py-1.5 rounded-full border transition-colors ${
                  query === q
                    ? "border-sage-deep/60 text-sage-deep bg-sage/10"
                    : "border-sand-deep/30 text-mist hover:text-espresso hover:border-sand-deep/50"
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {submitted && answer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-6 rounded-xl border border-clay/25 bg-bone/60 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-clay/10 border border-clay/25 flex items-center justify-center shrink-0">
                    <AlertTriangle size={15} className="text-clay" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-clay font-semibold mb-1" style={{ fontFamily: MONO_STACK }}>
                      Simulated AI summary · {answer.verdict === "warning" ? "Proof gaps surfaced" : "Reviewed"}
                    </p>
                    <p className="text-sm text-mist leading-relaxed">{answer.intro}</p>
                    <div className="mt-4 space-y-2">
                      {answer.flags.map((f) => (
                        <div key={f.label} className="flex items-start gap-2">
                          <Sparkles size={13} className="text-sage-deep mt-0.5 shrink-0" />
                          <p className="text-xs text-espresso/80 leading-relaxed">
                            <span className="font-semibold">{f.label}:</span> {f.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-sand-deep/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-xs text-mist leading-snug">
                    A real review checks what AI engines currently say about your live pages — and what
                    support exists behind each claim.
                  </p>
                  <Link
                    href="https://auditgpt.ai/snapshot?source=home-ai-preview"
                    onClick={() =>
                      trackEvent?.("cta_click", {
                        cta_label: "Run Real AI Answer Reality Check",
                        destination: "https://auditgpt.ai/snapshot?source=home-ai-preview",
                        section: "ai-answer-reality-preview",
                      })
                    }
                    className="shrink-0 group inline-flex items-center gap-2 px-5 py-2.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-xs"
                  >
                    Run a real check
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!submitted && (
            <div className="mt-6 flex items-center gap-2 text-xs text-mist/70" style={{ fontFamily: MONO_STACK }}>
              <ShieldCheck size={14} className="text-sage-deep" />
              Simulated preview for demonstration. A real audit runs against your live public pages.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
