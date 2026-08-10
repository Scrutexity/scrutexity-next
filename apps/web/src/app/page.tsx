import type { Metadata } from "next";
import UmbrellaHomepage from "@/components/scrutexity/umbrella-homepage";

export const metadata: Metadata = {
  title: "Scrutexity — Contractor-Side Production Control",
  description: "Know what was actually observed before you move the crew. Scrutexity preserves planned starts, observed field evidence, contractor decisions, actual execution, and sealed lineage.",
};

export default function HomePage() {
  return <UmbrellaHomepage />;
}
