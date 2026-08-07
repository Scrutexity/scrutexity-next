import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GLP-1 & Medical Weight Loss Claim Audit | Scrutexity",
  description:
    "GLP-1 and medical weight loss marketing carries a high claim risk surface. See which statements your evidence supports, and which need rewording.",
  alternates: { canonical: "/glp-1-weight-loss-claim-audit" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
