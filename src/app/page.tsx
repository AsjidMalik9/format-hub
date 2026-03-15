import { HomePageClient } from "@/components/HomePageClient";
import { HomeJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { siteName, defaultDescription, defaultKeywords, siteUrl } from "@/lib/seo";
import { homeSeoContent } from "@/data/appSeoContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Free JSON Formatter, URL Encoder, Base64 & 40+ Tools — ${siteName}`,
  description: defaultDescription,
  keywords: defaultKeywords,
  openGraph: {
    title: `Free JSON Formatter, URL Encoder & Developer Tools — ${siteName}`,
    description: defaultDescription
  }
};

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <FaqJsonLd faq={homeSeoContent.faq} url={siteUrl} />
      <HomePageClient seoContent={homeSeoContent} seoTitle={siteName} />
    </>
  );
}
