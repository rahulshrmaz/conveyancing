import type { Metadata } from "next";
import { Suspense } from "react";
import HomeClient from "./HomeClient";
import GlobalLoader from "@/components/GlobalLoader";

const baseUrl = "https://www.1conveyancing.com";
const siteName = "1 Conveyancing";
const title =
  "1 Conveyancing | Property Transactions Managed. Relationships Built.";
const description =
  "Professional property sales progression and conveyancing support services across the UK. Expert chain management, buyer & seller liaison, mortgage coordination, and documentation support for seamless transactions.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  keywords: [
    "conveyancing",
    "property transactions",
    "sales progression",
    "chain management",
    "property buyers",
    "property sellers",
    "mortgage coordination",
    "UK conveyancing",
    "property lawyers",
    "residential conveyancing",
    "commercial conveyancing",
    "1 Conveyancing",
  ],
  authors: [{ name: siteName, url: baseUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title,
    description,
    locale: "en_GB",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${baseUrl}/og-image.png`],
    creator: "@1conveyancing",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  category: "Legal Services",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: siteName,
      url: baseUrl,
      description,
      image: `${baseUrl}/logo.png`,
      priceRange: "££",
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "AdministrativeArea", name: "England" },
        { "@type": "AdministrativeArea", name: "Wales" },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
        addressLocality: "London",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+44-000-000-0000",
        contactType: "Customer Service",
        availableLanguage: ["English"],
      },
      sameAs: [
        "https://www.linkedin.com/company/1conveyancing",
        "https://twitter.com/1conveyancing",
        "https://www.facebook.com/1conveyancing",
      ],
      serviceType: [
        "Residential Conveyancing",
        "Commercial Conveyancing",
        "Sales Progression",
        "Chain Management",
        "Property Transaction Coordination",
      ],
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: siteName,
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<GlobalLoader />}>
        <HomeClient />
      </Suspense>
    </>
  );
}