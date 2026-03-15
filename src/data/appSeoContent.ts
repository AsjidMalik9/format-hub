import type { ToolSeoContent } from "@/data/toolSeoContent";

export const homeSeoContent: ToolSeoContent = {
  whatIs:
    "FormatHub is a free collection of in-browser developer tools: JSON formatter, URL encoder, Base64, JWT decoder, regex tester, timestamp converter, and 40+ more. Every tool runs locally in your browser—your data never leaves your device and no sign-up is required.",
  howItWorks:
    "Open the site, search or browse by category (Data, Text, Security, Time, Web, Code, Media, PDF), and click a tool. Paste your input, use the controls, and copy or download the result. All processing happens in JavaScript in your browser; nothing is uploaded to our servers.",
  useCases: [
    "Quick JSON formatting, validation, or minification while debugging APIs",
    "Encoding or decoding URLs, Base64, or JWT tokens during development",
    "Testing regex, timestamps, hashes, or cron expressions",
    "Converting between JSON, YAML, CSV, Markdown, and HTML",
    "Parsing query strings, URLs, User-Agent, or HTTP headers",
    "Generating UUIDs, passwords, slugs, or placeholder text",
    "Formatting SQL, colors, or PDFs and images—all without leaving the browser"
  ],
  faq: [
    { q: "Is my data sent to your servers?", a: "No. Every tool runs entirely in your browser. Your inputs are never uploaded." },
    { q: "Do I need to create an account?", a: "No. All tools are free and work without sign-up." },
    { q: "Are these tools really free?", a: "Yes. The site is free to use. We may show ads to support hosting." },
    { q: "Can I use these tools offline?", a: "After the first load, most tools work offline if the page is cached." },
    { q: "Which browsers are supported?", a: "Modern Chrome, Firefox, Safari, and Edge. JavaScript must be enabled." }
  ]
};

export const toolsIndexSeoContent: ToolSeoContent = {
  whatIs:
    "This page lists all developer tools on FormatHub: JSON formatter, JSON diff, Base64 encoder/decoder, URL encoder, JWT decoder, regex tester, timestamp converter, UUID generator, and 40+ more. Each tool has its own page with a focused UI and no sign-up.",
  howItWorks:
    "Browse the grid by category (Data, Text, Security, Time, Web, Code, Media, PDF) or use the search on the home page to find a tool. Click “Open tool” to go to the dedicated page. Every tool runs in your browser and keeps your data local.",
  useCases: [
    "Finding the right tool for formatting, encoding, or converting data",
    "Bookmarking or sharing links to specific tools",
    "Discovering converters (JSON↔YAML, CSV, Markdown↔HTML) and parsers",
    "Accessing security tools (JWT, hash, HMAC, bcrypt, password generator)",
    "Using time tools (timestamp, cron, timezone, ISO date) and web utilities (URL parser, query string, slug, IP validator)"
  ],
  faq: [
    { q: "How many tools are there?", a: "Over 40 tools, grouped into Data, Text, Security, Time, Web, Code, Media, and PDF." },
    { q: "Do I need to sign up?", a: "No. Open any tool and use it immediately." },
    { q: "Is my data sent to a server?", a: "No. All tools run in your browser; your data stays on your device." }
  ]
};
