"use client";

import { useState } from "react";

const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function generate(count: number, type: "words" | "sentences" | "paragraphs"): string {
  if (type === "words") {
    return Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(" ");
  }
  if (type === "sentences") {
    const s: string[] = [];
    for (let i = 0; i < count; i++) {
      const n = 5 + Math.floor(Math.random() * 10);
      const w = Array.from({ length: n }, () => words[Math.floor(Math.random() * words.length)]);
      w[0] = w[0][0].toUpperCase() + w[0].slice(1);
      s.push(w.join(" ") + ".");
    }
    return s.join(" ");
  }
  const paras: string[] = [];
  for (let p = 0; p < count; p++) {
    const sentCount = 2 + Math.floor(Math.random() * 4);
    paras.push(generate(sentCount, "sentences"));
  }
  return paras.join("\n\n");
}

export function LoremIpsum() {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<"words" | "sentences" | "paragraphs">("paragraphs");
  const [output, setOutput] = useState("");

  const run = () => setOutput(generate(count, type));

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Count</label>
        <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} />
      </div>
      <div className="field">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value as "words" | "sentences" | "paragraphs")}>
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
      </div>
      <button type="button" className="button-primary" onClick={run}>Generate</button>
      {output && (
        <div className="field">
          <label>Output</label>
          <textarea readOnly value={output} rows={10} style={{ width: "100%" }} />
          <button type="button" className="card-link" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
        </div>
      )}
    </div>
  );
}
