import type { Metadata } from "next";
import { siteUrl, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Contact — ${siteName}`,
  description: `Contact ${siteName} for questions, feedback, or support.`,
  alternates: { canonical: `${siteUrl}/contact` },
  robots: { index: true, follow: true }
};

const CONTACT_EMAIL = "contact@formathub.com";

export default function ContactPage() {
  return (
    <section className="shell page-content">
      <div className="page-head">
        <h1>Contact</h1>
        <p>Get in touch with the {siteName} team.</p>
      </div>

      <div className="legal-content">
        <p>
          For questions, feedback, support, or partnership inquiries, you can reach us at:
        </p>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>
          We aim to respond within a few business days. For privacy-related requests, please see our <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}
