import type { Metadata } from "next";
import { siteUrl, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteName}`,
  description: `Privacy policy for ${siteName}. How we use cookies, data, and Google AdSense.`,
  alternates: { canonical: `${siteUrl}/privacy` },
  robots: { index: true, follow: true }
};

export default function PrivacyPage() {
  return (
    <section className="shell page-content">
      <div className="page-head">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="legal-content">
        <p>
          {siteName} (&quot;we&quot;, &quot;our&quot;, or &quot;the site&quot;) provides free in-browser developer tools. This policy describes how we handle information when you use the site.
        </p>

        <h2>1. Data processed by our tools</h2>
        <p>
          Our tools (e.g. JSON formatter, JWT decoder, Base64 encoder) run entirely in your browser. The text or data you paste into a tool is <strong>not</strong> sent to our servers. We do not store, log, or have access to the content you enter in the tool interfaces.
        </p>

        <h2>2. Cookies and similar technologies</h2>
        <p>
          We may use cookies and similar technologies for:
        </p>
        <ul>
          <li><strong>Advertising</strong> — We may use Google AdSense or other ad partners to show ads. These partners may set cookies to deliver relevant ads, measure ad performance, and prevent fraud. You can control ad personalization via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</li>
          <li><strong>Analytics</strong> — We may use analytics (e.g. Google Analytics) to understand how visitors use the site (e.g. pages visited, referrer). This may involve cookies.</li>
          <li><strong>Essential operation</strong> — Cookies that are strictly necessary for the site to function (e.g. preferences, security).</li>
        </ul>

        <h2>3. Information we may collect</h2>
        <p>
          Aside from tool input (which stays in your browser), we or our partners may collect:
        </p>
        <ul>
          <li>IP address and general location</li>
          <li>Browser type and device information</li>
          <li>Pages visited and time on site</li>
          <li>Referrer (e.g. search engine or link you came from)</li>
        </ul>
        <p>
          This is typical for websites that show ads or use analytics. We do not sell your personal data.
        </p>

        <h2>4. Third-party services</h2>
        <p>
          The site may use third-party services such as:
        </p>
        <ul>
          <li><strong>Google AdSense</strong> — To display advertisements. Google&apos;s use of advertising cookies is subject to the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google Advertising Policy</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
          <li><strong>Analytics providers</strong> — To understand traffic and usage.</li>
        </ul>
        <p>
          These services have their own privacy policies. We do not control their data practices.
        </p>

        <h2>5. Your choices</h2>
        <p>
          You can block or delete cookies via your browser settings. Blocking cookies may affect ad relevance and some site features. You can opt out of personalized advertising through <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google&apos;s ad settings</a> or the <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">NAI opt-out</a>.
        </p>

        <h2>6. Children</h2>
        <p>
          The site is not directed at children under 13. We do not knowingly collect personal information from children.
        </p>

        <h2>7. Changes</h2>
        <p>
          We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version. Continued use of the site after changes constitutes acceptance.
        </p>

        <h2>8. Contact</h2>
        <p>
          For privacy-related questions, please use our <a href="/contact">Contact</a> page.
        </p>
      </div>
    </section>
  );
}
