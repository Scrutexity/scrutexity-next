/**
 * Status — evidence-state semantics + presentation metadata.
 *
 * Status is always rendered with color + label (+ icon at the call site), so
 * meaning never depends on color alone. Only confirmed @theme tokens are used;
 * burgundy (#6b1d2f) is the documented "rare deep accent" for true high risk,
 * applied as an arbitrary hex so it never silently renders as an undefined token.
 */

import type { Status, CoverageLevel } from './types';

export const STATUS_META: Record<
  Status,
  { label: string; dot: string; text: string; bg: string; border: string; hex: string }
> = {
  supported: {
    label: 'Supported',
    dot: 'bg-sage-deep',
    text: 'text-sage-deep',
    bg: 'bg-sage/10',
    border: 'border-sage/30',
    hex: '#5E7A5A',
  },
  weak: {
    label: 'Weak evidence',
    dot: 'bg-clay',
    text: 'text-clay-deep',
    bg: 'bg-clay/10',
    border: 'border-clay/30',
    hex: '#B7896B',
  },
  unsupported: {
    label: 'Unsupported',
    dot: 'bg-[#6b1d2f]',
    text: 'text-[#6b1d2f]',
    bg: 'bg-[#6b1d2f]/8',
    border: 'border-[#6b1d2f]/25',
    hex: '#6b1d2f',
  },
};

/** Coverage matrix cells share the status palette. */
export const COVERAGE_TO_STATUS: Record<CoverageLevel, Status> = {
  covered: 'supported',
  weak: 'weak',
  missing: 'unsupported',
};

export const COVERAGE_LABEL: Record<CoverageLevel, string> = {
  covered: 'Covered',
  weak: 'Weak',
  missing: 'Missing',
};
