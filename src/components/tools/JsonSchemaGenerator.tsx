"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

function inferType(val: unknown): string {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  return typeof val;
}

function jsonToSchema(obj: unknown): Record<string, unknown> {
  if (obj === null) return { type: "null" };
  if (Array.isArray(obj)) {
    const item = obj.length ? jsonToSchema(obj[0]) : {};
    return { type: "array", items: item };
  }
  if (typeof obj === "object") {
    const props: Record<string, unknown> = {};
    const required: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      props[k] = jsonToSchema(v);
      required.push(k);
    }
    return { type: "object", properties: props, required };
  }
  if (typeof obj === "number") return { type: Number.isInteger(obj) ? "integer" : "number" };
  if (typeof obj === "boolean") return { type: "boolean" };
  return { type: "string" };
}

export function JsonSchemaGenerator() {
  const [input, setInput] = useState("{\n  \"name\": \"\",\n  \"count\": 0\n}");
  const [output, setOutput] = useState("");

  const run = () => {
    try {
      const obj = JSON.parse(input);
      const schema = { $schema: "http://json-schema.org/draft-07/schema#", ...jsonToSchema(obj) };
      setOutput(JSON.stringify(schema, null, 2));
    } catch (e) {
      setOutput("Error: " + safeTextFromError(e));
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={run}>Generate schema</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">JSON</span></div>
          <textarea className="ued-textarea" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">JSON Schema</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
          </div>
          <pre className="ued-output">{output || " "}</pre>
        </section>
      </div>
    </div>
  );
}
