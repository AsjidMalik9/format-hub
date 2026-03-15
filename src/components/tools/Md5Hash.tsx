"use client";

import { useState } from "react";
import md5 from "md5";

export function Md5Hash() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const run = () => setOutput(input ? md5(input) : "");

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={run}>Generate MD5</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">Input</span></div>
          <div className="ued-editor-wrap">
            <textarea className="ued-textarea" placeholder="Text to hash…" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
          </div>
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">MD5 hash</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
          </div>
          <div className="ued-editor-wrap">
            <pre className="ued-output">{output || " "}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
