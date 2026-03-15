"use client";

import { useState } from "react";
import yaml from "js-yaml";
import { safeTextFromError } from "@/lib/toolUtils";

type ValidationError = { path: string; message: string };

function validateOpenApi(obj: unknown): ValidationError[] {
  const errs: ValidationError[] = [];
  if (obj === null || typeof obj !== "object") {
    return [{ path: "", message: "Root must be an object" }];
  }
  const root = obj as Record<string, unknown>;

  if (!("openapi" in root) || root.openapi === undefined) {
    errs.push({ path: "openapi", message: "Missing required field: openapi (e.g. \"3.0.0\")" });
  } else if (typeof root.openapi !== "string") {
    errs.push({ path: "openapi", message: "openapi must be a string" });
  }

  if (!("info" in root) || root.info === undefined) {
    errs.push({ path: "info", message: "Missing required field: info" });
  } else if (typeof root.info !== "object" || root.info === null) {
    errs.push({ path: "info", message: "info must be an object" });
  } else {
    const info = root.info as Record<string, unknown>;
    if (!("title" in info) || info.title === undefined) {
      errs.push({ path: "info.title", message: "info.title is recommended" });
    }
  }

  if (!("paths" in root) || root.paths === undefined) {
    errs.push({ path: "paths", message: "Missing required field: paths" });
  } else if (typeof root.paths !== "object" || root.paths === null) {
    errs.push({ path: "paths", message: "paths must be an object" });
  }

  return errs;
}

export function OpenApiValidator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [valid, setValid] = useState<boolean | null>(null);

  const run = () => {
    setOutput("");
    setErrors([]);
    setValid(null);
    const raw = input.trim();
    if (!raw) {
      setOutput("Paste an OpenAPI (Swagger) JSON or YAML document.");
      return;
    }
    let obj: unknown;
    try {
      const first = raw.charAt(0);
      if (first === "{" || first === "[") {
        obj = JSON.parse(raw);
      } else {
        obj = yaml.load(raw);
      }
    } catch (e) {
      setOutput(`Parse error: ${safeTextFromError(e)}`);
      setValid(false);
      return;
    }
    const errs = validateOpenApi(obj);
    setErrors(errs);
    if (errs.length === 0) {
      setValid(true);
      const version = (obj as Record<string, unknown>).openapi ?? "?";
      setOutput(`✓ Valid OpenAPI document (openapi: ${version}). Required fields present.`);
    } else {
      setValid(false);
      setOutput(`✗ ${errs.length} validation error(s):\n\n${errs.map((e) => `${e.path}: ${e.message}`).join("\n")}`);
    }
  };

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={run}>
          Validate OpenAPI
        </button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head">
            <span className="ued-card-title">OpenAPI JSON or YAML</span>
          </div>
          <textarea
            className="ued-textarea"
            placeholder='{"openapi":"3.0.0","info":{"title":"My API"},"paths":{}}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">Result</span>
          </div>
          <pre className={`ued-output ${valid === false ? "error" : ""}`}>{output || " "}</pre>
          {errors.length > 0 && (
            <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", fontSize: "0.9rem", color: "var(--muted)" }}>
              {errors.map((e, i) => (
                <li key={i}>
                  <code>{e.path || "root"}</code>: {e.message}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
