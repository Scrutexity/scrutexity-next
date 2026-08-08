import { createElement } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * GlassCard — the Makro panel surface.
 *
 * Reconciles two concurrently-written versions. One had `tone`
 * ('paper' | 'sage', mapping to the .paper-glass utilities in globals.css);
 * the other had `floating` (translucent fill for stacked layouts) and `as`
 * (polymorphic element). Both were in use, and each overwrite silently broke
 * the other's call sites. This supports all three so neither loses.
 *
 * Tones use the locked .paper-glass utilities, which carry their own
 * backdrop blur, hairline border, tinted shadow, and a solid fallback under
 * prefers-reduced-transparency. `floating` is the lighter translucent variant
 * for panels stacked over another card, where the layer beneath should read
 * through.
 *
 * No hardcoded colour: everything resolves through tokens, so a palette change
 * in globals.css carries through without touching this file.
 */

export type GlassTone = "paper" | "sage";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Surface treatment. 'sage' is the accent-tinted glass. */
  tone?: GlassTone;
  /** Translucent fill for panels stacked over another surface. */
  floating?: boolean;
  /** Render as a different element, e.g. "article" or "li". */
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function GlassCard({
  children,
  className = "",
  tone = "paper",
  floating = false,
  as: Tag = "div",
  ...rest
}: GlassCardProps) {
  const surface = floating
    ? "bg-raised/92 backdrop-blur-[2px] border border-hairline"
    : tone === "sage"
      ? "paper-glass-sage"
      : "paper-glass";

  // createElement rather than <Tag />: a polymorphic `as` combined with a
  // props spread makes TS collapse the children prop to `never`. This keeps
  // the component genuinely polymorphic without casting the props away.
  return createElement(
    Tag,
    {
      className: `relative overflow-hidden rounded-2xl ${surface} ${className}`,
      ...rest,
    },
    children
  );
}

export default GlassCard;
