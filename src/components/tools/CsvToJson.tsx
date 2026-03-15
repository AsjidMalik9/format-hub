"use client";

import { useState } from "react";

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else inQuotes = !inQuotes;
    } else if ((c === "," && !inQuotes) || c === "\n" || c === "\r") {
      out.push(cur);
      cur = "";
      if (c !== ",") break;
    } else cur += c;
  }
  out.push(cur);
  return out;
}

export function CsvToJson() {
  const [input, setInput] = useState("name,age\nAlice,30\nBob,25");
  const [output, setOutput] = useState("");

  const convert = () => {
    const lines = input.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) {
      setOutput("Need header row and at least one data row.");
      return;
    }
    const headers = parseCsvLine(lines[0]);
    const arr = lines.slice(1).map((line) => {
      const values = parseCsvLine(line);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = values[i] ?? ""; });
      return obj;
    });
    setOutput(JSON.stringify(arr, null, 2));
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={convert}>CSV → JSON</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">CSV</span></div>
          <textarea className="ued-textarea" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">JSON</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
          </div>
          <pre className="ued-output">{output || " "}</pre>
        </section>
      </div>
    </div>
  );
}
