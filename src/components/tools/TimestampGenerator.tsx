"use client";

import { useState } from "react";

export function TimestampGenerator() {
  const [dateStr, setDateStr] = useState("");
  const [output, setOutput] = useState("");

  const run = () => {
    const d = dateStr ? new Date(dateStr) : new Date();
    if (Number.isNaN(d.getTime())) {
      setOutput("Invalid date.");
      return;
    }
    setOutput(String(Math.floor(d.getTime() / 1000)));
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Date & time (optional, defaults to now)</label>
        <input type="text" value={dateStr} onChange={(e) => setDateStr(e.target.value)} placeholder="e.g. 2024-01-15 12:00" />
      </div>
      <button type="button" className="button-primary" onClick={run}>To Unix timestamp</button>
      {output && <div className="field"><label>Unix timestamp</label><pre className="output">{output}</pre><button type="button" className="card-link" onClick={() => navigator.clipboard.writeText(output)}>Copy</button></div>}
    </div>
  );
}
