'use client';
import React from 'react';
import Link from 'next/link';

interface GovButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  /** 'gold' = primary dark pill (default) · 'outline' = secondary ghost pill */
  variant?: 'gold' | 'outline';
  /** show the animated trailing arrow (default true) */
  arrow?: boolean;
}

/**
 * Unified primary/secondary button.
 * - gold  → `.clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all`  (premium dark pill with hover shine)
 * - outline → `.btn-ghost`
 * Size defaults to `btn-md` unless the caller passes an explicit btn-sm/md/lg
 * or its own padding utilities. The trailing arrow nudges right on hover.
 */
export default function GovButton({
  label,
  onClick,
  href,
  className = '',
  children,
  variant = 'gold',
  arrow = true,
}: GovButtonProps) {
  // Strip a stray trailing arrow glyph from labels so we never double up.
  const content =
    children ??
    (typeof label === 'string' ? label.replace(/\s*[→↗➔➜]\s*$/u, '') : label);

  const hasSize = /\bbtn-(sm|md|lg)\b/.test(className);
  const hasPad = /\b(p[xy]?-)\d/.test(className);
  const sizeClass = hasSize || hasPad ? '' : 'btn-md';

  const variantClass = variant === 'gold' ? 'clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all' : 'btn-ghost';
  const classes = `group ${variantClass} ${sizeClass} ${className}`.replace(/\s+/g, ' ').trim();

  const inner = (
    <span className="relative z-10 flex items-center gap-2">
      {content}
      {arrow && (
        <svg
          className="btn-arrow h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
