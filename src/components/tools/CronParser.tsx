"use client";

import { useState } from "react";

function nextRun(cron: string, from: Date, count: number): Date[] {
  const parts = cron.trim().split(/\s+/);
  if (parts.length < 5) return [];
  const [min, hour, day, month, dow] = parts;
  const results: Date[] = [];
  let d = new Date(from);
  const maxIter = 1000;
  let iter = 0;
  while (results.length < count && iter++ < maxIter) {
    d = new Date(d.getTime() + 60000);
    const m = d.getMinutes();
    const h = d.getHours();
    const dayOfMonth = d.getDate();
    const mo = d.getMonth() + 1;
    const dayOfWeek = d.getDay();
    const match = (v: string, n: number) => {
      if (v === "*") return true;
      if (v.includes("/")) {
        const [left, stepStr] = v.split("/");
        const step = parseInt(stepStr || "1", 10);
        if (left === "*") return n % step === 0;
        const start = parseInt(left, 10);
        return n >= start && n % step === start % step;
      }
      if (v.includes("-")) {
        const [a, b] = v.split("-").map(Number);
        return n >= a && n <= b;
      }
      return Number(v) === n;
    };
    if (match(min, m) && match(hour, h) && match(day, dayOfMonth) && match(month, mo) && match(dow, dayOfWeek)) {
      results.push(new Date(d));
    }
  }
  return results;
}

export function CronParser() {
  const [cron, setCron] = useState("*/5 * * * *");
  const [output, setOutput] = useState("");

  const run = () => {
    const from = new Date();
    const runs = nextRun(cron, from, 10);
    setOutput(runs.length ? runs.map((d) => d.toISOString()).join("\n") : "Invalid or no matches (use: min hour day month dow).");
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Cron expression (e.g. */5 * * * *)</label>
        <input type="text" value={cron} onChange={(e) => setCron(e.target.value)} placeholder="* * * * *" />
      </div>
      <button type="button" className="button-primary" onClick={run}>Next 10 runs</button>
      {output && <div className="field"><label>Upcoming runs</label><pre className="output">{output}</pre></div>}
    </div>
  );
}
