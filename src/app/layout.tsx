import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteUrl, siteName, defaultDescription, defaultKeywords } from "@/lib/seo";

const font = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Free JSON Formatter, URL Encoder & 40+ Developer Tools`,
    template: `%s | ${siteName}`
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} — Free Online Developer Tools`,
    description: defaultDescription
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Free JSON Formatter, URL Encoder & More`,
    description: defaultDescription
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <div className="site-wrap">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
