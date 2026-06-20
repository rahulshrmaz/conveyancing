import type { Metadata } from "next";
import TeamPage from "./TeamPage";

const baseUrl = "https://www.1conveyancing.com";
const siteName = "1 Conveyancing";
const title = "Our Team | 1 Conveyancing";
const description =
  "Meet the experienced professionals behind 1 Conveyancing. Our team of specialists in sales progression, chain management, and conveyancing support.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  keywords: [
    "1 Conveyancing team",
    "conveyancing experts",
    "property specialists",
    "sales progression managers",
    "Keone Fernandes",
    "Beckagael Mae Batuto",
    "Mark Kelvin Loreto",
  ],
  authors: [{ name: siteName, url: baseUrl }],
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    url: "/team",
    siteName,
    title,
    description,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: baseUrl,
  member: [
    {
      "@type": "Person",
      name: "Keone Fernandes",
      jobTitle: "Director | Head of Conveyancing",
      worksFor: { "@type": "Organization", name: siteName },
    },
    {
      "@type": "Person",
      name: "Beckagael Mae Batuto",
      jobTitle: "Client Success & Operations Manager",
      worksFor: { "@type": "Organization", name: siteName },
    },
    {
      "@type": "Person",
      name: "Mark Kelvin Loreto",
      jobTitle: "Sales Progression Manager",
      worksFor: { "@type": "Organization", name: siteName },
    },
  ],
};

export default function Team() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TeamPage />
    </>
  );
}