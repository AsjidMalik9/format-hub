"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

export function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (error) {
      setOutput(`Error: ${safeTextFromError(error)}`);
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (error) {
      setOutput(`Error: ${safeTextFromError(error)}`);
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const inputLines = (input || " ").split("\n").length;
  const outputLines = (output || " ").split("\n").length;

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={encode}>
          Encode
        </button>
        <button type="button" className="ued-btn" onClick={decode}>
          Decode
        </button>
      </div>

      <div className="ued-cards">
        <section className="ued-card ued-card-input" aria-label="Input">
          <div className="ued-card-head">
            <span className="ued-card-title">Text or URL</span>
            <button type="button" className="ued-card-btn" onClick={clearAll}>
              Clear
            </button>
          </div>
          <div className="ued-editor-wrap">
            <div className="ued-line-nums" aria-hidden>
              {Array.from({ length: inputLines }, (_, i) => i + 1).join("\n")}
            </div>
            <textarea
              className="ued-textarea"
              placeholder="Paste text or URL to encode or decode…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              aria-label="Input"
            />
          </div>
        </section>

        <section className="ued-card ued-card-output" aria-label="Result">
          <div className="ued-card-head">
            <span className="ued-card-title">Result</span>
            <button
              type="button"
              className="ued-card-btn"
              onClick={copyOutput}
              disabled={!output}
              aria-label="Copy result"
            >
              Copy
            </button>
          </div>
          <div className="ued-editor-wrap">
            <div className="ued-line-nums" aria-hidden>
              {Array.from({ length: outputLines }, (_, i) => i + 1).join("\n")}
            </div>
            <pre className="ued-output">{output || " "}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
