import Link from "next/link";
import { tools } from "@/data/tools";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo";
import { FaqJsonLd } from "@/components/JsonLd";
import { ToolSEOContent } from "@/components/ToolSEOContent";
import { toolsIndexSeoContent } from "@/data/appSeoContent";

export const metadata: Metadata = {
  title: "All Tools — JSON Formatter, URL Encoder, Base64 & More",
  description:
    "Browse 40+ free developer tools: JSON formatter, URL encoder, Base64, JWT decoder, regex tester, SQL formatter, PDF tools, and more. No sign-up.",
  alternates: { canonical: `${siteUrl}/tools` },
  openGraph: { url: `${siteUrl}/tools`, title: "All Developer Tools" }
};

const toolsPageUrl = `${siteUrl}/tools`;

export default function ToolsIndexPage() {
  return (
    <>
      <FaqJsonLd faq={toolsIndexSeoContent.faq} url={toolsPageUrl} />
      <section className="shell home">
        <div className="hero compact">
          <p className="kicker">Tools</p>
          <h1>All tools</h1>
          <p>Pick a tool to open its dedicated page.</p>
        </div>
        <div className="tool-grid">
          {tools.map((tool) => (
            <article className="tool-card" key={tool.slug}>
              <span className="tool-category">{tool.category}</span>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
              <Link href={`/tools/${tool.slug}`} className="card-link">
                Open tool →
              </Link>
            </article>
          ))}
        </div>
        <div className="tool-seo-wrap">
          <ToolSEOContent content={toolsIndexSeoContent} toolName="this page" />
        </div>
      </section>
    </>
  );
}
