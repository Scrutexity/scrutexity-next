import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proof & Verification | Scrutexity",
  description:
    "Every Scrutexity review ends in a dated, hash-chained record. See the artifacts a review produces and verify any record independently.",
  alternates: { canonical: "/proof" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
