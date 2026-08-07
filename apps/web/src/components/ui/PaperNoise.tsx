import { useId } from 'react';

/**
 * PaperNoise — archival grain overlay for the Realta institutional system.
 *
 * A tiled SVG feTurbulence grain (not WebGL — same visual, zero GPU dependency,
 * SSR-safe, ~1KB) that gives the paper base the tactile feel of a high-security
 * dossier. This is the single highest-leverage "kills the cheap SaaS vibe" lever
 * from the MX brief: fixed overlay, 2-3% opacity, blend-multiply over the paper
 * background.
 *
 * Usage (mount ONCE at layout root, above the page background, below nothing):
 *   <PaperNoise opacity={0.03} />
 *
 * Design-system compliance:
 * - No new tokens: the grain is neutral; color comes from the page behind it
 * - pointer-events-none: never intercepts input
 * - mix-blend-multiply: darkens paper slightly, reads as physical stock
 * - Tiled 180px pattern (not a full-viewport turbulence rect) keeps raster cost
 *   constant regardless of viewport size
 */
export default function PaperNoise({
  opacity = 0.03,
  className = '',
}: {
  opacity?: number;
  className?: string;
}) {
  // useId keeps filter/pattern ids unique if the component is ever mounted twice
  const uid = useId().replace(/[:]/g, '');
  const filterId = `scrutexity-noise-f-${uid}`;
  const patternId = `scrutexity-noise-p-${uid}`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[1] mix-blend-multiply ${className}`}
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern
            id={patternId}
            width="180"
            height="180"
            patternUnits="userSpaceOnUse"
          >
            <rect width="180" height="180" filter={`url(#${filterId})`} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
