"use client";

import { useState } from "react";

export function UrlParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const parse = () => {
    const raw = input.trim();
    if (!raw) { setOutput("Enter a URL."); return; }
    try {
      const u = new URL(raw);
      setOutput(JSON.stringify({
        href: u.href,
        protocol: u.protocol,
        host: u.host,
        hostname: u.hostname,
        port: u.port || "(default)",
        pathname: u.pathname,
        search: u.search || "(none)",
        hash: u.hash || "(none)"
      }, null, 2));
    } catch (e) {
      setOutput("Error: " + (e instanceof Error ? e.message : "Invalid URL"));
    }
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>URL</label>
        <input type="url" value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://example.com/path?query=1" />
      </div>
      <button type="button" className="button-primary" onClick={parse}>Parse</button>
      {output && <div className="split"><label>Components</label><pre className="output">{output}</pre></div>}
    </div>
  );
}
