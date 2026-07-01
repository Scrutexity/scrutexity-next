"use client";

import type { FC } from 'react';

type MarkProps = { size?: number; className?: string };

/**
 * Brand marks for the three target PMS platforms. Filled paths read more
 * recognizably at small sizes than stroked approximations. When official
 * SVGs are licensed from each brand kit, drop them into
 * `public/integrations/{boulevard,mangomint,zenoti}.svg` and swap the
 * <path> contents here — the size/color contract stays identical.
 */

export function BoulevardMark({ size = 14, className = '' }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="#E05A47"
      className={className}
      aria-label="Boulevard"
    >
      {/* Bold "B" — two stacked rounded humps, the Boulevard silhouette */}
      <path d="M9 5h10.5a5.5 5.5 0 0 1 4 9.3 6 6 0 0 1-3 10.7H9V5zm4 3.4v5.4h6.2a2.7 2.7 0 0 0 0-5.4H13zm0 8.6v5.6h7a2.8 2.8 0 0 0 0-5.6h-7z" />
    </svg>
  );
}

export function MangomintMark({ size = 14, className = '' }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-label="Mangomint"
    >
      {/* Mango body — warm orange-gold ellipse */}
      <ellipse cx="16" cy="20" rx="9" ry="8" fill="#FF8C42" />
      {/* Leaf — mint-green flair on top-right, the signature Mangomint accent */}
      <path
        d="M16 12c0-3.5 2.5-6 6-6.5 0 3.5-2.5 6-6 6.5z"
        fill="#5E9F3F"
      />
      {/* Small highlight on the mango */}
      <circle cx="12" cy="17" r="1.2" fill="#FFD9B0" opacity="0.7" />
    </svg>
  );
}

export function ZenotiMark({ size = 14, className = '' }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="#E72E5E"
      className={className}
      aria-label="Zenoti"
    >
      {/* Filled "Z" — sharper diagonal than the stroke version */}
      <path d="M7 5.5h18v3.3l-11 14h11v3.7H6v-3.3l11-14H7V5.5z" />
    </svg>
  );
}

export type PmsBrand = {
  name: 'Boulevard' | 'Mangomint' | 'Zenoti';
  Mark: FC<MarkProps>;
  /** Brand primary color — also used for the wordmark text in the Connected-PMS list */
  color: string;
  /** Soft tint for backgrounds — bleed-through gives the chip its identity at small sizes */
  tintBg: string;
  borderColor: string;
};

export const PMS_BRANDS: PmsBrand[] = [
  { name: 'Boulevard', Mark: BoulevardMark, color: '#E05A47', tintBg: '#FCECE9', borderColor: 'rgba(224,90,71,0.45)' },
  { name: 'Mangomint', Mark: MangomintMark, color: '#FF8C42', tintBg: '#FFF1E5', borderColor: 'rgba(255,140,66,0.45)' },
  { name: 'Zenoti',    Mark: ZenotiMark,    color: '#E72E5E', tintBg: '#FCE9F0', borderColor: 'rgba(231,46,94,0.45)' },
];
