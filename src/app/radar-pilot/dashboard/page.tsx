import type { Metadata } from "next";
import RadarCommandCenter from "../RadarCommandCenter";

export const metadata: Metadata = {
  title: "Claim Intelligence Review Dashboard Demo | Scrutexity",
  description:
    "Interactive command-center demo for parent-child governance review across multi-location operators.",
};

export default function RadarPilotDashboardPage() {
  return <RadarCommandCenter />;
}
