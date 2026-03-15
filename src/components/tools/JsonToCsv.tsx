"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

function escapeCsvCell(s: string): string {
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function JsonToCsv() {
  const [input, setInput] = useState('[{"name":"Alice","age":30},{"name":"Bob","age":25}]');
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const arr = JSON.parse(input);
      if (!Array.isArray(arr) || arr.length === 0) {
        setOutput("Expected a non-empty JSON array.");
        return;
      }
      const keys = Object.keys(arr[0] as object);
      const header = keys.map(escapeCsvCell).join(",");
      const rows = arr.map((row: Record<string, unknown>) =>
        keys.map((k) => escapeCsvCell(String(row[k] ?? ""))).join(",")
      );
      setOutput([header, ...rows].join("\n"));
    } catch (e) {
      setOutput("Error: " + safeTextFromError(e));
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={convert}>JSON → CSV</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">JSON array</span></div>
          <textarea className="ued-textarea" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">CSV</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
          </div>
          <pre className="ued-output">{output || " "}</pre>
        </section>
      </div>
    </div>
  );
}
