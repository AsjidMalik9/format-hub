"use client";

import { useMemo, useState } from "react";
import { normalizeSpaces, toTitleCase } from "@/lib/toolUtils";

export function TextTools() {
  const [textInput, setTextInput] = useState("");

  const textStats = useMemo(() => {
    const trimmed = textInput.trim();
    return {
      words: trimmed ? trimmed.split(/\s+/).length : 0,
      chars: textInput.length,
      lines: textInput ? textInput.split("\n").length : 0
    };
  }, [textInput]);

  return (
    <>
      <div className="field">
        <label htmlFor="textInput">Input text</label>
        <textarea id="textInput" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
      </div>
      <div className="stats">
        <span>Words: {textStats.words}</span>
        <span>Characters: {textStats.chars}</span>
        <span>Lines: {textStats.lines}</span>
      </div>
      <div className="button-row">
        <button onClick={() => setTextInput(textInput.toUpperCase())}>Uppercase</button>
        <button onClick={() => setTextInput(textInput.toLowerCase())}>Lowercase</button>
        <button onClick={() => setTextInput(toTitleCase(textInput))}>Title Case</button>
        <button onClick={() => setTextInput(normalizeSpaces(textInput))}>Trim Spaces</button>
      </div>
    </>
  );
}
