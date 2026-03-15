"use client";

import { useState } from "react";

export function TextDiff() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [diff, setDiff] = useState("");

  const run = () => {
    const a = left.split("\n");
    const b = right.split("\n");
    const out: string[] = [];
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
      const la = a[i] ?? "";
      const lb = b[i] ?? "";
      if (la === lb) out.push(`  ${la}`);
      else {
        if (la) out.push(`- ${la}`);
        if (lb) out.push(`+ ${lb}`);
      }
    }
    setDiff(out.join("\n") || "No differences.");
  };

  return (
    <div className="tool-surface-inner">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div className="field">
          <label>Text A</label>
          <textarea value={left} onChange={(e) => setLeft(e.target.value)} rows={8} />
        </div>
        <div className="field">
          <label>Text B</label>
          <textarea value={right} onChange={(e) => setRight(e.target.value)} rows={8} />
        </div>
      </div>
      <button type="button" className="button-primary" onClick={run}>Compare</button>
      {diff && <div className="field"><label>Diff</label><pre className="output">{diff}</pre></div>}
    </div>
  );
}
