"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools, toolCount, categories, type ToolItem, type ToolCategory } from "@/data/tools";
import type { ToolSeoContent } from "@/data/toolSeoContent";
import { ToolSEOContent } from "@/components/ToolSEOContent";

const categoryLabels: Record<ToolCategory, string> = {
  Data: "{} Data",
  Text: "Aa Text",
  Security: "Security",
  Time: "Time",
  Web: "Web",
  Code: "Code",
  Media: "Media",
  PDF: "PDF"
};

type HomePageClientProps = {
  seoContent?: ToolSeoContent | null;
  seoTitle?: string;
};

export function HomePageClient({ seoContent, seoTitle = "FormatHub" }: HomePageClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ToolCategory | "">("");

  const filtered = useMemo(() => {
    let list = tools;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (category) {
      list = list.filter((t) => t.category === category);
    }
    return list;
  }, [search, category]);

  return (
    <section className="home-dark">
      <div className="shell">
        <div className="home-hero">
          <p className="home-tagline">Free · In-browser · No sign-up</p>
          <h1 className="home-title">JSON formatter, URL encoder & 40+ developer tools</h1>
          <p className="home-subtitle">Format JSON, encode URLs, decode Base64, test regex, and more. Everything runs in your browser—your data never leaves your device.</p>
          <div className="home-search-wrap">
            <span className="home-search-icon" aria-hidden>⌘</span>
            <input
              type="search"
              className="home-search"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tools"
            />
            <kbd className="home-search-kbd">⌘K</kbd>
          </div>
        </div>

        <div className="home-stats">
          <div className="home-stat-card">
            <span className="home-stat-value">{toolCount}</span>
            <span className="home-stat-label">Tools</span>
          </div>
          <div className="home-stat-card">
            <span className="home-stat-value">Private</span>
            <span className="home-stat-label">Your data stays local</span>
          </div>
          <div className="home-stat-card">
            <span className="home-stat-value">Never</span>
            <span className="home-stat-label">Sign-up required</span>
          </div>
          <div className="home-stat-card">
            <span className="home-stat-value">$0</span>
            <span className="home-stat-label">Cost</span>
          </div>
        </div>

        <div className="home-filters">
          <button
            type="button"
            className={`home-filter-pill ${category === "" ? "active" : ""}`}
            onClick={() => setCategory("")}
          >
            All tools
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`home-filter-pill ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="home-tool-grid">
          {filtered.length === 0 ? (
            <p className="home-no-results">No tools match your search.</p>
          ) : (
            filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))
          )}
        </div>

        {seoContent && (
          <div className="app-seo-wrap">
            <ToolSEOContent content={seoContent} toolName={seoTitle} />
          </div>
        )}

        <div className="home-bottom">
          <p className="home-bottom-title">Quick links</p>
          <div className="home-bottom-links">
            <Link href="/tools/json-formatter">JSON Formatter</Link>
            <Link href="/tools/jwt-encoder-decoder">JWT Decoder</Link>
            <Link href="/tools/regex-tester">Regex Tester</Link>
            <Link href="/tools/timestamp-converter">Timestamp Converter</Link>
            <Link href="/tools/url-encoder-decoder">URL Encoder</Link>
            <Link href="/tools/base64-encoder">Base64 Encoder</Link>
            <Link href="/tools">All tools →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <article className="home-tool-card">
      <span className={`home-tool-cat home-tool-cat-${tool.category.toLowerCase()}`}>
        {tool.category}
      </span>
      <h2 className="home-tool-name">{tool.name}</h2>
      <p className="home-tool-desc">{tool.description}</p>
      <Link href={`/tools/${tool.slug}`} className="home-tool-link">
        Open tool →
      </Link>
    </article>
  );
}
