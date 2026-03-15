"use client";

import { useState } from "react";

export function UserAgentParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const run = () => {
    const ua = input.trim() || (typeof navigator !== "undefined" ? navigator.userAgent : "");
    const s = ua;
    const browser = /Edg\//.test(s) ? "Edge" : /Chrome\//.test(s) ? "Chrome" : /Firefox\//.test(s) ? "Firefox" : /Safari\//.test(s) && !/Chrome/.test(s) ? "Safari" : "Other";
    const os = /Windows/.test(s) ? "Windows" : /Mac/.test(s) ? "Mac" : /Linux/.test(s) ? "Linux" : /Android/.test(s) ? "Android" : /iOS|iPhone|iPad/.test(s) ? "iOS" : "Other";
    setOutput(JSON.stringify({
      "User-Agent": ua || "(current browser)",
      "Browser (heuristic)": browser,
      "OS (heuristic)": os
    }, null, 2));
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>User-Agent string (leave empty for current)</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={2} placeholder="Mozilla/5.0..." />
      </div>
      <button type="button" className="button-primary" onClick={run}>Parse</button>
      {output && <div className="field"><label>Result</label><pre className="output">{output}</pre></div>}
    </div>
  );
}
