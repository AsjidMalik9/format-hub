"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

function jsonToXml(obj: unknown, indent = ""): string {
  if (obj === null || obj === undefined) return "";
  if (typeof obj === "string") return escapeXml(String(obj));
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
  if (Array.isArray(obj)) {
    return obj.map((item) => `${indent}<item>${jsonToXml(item, indent + "  ")}</item>`).join("\n");
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj);
    return entries
      .map(([k, v]) => {
        const tag = /^[a-zA-Z_][\w.-]*$/.test(k) ? k : "item";
        const keyAttr = tag === "item" ? ` key="${escapeXml(k)}"` : "";
        const inner = jsonToXml(v, indent + "  ");
        const content = typeof v === "object" && v !== null && (Array.isArray(v) || Object.keys(v as object).length > 0)
          ? `\n${inner}\n${indent}`
          : inner;
        return `${indent}<${tag}${keyAttr}>${content}</${tag}>`;
      })
      .join("\n");
  }
  return "";
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function JsonToXml() {
  const [input, setInput] = useState('{\n  "name": "Example",\n  "count": 2\n}');
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const obj = JSON.parse(input);
      const inner = jsonToXml(obj, "  ");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${inner}\n</root>`;
      setOutput(xml);
    } catch (e) {
      setOutput("Error: " + safeTextFromError(e));
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={convert}>
          JSON → XML
        </button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head">
            <span className="ued-card-title">JSON</span>
          </div>
          <textarea className="ued-textarea" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">XML</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>
              Copy
            </button>
          </div>
          <pre className="ued-output">{output || " "}</pre>
        </section>
      </div>
    </div>
  );
}
