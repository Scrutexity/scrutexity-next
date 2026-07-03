import type { Metadata } from "next";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import { SiteNav } from "@/components/site-nav";
import Footer from "@/components/sections/footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://www.scrutexity.com";

export const metadata: Metadata = {
  title: "Scrutexity | Claim Intelligence for Public Trust",
  description: "Scrutexity is the claim-risk bureau behind AuditGPT, maintaining methodology, proof artifacts, and dated public-claim review records.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  verification: {
    google: "9xUsbtOiH3M_YGMX2Z3bRwAl45Tcs2rtwGTrzYh6mmc",
  },
  openGraph: {
    title: "Scrutexity | Claim Intelligence for Public Trust",
    description: "The claim-risk bureau behind AuditGPT. Methodology, proof library, and review records for public trust.",
    url: siteUrl,
    siteName: "Scrutexity",
    images: [{ url: "/logo-icon.png", width: 320, height: 365, alt: "Scrutexity" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrutexity | Claim Intelligence for Public Trust",
    description: "The claim-risk bureau behind AuditGPT. Methodology, proof library, and review records for public trust.",
    images: ["/logo-icon.png"],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://scrutexity.com/#application",
      name: "Scrutexity",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Scrutexity maintains claim intelligence methodology, proof artifacts, and dated public-claim review records for high-trust businesses.",
      applicationSubCategory: "Claim Intelligence and Public Proof Review",
      audience: { "@type": "Audience", audienceType: "Operators, agencies, insurers, acquirers, and high-trust businesses" },
      featureList: [
        "Public claim review records",
        "Visible proof mapping",
        "AI answer risk review",
        "Claim Record Transparency",
        "Dated review receipts"
      ],
      offers: { "@type": "AggregateOffer", priceCurrency: "USD", offerCount: 1 },
      provider: { "@id": "https://scrutexity.com/#organization" },
      knowsAbout: [
        "Public Claim Review",
        "Claim Record Transparency",
        "AI Answer Risk"
      ],
      softwareRequirements: "Web browser"
    },
    {
      "@type": "Organization",
      "@id": "https://scrutexity.com/#organization",
      name: "Scrutexity",
      url: "https://scrutexity.com",
      logo: "https://scrutexity.com/logo-icon.png",
      description: "Claim-risk bureau behind AuditGPT. Maintains methodology, proof artifacts, and dated public-claim review records.",
      address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
      knowsAbout: [
        "Public Claim Review",
        "Claim Record Transparency",
        "AI Answer Risk",
        "Public Proof Review"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://scrutexity.com/#webpage",
      url: "https://scrutexity.com",
      name: "Scrutexity | Claim Intelligence for Public Trust",
      isPartOf: { "@id": "https://scrutexity.com/#website" },
      about: { "@id": "https://scrutexity.com/#application" },
      description: "Scrutexity is the claim-risk bureau behind AuditGPT, maintaining methodology, proof artifacts, and dated public-claim review records."
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />
      </head>
      <body
        className={`${instrumentSerif.variable} ${geistSans.variable} ${jetBrainsMono.variable} font-sans tracking-tight bg-cream text-bark antialiased overflow-x-hidden selection:bg-sage/20 selection:text-espresso`}
      >
        <SmoothScrollProvider>
          <SiteNav />
          <main className="pt-nav-offset">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
        <GoogleAnalytics gaId="G-XGF7WH36MG" />
      </body>
    </html>
  );
}
