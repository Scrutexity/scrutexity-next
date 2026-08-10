import type { Metadata } from "next";
import UmbrellaHomepage from "@/components/scrutexity/umbrella-homepage";

export const metadata: Metadata = {
  title: "Scrutexity — Production Intelligence for Specialty Contractors",
  description: "Know what is actually ready before you move the crew. Scrutexity creates contractor-controlled prospective records of deployment decisions, field evidence, execution outcomes, and production impact.",
};

export default function HomePage() {
  return <UmbrellaHomepage />;
}
