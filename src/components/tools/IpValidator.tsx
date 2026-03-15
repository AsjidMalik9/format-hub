"use client";

import { useState } from "react";

const v4 = /^(?:\d{1,3}\.){3}\d{1,3}$/;
const v6 = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

function validateIP(ip: string): "IPv4" | "IPv6" | "Invalid" {
  const t = ip.trim();
  if (!t) return "Invalid";
  if (v4.test(t)) {
    const parts = t.split(".").map(Number);
    if (parts.every((p) => p >= 0 && p <= 255)) return "IPv4";
  }
  if (v6.test(t)) return "IPv6";
  return "Invalid";
}

export function IpValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"IPv4" | "IPv6" | "Invalid" | null>(null);

  const run = () => setResult(input.trim() ? validateIP(input) : null);

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>IP address</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="192.168.1.1 or 2001:db8::1" />
      </div>
      <button type="button" className="button-primary" onClick={run}>Validate</button>
      {result !== null && (
        <div className="split">
          <p className={result === "Invalid" ? "error" : "muted"}>
            Result: <strong>{result}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
