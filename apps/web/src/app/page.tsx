import type { Metadata } from "next";
import MakroRedesign from "@/components/redesign/makro-redesign";
import { HomeSections } from "@/components/scrutexity/home-sections";

export const metadata: Metadata = {
  title: "Claim Review for Marketing and AI Claims | Scrutexity",
  description:
    "Scrutexity reviews public marketing claims and customer-facing AI outputs for agencies and regulated businesses — flags unsupported claims, adds evidence notes, and issues a dated, hash-chained audit record.",
};

export default function HomePage() {
  // Stays a Server Component so the metadata export above survives. The client
  // hooks live in HomeSections. MakroRedesign is left unwrapped: it owns its
  // own max-w containers, and nesting it in another would clamp its full-bleed
  // sections and add a second gutter.
  return (
    <>
      <MakroRedesign />
      <HomeSections />
    </>
  );
}
