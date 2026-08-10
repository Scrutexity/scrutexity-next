import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import { SiteNav } from "@/components/site-nav";
import Footer from "@/components/sections/footer";
import { MobileStickyCTA } from "@/components/scrutexity/mobile-sticky-cta";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://www.scrutexity.com";
const TITLE = "Scrutexity — Built Environment Intelligence";
const DESCRIPTION =
  "Market intelligence, technical diligence, and deployment strategy for construction robotics, smart sites, digital twins, embodied AI, and intelligent construction.";
const OG_IMAGE =
  "/api/og?title=Built%20Environment%20Intelligence&type=Scrutexity";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  keywords: [
    "construction technology intelligence",
    "construction robotics market intelligence",
    "intelligent construction",
    "smart construction site",
    "construction digital twin",
    "embodied AI construction",
    "construction technology diligence",
    "construction innovation strategy",
  ],
  verification: { google: "9xUsbtOiH3M_YGMX2Z3bRwAl45Tcs2rtwGTrzYh6mmc" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: siteUrl,
    siteName: "Scrutexity",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Scrutexity — Built Environment Intelligence",
      },
    ],
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
      "@id": `${siteUrl}/#organization`,
      name: "Scrutexity",
      url: siteUrl,
      logo: `${siteUrl}/logo-icon.png`,
      slogan: "Built Environment Intelligence",
      description: DESCRIPTION,
      email: "hello@scrutexity.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
      knowsAbout: [
        "Construction robotics",
        "Intelligent construction",
        "Smart-site systems",
        "Digital twins",
        "Embodied intelligence",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Scrutexity Built Environment Intelligence",
      serviceType:
        "Construction technology market intelligence, technical diligence, and deployment strategy",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Global",
      description: DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Scrutexity",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${jetBrainsMono.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-32.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-concrete font-sans text-graphite antialiased selection:bg-safety-orange selection:text-graphite">
        <SmoothScrollProvider>
          <SiteNav />
          <main className="pt-[76px]">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <MobileStickyCTA />
        <Analytics />
        <GoogleAnalytics gaId="G-XGF7WH36MG" />
      </body>
    </html>
  );
}
