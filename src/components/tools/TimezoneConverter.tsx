"use client";

import { useState } from "react";

export function TimezoneConverter() {
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 16));
  const [fromTz, setFromTz] = useState("UTC");
  const [toTz, setToTz] = useState("America/New_York");
  const [output, setOutput] = useState("");

  const run = () => {
    try {
      const d = new Date(dateStr);
      if (Number.isNaN(d.getTime())) {
        setOutput("Invalid date.");
        return;
      }
      const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: toTz,
        dateStyle: "medium",
        timeStyle: "long"
      });
      setOutput(formatter.format(d));
    } catch (e) {
      setOutput("Error: " + (e instanceof Error ? e.message : "Invalid timezone"));
    }
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Date & time</label>
        <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} />
      </div>
      <div className="field">
        <label>From timezone</label>
        <input type="text" value={fromTz} onChange={(e) => setFromTz(e.target.value)} placeholder="UTC" />
      </div>
      <div className="field">
        <label>To timezone (IANA)</label>
        <input type="text" value={toTz} onChange={(e) => setToTz(e.target.value)} placeholder="America/New_York" />
      </div>
      <button type="button" className="button-primary" onClick={run}>Convert</button>
      {output && <div className="field"><label>Result</label><pre className="output">{output}</pre></div>}
    </div>
  );
}
