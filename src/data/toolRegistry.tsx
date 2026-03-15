import type { ReactNode } from "react";
import { ToolPage } from "@/components/ToolPage";
import { JsonXmlFormatter } from "@/components/tools/JsonXmlFormatter";
import { UrlEncoderDecoder } from "@/components/tools/UrlEncoderDecoder";
import { JwtEncoderDecoder } from "@/components/tools/JwtEncoderDecoder";
import { SqlFormatter } from "@/components/tools/SqlFormatter";
import { RegexTester } from "@/components/tools/RegexTester";
import { MarkdownToHtml } from "@/components/tools/MarkdownToHtml";
import { ImageCompressor } from "@/components/tools/ImageCompressor";
import { PdfTools } from "@/components/tools/PdfTools";
import { TextTools } from "@/components/tools/TextTools";
import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { Base64Decoder } from "@/components/tools/Base64Decoder";
import { JsonDiff } from "@/components/tools/JsonDiff";
import { HashGenerator } from "@/components/tools/HashGenerator";
import { Md5Hash } from "@/components/tools/Md5Hash";
import { UuidGenerator } from "@/components/tools/UuidGenerator";
import { TimestampConverter } from "@/components/tools/TimestampConverter";
import { QueryStringParser } from "@/components/tools/QueryStringParser";
import { QueryStringBuilder } from "@/components/tools/QueryStringBuilder";
import { UrlParser } from "@/components/tools/UrlParser";
import { SlugGenerator } from "@/components/tools/SlugGenerator";
import { IpValidator } from "@/components/tools/IpValidator";
import { JsonToYaml } from "@/components/tools/JsonToYaml";
import { YamlToJson } from "@/components/tools/YamlToJson";
import { JsonToCsv } from "@/components/tools/JsonToCsv";
import { CsvToJson } from "@/components/tools/CsvToJson";
import { JsonToXml } from "@/components/tools/JsonToXml";
import { XmlToJson } from "@/components/tools/XmlToJson";
import { JsonSchemaGenerator } from "@/components/tools/JsonSchemaGenerator";
import { OpenApiValidator } from "@/components/tools/OpenApiValidator";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { HmacGenerator } from "@/components/tools/HmacGenerator";
import { BcryptHash } from "@/components/tools/BcryptHash";
import { CronParser } from "@/components/tools/CronParser";
import { TimestampGenerator } from "@/components/tools/TimestampGenerator";
import { TimezoneConverter } from "@/components/tools/TimezoneConverter";
import { IsoDateFormatter } from "@/components/tools/IsoDateFormatter";
import { HtmlEscape } from "@/components/tools/HtmlEscape";
import { TextDiff } from "@/components/tools/TextDiff";
import { LoremIpsum } from "@/components/tools/LoremIpsum";
import { RandomString } from "@/components/tools/RandomString";
import { UserAgentParser } from "@/components/tools/UserAgentParser";
import { HttpHeadersParser } from "@/components/tools/HttpHeadersParser";
import { HtmlToJsx } from "@/components/tools/HtmlToJsx";
import { ColorConverter } from "@/components/tools/ColorConverter";
import { HtmlToMarkdown } from "@/components/tools/HtmlToMarkdown";
import { getToolBySlug } from "./tools";

export type ToolEntry = {
  title: string;
  description: string;
  component: ReactNode;
};

function wrapTool(title: string, description: string, component: ReactNode): ToolEntry {
  return {
    title,
    description,
    component: (
      <ToolPage title={title} description={description}>
        {component}
      </ToolPage>
    )
  };
}

