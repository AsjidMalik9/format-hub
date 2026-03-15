"use client";

import { useState } from "react";

const LOW = "abcdefghijklmnopqrstuvwxyz";
const UP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUM = "0123456789";
const SPEC = "!@#$%^&*()-_=+[]{}|;:,.<>?";

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ lower: true, upper: true, numbers: true, special: true });
  const [output, setOutput] = useState("");

  const run = () => {
    let charset = "";
    if (options.lower) charset += LOW;
    if (options.upper) charset += UP;
    if (options.numbers) charset += NUM;
    if (options.special) charset += SPEC;
    if (!charset) charset = LOW + NUM;
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    setOutput(Array.from(arr, (b) => charset[b % charset.length]).join(""));
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Length</label>
        <input type="number" min={8} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} />
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
      <button type="button" className="button-primary" onClick={run}>Generate password</button>
      {output && (
        <div className="field">
          <label>Password</label>
          <div className="output-row">
            <pre className="output">{output}</pre>
            <button type="button" className="card-link" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
