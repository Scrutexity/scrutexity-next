import type { Metadata } from "next";
import UmbrellaHomepage from "@/components/scrutexity/umbrella-homepage";

export const metadata: Metadata = {
  title: "Scrutexity — Production Intelligence for Specialty Contractors",
  description: "See the observed site state before you move the crew. Scrutexity creates contractor-controlled prospective records of planned starts, field evidence, deployment decisions, actual execution, and production impact.",
};

export default function HomePage() {
  return <UmbrellaHomepage />;
}
