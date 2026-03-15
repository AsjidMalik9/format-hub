"use client";

import { useState } from "react";

export function IsoDateFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const run = () => {
    let d: Date;
    const t = input.trim();
    if (!t) {
      d = new Date();
    } else if (/^\d+$/.test(t)) {
      const n = Number(t);
      d = n < 1e10 ? new Date(n * 1000) : new Date(n);
    } else {
      d = new Date(t);
    }
    if (Number.isNaN(d.getTime())) {
      setOutput("Invalid date.");
      return;
    }
    setOutput(JSON.stringify({
      ISO: d.toISOString(),
      Unix: Math.floor(d.getTime() / 1000),
      Local: d.toString(),
      "Date only": d.toLocaleDateString()
    }, null, 2));
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Date / timestamp</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="ISO, Unix, or leave empty for now" />
      </div>
      <button type="button" className="button-primary" onClick={run}>Format</button>
      {output && <div className="field"><label>Formats</label><pre className="output">{output}</pre></div>}
    </div>
  );
}
