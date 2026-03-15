import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolEntryOrMeta } from "@/data/toolRegistry";
import { getToolBySlug, tools } from "@/data/tools";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { toolPageUrl, siteName } from "@/lib/seo";
import { ToolPage } from "@/components/ToolPage";
import { ComingSoon } from "@/components/ComingSoon";
import { ToolJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { ToolSEOContent } from "@/components/ToolSEOContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getToolEntryOrMeta(slug);
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool" };

  const title = meta?.title ?? tool.name;
  const description = meta?.description ?? tool.description;
  const url = toolPageUrl(slug);
  const keywords = [
    tool.name.toLowerCase(),
    "online",
    "free",
    "tool",
    "developer"
  ].join(", ");

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — Free Online Tool`,
      description,
      url,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description
    },
    robots: { index: true, follow: true }
  };
}

export default async function ToolSlugPage({ params }: Props) {
  const { slug } = await params;
  const { entry } = getToolEntryOrMeta(slug);
  const tool = getToolBySlug(slug);
  const seoContent = getToolSeoContent(slug);

  if (!tool) notFound();

  const url = toolPageUrl(slug);
  const jsonLd = <ToolJsonLd name={tool.name} description={tool.description} url={url} />;
  const faqJsonLd = seoContent?.faq?.length ? <FaqJsonLd faq={seoContent.faq} url={url} /> : null;

  if (entry) {
    return (
      <>
        {jsonLd}
        {faqJsonLd}
        {entry.component}
        {seoContent && (
          <div className="tool-seo-wrap shell">
            <ToolSEOContent content={seoContent} toolName={tool.name} />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {jsonLd}
      {faqJsonLd}
      <ToolPage title={tool.name} description={tool.description}>
        <ComingSoon name={tool.name} description={tool.description} />
      </ToolPage>
      {seoContent && (
        <div className="tool-seo-wrap shell">
          <ToolSEOContent content={seoContent} toolName={tool.name} />
        </div>
      )}
    </>
  );
}
