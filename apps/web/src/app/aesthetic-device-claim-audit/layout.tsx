import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aesthetic Device Claim Audit | AuditGPT by Scrutexity",
  description:
    "Before your clinic sells or promotes an aesthetic device, know what you can safely claim about it. AuditGPT reviews device pages, supplier claims, FDA-status language, evidence gaps, and AI answer risk for red light, hair-growth, PEMF, body-contouring, RF microneedling, and aesthetic-device offers.",
  alternates: { canonical: "/aesthetic-device-claim-audit" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
