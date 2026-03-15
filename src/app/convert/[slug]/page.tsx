import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgrammaticConverter } from "@/data/programmaticConverters";
import { convertPageUrl, toolPageUrl } from "@/lib/seo";
import { FaqJsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

const convertFaq = [
  { q: "Is the conversion done in my browser?", a: "Yes. All converters run in your browser. Your data is never sent to our servers." },
  { q: "Do I need to sign up?", a: "No. Every converter is free and works without an account." }
];

export async function generateStaticParams() {
  const { programmaticConverters } = await import("@/data/programmaticConverters");
  return programmaticConverters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getProgrammaticConverter(slug);
  if (!c) return { title: "Converter" };
  const url = convertPageUrl(slug);
  return {
    title: `${c.title} — Free Online | ${c.fromFormat} to ${c.toFormat}`,
    description: c.description,
    keywords: `${c.fromFormat} to ${c.toFormat}, ${c.slug}, online converter, free`.toLowerCase(),
    alternates: { canonical: url },
    openGraph: { title: c.title, description: c.description, url },
    robots: { index: true, follow: true }
  };
}

export default async function ConvertSlugPage({ params }: Props) {
  const { slug } = await params;
  const c = getProgrammaticConverter(slug);
  if (!c) notFound();

  const toolUrl = toolPageUrl(c.toolSlug);
  const pageUrl = convertPageUrl(slug);

  return (
    <>
      <FaqJsonLd faq={convertFaq} url={pageUrl} />
      <section className="tool-page shell">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href="/convert">Convert</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current" aria-current="page">
            {c.title}
          </span>
        </nav>
        <div className="page-head">
          <h1>{c.title}</h1>
          <p>{c.description}</p>
        </div>
        <article className="tool-surface">
          <div className="tool-surface-inner">
            <p>
              Convert <strong>{c.fromFormat}</strong> to <strong>{c.toFormat}</strong> in your browser. No uploads, no sign-up.
            </p>
            <div className="convert-cta">
              <Link href={toolUrl} className="button-primary">
                Use {c.title} tool →
              </Link>
            </div>
          </div>
        </article>
        <div className="tool-seo-wrap">
          <div className="tool-seo-content">
            <section className="seo-section">
              <h2>What is {c.fromFormat} to {c.toFormat}?</h2>
              <p>
                This converter turns {c.fromFormat} into {c.toFormat}. Paste your {c.fromFormat} in the tool, run the conversion, and copy the result. All processing runs locally in your browser.
              </p>
            </section>
            <section className="seo-section">
              <h2>Use cases</h2>
              <ul>
                <li>Quick conversion during development or debugging</li>
                <li>Integrating data between systems that use different formats</li>
                <li>Testing APIs or configs that expect {c.toFormat}</li>
                <li>No server required — everything runs in your browser</li>
              </ul>
            </section>
            <section className="seo-section seo-faq">
              <h2>FAQ</h2>
              <dl>
                {convertFaq.map((item, i) => (
                  <div key={i} className="faq-item">
                    <dt>{item.q}</dt>
                    <dd>{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
