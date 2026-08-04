import PageTransition from '@/components/PageTransition';

/**
 * Per-route transition. Next.js re-mounts `template.tsx` on every navigation,
 * so this gives each page a soft fade-up entrance.
 * Opacity-only transform-wise (a tiny y is fine on the wrapper) keeps it light
 * and avoids breaking fixed/absolute backgrounds inside pages.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
