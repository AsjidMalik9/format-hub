"use client";

import { useState } from "react";

function htmlToJsx(html: string): string {
  return html
    .replace(/\sclass=/g, " className=")
    .replace(/\sfor=/g, " htmlFor=")
    .replace(/<(\w+)([^>]*)\s\/>/g, (_, tag, rest) => {
      if (["br", "hr", "img", "input", "meta", "link"].includes(tag.toLowerCase())) return `<${tag}${rest} />`;
      return `<${tag}${rest}></${tag}>`;
    });
}

export function HtmlToJsx() {
  const [input, setInput] = useState("<div class=\"box\">Hello</div>");
  const [output, setOutput] = useState("");

  const run = () => setOutput(htmlToJsx(input));

  return (
    <div className="url-enc-dec">
      <div className="ued-actions">
        <button type="button" className="ued-btn ued-btn-primary" onClick={run}>Convert to JSX</button>
      </div>
      <div className="ued-cards">
        <section className="ued-card ued-card-input">
          <div className="ued-card-head"><span className="ued-card-title">HTML</span></div>
          <textarea className="ued-textarea" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </section>
        <section className="ued-card ued-card-output">
          <div className="ued-card-head">
            <span className="ued-card-title">JSX</span>
            <button type="button" className="ued-card-btn" onClick={() => output && navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
          </div>
          <pre className="ued-output">{output || " "}</pre>
        </section>
      </div>
    </div>
  );
}
