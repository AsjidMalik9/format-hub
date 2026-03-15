"use client";

import { useState } from "react";

export function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const list: string[] = [];
    for (let i = 0; i < Math.min(Number(count) || 1, 100); i++) {
      list.push(crypto.randomUUID());
    }
    setUuids(list);
  };

  const copyAll = () => uuids.length && navigator.clipboard.writeText(uuids.join("\n"));

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Number of UUIDs (1–100)</label>
        <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value) || 1)} />
      </div>
      <button type="button" className="button-primary" onClick={generate}>Generate</button>
      {uuids.length > 0 && (
        <div className="split">
          <div className="field">
            <label>Generated UUIDs</label>
            <pre className="output">{uuids.join("\n")}</pre>
            <button type="button" className="card-link" onClick={copyAll}>Copy all</button>
          </div>
        </div>
      )}
    </div>
  );
}
