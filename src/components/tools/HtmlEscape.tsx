"use client";

import { useState } from "react";

const escapeMap: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const unescapeMap: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => escapeMap[c] ?? c);
}

function unescapeHtml(s: string): string {
  return s.replace(/&(?:amp|lt|gt|quot|#39);/g, (m) => unescapeMap[m] ?? m);
}

export function HtmlEscape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const doEscape = () => setOutput(escapeHtml(input));
  const doUnescape = () => setOutput(unescapeHtml(input));

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={doEscape}>Escape</button>
        <button type="button" className="ued-btn" onClick={doUnescape}>Unescape</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">Input</span></div>
          <textarea className="ued-textarea" placeholder="<script> or &lt;script&gt;" value={input} onChange={(e) => setInput(e.target.value)} />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">Result</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
          </div>
          <pre className="ued-output">{output || " "}</pre>
        </section>
      </div>
    </div>
  );
}
