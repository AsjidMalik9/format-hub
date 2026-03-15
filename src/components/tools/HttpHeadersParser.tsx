"use client";

import { useState } from "react";

export function HttpHeadersParser() {
  const [input, setInput] = useState("Content-Type: application/json\nAccept: */*");
  const [output, setOutput] = useState("");

  const run = () => {
    const lines = input.trim().split(/\r?\n/);
    const obj: Record<string, string> = {};
    for (const line of lines) {
      const i = line.indexOf(":");
      if (i > 0) {
        const key = line.slice(0, i).trim();
        const value = line.slice(i + 1).trim();
        obj[key] = value;
      }
    }
    setOutput(JSON.stringify(obj, null, 2));
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={run}>Parse headers</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">Raw headers</span></div>
          <textarea className="ued-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Header-Name: value" />
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
