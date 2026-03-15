"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

export function JsonDiff() {
  const [left, setLeft] = useState("{}");
  const [right, setRight] = useState("{}");
  const [diff, setDiff] = useState("");
  const [error, setError] = useState("");

  const run = () => {
    setError("");
    try {
      const a = JSON.parse(left);
      const b = JSON.parse(right);
      const diffs: string[] = [];
      const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
      allKeys.forEach((k) => {
        const va = JSON.stringify(a[k]);
        const vb = JSON.stringify(b[k]);
        if (va !== vb) diffs.push(`"${k}": left=${va ?? "undefined"} | right=${vb ?? "undefined"}`);
      });
      setDiff(diffs.length ? diffs.join("\n") : "No differences.");
    } catch (e) {
      setError(safeTextFromError(e));
      setDiff("");
    }
  };

  return (
    <div className="tool-surface-inner">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div className="field">
          <label>JSON A</label>
          <textarea value={left} onChange={(e) => setLeft(e.target.value)} rows={10} spellCheck={false} />
        </div>
        <div className="field">
          <label>JSON B</label>
          <textarea value={right} onChange={(e) => setRight(e.target.value)} rows={10} spellCheck={false} />
        </div>
      </div>
      <button type="button" className="button-primary" onClick={run}>Compare</button>
      {error && <p className="error">{error}</p>}
      {diff && <div className="field"><label>Differences</label><pre className="output">{diff}</pre></div>}
    </div>
  );
}
