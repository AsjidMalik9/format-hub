"use client";

import { useState } from "react";
import { format as sqlFormat } from "sql-formatter";
import { safeTextFromError } from "@/lib/toolUtils";

export function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <>
      <div className="field">
        <label htmlFor="sqlInput">SQL query</label>
        <textarea id="sqlInput" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="button-row">
        <button
          onClick={() => {
            try {
              setOutput(sqlFormat(input, { language: "sql" }));
            } catch (error) {
              setOutput(`Error: ${safeTextFromError(error)}`);
            }
          }}
        >
          Format SQL
        </button>
        <button onClick={() => setOutput(input.replace(/\s+/g, " ").trim())}>Minify SQL</button>
      </div>
      <pre className="output">{output}</pre>
    </>
  );
}
