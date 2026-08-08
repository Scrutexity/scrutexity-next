import { createElement } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * GlassCard — the Makro panel surface.
 *
 * A white panel stacked over the #EBEFF5 canvas. The depth comes from a
 * two-part shadow, not from a border: a 1px contact shadow that seats the card
 * on the page, plus a wide, heavily negative-spread ambient shadow that lifts
 * it. Both are tinted to the canvas hue (20 20 45) rather than pure black,
 * which is what keeps it from looking like a generic Tailwind card.
 *
 * `floating` renders the translucent variant used in stacked compositions,
 * where cards overlap and the canvas needs to read through them.
 *
 * Colours come from tokens only. Nothing here hardcodes a hex, so a palette
 * change in globals.css carries through automatically.
 */

const BASE =
  "rounded-[20px] border border-hairline shadow-[0_1px_2px_rgb(20_20_45/0.05),0_18px_44px_-18px_rgb(20_20_45/0.16)]";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Translucent fill for overlapping/stacked layouts. */
  floating?: boolean;
  /** Render as a different element, e.g. "article" or "li". */
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function GlassCard({
  children,
  className = "",
  floating = false,
  as: Tag = "div",
  ...rest
}: GlassCardProps) {
  const surface = floating
    ? "bg-raised/92 backdrop-blur-[2px]"
    : "bg-raised";

  // createElement rather than <Tag />: a polymorphic `as` combined with a
  // props spread makes TS collapse the children prop to `never`. This keeps
  // the component genuinely polymorphic without casting the props away.
  return createElement(
    Tag,
    { className: `${surface} ${BASE} ${className}`, ...rest },
    children
  );
}

export default GlassCard;
