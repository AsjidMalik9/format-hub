"use client";

import { useState } from "react";

export function QueryStringBuilder() {
  const [input, setInput] = useState("{\n  \"foo\": \"bar\",\n  \"baz\": \"qux\"\n}");
  const [output, setOutput] = useState("");

  const build = () => {
    try {
      const obj = JSON.parse(input) as Record<string, string>;
      setOutput(new URLSearchParams(obj).toString());
    } catch {
      setOutput("Invalid JSON");
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={build}>Build query string</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">Key-value JSON</span></div>
          <textarea className="ued-textarea" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">Query string</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
          </div>
          <pre className="ued-output">{output || " "}</pre>
        </section>
      </div>
    </div>
  );
}
