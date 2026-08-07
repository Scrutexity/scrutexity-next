import { MetadataRoute } from "next";

const siteUrl = "https://www.scrutexity.com";

// Priority reflects commercial weight, not just depth. The four intelligence
// products and the conversion path outrank supporting and legal pages.
const primaryRoutes = [
  "/snapshot",
  "/claim-exposure-diagnostic",
  "/watch",
  "/enterprise",
  "/diligence",
  "/counsel",
  "/ai-narrative-integrity",
  "/private-assessment"
];

// Vertical and geography landing pages. These carry the site's deepest
// long-form content (350 to 580 lines each) and are the pages most likely to
// win qualified search traffic, but they were absent from the sitemap
// entirely, so nothing could crawl them.
const landingRoutes = [
  "/regenerative-medicine-claims",
  "/aesthetic-device-claim-audit",
  "/new-york-med-spa-claim-audit",
  "/glp-1-weight-loss-claim-audit",
  "/medical-wellness",
  "/medical-wellness/med-spas",
  "/use-cases/agency-white-label-audits",
  "/insights/glp-1-claim-audit",
];

const staticRoutes = [
  // Credibility and conversion path
  "/pricing",
  "/sample-report",
  "/sample-owner-brief",
  "/methodology",
  "/proof",
  "/proof/sealed-audit-trail",
  "/verify",
  "/what-we-do",
  "/how-it-works",
  "/self-audit",
  "/auditgpt",
  "/contact",
  "/agency",
  "/about",
  "/trust",
  "/safety-architecture",

  // Segment pages
  "/for-multi-location",
  "/private-equity/claim-diligence",
  "/partners",

  // Company and legal
  "/data-handling",
  "/terms",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...primaryRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...landingRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
