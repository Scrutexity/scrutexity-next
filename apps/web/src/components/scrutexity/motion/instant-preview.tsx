"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

const EASE = [0.22, 1, 0.36, 1] as const;

type Finding = {
  category: string;
  label: string;
  why: string;
  match: string;
  context: string;
};

type Preview = {
  host: string;
  title: string | null;
  retrievedAt: string;
  charsAnalysed: number;
  contentSha256: string;
  findings: Finding[];
  scope: string;
};

/**
 * Instant claim surface preview.
 *
 * Pointer motion is driven entirely by motion values. Using useState for
 * pointer position re-renders the tree on every mousemove and collapses on
 * touch devices, so cursor position feeds springs directly and React never
 * re-renders during movement.
 */
export function InstantPreview() {
  const reduce = useReducedMotion();
  const shellRef = useRef<HTMLDivElement>(null);

  const [url, setUrl] = useState("");
  const [state, setState] = useState<
    { status: "idle" } | { status: "loading" } | { status: "error"; message: string } | { status: "done"; data: Preview }
  >({ status: "idle" });

  // Raw pointer position, normalized to -0.5..0.5 around the shell centre.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.6 });

  // Parallax layers move at different rates, which is what reads as depth.
  const glowX = useTransform(sx, (v) => v * 90);
  const glowY = useTransform(sy, (v) => v * 90);
  const tiltX = useTransform(sy, (v) => v * -6);
  const tiltY = useTransform(sx, (v) => v * 6);
  const gridX = useTransform(sx, (v) => v * -26);
  const gridY = useTransform(sy, (v) => v * -26);

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !shellRef.current) return;
    const r = shellRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const resetPointer = () => {
    px.set(0);
    py.set(0);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = url.trim();
    if (!value || state.status === "loading") return;

    setState({ status: "loading" });
    try {
      const res = await fetch("/api/funnel/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "We could not read that page." });
        return;
      }
      setState({ status: "done", data });
      trackEvent("instant_preview_complete", {
        host: data.host,
        findings: data.findings.length,
      });
    } catch {
      setState({
        status: "error",
        message: "We could not reach that page. Nothing was analysed.",
      });
    }
  };

  return (
    <div
      ref={shellRef}
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
      className="relative isolate overflow-hidden rounded-[3px] border border-accent/40 bg-paper-light"
    >
      {/* Depth layer 1: drifting grid */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: gridX, y: gridY }}
        className="pointer-events-none absolute -inset-24 -z-10 opacity-[0.35] [background-image:linear-gradient(var(--color-hairline)_1px,transparent_1px),linear-gradient(90deg,var(--color-hairline)_1px,transparent_1px)] [background-size:56px_56px]"
      />
      {/* Depth layer 2: accent bloom tracking the cursor */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/12 blur-[110px]"
      />

      <motion.div
        style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
        className="px-6 py-12 sm:px-12 sm:py-16"
      >
        <form onSubmit={submit} className="mx-auto max-w-2xl">
          <label
            htmlFor="preview-url"
            className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
          >
            Enter your website
          </label>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              id="preview-url"
              type="text"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourclinic.com"
              autoComplete="url"
              className="min-h-14 flex-1 rounded-full border border-hairline bg-paper px-7 font-mono text-base tracking-tight text-ink outline-none transition-colors placeholder:font-sans placeholder:tracking-normal placeholder:text-muted/60 focus-visible:border-accent"
            />
            <button
              type="submit"
              disabled={state.status === "loading"}
              className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-on-accent transition-[background-color,transform] duration-300 hover:bg-accent-bright active:scale-[0.98] disabled:opacity-60"
            >
              {state.status === "loading" ? "Reading your page…" : "Show me"}
              {state.status !== "loading" && (
                <ArrowRight size={17} aria-hidden className="btn-arrow" />
              )}
            </button>
          </div>

          <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-muted">
            Public page only. Nothing is stored until you ask us to.
          </p>
        </form>

        <AnimatePresence mode="wait">
          {state.status === "error" && (
            <motion.p
              key="error"
              role="alert"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              className="mx-auto mt-8 max-w-2xl text-sm text-exposure-red"
            >
              {state.message}
            </motion.p>
          )}

          {state.status === "done" && (
            <motion.div
              key="result"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mx-auto mt-12 max-w-3xl"
            >
              <PreviewResult data={state.data} reduce={Boolean(reduce)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function PreviewResult({ data, reduce }: { data: Preview; reduce: boolean }) {
  const count = data.findings.length;

  return (
    <div className="exhibit-frame bg-paper">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline px-6 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {data.host}
        </p>
        <p className="font-mono text-[11px] tracking-[0.1em] text-muted tnum">
          {data.charsAnalysed.toLocaleString()} characters read
        </p>
      </div>

      <div className="px-6 py-8">
        <p className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
          {count === 0 ? (
            <>No high-scrutiny phrasing found on this page.</>
          ) : (
            <>
              <span className="tnum text-accent-text">{count}</span>{" "}
              {count === 1 ? "phrase" : "phrases"} a reviewer would look at.
            </>
          )}
        </p>

        {count > 0 && (
          <ul className="mt-10 space-y-px overflow-hidden border border-hairline bg-hairline">
            {data.findings.map((f, i) => (
              <motion.li
                key={`${f.match}-${i}`}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                className="bg-paper px-5 py-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {f.label}
                </p>
                <p className="mt-2 text-lg text-ink">
                  <span className="bg-accent/15 px-1.5 py-0.5 font-medium">{f.match}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.context}</p>
                <p className="mt-3 text-xs leading-relaxed text-ink-soft">{f.why}</p>
              </motion.li>
            ))}
          </ul>
        )}

        <div className="mt-8 border-t border-hairline pt-5">
          <p className="font-mono text-[10px] leading-relaxed tracking-[0.08em] text-muted">
            SHA-256 {data.contentSha256.slice(0, 32)}…
          </p>
          <p className="mt-2 max-w-[70ch] text-xs leading-relaxed text-muted">{data.scope}</p>
        </div>
      </div>
    </div>
  );
}
