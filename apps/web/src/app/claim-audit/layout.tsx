import type { Metadata } from "next";

// Claim-audit intake + archetype records: preserved, not indexed, not in sitemap.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ClaimAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
