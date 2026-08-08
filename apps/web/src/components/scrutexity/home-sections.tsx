"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import ScanWebGL from "@/components/scrutexity/motion/ScanWebGL";

/**
 * Sections appended below MakroRedesign.
 *
 * Deliberately narrow. MakroRedesign already renders 14 sections including
 * MakroPricing (which owns the free tier) and MakroFinalCTA, so the bento
 * grid and "Free scanner" CTA from the layout blueprint are omitted: adding
 * them would stack a third closing CTA and duplicate the workflow that
 * MakroFeatureTabs already covers.
 *
 * Only the WebGL engine panel is genuinely new.
 */

/** Mounts children only while on screen. WebGL holds a GPU context for as long
 *  as it lives, so an always-mounted canvas drains battery on every page view.
 *  Unmounting releases the context; CSS hiding would not. */
function useOnScreen<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true); // no observer support: degrade to always-on
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

type Health = "checking" | "ok" | "degraded" | "unreachable";

/**
 * Reports what /api/health actually returns. Never asserts "live".
 *
 * scrutexity-api currently reports database: "error", so this reads degraded.
 * That is correct: a green light over a broken database is exactly the gap
 * between claim and evidence this product exists to document. It will flip to
 * operational on its own once the backend env is corrected, with no code change.
 */
function EngineStatus() {
  const [state, setState] = useState<Health>("checking");

  useEffect(() => {
    let alive = true;
    fetch("/api/health")
      .then((r) => (r.ok ? r.json() : r.json().catch(() => ({}))))
      .then((d) => {
        if (!alive) return;
        setState(d?.services?.database === "ok" || d?.database === "ok" ? "ok" : "degraded");
      })
      .catch(() => {
        if (alive) setState("unreachable");
      });
    return () => {
      alive = false;
    };
  }, []);

  const copy: Record<Health, string> = {
    checking: "Checking engine status",
    ok: "Engine operational",
    degraded: "Engine reachable, analysis unavailable",
    unreachable: "Engine unreachable",
  };

  return (
    <GlassCard floating className="absolute bottom-6 left-6 z-10 px-4 py-3">
      <span className="flex items-center gap-2 text-sm font-medium text-ink">
        <span
          aria-hidden
          className={`h-2 w-2 rounded-full ${state === "ok" ? "bg-accent" : "bg-muted"}`}
        />
        {copy[state]}
      </span>
    </GlassCard>
  );
}

export function HomeSections() {
  const { ref, visible } = useOnScreen<HTMLDivElement>();

  return (
    <div className="bg-paper text-ink">
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-12">
        <div ref={ref}>
          <GlassCard className="relative aspect-video w-full overflow-hidden p-0">
            <div className="absolute inset-0 z-0">{visible && <ScanWebGL />}</div>
            <EngineStatus />
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

export default HomeSections;
