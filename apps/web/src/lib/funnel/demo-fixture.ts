import type { FullExhibitPackage } from "@/components/scrutexity/funnel/types";

/**
 * SYNTHETIC DEMO FIXTURE.
 *
 * This is illustrative content for the product walkthrough. It is not the
 * result of analysing any website.
 *
 * It is reachable only for the hosts in DEMO_HOSTS, and every response built
 * from it carries `synthetic: true` so the UI can label it. It must never be
 * attributed to a customer's domain, and must never be returned as if it were
 * analysis of a real page. Previously this content was returned for every URL
 * submitted to /api/funnel/scan.
 */

export const DEMO_HOSTS = ["example.com", "www.example.com", "example.org"] as const;

export function isDemoTarget(hostname: string): boolean {
  return (DEMO_HOSTS as readonly string[]).includes(hostname.toLowerCase());
}

export const SYNTHETIC_DEMO_PACKAGE: FullExhibitPackage & { synthetic: true } = {
  scanId: "demo",
  targetUrl: "https://example.com",
  scannedAt: new Date(0).toISOString(),
  totalGapsFound: 1,
  authLevel: "PURCHASED",
  // A fixed, obviously-synthetic marker rather than a real-looking hash, so a
  // demo record can never be mistaken for an evidence-backed one.
  provenanceHash: "SYNTHETIC-DEMO-NOT-AN-EVIDENCE-RECORD",
  synthetic: true,
  exhibits: [
    {
      id: "demo-exhibit-1",
      originalClaimText:
        "Clinically proven to reverse cellular aging in 14 days and guarantee 5x ROI.",
      remediatedClaimText:
        "Formulated with cellular nutrients observed to support hydration and metabolic resilience.",
      vector: {
        id: "FTC_SEC_5",
        name: "FTC Section 5 (Deceptive)",
        description: "Unsubstantiated performance claim",
        severity: "HIGH",
      },
      missingSupportReason: "Preserves commercial intent within evidentiary bounds",
    },
  ],
};
