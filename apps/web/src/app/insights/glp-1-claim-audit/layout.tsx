import type { Metadata } from "next";

// Archived-from-acquisition route: preserved source, not indexed, not in nav/sitemap.
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
