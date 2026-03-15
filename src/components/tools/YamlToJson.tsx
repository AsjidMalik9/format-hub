"use client";

import { useState } from "react";
import yaml from "js-yaml";
import { safeTextFromError } from "@/lib/toolUtils";

export function YamlToJson() {
  const [input, setInput] = useState("key: value\nlist:\n  - a\n  - b");
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const obj = yaml.load(input) as object;
      setOutput(JSON.stringify(obj, null, 2));
    } catch (e) {
      setOutput("Error: " + safeTextFromError(e));
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={convert}>YAML → JSON</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">YAML</span></div>
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
