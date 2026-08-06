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

const staticRoutes = [
  // Credibility and conversion path
  "/pricing",
  "/sample-report",
  "/methodology",
  "/proof",
  "/verify",
  "/what-we-do",
  "/contact",
  "/agency",
  "/about",

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
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
