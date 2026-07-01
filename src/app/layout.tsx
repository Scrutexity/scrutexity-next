import type { Metadata } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import CursorTrail from "../components/CursorTrail";
import Nav from "@/components/Nav";
import FooterAndProof from "@/components/FooterAndProof";

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

const siteUrl = "https://www.scrutexity.com";

export const metadata: Metadata = {
  title: "Scrutexity | Find the consults your clinic is already losing",
  description: "We surface the missed calls, abandoned forms, and stalled DMs your front desk never caught — and turn them into booked, deposit-paid appointments. Works on Boulevard, Mangomint, and Zenoti. Proven in 14 days. Keep the ledger even if you walk.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Scrutexity | Find the consults your clinic is already losing",
    description: "We surface the missed calls, abandoned forms, and stalled DMs your front desk never caught — and turn them into booked, deposit-paid appointments. Works on Boulevard, Mangomint, and Zenoti. Proven in 14 days.",
    url: siteUrl,
    siteName: "Scrutexity",
    images: [
      {
        url: "/logo-icon.png",
        width: 320,
        height: 365,
        alt: "Scrutexity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrutexity | Find the consults your clinic is already losing",
    description: "We surface the missed calls, abandoned forms, and stalled DMs your front desk never caught — and turn them into booked, deposit-paid appointments. Works on Boulevard, Mangomint, and Zenoti.",
    images: ["/logo-icon.png"],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://scrutexity.com/#application",
      "name": "Scrutexity",
      "url": "https://scrutexity.com",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Enterprise-grade Clinical Demand Governance and Revenue Recovery platform for medical aesthetics and medspas, leveraging zero-downtime parallel data integrations with Boulevard, Zenoti, Mindbody, and Vagaro.",
      "applicationSubCategory": "AI Visibility Scanner & Revenue Infrastructure",
      "audience": {
        "@type": "Audience",
        "audienceType": "Medical directors, clinic operators, medspa founders, PE-backed aesthetics groups"
      },
      "featureList": [
        "Read-only cross-platform demand normalization (Boulevard, Mangomint, Zenoti, Mindbody, Vagaro)",
        "Clinical Demand Governance with licensed staff exception routing",
        "Revenue Recovery Infrastructure and missed-demand detection",
        "Zero-downtime parallel PMS telemetry pipelines",
        "Tamper-evident record for M&A diligence",
        "Portfolio-level operational benchmarking",
        "HIPAA-aligned Business Associate Agreement workflows"
      ],
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "offerCount": 3
      },
      "provider": {
        "@id": "https://scrutexity.com/#organization"
      },
      "knowsAbout": [
        "Clinical Demand Governance",
        "Medical Aesthetics Revenue Recovery",
        "Practice Management System Integration",
        "PMS Telemetry Architecture",
        "B2B SaaS for Healthcare Operations",
        "Zero-Downtime Data Integration"
      ],
      "softwareRequirements": "Web browser; integrates with Boulevard, Zenoti, Mindbody, Vagaro, Mangomint"
    },
    {
      "@type": "Organization",
      "@id": "https://scrutexity.com/#organization",
      "name": "Scrutexity",
      "url": "https://scrutexity.com",
      "logo": "https://scrutexity.com/scrutexity-logo-web.png",
      "description": "Clinical infrastructure platform for medical aesthetics.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "knowsAbout": [
        "Clinical Demand Governance",
        "Medical Aesthetics Revenue Recovery",
        "Practice Management System Integration",
        "PMS Telemetry & Integration Architecture",
        "B2B SaaS Telemetry Pipeline"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://scrutexity.com/#webpage",
      "url": "https://scrutexity.com",
      "name": "Scrutexity | Clinical Demand Governance & Revenue Recovery Infrastructure",
      "isPartOf": { "@id": "https://scrutexity.com/#website" },
      "about": { "@id": "https://scrutexity.com/#application" },
      "description": "Deploy parallel, read-only revenue infrastructure to capture missed patient demand and optimize medspa operational visibility without disrupting existing workflows."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={`${instrumentSerif.variable} ${geistSans.variable} font-sans tracking-tight bg-[#fbf7ef] text-[#221f1b] antialiased overflow-x-hidden selection:bg-[#6B8576]/20 selection:text-[#221f1b]`}>

        <SmoothScroll>
          <Nav />
          <main className="pt-[68px]">{children}</main>
          <FooterAndProof />
        </SmoothScroll>
        <Analytics />
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}

