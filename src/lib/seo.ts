/**
 * Base URL for canonical links, sitemap, and Open Graph.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://yoursite.com).
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://formathub.com";

export const siteName = "FormatHub";

export const defaultDescription =
  "Free online developer tools: JSON formatter, URL encoder, Base64, JWT decoder, regex tester, SQL formatter, and 40+ more. No sign-up. All run in your browser.";

export const defaultKeywords = [
  "json formatter",
  "json validator",
  "url encoder",
  "url decoder",
  "base64 encode",
  "base64 decode",
  "jwt decoder",
  "regex tester",
  "sql formatter",
  "markdown to html",
  "developer tools",
  "online tools",
  "free tools",
  "browser tools"
].join(", ");

export function toolPageUrl(slug: string): string {
  return `${siteUrl}/tools/${slug}`;
}

export function convertPageUrl(slug: string): string {
  return `${siteUrl}/convert/${slug}`;
}
