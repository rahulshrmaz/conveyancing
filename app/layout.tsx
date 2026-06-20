import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Providers from "./providers";
import theme from './theme';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const siteUrl = "https://www.1conveyancing.com";
const siteName = "1 Conveyancing";
const defaultTitle = "1 Conveyancing | Property Transactions Managed. Relationships Built.";
const description =
  "Professional property sales progression and conveyancing support services in the UK. Expert chain management, buyer & seller liaison, mortgage coordination, and documentation support.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D2340",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | 1 Conveyancing",
  },
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
    "1 Conveyancing",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description,
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
    images: [`${siteUrl}/logo.png`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: siteName,
      url: siteUrl,
      description,
      areaServed: ["United Kingdom"],
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
      },
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// ✅ YAHAN SE DELETE KARO - duplicate theme declaration
// const theme = { ... }   <-- ISKO HATAO

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} min-h-screen bg-white text-[#1B1B1B] antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>  {/* ✅ Ab ye imported theme use karega */}
            <CssBaseline />
            <Providers>
              <Script
                id="schema-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />

              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#0D2340] focus:shadow-lg"
              >
                Skip to main content
              </a>

              <div id="main-content" className="min-h-screen">
                {children}
              </div>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}