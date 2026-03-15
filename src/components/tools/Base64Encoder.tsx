"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

function base64Encode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function base64Decode(str: string): string {
  return decodeURIComponent(escape(atob(str)));
}

export function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      setOutput(base64Encode(input));
    } catch (e) {
      setOutput(`Error: ${safeTextFromError(e)}`);
    }
  };

  const decode = () => {
    try {
      setOutput(base64Decode(input));
    } catch (e) {
      setOutput(`Error: ${safeTextFromError(e)}`);
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={encode}>Encode</button>
        <button type="button" className="ued-btn" onClick={decode}>Decode</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">Input</span></div>
          <div className="ued-editor-wrap">
            <div className="ued-line-nums" aria-hidden>1</div>
            <textarea className="ued-textarea" placeholder="Text to encode or Base64 to decode…" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
          </div>
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">Result</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
          </div>
          <div className="ued-editor-wrap">
            <div className="ued-line-nums" aria-hidden>1</div>
            <pre className="ued-output">{output || " "}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