const registry: Record<string, ToolEntry> = {
  "json-formatter": wrapTool("JSON Formatter", "Pretty print, validate and minify JSON.", <JsonXmlFormatter />),
  "json-diff": wrapTool("JSON Diff", "Compare two JSON payloads side by side.", <JsonDiff />),
  "json-xml-formatter": wrapTool("JSON / XML Formatter", "Format structured data fast for debugging and API work.", <JsonXmlFormatter />),
  "json-to-yaml": wrapTool("JSON → YAML", "Convert JSON to YAML format.", <JsonToYaml />),
  "yaml-to-json": wrapTool("YAML → JSON", "Convert YAML to JSON format.", <YamlToJson />),
  "json-to-csv": wrapTool("JSON → CSV", "Export a JSON array to CSV format.", <JsonToCsv />),
  "csv-to-json": wrapTool("CSV → JSON", "Parse a CSV document into a JSON array.", <CsvToJson />),
  "json-to-xml": wrapTool("JSON → XML", "Convert JSON to XML format.", <JsonToXml />),
  "xml-to-json": wrapTool("XML → JSON", "Convert XML to JSON format.", <XmlToJson />),
  "json-schema-generator": wrapTool("JSON Schema Generator", "Paste JSON and get a JSON Schema instantly.", <JsonSchemaGenerator />),
  "openapi-validator": wrapTool("OpenAPI Validator", "Validate OpenAPI (Swagger) JSON or YAML in the browser.", <OpenApiValidator />),
  "base64-encoder": wrapTool("Base64 Encoder", "Encode plain text to Base64.", <Base64Encoder />),
  "base64-decoder": wrapTool("Base64 Decoder", "Decode Base64 into plain text.", <Base64Decoder />),
  "url-encoder-decoder": wrapTool("URL Encoder", "Encode text for URLs and decode it back.", <UrlEncoderDecoder />),
  "regex-tester": wrapTool("Regex Tester", "Test regular expressions against input text.", <RegexTester />),
  "markdown-to-html": wrapTool("Markdown → HTML", "Convert Markdown text to HTML markup.", <MarkdownToHtml />),
  "html-to-markdown": wrapTool("HTML → Markdown", "Convert HTML markup back to Markdown.", <HtmlToMarkdown />),
  "html-escape": wrapTool("HTML Escape", "Escape or unescape HTML entities in text.", <HtmlEscape />),
  "text-diff": wrapTool("Text Diff", "Compare two text blocks line by line or word by word.", <TextDiff />),
  "text-tools": wrapTool("Text Case Converter", "Convert text between camelCase, snake_case, PascalCase, etc.", <TextTools />),
  "lorem-ipsum": wrapTool("Lorem Ipsum Generator", "Generate random placeholder text for designs and mockups.", <LoremIpsum />),
  "random-string": wrapTool("Random String Generator", "Generate random strings for tokens and IDs with custom rules.", <RandomString />),
  "jwt-encoder-decoder": wrapTool("JWT Decoder", "Inspect JWT headers and payload locally.", <JwtEncoderDecoder />),
  "hash-generator": wrapTool("Hash Generator", "Generate SHA-1, SHA-256 and SHA-512 hashes in the browser.", <HashGenerator />),
  "md5-hash": wrapTool("MD5 Hash Generator", "Generate MD5 cryptographic hashes instantly.", <Md5Hash />),
  "uuid-generator": wrapTool("UUID Generator", "Generate v1 and v4 UUIDs, single or in batches.", <UuidGenerator />),
  "password-generator": wrapTool("Password Generator", "Generate strong passwords with custom rules.", <PasswordGenerator />),
  "hmac-generator": wrapTool("HMAC Generator", "Compute HMAC-SHA256/512 from a message and secret.", <HmacGenerator />),
  "bcrypt-hash": wrapTool("Bcrypt Hash", "Hash and verify passwords with bcrypt.", <BcryptHash />),
  "timestamp-converter": wrapTool("Timestamp Converter", "Convert Unix timestamps to ISO dates and back.", <TimestampConverter />),
  "cron-parser": wrapTool("Cron Parser", "Preview upcoming runs for a cron expression.", <CronParser />),
  "timestamp-generator": wrapTool("Timestamp Generator", "Convert a date and time to a Unix timestamp.", <TimestampGenerator />),
  "timezone-converter": wrapTool("Timezone Converter", "Convert a time between any two IANA timezones.", <TimezoneConverter />),
  "iso-date-formatter": wrapTool("ISO Date Formatter", "Format dates between ISO, Unix, Local and RFC formats.", <IsoDateFormatter />),
  "query-string-parser": wrapTool("Query String Parser", "Parse a query string into a JSON object.", <QueryStringParser />),
  "query-string-builder": wrapTool("Query String Builder", "Build a query string from key-value pairs.", <QueryStringBuilder />),
  "url-parser": wrapTool("URL Parser", "Break a URL into its components: protocol, host, path, query, fragment.", <UrlParser />),
  "slug-generator": wrapTool("Slug Generator", "Convert any text into a URL-friendly slug.", <SlugGenerator />),
  "ip-validator": wrapTool("IP Validator", "Validate and check if an IP address is an IPv4 or IPv6 format.", <IpValidator />),
  "user-agent-parser": wrapTool("User-Agent Parser", "Parse a browser User-Agent string to extract OS, browser, engine, and device.", <UserAgentParser />),
  "http-headers-parser": wrapTool("HTTP Headers Parser", "Parse raw HTTP headers into a structured JSON object.", <HttpHeadersParser />),
  "html-to-jsx": wrapTool("HTML → JSX", "Convert HTML markup to valid JSX for React.", <HtmlToJsx />),
  "sql-formatter": wrapTool("SQL Formatter", "Format and beautify SQL queries.", <SqlFormatter />),
  "color-converter": wrapTool("Color Converter", "Convert colors between HEX, RGB and HSL formats.", <ColorConverter />),
  "image-compressor": wrapTool("Image Compressor", "Compress JPG output in-browser with quality controls.", <ImageCompressor />),
  "pdf-tools": wrapTool("PDF Tools", "Merge, extract, rotate and add text to PDFs client-side.", <PdfTools />)
};

export function getToolEntry(slug: string): ToolEntry | null {
  return registry[slug] ?? null;
}

export function getToolEntryOrMeta(slug: string): { entry: ToolEntry | null; meta: { title: string; description: string } | null } {
  const tool = getToolBySlug(slug);
  const entry = getToolEntry(slug);
  if (entry) return { entry, meta: { title: entry.title, description: entry.description } };
  if (tool) return { entry: null, meta: { title: tool.name, description: tool.description } };
  return { entry: null, meta: null };
}
