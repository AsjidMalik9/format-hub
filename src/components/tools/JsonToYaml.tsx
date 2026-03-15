"use client";

import { useState } from "react";
import yaml from "js-yaml";
import { safeTextFromError } from "@/lib/toolUtils";

export function JsonToYaml() {
  const [input, setInput] = useState("{\n  \"key\": \"value\"\n}");
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(yaml.dump(obj, { indent: 2 }));
    } catch (e) {
      setOutput("Error: " + safeTextFromError(e));
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={convert}>JSON → YAML</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">JSON</span></div>
          <textarea className="ued-textarea" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">YAML</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
          </div>
          <pre className="ued-output">{output || " "}</pre>
        </section>
      </div>
    </div>
  );
}
