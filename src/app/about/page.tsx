import type { Metadata } from "next";
import { siteUrl, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: `About — ${siteName}`,
  description: `About ${siteName}: free in-browser developer tools for formatting, converting, and encoding. No sign-up.`,
  alternates: { canonical: `${siteUrl}/about` },
  robots: { index: true, follow: true }
};

export default function AboutPage() {
  return (
    <section className="shell page-content">
      <div className="page-head">
        <h1>About {siteName}</h1>
        <p>Free developer tools that run in your browser.</p>
      </div>

      <div className="legal-content">
        <p>
          <strong>{siteName}</strong> is a collection of free, in-browser developer tools: JSON formatter, URL encoder, Base64 encoder/decoder, JWT decoder, regex tester, timestamp converter, and 40+ more. Everything runs locally in your browser—your data never leaves your device and no sign-up is required.
        </p>

        <h2>What we offer</h2>
        <ul>
          <li><strong>Format & convert</strong> — JSON, XML, YAML, CSV, Markdown, HTML, SQL</li>
          <li><strong>Encode & decode</strong> — Base64, URL, JWT</li>
          <li><strong>Security & hashing</strong> — JWT verify, hashes (SHA, MD5), HMAC, bcrypt, password generator</li>
          <li><strong>Time & web</strong> — Unix timestamp, cron parser, timezone, query string, URL parser, slug, IP validator</li>
          <li><strong>More</strong> — Regex tester, UUID generator, OpenAPI validator, PDF tools, image compression, and others</li>
        </ul>

        <h2>Why use {siteName}</h2>
        <p>
          All tools are free and work without an account. Processing happens in your browser, so sensitive data (tokens, configs, API payloads) is never uploaded to our servers. We keep the site fast and focused so you can get things done quickly.
        </p>

        <h2>Contact</h2>
        <p>
          Questions or feedback? Use our <a href="/contact">Contact</a> page.
        </p>
      </div>
    </section>
  );
}
