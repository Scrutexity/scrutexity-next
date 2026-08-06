import type { Metadata } from "next";

// Proof-library route: trust infrastructure, not an acquisition surface. Not indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ProofLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
