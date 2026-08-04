"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, AlertTriangle, ShieldCheck, Sparkles, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/utils/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const PRESET_QUERIES = [
  "Is [Clinic] GLP-1 weight loss verified?",
  "Does [Clinic] guarantee Morpheus8 results?",
  "Is [Clinic]'s exosome therapy FDA approved?",
];

const AI_ENGINES = [
  { id: "perplexity", name: "Perplexity Pro", icon: "⚡" },
  { id: "chatgpt", name: "ChatGPT 5.0", icon: "🧠" },
  { id: "searchgpt", name: "Google SearchGPT", icon: "🔍" },
];

type SimulatedAnswer = {
  intro: string;
  flags: { label: string; text: string }[];
  verdict: "reviewed" | "warning";
  hash: string;
};

function simulateAnswer(query: string, engine: string): SimulatedAnswer {
  const q = query.toLowerCase();
  const flags: { label: string; text: string }[] = [];

  if (q.includes("glp-1") || q.includes("weight loss") || q.includes("semaglutide")) {
    flags.push({
      label: "Outcome claim",
      text: "Page states numeric weight-loss outcomes without visible cohort data or protocol citation.",
    });
  }
  if (q.includes("guarantee") || q.includes("morpheus") || q.includes("results")) {
    flags.push({
      label: "Guarantee language",
      text: "Guaranteed outcome language found; no documented basis published on the reviewed surface.",
    });
  }
  if (q.includes("exosome") || q.includes("fda") || q.includes("approved")) {
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
    intro: `Based on public indexing via ${engine}, several treatment claims appear without visible supporting evidence. AI answer engines synthesize these pages directly for prospective patients.`,
    flags,
    verdict: "warning",
    hash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  };
}

export function AIAnswerRealityPreview() {
  const [query, setQuery] = useState(PRESET_QUERIES[0]);
  const [selectedEngine, setSelectedEngine] = useState(AI_ENGINES[0].name);
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState<SimulatedAnswer | null>(null);

  const run = () => {
    setSubmitted(true);
    setAnswer(simulateAnswer(query, selectedEngine));
  };

  return (
    <section className="relative border-t border-sand-deep/15 bg-cream/70 backdrop-blur-md px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(94,122,90,0.06),transparent_70%)] pointer-events-none" />
      
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-deep/10 border border-sage-deep/20 text-[10px] uppercase tracking-[0.2em] text-sage-deep font-semibold mb-4"
            style={{ fontFamily: MONO_STACK }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage-deep animate-ping" />
            AI Search Perception Ingress · 2027 Preview
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-espresso tracking-[-0.02em] leading-[1.08]">
            What do AI search engines tell patients about{" "}
            <span className="italic text-sage-deep">your claims?</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-mist leading-relaxed">
            AI answer engines actively synthesize public landing pages. Unsupported claims are flagged or repeated without clinical context. Preview how an automated review surfaces proof gaps.
          </p>
        </div>

        {/* Card Container */}
        <div className="mt-12 rounded-3xl border border-sand-deep/40 bg-cream-deep/90 p-6 md:p-10 shadow-[0_16px_48px_-16px_rgba(28,24,20,0.08)] backdrop-blur-lg">
          {/* Engine Selector */}
          <div className="flex items-center justify-between gap-2 pb-6 mb-6 border-b border-sand-deep/25 overflow-x-auto">
            <div className="flex items-center gap-2">
              <Cpu size={15} className="text-sage-deep" />
              <span className="text-xs font-mono uppercase tracking-wider text-espresso/70">Engine Target:</span>
            </div>
            <div className="flex items-center gap-2">
              {AI_ENGINES.map((eng) => (
                <button
                  key={eng.id}
                  onClick={() => {
                    setSelectedEngine(eng.name);
                    if (submitted) setAnswer(simulateAnswer(query, eng.name));
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    selectedEngine === eng.name
                      ? "bg-espresso text-cream shadow-md"
                      : "bg-bone/80 text-mist hover:text-espresso hover:bg-bone"
                  }`}
                >
                  <span>{eng.icon}</span>
                  <span>{eng.name}</span>
                </button>
              ))}
            </div>
          </div>

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
                className="w-full bg-bone/70 border border-sand-deep/40 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-espresso placeholder-mist/60 outline-none focus:border-sage-deep/50 focus:bg-cream transition-colors shadow-inner"
              />
            </div>
            <button
              onClick={run}
              className="shrink-0 group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-2xl transition-all duration-300 text-sm shadow-[0_8px_24px_-6px_rgba(94,122,90,0.4)] hover:shadow-xl"
            >
              Preview AI Perception
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
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
                className={`text-[10px] font-mono px-3.5 py-1.5 rounded-full border transition-all ${
                  query === q
                    ? "border-sage-deep text-sage-deep bg-sage/10 font-semibold"
                    : "border-sand-deep/30 text-mist hover:text-espresso hover:border-sand-deep/60 bg-bone/40"
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {submitted && answer && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-8 rounded-2xl border border-clay/30 bg-bone/80 p-6 md:p-8 backdrop-blur-md shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-clay/10 border border-clay/30 flex items-center justify-center shrink-0">
                    <AlertTriangle size={18} className="text-clay" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] text-clay font-bold"
                        style={{ fontFamily: MONO_STACK }}
                      >
                        Simulated AI Output · {selectedEngine}
                      </span>
                      <span
                        className="text-[9px] font-mono text-mist/60 bg-cream/60 px-2 py-0.5 rounded border border-sand-deep/20"
                      >
                        {answer.hash.slice(0, 24)}...
                      </span>
                    </div>
                    <p className="text-sm text-espresso leading-relaxed font-sans">{answer.intro}</p>
                    <div className="mt-5 space-y-3">
                      {answer.flags.map((f) => (
                        <div key={f.label} className="flex items-start gap-3 bg-cream/70 p-3.5 rounded-xl border border-sand-deep/20">
                          <Sparkles size={14} className="text-sage-deep mt-0.5 shrink-0" />
                          <p className="text-xs text-espresso/90 leading-relaxed">
                            <span className="font-semibold text-espresso">{f.label}:</span> {f.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-sand-deep/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-mist leading-relaxed">
                    A real AuditGPT review checks live public pages against visible evidence and produces timestamped SHA-256 evidence records.
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
                    className="shrink-0 group inline-flex items-center gap-2 px-6 py-3 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-xs shadow-md"
                  >
                    Run live audit check
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!submitted && (
            <div className="mt-6 flex items-center justify-between flex-wrap gap-2 text-xs text-mist/70 pt-4 border-t border-sand-deep/15" style={{ fontFamily: MONO_STACK }}>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-sage-deep" />
                Simulated preview for demonstration. A real audit runs against live public pages.
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-mist/50">
                <Layers size={12} />
                SHA-256 Evidence Mapping Active
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
