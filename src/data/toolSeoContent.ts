export type ToolSeoContent = {
  whatIs: string;
  howItWorks: string;
  example?: string;
  useCases: string[];
  faq: { q: string; a: string }[];
};

const content: Record<string, ToolSeoContent> = {
  "json-formatter": {
    whatIs:
      "JSON (JavaScript Object Notation) formatting makes JSON data readable by adding indentation and line breaks. Minified JSON is valid but hard to read; a JSON formatter converts it into a human-friendly structure so you can debug APIs, configs, and data payloads quickly.",
    howItWorks:
      "Paste or upload your JSON. The formatter parses it and re-serializes it with consistent indentation (e.g. 2 or 4 spaces). You can also validate (check for syntax errors) and minify (remove whitespace) for production use. All processing runs in your browser—nothing is sent to a server.",
    example: 'Input: `{"name":"Alice","age":30}` → Formatted output with indentation and line breaks for each key-value pair.',
    useCases: [
      "Debugging API responses and webhooks",
      "Reading config files (e.g. package.json, tsconfig.json)",
      "Validating JSON before sending to a backend",
      "Minifying JSON for smaller payloads"
    ],
    faq: [
      { q: "Is JSON formatting safe? Does my data leave the browser?", a: "Yes, it's safe. This tool runs entirely in your browser. Your JSON is never uploaded to our servers." },
      { q: "What is the difference between format and minify?", a: "Format (beautify) adds indentation and newlines for readability. Minify removes all unnecessary whitespace to reduce size." },
      { q: "Can I format invalid JSON?", a: "No. The formatter will report a parse error and show where the JSON is invalid so you can fix it." }
    ]
  },
  "jwt-encoder-decoder": {
    whatIs:
      "A JWT (JSON Web Token) decoder lets you inspect the header and payload of a JWT without verifying the signature. Developers use it to debug auth tokens, see claims (e.g. exp, sub), and understand what's inside a token. You can also encode header and payload into a new JWT and optionally sign it with a secret (HMAC).",
    howItWorks:
      "JWTs have three base64url-encoded parts: header, payload, and signature. Paste a JWT and the decoder splits it, decodes the first two parts to JSON, and displays them. For encoding, you provide JSON for header and payload; the tool builds the token and can sign it with HMAC-SHA256 if you add a secret.",
    useCases: [
      "Debugging OAuth2 / OpenID Connect tokens",
      "Inspecting claims (exp, iat, sub) in production issues",
      "Testing APIs that require a JWT in the Authorization header",
      "Building or signing JWTs for local development"
    ],
    faq: [
      { q: "Does this verify the JWT signature?", a: "Decode only shows the contents; it does not verify the signature. Use your auth library or backend for verification." },
      { q: "Can I sign a JWT with a secret?", a: "Yes. In Encode mode, enter a secret and the tool will produce an HMAC-SHA256–signed JWT." },
      { q: "Is my JWT or secret sent to a server?", a: "No. Decoding and encoding run in your browser. Nothing is sent to our servers." }
    ]
  },
  "regex-tester": {
    whatIs:
      "A regex (regular expression) tester lets you run a pattern against sample text and see matches, groups, and replacements in real time. It's essential for validating patterns before putting them in code, learning regex, or debugging why a pattern doesn't match.",
    howItWorks:
      "Enter a regular expression and optional flags (e.g. g for global, i for case-insensitive). Paste or type test text. The tool runs the regex and highlights matches, lists captured groups, and can show replacement results. All execution happens in your browser.",
    useCases: [
      "Testing regex before adding to validation or search code",
      "Learning how regex and capture groups work",
      "Debugging patterns that don't match as expected",
      "Building replace rules for search-and-replace or parsers"
    ],
    faq: [
      { q: "Which regex flavor is used?", a: "JavaScript's native RegExp (ECMAScript). Flags like g, i, m are supported." },
      { q: "Can I test with multi-line text?", a: "Yes. Use the m flag for ^ and $ to match line boundaries." },
      { q: "Is my text or pattern sent to a server?", a: "No. Everything runs in your browser." }
    ]
  },
  "timestamp-converter": {
    whatIs:
      "A Unix timestamp converter turns Unix timestamps (seconds since 1970-01-01 UTC) into human-readable dates and times, and vice versa. Developers use it to debug logs, APIs, and databases that store time as a number.",
    howItWorks:
      "Enter a Unix timestamp (e.g. 1516239022) to get the corresponding ISO and local date/time. Or enter a date/time string to get the Unix timestamp. The tool uses your browser's time zone for local display.",
    useCases: [
      "Converting log timestamps to readable dates",
      "Checking API response or database timestamp values",
      "Generating timestamps for testing (e.g. exp claims in JWTs)",
      "Comparing times across time zones"
    ],
    faq: [
      { q: "What is a Unix timestamp?", a: "Seconds since January 1, 1970 00:00:00 UTC (or milliseconds in some systems)." },
      { q: "Do you support milliseconds?", a: "Yes. If the number is 13 digits or more, it's treated as milliseconds." },
      { q: "Is the conversion done in my browser?", a: "Yes. No data is sent to our servers." }
    ]
  },
  "url-encoder-decoder": {
    whatIs:
      "URL encoding (percent-encoding) converts special characters in a string so they can be safely used in URLs and query parameters. A URL encoder turns spaces and symbols into %XX codes; a decoder converts them back to plain text.",
    howItWorks:
      "Paste text or a URL segment. Click Encode to turn it into a URL-safe string (e.g. space → %20). Click Decode to convert percent-encoded text back to normal characters. Uses the standard encodeURIComponent / decodeURIComponent rules.",
    useCases: [
      "Encoding query parameters or path segments for APIs",
      "Decoding URLs from logs or browser address bars",
      "Building redirect or callback URLs safely",
      "Handling form data or JSON in query strings"
    ],
    faq: [
      { q: "When should I use URL encoding?", a: "Whenever you put user input or special characters into a URL or query string." },
      { q: "What's the difference from Base64?", a: "URL encoding is for URLs (limited character set). Base64 is for encoding binary or text in a different format." },
      { q: "Is my data sent to a server?", a: "No. Encoding and decoding run in your browser." }
    ]
  },
  "base64-encoder": {
    whatIs:
      "Base64 encoding converts binary data or text into a string of ASCII characters (A–Z, a–z, 0–9, +, /) so it can be safely used in JSON, XML, URLs (with base64url), or email. Decoding reverses the process.",
    howItWorks:
      "Paste text or Base64 string. Click Encode to convert to Base64 (UTF-8 encoded). Click Decode to convert Base64 back to plain text. The tool handles standard Base64; for URL-safe output, use a Base64url variant if needed.",
    useCases: [
      "Encoding small payloads for JSON or headers",
      "Decoding API responses or JWT segments",
      "Including binary or special text in configs",
      "Testing webhooks or auth that use Base64"
    ],
    faq: [
      { q: "Is Base64 encryption?", a: "No. Base64 is encoding, not encryption. Anyone can decode it without a key." },
      { q: "Does it support UTF-8 text?", a: "Yes. Multi-byte characters are encoded correctly when you encode text." },
      { q: "Where is the conversion done?", a: "In your browser. Your data is not sent to our servers." }
    ]
  },
  "base64-decoder": {
    whatIs:
      "Base64 decoding converts a Base64-encoded string back into the original binary or text data. Developers use it to inspect API payloads, decode JWT parts, or recover data stored in Base64.",
    howItWorks:
      "Paste a Base64 string (with or without padding). The decoder converts it back to UTF-8 text. Invalid Base64 will produce an error. All processing runs in your browser.",
    useCases: [
      "Decoding API or webhook payloads",
      "Inspecting Base64 segments in JWTs or headers",
      "Recovering stored or transmitted data",
      "Debugging integrations that use Base64"
    ],
    faq: [
      { q: "What is Base64?", a: "A way to represent binary data as ASCII text using 64 characters, often used in JSON and URLs." },
      { q: "Is decoded data sent anywhere?", a: "No. Decoding happens in your browser only." }
    ]
  },
  "uuid-generator": {
    whatIs:
      "A UUID (Universally Unique Identifier) generator creates random 128-bit IDs, typically in the standard format (e.g. 550e8400-e29b-41d4-a716-446655440000). Developers use UUIDs for primary keys, request IDs, and distributed systems.",
    howItWorks:
      "Click Generate to create one or more UUIDs using the browser's cryptographic random source (e.g. crypto.randomUUID()). You can generate a single ID or a batch for testing. No server is involved.",
    useCases: [
      "Generating primary keys for databases",
      "Creating unique request or correlation IDs",
      "Testing APIs that expect UUID parameters",
      "Seeding dev or test data"
    ],
    faq: [
      { q: "Are these UUIDs cryptographically random?", a: "Yes. They use the browser's crypto API (e.g. UUID v4 style)." },
      { q: "Can I generate UUID v1 (time-based)?", a: "This tool generates v4-style random UUIDs. Time-based v1 would require a different implementation." },
      { q: "Is generation done locally?", a: "Yes. Nothing is sent to our servers." }
    ]
  },
  "json-diff": {
    whatIs: "A JSON diff tool compares two JSON payloads and highlights added, removed, and changed keys and values. It helps you spot differences between API responses, configs, or snapshots without reading line-by-line.",
    howItWorks: "Paste two JSON blobs (e.g. left and right). The tool parses both, compares them structurally, and shows a side-by-side or unified diff with clear indicators for changes. All processing runs in your browser.",
    useCases: ["Comparing API responses before and after a change", "Reviewing config or env diffs", "Debugging webhook payload changes", "Auditing JSON exports"],
    faq: [
      { q: "Is my JSON sent to a server?", a: "No. The diff is computed entirely in your browser." },
      { q: "Does key order matter?", a: "For comparison, keys are compared by name; order differences are shown if relevant." }
    ]
  },
  "json-xml-formatter": {
    whatIs: "A JSON and XML formatter lets you pretty-print, minify, and validate both JSON and XML in one place. Useful when you work with APIs or configs that use either format.",
    howItWorks: "Paste JSON or XML. Choose format (indent) or minify. The tool parses and re-serializes with consistent styling. Validation errors are shown if the input is invalid. Runs in the browser.",
    useCases: ["Formatting API request/response bodies", "Validating JSON or XML from logs", "Minifying configs for production", "Quick conversion between JSON and XML views"],
    faq: [
      { q: "Can I convert JSON to XML or vice versa?", a: "This tool focuses on formatting and validation. Use the dedicated JSON ↔ XML converters for conversion." },
      { q: "Where is data processed?", a: "In your browser only. Nothing is uploaded." }
    ]
  },
  "json-to-yaml": {
    whatIs: "JSON to YAML conversion turns a JSON object or array into human-readable YAML. YAML is common in configs (Kubernetes, Docker Compose, CI) and is easier to edit by hand.",
    howItWorks: "Paste JSON. The converter parses it and outputs equivalent YAML with proper indentation and style. All processing runs locally in your browser.",
    useCases: ["Converting API responses to YAML configs", "Turning JSON into Kubernetes or CI config", "Editing JSON as YAML for readability", "Migrating config formats"],
    faq: [
      { q: "Is the conversion lossless?", a: "For standard JSON types (object, array, string, number, boolean, null), yes. Some edge cases may differ in representation." },
      { q: "Where does conversion happen?", a: "In your browser. Your data is not sent to any server." }
    ]
  },
  "yaml-to-json": {
    whatIs: "YAML to JSON conversion turns YAML config or data into JSON for use in APIs, frontends, or other tools that expect JSON.",
    howItWorks: "Paste YAML. The tool parses it and outputs valid JSON. Invalid YAML is reported with an error. Processing runs in your browser.",
    useCases: ["Converting Kubernetes or CI config to JSON", "Feeding YAML config into APIs", "Debugging YAML by viewing as JSON", "Automation scripts that need JSON"],
    faq: [
      { q: "Does it support all YAML features?", a: "It supports common YAML (maps, sequences, scalars). Very custom tags may be represented as plain values." },
      { q: "Is my YAML uploaded?", a: "No. Conversion runs entirely in your browser." }
    ]
  },
  "json-to-xml": {
    whatIs: "JSON to XML conversion turns a JSON object or array into XML. Useful when integrating with systems or APIs that expect XML.",
    howItWorks: "Paste JSON. The tool converts keys to elements and values to text or nested elements. Output is valid XML. Runs in your browser.",
    useCases: ["Integrating JSON APIs with XML systems", "Building XML feeds from JSON", "Legacy system integration", "SOAP or XML API testing"],
    faq: [
      { q: "Is the conversion lossless?", a: "Structure is preserved; some type nuances may differ. Attributes are not generated from JSON." },
      { q: "Where does conversion happen?", a: "In your browser. Your data is not sent to any server." }
    ]
  },
  "xml-to-json": {
    whatIs: "XML to JSON conversion turns XML into a JavaScript object (JSON). Essential for consuming XML APIs in modern apps.",
    howItWorks: "Paste XML. The tool parses it and outputs JSON. Attributes become @_prefixed keys. Processing runs in your browser.",
    useCases: ["Consuming XML APIs in JavaScript", "Converting RSS or SOAP to JSON", "Debugging XML responses", "Migrating XML config to JSON"],
    faq: [
      { q: "How are XML attributes handled?", a: "They appear as keys with an attribute prefix (e.g. @_id) in the JSON output." },
      { q: "Is my XML uploaded?", a: "No. Conversion runs entirely in your browser." }
    ]
  },
  "json-to-csv": {
    whatIs: "JSON to CSV conversion exports a JSON array of objects into a CSV file. Each object becomes a row; keys become column headers. Ideal for spreadsheets or data pipelines.",
    howItWorks: "Paste a JSON array (e.g. from an API). The tool infers headers from the first object and maps each object to a row. You can copy or download the CSV. Runs in the browser.",
    useCases: ["Exporting API data to Excel or Google Sheets", "Building CSV feeds from JSON APIs", "Quick data export for reporting", "Migrating JSON exports to CSV"],
    faq: [
      { q: "What if objects have different keys?", a: "All keys found across objects are used as columns; missing values are empty." },
      { q: "Are nested objects supported?", a: "Flattened or stringified depending on the tool; check the output for nested fields." }
    ]
  },
  "csv-to-json": {
    whatIs: "CSV to JSON conversion parses a CSV file or string into a JSON array of objects. The first row is used as keys; each following row becomes an object.",
    howItWorks: "Paste CSV (or upload). The parser reads the header row and converts each data row into an object. Output is valid JSON. All processing is client-side.",
    useCases: ["Importing spreadsheet data into APIs", "Converting CSV exports to JSON for apps", "Testing with CSV-backed data", "Quick ETL in the browser"],
    faq: [
      { q: "How are commas inside fields handled?", a: "Standard CSV quoting (double quotes around fields with commas) is supported." },
      { q: "Is my CSV sent to a server?", a: "No. Parsing runs entirely in your browser." }
    ]
  },
  "json-schema-generator": {
    whatIs: "A JSON Schema generator infers a JSON Schema from a sample JSON document. Useful for documenting APIs, validating payloads, or generating types.",
    howItWorks: "Paste sample JSON. The tool analyzes structure and types and outputs a JSON Schema (draft-07 style). You can copy it for use in validation or codegen. Runs in the browser.",
    useCases: ["Documenting API request/response shapes", "Generating validation schemas from samples", "Creating type definitions from JSON", "Onboarding new API consumers"],
    faq: [
      { q: "Which JSON Schema version?", a: "Typically draft-07 compatible. Check the output for $schema." },
      { q: "Is my JSON uploaded?", a: "No. Schema generation runs locally in your browser." }
    ]
  },
  "openapi-validator": {
    whatIs: "An OpenAPI validator checks OpenAPI (Swagger) 2.0 or 3.x documents for required fields and structure. Paste JSON or YAML and get instant validation.",
    howItWorks: "Paste your OpenAPI spec (JSON or YAML). The tool parses it and checks for openapi, info, and paths. Reports missing or invalid fields. Runs in your browser.",
    useCases: ["Validating specs before codegen or deployment", "Checking API docs for completeness", "CI-free validation during development", "Learning OpenAPI structure"],
    faq: [
      { q: "Which OpenAPI versions?", a: "OpenAPI 2.0 (Swagger) and 3.x. Required top-level fields are checked." },
      { q: "Is my spec uploaded?", a: "No. Validation runs entirely in your browser." }
    ]
  },
  "markdown-to-html": {
    whatIs: "Markdown to HTML conversion renders Markdown text into HTML. Essential for previews, docs, or when you need to embed Markdown in a web page.",
    howItWorks: "Paste Markdown. The tool parses it and outputs HTML (e.g. headings, lists, links, code blocks). Styling is minimal; you can copy the HTML into your app. Runs in the browser.",
    useCases: ["Rendering user content or docs", "Previewing Markdown before publish", "Converting README or docs to HTML", "Building static sites from Markdown"],
    faq: [
      { q: "Which Markdown flavor?", a: "CommonMark-style (headings, bold, italic, lists, links, code, blockquotes). Extensions may vary." },
      { q: "Is my Markdown sent elsewhere?", a: "No. Conversion happens in your browser." }
    ]
  },
  "html-to-markdown": {
    whatIs: "HTML to Markdown conversion turns HTML markup into Markdown. Useful when you need to move content from a CMS or web page into a Markdown-based system.",
    howItWorks: "Paste HTML. The tool walks the DOM and produces Markdown (headings, links, lists, etc.). Formatting is best-effort. Runs in your browser.",
    useCases: ["Converting CMS or blog HTML to Markdown", "Extracting content from web pages", "Migrating docs to Markdown", "Simplifying HTML for editing"],
    faq: [
      { q: "Is complex HTML fully supported?", a: "Simple and medium complexity HTML converts well; very nested or script-heavy HTML may be simplified." },
      { q: "Where is conversion done?", a: "In your browser. No data is uploaded." }
    ]
  },
  "html-escape": {
    whatIs: "HTML escape (and unescape) converts special characters so text is safe inside HTML (e.g. < → &lt;) or reverses that to get plain text back.",
    howItWorks: "Paste text. Escape turns <, >, &, and quotes into entities; unescape turns entities back to characters. Runs in the browser.",
    useCases: ["Sanitizing user input for HTML display", "Escaping strings for attributes", "Decoding HTML entities from logs", "Safe embedding of code in docs"],
    faq: [
      { q: "What characters are escaped?", a: "Typically <, >, &, \" and '. Full HTML entity lists may be used for unescape." },
      { q: "Is my text sent to a server?", a: "No. All processing is local." }
    ]
  },
  "text-diff": {
    whatIs: "A text diff tool compares two text blocks and highlights line-by-line or word-by-word differences. Useful for code, configs, or any text comparison.",
    howItWorks: "Paste two texts (e.g. old and new). The tool computes a diff and shows added, removed, and unchanged sections. Runs in your browser.",
    useCases: ["Comparing config or code versions", "Reviewing copy or documentation changes", "Debugging log or output differences", "Quick before/after comparison"],
    faq: [
      { q: "Is my text uploaded?", a: "No. The diff is computed entirely in your browser." },
      { q: "Can I compare large files?", a: "Very large inputs may be slow; typical paragraphs or files work fine." }
    ]
  },
  "text-tools": {
    whatIs: "Text case conversion changes text between camelCase, snake_case, PascalCase, kebab-case, and other conventions. Essential for code and API naming.",
    howItWorks: "Paste text. Choose the target case; the tool converts words and separators accordingly. Multiple formats are supported. Runs in the browser.",
    useCases: ["Converting variable or column names", "Normalizing API keys or env vars", "Formatting headers or titles", "Bulk renaming for code"],
    faq: [
      { q: "Which cases are supported?", a: "Typically camelCase, PascalCase, snake_case, kebab-case, and title case." },
      { q: "Is my text sent anywhere?", a: "No. Conversion is local." }
    ]
  },
  "lorem-ipsum": {
    whatIs: "A Lorem Ipsum generator produces placeholder text (e.g. Lorem ipsum dolor sit amet) for mockups, wireframes, and design. You choose length and sometimes format.",
    howItWorks: "Select number of paragraphs or words. Generate to get placeholder text. Copy and paste into your design or prototype. Runs in the browser.",
    useCases: ["Filling mockups and wireframes", "Testing layout with realistic text length", "Placeholder content for demos", "Design and front-end workflow"],
    faq: [
      { q: "Is the text random?", a: "It uses the classic Lorem ipsum pattern; some generators add variation." },
      { q: "Where is it generated?", a: "In your browser. No server involved." }
    ]
  },
  "random-string": {
    whatIs: "A random string generator creates strings of random characters for tokens, IDs, passwords, or test data. You can set length and character set.",
    howItWorks: "Set length and options (e.g. alphanumeric, hex). Generate to get one or more random strings. Uses the browser's secure random source. Runs locally.",
    useCases: ["Generating API keys or tokens", "Creating test IDs", "One-off passwords or secrets", "Seeding dev data"],
    faq: [
      { q: "Is it cryptographically random?", a: "When using the crypto API, yes. Suitable for non-critical randomness." },
      { q: "Is generation done locally?", a: "Yes. Nothing is sent to a server." }
    ]
  },
  "hash-generator": {
    whatIs: "A hash generator computes SHA-1, SHA-256, or SHA-512 hashes from text or files. Used for checksums, integrity checks, and some auth flows.",
    howItWorks: "Paste text (or upload a file). Choose the algorithm. The tool outputs the hash in hex. All hashing runs in your browser.",
    useCases: ["Verifying file or payload integrity", "Computing checksums", "Debugging webhook signatures", "Learning hash algorithms"],
    faq: [
      { q: "Are hashes reversible?", a: "No. Hash functions are one-way. You cannot recover the input from the hash." },
      { q: "Is my input sent to a server?", a: "No. Hashing is done locally." }
    ]
  },
  "md5-hash": {
    whatIs: "An MD5 hash generator computes the MD5 checksum of text or a file. MD5 is not secure for passwords but is still used for checksums and legacy systems.",
    howItWorks: "Paste text or upload a file. The tool outputs the MD5 hash in hex. Processing runs in your browser.",
    useCases: ["Legacy checksums and cache keys", "Comparing files quickly", "Debugging old systems that use MD5", "Non-security checksums"],
    faq: [
      { q: "Should I use MD5 for passwords?", a: "No. Use bcrypt or Argon2. MD5 is broken for security." },
      { q: "Where is hashing done?", a: "In your browser. No data is uploaded." }
    ]
  },
  "password-generator": {
    whatIs: "A password generator creates strong, random passwords with configurable length and character sets. Use it for new accounts, API keys, or temporary secrets.",
    howItWorks: "Set length and options (uppercase, numbers, symbols). Generate to get a password. You can generate several and pick one. Uses secure random in the browser.",
    useCases: ["Creating account passwords", "Generating API or app secrets", "Temporary access codes", "Security best practices"],
    faq: [
      { q: "Is the password shown to anyone else?", a: "No. It is generated and displayed only in your browser." },
      { q: "Can I copy it easily?", a: "Yes. Use the copy button or select and copy." }
    ]
  },
  "hmac-generator": {
    whatIs: "An HMAC generator computes Hash-based Message Authentication Codes (e.g. HMAC-SHA256) from a message and a secret. Used for webhook signatures and API auth.",
    howItWorks: "Enter message and secret. Choose algorithm (e.g. SHA-256). The tool outputs the HMAC in hex or base64. All computation runs in your browser.",
    useCases: ["Verifying webhook signatures (e.g. GitHub, Stripe)", "Debugging API signing", "Testing HMAC logic", "Learning how HMAC works"],
    faq: [
      { q: "Is my secret sent to a server?", a: "No. HMAC is computed locally." },
      { q: "Which encodings are supported?", a: "Typically hex and base64 output." }
    ]
  },
  "bcrypt-hash": {
    whatIs: "Bcrypt hashing hashes passwords with a salt and cost factor. It's designed for storing passwords securely and is one of the recommended algorithms.",
    howItWorks: "Enter a password. The tool hashes it with bcrypt (with a configurable cost). You can also verify a password against a stored hash. Runs in the browser.",
    useCases: ["Testing password hashing in your app", "Verifying stored bcrypt hashes", "Generating hashes for dev or migration", "Learning bcrypt"],
    faq: [
      { q: "Is bcrypt secure?", a: "Yes. It's designed for passwords and includes salt and cost. Prefer it over MD5 or plain SHA." },
      { q: "Where is hashing done?", a: "In your browser. Passwords are not sent anywhere." }
    ]
  },
  "cron-parser": {
    whatIs: "A cron parser explains a cron expression and shows when it will run next. Useful for debugging schedulers, CI schedules, or backup jobs.",
    howItWorks: "Paste a cron expression (e.g. 0 9 * * 1-5). The tool parses it and lists the next run times (and often the human-readable description). Runs in the browser.",
    useCases: ["Understanding cron expressions", "Checking when a job runs next", "Debugging CI or backup schedules", "Documenting cron jobs"],
    faq: [
      { q: "Which cron format?", a: "Standard 5-field (minute hour day month weekday). Extended formats may vary." },
      { q: "Is my expression sent to a server?", a: "No. Parsing is local." }
    ]
  },
  "timestamp-generator": {
    whatIs: "A timestamp generator converts a date and time you choose into a Unix timestamp (seconds or milliseconds). Useful for APIs, tests, and scripts.",
    howItWorks: "Pick a date and time (or type ISO/local). The tool outputs the corresponding Unix timestamp. You can switch between seconds and milliseconds. Runs in the browser.",
    useCases: ["Getting timestamps for API tests", "Converting user input to Unix time", "Building exp/iat for JWTs", "Script and automation inputs"],
    faq: [
      { q: "Seconds or milliseconds?", a: "You can usually choose. Many APIs use seconds; JavaScript often uses milliseconds." },
      { q: "Where is conversion done?", a: "In your browser. No server call." }
    ]
  },
  "timezone-converter": {
    whatIs: "A timezone converter converts a given time from one IANA timezone to another. Essential for global apps, scheduling, and support.",
    howItWorks: "Enter a time (and date) and select source and target timezones. The tool shows the equivalent time in the target zone. Runs in the browser.",
    useCases: ["Scheduling across timezones", "Debugging time display in apps", "Support or on-call times", "Converting logs or events to local time"],
    faq: [
      { q: "Which timezone database?", a: "IANA (e.g. America/New_York). Uses the browser's or a standard library." },
      { q: "Is my input sent to a server?", a: "No. Conversion is local." }
    ]
  },
  "iso-date-formatter": {
    whatIs: "An ISO date formatter converts dates between ISO 8601, Unix timestamp, and local or RFC formats. Helps when debugging APIs or formatting for display.",
    howItWorks: "Enter a date (ISO, Unix, or local string). The tool parses it and shows equivalent formats. Runs in your browser.",
    useCases: ["Normalizing dates from APIs", "Debugging date handling", "Formatting for APIs or DBs", "Converting between date standards"],
    faq: [
      { q: "What is ISO 8601?", a: "An international date/time format, e.g. 2024-03-15T12:00:00Z." },
      { q: "Where is formatting done?", a: "In your browser." }
    ]
  },
  "query-string-parser": {
    whatIs: "A query string parser turns a URL query string (e.g. ?a=1&b=2) into a JSON object. Essential for reading or debugging URL parameters.",
    howItWorks: "Paste a query string (with or without ?). The tool parses it and outputs key-value pairs as JSON. Arrays and repeated keys are handled. Runs in the browser.",
    useCases: ["Parsing URL params from logs or APIs", "Debugging redirect or callback URLs", "Understanding tracking or UTM params", "Building API clients"],
    faq: [
      { q: "How are repeated keys handled?", a: "Typically as an array of values or last wins, depending on the tool." },
      { q: "Is my query string sent elsewhere?", a: "No. Parsing is local." }
    ]
  },
  "query-string-builder": {
    whatIs: "A query string builder creates a URL query string from key-value pairs. You add params and get a ready-to-use ?key=value&... string.",
    howItWorks: "Add key-value pairs (or paste JSON). The tool URL-encodes and joins them into a query string. Copy into a URL or API call. Runs in the browser.",
    useCases: ["Building API URLs with params", "Creating share or redirect URLs", "Testing APIs with many params", "Constructing tracking URLs"],
    faq: [
      { q: "Are values URL-encoded?", a: "Yes. Special characters are encoded for safe use in URLs." },
      { q: "Where is it built?", a: "In your browser. No server." }
    ]
  },
  "url-parser": {
    whatIs: "A URL parser breaks a URL into its components: protocol, host, path, query, and fragment. Useful for debugging, validation, or building URLs programmatically.",
    howItWorks: "Paste a URL. The tool parses it and displays each part (scheme, host, pathname, search, hash). Invalid URLs are reported. Runs in the browser.",
    useCases: ["Debugging redirects or links", "Validating URLs from user input", "Extracting domain or path for logic", "Understanding URL structure"],
    faq: [
      { q: "Which URL standard?", a: "Uses the browser's URL API (WHATWG). Supports http, https, and common schemes." },
      { q: "Is my URL sent to a server?", a: "No. Parsing is local." }
    ]
  },
  "slug-generator": {
    whatIs: "A slug generator converts text (e.g. a title) into a URL-friendly slug: lowercase, spaces to hyphens, special characters removed.",
    howItWorks: "Paste text. The tool normalizes it to a slug (lowercase, hyphenated, no special chars). Copy for use in URLs or filenames. Runs in the browser.",
    useCases: ["Creating URL slugs for blog posts", "Generating filenames from titles", "SEO-friendly URLs", "Normalizing identifiers"],
    faq: [
      { q: "What about non-ASCII characters?", a: "They may be transliterated or removed depending on the tool." },
      { q: "Is my text uploaded?", a: "No. Conversion is local." }
    ]
  },
  "ip-validator": {
    whatIs: "An IP validator checks whether a string is a valid IPv4 or IPv6 address. Useful for validation, parsing, or security checks.",
    howItWorks: "Enter an IP string. The tool validates format and reports IPv4 vs IPv6. It may show parsed segments. Runs in the browser.",
    useCases: ["Validating user or API input", "Parsing IPs from logs", "Checking format before storage", "Security or allowlist checks"],
    faq: [
      { q: "Does it resolve hostnames?", a: "Typically no. It validates format only." },
      { q: "Is the IP sent to a server?", a: "No. Validation is local." }
    ]
  },
  "user-agent-parser": {
    whatIs: "A User-Agent parser breaks a browser User-Agent string into parts: browser, OS, device, and sometimes engine. Useful for analytics or conditional logic.",
    howItWorks: "Paste a User-Agent string. The tool parses it and shows browser name, version, OS, and device type. Runs in the browser.",
    useCases: ["Debugging device or browser detection", "Understanding analytics data", "Testing UA-based logic", "Support and compatibility"],
    faq: [
      { q: "How accurate is parsing?", a: "Best-effort. Many UAs are non-standard; results are indicative." },
      { q: "Is my User-Agent sent elsewhere?", a: "No. Parsing is local." }
    ]
  },
  "http-headers-parser": {
    whatIs: "An HTTP headers parser turns raw HTTP header text into a structured object. Useful when debugging APIs, webhooks, or proxy logs.",
    howItWorks: "Paste raw headers (e.g. from browser dev tools or curl). The tool parses lines into key-value pairs and outputs JSON. Runs in the browser.",
    useCases: ["Debugging API or webhook headers", "Inspecting CORS or auth headers", "Converting curl output to structure", "Log analysis"],
    faq: [
      { q: "What format should headers be in?", a: "One header per line, e.g. Content-Type: application/json." },
      { q: "Is my data sent to a server?", a: "No. Parsing is local." }
    ]
  },
  "html-to-jsx": {
    whatIs: "HTML to JSX conversion turns HTML markup into valid JSX for React. Handles attribute names (class → className), self-closing tags, and style objects.",
    howItWorks: "Paste HTML. The tool converts it to JSX: attributes renamed, booleans and style formatted. Copy into your React component. Runs in the browser.",
    useCases: ["Converting HTML snippets to React", "Migrating static HTML to JSX", "Quick component scaffolding", "Learning JSX syntax"],
    faq: [
      { q: "Does it handle all HTML?", a: "Common HTML is supported. Complex or invalid HTML may need manual tweaks." },
      { q: "Where is conversion done?", a: "In your browser." }
    ]
  },
  "sql-formatter": {
    whatIs: "A SQL formatter beautifies SQL queries with consistent indentation and line breaks. Makes long queries readable and easier to review.",
    howItWorks: "Paste a SQL statement. The tool reformats it with indentation and keyword highlighting. Dialect options may be available. Runs in the browser.",
    useCases: ["Formatting queries for docs or PRs", "Reading complex SQL", "Consistent style across team", "Debugging query structure"],
    faq: [
      { q: "Which SQL dialect?", a: "Often standard SQL or a common dialect (e.g. PostgreSQL, MySQL). Check the tool." },
      { q: "Is my SQL sent to a server?", a: "No. Formatting is local." }
    ]
  },
  "color-converter": {
    whatIs: "A color converter converts between HEX, RGB, and HSL. Useful for design, CSS, or when you need to match colors across tools.",
    howItWorks: "Enter a color in one format (e.g. #ff0000 or rgb(255,0,0)). The tool shows the same color in other formats. May support picker. Runs in the browser.",
    useCases: ["Converting design colors to CSS", "Matching colors across apps", "Generating palettes", "Accessibility (contrast) checks"],
    faq: [
      { q: "Which color spaces?", a: "Typically HEX, RGB, and HSL. Some tools add CMYK or HSV." },
      { q: "Where is conversion done?", a: "In your browser." }
    ]
  },
  "image-compressor": {
    whatIs: "An image compressor reduces file size of images (e.g. JPG) in the browser. You control quality; useful for thumbnails or faster uploads.",
    howItWorks: "Upload an image. Set quality or dimensions. The tool compresses and shows a preview and download. All processing runs in your browser.",
    useCases: ["Reducing upload size", "Creating thumbnails", "Optimizing for web", "Quick client-side compression"],
    faq: [
      { q: "Is my image uploaded to a server?", a: "No. Compression runs in your browser. Your image stays on your device." },
      { q: "What formats?", a: "Typically JPG and sometimes PNG. Check the tool." }
    ]
  },
  "pdf-tools": {
    whatIs: "PDF tools let you merge, split, rotate, and add text to PDFs in the browser. No server upload—everything runs locally.",
    howItWorks: "Upload one or more PDFs. Choose an action: merge, extract pages, rotate, or add text overlay. Preview and download the result. Uses client-side PDF libraries.",
    useCases: ["Merging PDFs for reports", "Extracting pages", "Rotating or fixing orientation", "Adding watermarks or labels"],
    faq: [
      { q: "Are my PDFs uploaded?", a: "No. All operations run in your browser. Files stay on your device." },
      { q: "Can I edit existing text?", a: "Typically no. You can add overlay text; true in-place editing requires other software." }
    ]
  }
};

export function getToolSeoContent(slug: string): ToolSeoContent | null {
  return content[slug] ?? null;
}
