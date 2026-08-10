import type { Metadata } from "next";
import UmbrellaHomepage from "@/components/scrutexity/umbrella-homepage";

export const metadata: Metadata = {
  title: "Construction Technology Intelligence | Scrutexity",
  description:
    "Market intelligence, technical diligence, and deployment strategy for construction robotics, smart sites, digital twins, embodied AI, and intelligent construction.",
};

export default function HomePage() {
  return <UmbrellaHomepage />;
}
