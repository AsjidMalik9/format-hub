"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

export function TimestampConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const toDate = () => {
    setError("");
    const t = input.trim();
    if (!t) return;
    const num = Number(t);
    if (!Number.isNaN(num)) {
      const d = num < 1e10 ? new Date(num * 1000) : new Date(num);
      setOutput(d.toISOString());
    } else {
      const d = new Date(t);
      if (Number.isNaN(d.getTime())) setError("Invalid date or timestamp");
      else setOutput(String(Math.floor(d.getTime() / 1000)));
    }
  };

  const toTimestamp = () => {
    setError("");
    const t = input.trim();
    try {
      const d = t ? new Date(t) : new Date();
      if (Number.isNaN(d.getTime())) setError("Invalid date");
      else setOutput(String(Math.floor(d.getTime() / 1000)));
    } catch (e) {
      setError(safeTextFromError(e));
    }
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Unix timestamp or ISO date</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. 1516239022 or 2024-01-15" />
      </div>
      <div className="button-row">
        <button type="button" className="button-primary" onClick={toDate}>To ISO date</button>
        <button type="button" className="button-secondary" onClick={toTimestamp}>To Unix timestamp</button>
      </div>
      {error && <p className="error">{error}</p>}
      {output && <div className="field"><label>Result</label><pre className="output">{output}</pre></div>}
    </div>
  );
}
