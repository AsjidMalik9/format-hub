import type { ReactNode } from "react";
import { siteUrl, siteName, defaultDescription, toolPageUrl } from "@/lib/seo";
import { tools } from "@/data/tools";

export function HomeJsonLd(): ReactNode {
  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?q={search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Developer Tools",
    description: "Free online developer tools",
    numberOfItems: tools.length,
    itemListElement: tools.slice(0, 50).map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: toolPageUrl(tool.slug),
      name: tool.name,
      description: tool.description
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}

type ToolJsonLdProps = {
  name: string;
  description: string;
  url: string;
};

export function ToolJsonLd({ name, description, url }: ToolJsonLdProps): ReactNode {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type FaqJsonLdProps = {
  faq: { q: string; a: string }[];
  url: string;
};

export function FaqJsonLd({ faq, url }: FaqJsonLdProps): ReactNode {
  if (!faq?.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a }
    })),
    url
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
