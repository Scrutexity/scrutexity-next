"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The site's single call-to-action shape.
 *
 * Signature: a pill containing a circular arrow badge on the left and the
 * label to its right. Two weights only:
 *
 *   primary   black pill, lime arrow badge, light label   (one per view)
 *   secondary light pill, muted arrow badge, ink label
 *
 * The lime lives inside the badge rather than filling the button. A fully
 * lime button at this size overwhelms the page and forces dark text at a size
 * where it reads as a warning. Confining it to a 32px disc keeps the accent
 * rationed, which is what the reference does.
 *
 * Every CTA on the site should use this. Divergent one-off buttons are what
 * made the previous pass read as generic.
 */

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Full width inside a card. */
  block?: boolean;
  onClick?: () => void;
  className?: string;
};

export function ActionPill({
  href,
  children,
  variant = "primary",
  block = false,
  onClick,
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const primary = variant === "primary";

  const shell = primary
    ? "bg-ink text-paper-light"
    : "bg-raised text-ink border border-hairline";

  const badge = primary
    ? "bg-accent text-on-accent"
    : "bg-paper text-ink border border-hairline";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex min-h-14 items-center gap-3 rounded-full p-2 pr-6 text-[15px] font-medium transition-colors duration-300 ${shell} ${
        block ? "w-full justify-start" : ""
      } ${className}`}
    >
      <motion.span
        aria-hidden
        whileHover={reduce ? undefined : { rotate: -45 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${badge}`}
      >
        <ArrowRight size={17} />
      </motion.span>
      <span className={block ? "flex-1 text-center pr-10" : ""}>{children}</span>
    </Link>
  );
}

export default ActionPill;
