"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * The site's single call-to-action shape.
 *
 * Signature: a pill containing a circular arrow badge on the LEFT and the
 * label centred beside it. Badge position is not cosmetic; it is the Makro
 * anatomy, and flipping it to the right reads as a different product.
 *
 * Two weights only:
 *   primary   black pill, lime arrow badge, light label   (one per view)
 *   secondary light pill, muted arrow badge, ink label
 *
 * The lime lives inside the badge rather than filling the button. A fully
 * lime button at this size overwhelms the page and forces dark text at a size
 * where it reads as a warning, which is exactly what the reference avoids.
 *
 * POLYMORPHISM: renders a Link when `href` is given and a <button> when it is
 * not. This matters because several CTAs are form submits: the scanner's
 * "Show me" is a <button type="submit"> inside a <form>, and swapping it for a
 * Link would break submission silently while still looking correct.
 */

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Full width inside a card. */
  block?: boolean;
  className?: string;
};

/** Navigation: requires href, forbids button-only props. */
type LinkProps = BaseProps & {
  href: string;
  type?: never;
  disabled?: never;
  onClick?: () => void;
};

/** Action: no href, accepts native button attributes. */
type ButtonProps = BaseProps & {
  href?: never;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: () => void;
};

type Props = LinkProps | ButtonProps;

export function ActionPill(props: Props) {
  const {
    children,
    variant = "primary",
    block = false,
    className = "",
    onClick,
  } = props;

  const reduce = useReducedMotion();
  const primary = variant === "primary";

  const shell = primary
    ? "bg-ink text-paper-light"
    : "bg-raised text-ink border border-hairline";

  const badge = primary
    ? "bg-accent text-on-accent"
    : "bg-paper text-ink border border-hairline";

  const shape = `group inline-flex min-h-14 items-center gap-3 rounded-full p-2 pr-6 text-[15px] font-medium transition-colors duration-300 disabled:opacity-60 ${shell} ${
    block ? "w-full justify-start" : ""
  } ${className}`;

  const content = (
    <>
      <motion.span
        aria-hidden
        whileHover={reduce ? undefined : { rotate: -45 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${badge}`}
      >
        <ArrowRight size={17} />
      </motion.span>
      <span className={block ? "flex-1 text-center pr-10" : ""}>{children}</span>
    </>
  );

  // Discriminated on href, so TypeScript rejects `type="submit"` on a Link and
  // `href` on a button at the call site, with no casts on either branch.
  if (props.href !== undefined) {
    return (
      <Link href={props.href} onClick={onClick} className={shape}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={onClick}
      className={shape}
    >
      {content}
    </button>
  );
}

export default ActionPill;
