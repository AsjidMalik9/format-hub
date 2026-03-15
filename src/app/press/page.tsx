import type { Metadata } from "next";
import { siteUrl, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Press & Share — ${siteName}`,
  description: "Share FormatHub on Product Hunt, Twitter, LinkedIn. Links and copy for newsletters and awesome lists.",
  alternates: { canonical: `${siteUrl}/press` },
  robots: { index: true, follow: true }
};

const productHuntUrl = "https://www.producthunt.com/posts/developer-tools-hub";
const twitterText = encodeURIComponent(
  "FormatHub — Free in-browser developer tools: JSON formatter, JWT decoder, regex tester, 40+ more. No sign-up. Your data never leaves your device."
);
const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(siteUrl)}`;
const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;

export default function PressPage() {
  return (
    <section className="shell home">
      <div className="hero compact">
        <p className="kicker">Press</p>
        <h1>Share & backlinks</h1>
        <p>Help others discover FormatHub. Use the links and copy below.</p>
      </div>

      <div className="press-blocks">
        <section className="press-block">
          <h2>Product Hunt</h2>
          <p>Submit or share on Product Hunt so other developers can find these tools.</p>
          <a href={productHuntUrl} target="_blank" rel="noopener noreferrer" className="button-primary">
            Share on Product Hunt →
          </a>
        </section>

        <section className="press-block">
          <h2>Twitter / X</h2>
          <p>Tweet about FormatHub. Pre-filled text below.</p>
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="button-primary">
            Tweet →
          </a>
          <p className="press-copy-label">Suggested tweet:</p>
          <blockquote className="press-copy">
            Free in-browser developer tools: JSON formatter, JWT decoder, regex tester, 40+ more. No sign-up. Your data never leaves your device. {siteUrl}
          </blockquote>
        </section>

        <section className="press-block">
          <h2>LinkedIn</h2>
          <p>Share with your network.</p>
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="button-primary">
            Share on LinkedIn →
          </a>
        </section>

        <section className="press-block">
          <h2>Awesome lists & newsletters</h2>
          <p>If you run an awesome list or dev newsletter, you can use this blurb and link.</p>
          <p className="press-copy-label">One-liner:</p>
          <blockquote className="press-copy">
            <strong>FormatHub</strong> — Free in-browser dev tools: JSON formatter, URL encoder, Base64, JWT decoder, regex tester, timestamp converter, and 40+ more. No sign-up. {siteUrl}
          </blockquote>
          <p className="press-copy-label">Markdown for README / awesome list:</p>
          <pre className="press-code">
{`- [FormatHub](${siteUrl}) - Free in-browser JSON formatter, JWT decoder, regex tester, 40+ tools. No sign-up.`}
          </pre>
        </section>

        <section className="press-block">
          <h2>Blog or site</h2>
          <p>Link to us from your blog, docs, or tool roundup. Every quality backlink helps.</p>
          <p className="press-copy-label">Link URL:</p>
          <pre className="press-code">{siteUrl}</pre>
        </section>
      </div>
    </section>
  );
}
