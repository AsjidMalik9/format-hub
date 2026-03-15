"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";

export function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState("# Welcome\n\nWrite markdown here.");
  const [htmlOutput, setHtmlOutput] = useState("");

  const previewHtml = useMemo(() => htmlOutput || (marked.parse(markdown) as string), [htmlOutput, markdown]);

  return (
    <>
      <div className="field">
        <label htmlFor="markdownInput">Markdown</label>
        <textarea id="markdownInput" value={markdown} onChange={(e) => setMarkdown(e.target.value)} />
      </div>
      <div className="button-row">
        <button onClick={() => setHtmlOutput(marked.parse(markdown) as string)}>Convert</button>
      </div>
      <div className="field">
        <label htmlFor="markdownOutput">HTML output</label>
        <textarea id="markdownOutput" value={htmlOutput} readOnly />
      </div>
      <div className="field">
        <label>Preview</label>
        <div className="preview" dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>
    </>
  );
}
