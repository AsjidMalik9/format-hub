"use client";

import { useState } from "react";

export function QueryStringParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const parse = () => {
    try {
      const s = input.trim();
      const params = new URLSearchParams(s.startsWith("?") ? s.slice(1) : s);
      const obj: Record<string, string> = {};
      params.forEach((v, k) => { obj[k] = v; });
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setOutput("Invalid query string");
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={parse}>Parse</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">Query string</span></div>
          <textarea className="ued-textarea" placeholder="?foo=bar&baz=qux" value={input} onChange={(e) => setInput(e.target.value)} style={{ minHeight: 80 }} />
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
