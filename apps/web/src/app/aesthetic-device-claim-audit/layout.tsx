import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aesthetic Device Claim Audit | Scrutexity",
  description:
    "Review the claims on your aesthetic device pages against what the clearance and evidence actually support, with safer wording and a dated record.",
  alternates: { canonical: "/aesthetic-device-claim-audit" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
