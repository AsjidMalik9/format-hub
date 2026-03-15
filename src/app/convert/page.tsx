import Link from "next/link";
import type { Metadata } from "next";
import { siteUrl, siteName } from "@/lib/seo";
import { programmaticConverters } from "@/data/programmaticConverters";

export const metadata: Metadata = {
  title: `Free Online Converters — JSON, YAML, XML, Base64, URL | ${siteName}`,
  description:
    "Convert JSON to YAML, XML to JSON, Base64 encode/decode, URL encode, and more. Free in-browser converters. No sign-up.",
  alternates: { canonical: `${siteUrl}/convert` },
  openGraph: { url: `${siteUrl}/convert`, title: "Online Converters" }
};

export default function ConvertIndexPage() {
  return (
    <section className="shell home">
      <div className="hero compact">
        <p className="kicker">Convert</p>
        <h1>Online converters</h1>
        <p>Free in-browser converters. Pick one to open the tool.</p>
      </div>
      <div className="tool-grid">
        {programmaticConverters.map((c) => (
          <article className="tool-card" key={c.slug}>
            <span className="tool-category">Convert</span>
            <h2>{c.title}</h2>
            <p>{c.description}</p>
            <Link href={`/convert/${c.slug}`} className="card-link">
              {c.fromFormat} → {c.toFormat} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
