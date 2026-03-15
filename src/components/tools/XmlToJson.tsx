"use client";

import { useState } from "react";
import { XMLParser } from "fast-xml-parser";
import { safeTextFromError } from "@/lib/toolUtils";

export function XmlToJson() {
  const [input, setInput] = useState(
    '<?xml version="1.0"?>\n<root>\n  <name>Example</name>\n  <count>2</count>\n</root>'
  );
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_", removeNSPrefix: true });
      const obj = parser.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch (e) {
      setOutput("Error: " + safeTextFromError(e));
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={convert}>
          XML → JSON
        </button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head">
            <span className="ued-card-title">XML</span>
          </div>
          <textarea className="ued-textarea" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">JSON</span>
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
