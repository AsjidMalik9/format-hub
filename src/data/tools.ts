export type ToolCategory = "Data" | "Text" | "Security" | "Time" | "Web" | "Code" | "Media" | "PDF";

export type ToolItem = {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
};

export const categories: ToolCategory[] = [
  "Data",
  "Text",
  "Security",
  "Time",
  "Web",
  "Code",
  "Media",
  "PDF"
];

export const tools: ToolItem[] = [
  { slug: "json-formatter", name: "JSON Formatter", description: "Pretty print, validate and minify JSON.", category: "Data" },
  { slug: "json-diff", name: "JSON Diff", description: "Compare two JSON payloads side by side.", category: "Data" },
  { slug: "json-xml-formatter", name: "JSON / XML Formatter", description: "Format, minify, and validate JSON/XML quickly.", category: "Data" },
  { slug: "json-to-yaml", name: "JSON → YAML", description: "Convert JSON to YAML format.", category: "Data" },
  { slug: "yaml-to-json", name: "YAML → JSON", description: "Convert YAML to JSON format.", category: "Data" },
  { slug: "json-to-csv", name: "JSON → CSV", description: "Export a JSON array to CSV format.", category: "Data" },
  { slug: "csv-to-json", name: "CSV → JSON", description: "Parse a CSV document into a JSON array.", category: "Data" },
  { slug: "json-to-xml", name: "JSON → XML", description: "Convert JSON to XML format.", category: "Data" },
  { slug: "xml-to-json", name: "XML → JSON", description: "Convert XML to JSON format.", category: "Data" },
  { slug: "json-schema-generator", name: "JSON Schema Generator", description: "Paste JSON and get a JSON Schema instantly.", category: "Data" },
  { slug: "openapi-validator", name: "OpenAPI Validator", description: "Validate OpenAPI (Swagger) JSON or YAML in the browser.", category: "Data" },
  { slug: "base64-encoder", name: "Base64 Encoder", description: "Encode plain text to Base64.", category: "Text" },
  { slug: "base64-decoder", name: "Base64 Decoder", description: "Decode Base64 into plain text.", category: "Text" },
  { slug: "url-encoder-decoder", name: "URL Encoder", description: "Encode text for URLs and decode it back.", category: "Text" },
  { slug: "regex-tester", name: "Regex Tester", description: "Test regular expressions against input text.", category: "Text" },
  { slug: "markdown-to-html", name: "Markdown → HTML", description: "Convert Markdown text to HTML markup.", category: "Text" },
  { slug: "html-to-markdown", name: "HTML → Markdown", description: "Convert HTML markup back to Markdown.", category: "Text" },
  { slug: "html-escape", name: "HTML Escape", description: "Escape or unescape HTML entities in text.", category: "Text" },
  { slug: "text-diff", name: "Text Diff", description: "Compare two text blocks line by line or word by word.", category: "Text" },
  { slug: "text-tools", name: "Text Case Converter", description: "Convert text between camelCase, snake_case, PascalCase, etc.", category: "Text" },
  { slug: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate random placeholder text for designs and mockups.", category: "Text" },
  { slug: "random-string", name: "Random String Generator", description: "Generate random strings for tokens and IDs with custom rules.", category: "Text" },
  { slug: "jwt-encoder-decoder", name: "JWT Decoder", description: "Inspect JWT headers and payload locally.", category: "Security" },
  { slug: "hash-generator", name: "Hash Generator", description: "Generate SHA-1, SHA-256 and SHA-512 hashes in the browser.", category: "Security" },
  { slug: "md5-hash", name: "MD5 Hash Generator", description: "Generate MD5 cryptographic hashes instantly.", category: "Security" },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate v1 and v4 UUIDs, single or in batches.", category: "Security" },
  { slug: "password-generator", name: "Password Generator", description: "Generate strong passwords with custom rules.", category: "Security" },
  { slug: "hmac-generator", name: "HMAC Generator", description: "Compute HMAC-SHA256/512 from a message and secret.", category: "Security" },
  { slug: "bcrypt-hash", name: "Bcrypt Hash", description: "Hash and verify passwords with bcrypt.", category: "Security" },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Convert Unix timestamps to ISO dates and back.", category: "Time" },
  { slug: "cron-parser", name: "Cron Parser", description: "Preview upcoming runs for a cron expression.", category: "Time" },
  { slug: "timestamp-generator", name: "Timestamp Generator", description: "Convert a date and time to a Unix timestamp.", category: "Time" },
  { slug: "timezone-converter", name: "Timezone Converter", description: "Convert a time between any two IANA timezones.", category: "Time" },
  { slug: "iso-date-formatter", name: "ISO Date Formatter", description: "Format dates between ISO, Unix, Local and RFC formats.", category: "Time" },
  { slug: "query-string-parser", name: "Query String Parser", description: "Parse a query string into a JSON object.", category: "Web" },
  { slug: "query-string-builder", name: "Query String Builder", description: "Build a query string from key-value pairs.", category: "Web" },
  { slug: "url-parser", name: "URL Parser", description: "Break a URL into its components: protocol, host, path, query, fragment.", category: "Web" },
  { slug: "slug-generator", name: "Slug Generator", description: "Convert any text into a URL-friendly slug.", category: "Web" },
  { slug: "ip-validator", name: "IP Validator", description: "Validate and check if an IP address is an IPv4 or IPv6 format.", category: "Web" },
  { slug: "user-agent-parser", name: "User-Agent Parser", description: "Parse a browser User-Agent string to extract OS, browser, engine, and device.", category: "Web" },
  { slug: "http-headers-parser", name: "HTTP Headers Parser", description: "Parse raw HTTP headers into a structured JSON object.", category: "Web" },
  { slug: "html-to-jsx", name: "HTML → JSX", description: "Convert HTML markup to valid JSX for React.", category: "Code" },
  { slug: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries.", category: "Code" },
  { slug: "color-converter", name: "Color Converter", description: "Convert colors between HEX, RGB and HSL formats.", category: "Code" },
  { slug: "image-compressor", name: "Image Compressor", description: "Compress JPG output in-browser with quality controls.", category: "Media" },
  { slug: "pdf-tools", name: "PDF Tools", description: "Merge, extract, rotate and add text to PDFs client-side.", category: "PDF" }
];

export const toolCount = tools.length;

export function getToolBySlug(slug: string): ToolItem | undefined {
  return tools.find((t) => t.slug === slug);
}
