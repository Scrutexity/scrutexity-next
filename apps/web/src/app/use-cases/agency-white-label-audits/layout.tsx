import type { Metadata } from "next";

// Non-canonical support page: preserved, not indexed, not in nav/sitemap.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ArchivedRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
