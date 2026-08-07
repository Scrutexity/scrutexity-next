import type { Metadata } from "next";
import { JetBrains_Mono, Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import { SiteNav } from "@/components/site-nav";
import Footer from "@/components/sections/footer";
import { MobileStickyCTA } from "@/components/scrutexity/mobile-sticky-cta";
import { themeInitScript } from "@/components/theme-toggle";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://www.scrutexity.com";

const TITLE = "Scrutexity — Claim Evidence Intelligence";
const DESCRIPTION =
  "Scrutexity documents the gap between what a company claims, what its evidence supports, and what AI systems say about it. Evidence for costly decisions.";
const OG_IMAGE =
  "/api/og?title=Claim%20Evidence%20Intelligence&type=Scrutexity";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  keywords: [
    "AI regulatory diligence",
    "AI narrative integrity",
    "public claim intelligence",
    "AI due diligence",
    "regulatory exposure assessment",
    "claim substantiation intelligence",
    "M&A AI risk",
    "public claim audit",
  ],
  verification: {
    google: "9xUsbtOiH3M_YGMX2Z3bRwAl45Tcs2rtwGTrzYh6mmc",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: siteUrl,
    siteName: "Scrutexity",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Scrutexity — Claim Evidence Intelligence" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.scrutexity.com/#organization",
      name: "Scrutexity",
      url: "https://www.scrutexity.com",
      logo: "https://www.scrutexity.com/logo-icon.png",
      slogan: "Claim Evidence Intelligence",
      description: DESCRIPTION,
      email: "nick@scrutexity.com",
      address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
      knowsAbout: [
        "Public Claim Intelligence",
        "AI and Regulatory Diligence",
        "AI Narrative Integrity",
        "Regulatory Exposure Assessment",
        "Claim Substantiation Intelligence"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.scrutexity.com/#service",
      name: "Scrutexity Public Claim Intelligence",
      serviceType: "Forensic intelligence for public claims, AI narrative, and regulatory risk",
      provider: { "@id": "https://www.scrutexity.com/#organization" },
      areaServed: "US",
      description: "Comparison of public claims against visible evidence, documented enforcement patterns, and AI answer-system output, delivered as a dated, source-linked intelligence record.",
      offers: {
        "@type": "OfferCatalog",
        name: "Scrutexity engagements",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Free Snapshot",
            description: "A free 3-point initial review of public claims and evidence gaps.",
            priceSpecification: { "@type": "PriceSpecification", price: "0", priceCurrency: "USD" }
          },
          {
            "@type": "Offer",
            name: "Claim Support Review",
            description: "One detailed Exhibit A finding, claim analysis, evidence gap, and safer wording.",
            priceSpecification: { "@type": "PriceSpecification", price: "99", priceCurrency: "USD" }
          },
          {
            "@type": "Offer",
            name: "Claim Exposure Diagnostic",
            description: "A focused, dated intelligence review that answers whether there is enough exposure to justify a deeper assessment.",
            priceSpecification: { "@type": "PriceSpecification", price: "1500", priceCurrency: "USD" }
          },
          {
            "@type": "Offer",
            name: "Scrutexity Watch",
            description: "Ongoing monitoring of claim drift, evidence changes, and AI narrative shifts.",
            priceSpecification: { "@type": "PriceSpecification", price: "1500", priceCurrency: "USD", unitCode: "MON" }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.scrutexity.com/#website",
      url: "https://www.scrutexity.com",
      name: "Scrutexity",
      publisher: { "@id": "https://www.scrutexity.com/#organization" }
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint to prevent a flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${interTight.variable} ${jetBrainsMono.variable} font-sans tracking-[-0.01em] [font-variant-ligatures:common-ligatures] bg-paper text-ink antialiased overflow-x-hidden selection:bg-bureau-sage/20 selection:text-ink`}
      >
        <SmoothScrollProvider>
          <SiteNav />
          <main className="pt-nav-offset">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
        <MobileStickyCTA />
        <Analytics />
        <GoogleAnalytics gaId="G-XGF7WH36MG" />
      </body>
    </html>
  );
}
