"use client";

import { useState } from "react";

const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const ALPHA_UP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUM = "0123456789";
const SPEC = "!@#$%^&*";

export function RandomString() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ lower: true, upper: true, numbers: true, special: false });
  const [output, setOutput] = useState("");
  const [count, setCount] = useState(1);

  const run = () => {
    let charset = "";
    if (options.lower) charset += ALPHA;
    if (options.upper) charset += ALPHA_UP;
    if (options.numbers) charset += NUM;
    if (options.special) charset += SPEC;
    if (!charset) charset = ALPHA + NUM;
    const arr = new Uint8Array(length * Math.max(1, count));
    crypto.getRandomValues(arr);
    const strings = Array.from({ length: Math.max(1, count) }, (_, i) =>
      Array.from(arr.slice(i * length, (i + 1) * length), (b) => charset[b % charset.length]).join("")
    );
    setOutput(strings.join("\n"));
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Length</label>
        <input type="number" min={1} max={256} value={length} onChange={(e) => setLength(Number(e.target.value))} />
      </div>
      <div className="field">
        <label>Count</label>
        <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(Number(e.target.value))} />
      </div>
      <div className="field">
        <label>Include</label>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {(["lower", "upper", "numbers", "special"] as const).map((k) => (
            <label key={k}>
              <input type="checkbox" checked={options[k]} onChange={(e) => setOptions((o) => ({ ...o, [k]: e.target.checked }))} />
              {" "}{k}
            </label>
          ))}
        </div>
      </div>
      <button type="button" className="button-primary" onClick={run}>Generate</button>
      {output && (
        <div className="field">
          <label>Output</label>
          <pre className="output">{output}</pre>
          <button type="button" className="card-link" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
        </div>
      )}
    </div>
  );
}
