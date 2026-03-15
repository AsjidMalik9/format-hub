"use client";

import { useState, useRef } from "react";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { safeTextFromError } from "@/lib/toolUtils";

const SAMPLES = {
  json: `{
  "name": "FormatHub",
  "version": 1,
  "tools": ["JSON", "XML", "URL", "SQL"],
  "active": true
}`,
  xml: `<?xml version="1.0"?>
<catalog>
  <book id="1">
    <title>Introduction to XML</title>
    <author>Developer</author>
  </book>
</catalog>`
};

const INDENT_OPTIONS = [
  { value: 2, label: "2 spaces" },
  { value: 4, label: "4 spaces" }
];

type Mode = "json" | "xml";

export function JsonXmlFormatter() {
  const [mode, setMode] = useState<Mode>("json");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputLines = (input || " ").split("\n").length;
  const outputLines = (output || " ").split("\n").length;

  const loadSample = () => {
    const sample = SAMPLES[mode];
    setInput(sample);
    setOutput("");
    setIsValid(null);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (text) setInput(text);
      setOutput("");
      setIsValid(null);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const validate = () => {
    if (!input.trim()) {
      setOutput("Nothing to validate.");
      setIsValid(null);
      return;
    }
    if (mode === "json") {
      try {
        JSON.parse(input);
        setOutput("✓ Valid JSON");
        setIsValid(true);
      } catch (err) {
        setOutput(`✗ Invalid JSON\n\n${safeTextFromError(err)}`);
        setIsValid(false);
      }
    } else {
      try {
        const parser = new XMLParser({ ignoreAttributes: false });
        parser.parse(input);
        setOutput("✓ Valid XML");
        setIsValid(true);
      } catch (err) {
        setOutput(`✗ Invalid XML\n\n${safeTextFromError(err)}`);
        setIsValid(false);
      }
    }
  };

  const formatBeautify = () => {
    if (mode === "json") {
      try {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, indent));
        setIsValid(true);
      } catch (err) {
        setOutput(`Error: ${safeTextFromError(err)}`);
        setIsValid(false);
      }
    } else {
      try {
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
        const builder = new XMLBuilder({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
          format: true,
          suppressEmptyNode: true,
          indentBy: " ".repeat(indent)
        });
        setOutput(builder.build(parser.parse(input)));
        setIsValid(true);
      } catch (err) {
        setOutput(`Error: ${safeTextFromError(err)}`);
        setIsValid(false);
      }
    }
  };

  const minify = () => {
    if (mode === "json") {
      try {
        setOutput(JSON.stringify(JSON.parse(input)));
        setIsValid(true);
      } catch (err) {
        setOutput(`Error: ${safeTextFromError(err)}`);
        setIsValid(false);
      }
    } else {
      try {
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
        const builder = new XMLBuilder({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
          format: false
        });
        setOutput(builder.build(parser.parse(input)));
        setIsValid(true);
      } catch (err) {
        setOutput(`Error: ${safeTextFromError(err)}`);
        setIsValid(false);
      }
    }
  };

  const clearInput = () => {
    setInput("");
    setOutput("");
    setIsValid(null);
  };

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="json-xml-fmt">
      <div className="fmt-top">
        <div className="fmt-mode-row">
          <span className="fmt-mode-label">Format as</span>
          <div className="fmt-pills" role="tablist" aria-label="Data format">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "json"}
              className={`fmt-pill ${mode === "json" ? "active" : ""}`}
              onClick={() => { setMode("json"); setOutput(""); setIsValid(null); }}
            >
              JSON
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "xml"}
              className={`fmt-pill ${mode === "xml" ? "active" : ""}`}
              onClick={() => { setMode("xml"); setOutput(""); setIsValid(null); }}
            >
              XML
            </button>
          </div>
          <button type="button" className="fmt-sample-link" onClick={loadSample}>
            Load sample
          </button>
        </div>

        <div className="fmt-actions">
          <input
            ref={fileInputRef}
            type="file"
            accept={mode === "json" ? ".json,application/json" : ".xml,application/xml,text/xml"}
            onChange={handleUpload}
            className="fmt-file-input"
            aria-label="Upload file"
          />
          <button type="button" className="fmt-action-btn" onClick={() => fileInputRef.current?.click()}>
            Upload file
          </button>
          <button type="button" className="fmt-action-btn" onClick={validate}>
            Validate
          </button>
          <button type="button" className="fmt-action-btn fmt-action-btn-primary" onClick={formatBeautify}>
            Beautify
          </button>
          <button type="button" className="fmt-action-btn" onClick={minify}>
            Minify
          </button>
          <span className="fmt-action-sep" aria-hidden />
          <label className="fmt-indent-wrap">
            <span className="fmt-indent-text">Indent</span>
            <select
              className="fmt-indent-select"
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              aria-label="Indentation spaces"
            >
              {INDENT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="fmt-cards">
        <section className="fmt-card fmt-card-input" aria-label="Input">
          <div className="fmt-card-head">
            <span className="fmt-card-title">Input</span>
            <div className="fmt-card-actions">
              <select
                className="fmt-card-select"
                value=""
                onChange={(e) => { if (e.target.value) loadSample(); e.target.value = ""; }}
                aria-label="Load sample"
              >
                <option value="">Sample</option>
                <option value="load">Load sample</option>
              </select>
              <button type="button" className="fmt-card-btn" onClick={clearInput}>
                Clear
              </button>
            </div>
          </div>
          <div className="fmt-editor-wrap">
            <div className="fmt-line-nums" aria-hidden>
              {Array.from({ length: inputLines }, (_, i) => i + 1).join("\n")}
            </div>
            <textarea
              className="fmt-textarea"
              placeholder={mode === "json" ? "Paste JSON here…" : "Paste XML here…"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              aria-label="Input data"
            />
          </div>
        </section>

        <section className="fmt-card fmt-card-output" aria-label="Result">
          <div className="fmt-card-head">
            <span className="fmt-card-title">Result</span>
            <button
              type="button"
              className="fmt-card-btn"
              onClick={copyOutput}
              disabled={!output}
              aria-label="Copy result"
            >
              Copy
            </button>
          </div>
          <div className="fmt-editor-wrap">
            <div className="fmt-line-nums" aria-hidden>
              {Array.from({ length: outputLines }, (_, i) => i + 1).join("\n")}
            </div>
            <pre className={`fmt-output ${isValid === false ? "error" : ""}`}>
              {output || " "}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
