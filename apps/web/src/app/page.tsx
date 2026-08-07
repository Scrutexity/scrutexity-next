import type { Metadata } from "next";
import MakroRedesign from "@/components/redesign/makro-redesign";

export const metadata: Metadata = {
  title: "Claim Review for Marketing and AI Claims | Scrutexity",
  description:
    "Scrutexity reviews public marketing claims and customer-facing AI outputs for agencies and regulated businesses — flags unsupported claims, adds evidence notes, and issues a dated, hash-chained audit record.",
};

export default function HomePage() {
  return <MakroRedesign />;
}
