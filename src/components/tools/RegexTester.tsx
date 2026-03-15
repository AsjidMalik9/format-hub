"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <>
      <div className="field">
        <label htmlFor="regexPattern">Pattern</label>
        <input
          id="regexPattern"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="\\b\\w+@\\w+\\.\\w+\\b"
        />
      </div>
      <div className="field">
        <label htmlFor="regexFlags">Flags</label>
        <input id="regexFlags" value={flags} onChange={(e) => setFlags(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="regexInput">Text</label>
        <textarea id="regexInput" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <button
        onClick={() => {
          try {
            const regex = new RegExp(pattern, flags);
            const matches = [...input.matchAll(regex)];
            if (!matches.length) {
              setOutput("No matches.");
              return;
            }
            setOutput(
              matches
                .map((match, idx) => `${idx + 1}. "${match[0]}" at index ${match.index ?? 0}`)
                .join("\n")
            );
          } catch (error) {
            setOutput(`Error: ${safeTextFromError(error)}`);
          }
        }}
      >
        Run Regex
      </button>
      <pre className="output">{output}</pre>
    </>
  );
}
