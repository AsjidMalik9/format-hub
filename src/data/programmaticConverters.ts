/**
 * Programmatic converter pages for SEO scale.
 * Each has a unique slug, title, description, and links to the actual tool.
 */

export type ProgrammaticConverter = {
  slug: string;
  title: string;
  description: string;
  /** Existing tool slug under /tools/[toolSlug] */
  toolSlug: string;
  fromFormat: string;
  toFormat: string;
};

export const programmaticConverters: ProgrammaticConverter[] = [
  { slug: "json-to-yaml", title: "JSON to YAML Converter", description: "Convert JSON to YAML format online. Free, in-browser.", toolSlug: "json-to-yaml", fromFormat: "JSON", toFormat: "YAML" },
  { slug: "yaml-to-json", title: "YAML to JSON Converter", description: "Convert YAML to JSON format online. Free, in-browser.", toolSlug: "yaml-to-json", fromFormat: "YAML", toFormat: "JSON" },
  { slug: "json-to-csv", title: "JSON to CSV Converter", description: "Convert JSON array to CSV online. Free, in-browser.", toolSlug: "json-to-csv", fromFormat: "JSON", toFormat: "CSV" },
  { slug: "csv-to-json", title: "CSV to JSON Converter", description: "Convert CSV to JSON array online. Free, in-browser.", toolSlug: "csv-to-json", fromFormat: "CSV", toFormat: "JSON" },
  { slug: "json-to-xml", title: "JSON to XML Converter", description: "Convert JSON to XML online. Free, in-browser.", toolSlug: "json-to-xml", fromFormat: "JSON", toFormat: "XML" },
  { slug: "xml-to-json", title: "XML to JSON Converter", description: "Convert XML to JSON online. Free, in-browser.", toolSlug: "xml-to-json", fromFormat: "XML", toFormat: "JSON" },
  { slug: "markdown-to-html", title: "Markdown to HTML Converter", description: "Convert Markdown to HTML online. Free, in-browser.", toolSlug: "markdown-to-html", fromFormat: "Markdown", toFormat: "HTML" },
  { slug: "html-to-markdown", title: "HTML to Markdown Converter", description: "Convert HTML to Markdown online. Free, in-browser.", toolSlug: "html-to-markdown", fromFormat: "HTML", toFormat: "Markdown" },
  { slug: "html-to-jsx", title: "HTML to JSX Converter", description: "Convert HTML to JSX for React. Free, in-browser.", toolSlug: "html-to-jsx", fromFormat: "HTML", toFormat: "JSX" },
  { slug: "base64-encode", title: "Base64 Encode Online", description: "Encode text to Base64 online. Free, in-browser.", toolSlug: "base64-encoder", fromFormat: "Text", toFormat: "Base64" },
  { slug: "base64-decode", title: "Base64 Decode Online", description: "Decode Base64 to text online. Free, in-browser.", toolSlug: "base64-decoder", fromFormat: "Base64", toFormat: "Text" },
  { slug: "url-encode", title: "URL Encode Online", description: "URL-encode text for query strings and URLs. Free, in-browser.", toolSlug: "url-encoder-decoder", fromFormat: "Text", toFormat: "URL-encoded" },
  { slug: "url-decode", title: "URL Decode Online", description: "Decode URL-encoded text. Free, in-browser.", toolSlug: "url-encoder-decoder", fromFormat: "URL-encoded", toFormat: "Text" },
  { slug: "json-formatter", title: "JSON Formatter Online", description: "Format, validate and minify JSON. Free, in-browser.", toolSlug: "json-formatter", fromFormat: "JSON", toFormat: "JSON" },
  { slug: "json-validator", title: "JSON Validator Online", description: "Validate JSON syntax online. Free, in-browser.", toolSlug: "json-formatter", fromFormat: "JSON", toFormat: "Validated" },
  { slug: "jwt-decode", title: "JWT Decoder Online", description: "Decode and inspect JWT tokens. Free, in-browser.", toolSlug: "jwt-encoder-decoder", fromFormat: "JWT", toFormat: "JSON" },
  { slug: "unix-timestamp-converter", title: "Unix Timestamp Converter", description: "Convert Unix timestamp to date and back. Free, in-browser.", toolSlug: "timestamp-converter", fromFormat: "Unix", toFormat: "Date" },
  { slug: "uuid-generator", title: "UUID Generator Online", description: "Generate UUIDs v4 online. Free, in-browser.", toolSlug: "uuid-generator", fromFormat: "—", toFormat: "UUID" },
  { slug: "regex-tester", title: "Regex Tester Online", description: "Test regular expressions against sample text. Free, in-browser.", toolSlug: "regex-tester", fromFormat: "Regex", toFormat: "Matches" },
  { slug: "sql-formatter", title: "SQL Formatter Online", description: "Format and beautify SQL. Free, in-browser.", toolSlug: "sql-formatter", fromFormat: "SQL", toFormat: "SQL" },
  { slug: "color-converter", title: "Color Converter Online", description: "Convert HEX, RGB, HSL. Free, in-browser.", toolSlug: "color-converter", fromFormat: "Color", toFormat: "Color" },
];

export function getProgrammaticConverter(slug: string): ProgrammaticConverter | null {
  return programmaticConverters.find((c) => c.slug === slug) ?? null;
}
