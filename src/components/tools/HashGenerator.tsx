"use client";

import { useState } from "react";
import md5 from "md5";

async function sha1(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha512(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-512", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [sha1Out, setSha1Out] = useState("");
  const [sha256Out, setSha256Out] = useState("");
  const [sha512Out, setSha512Out] = useState("");
  const [md5Out, setMd5Out] = useState("");

  const run = async () => {
    if (!input) return;
    setMd5Out(md5(input));
    setSha1Out(await sha1(input));
    setSha256Out(await sha256(input));
    setSha512Out(await sha512(input));
  };

  const copy = (t: string) => t && navigator.clipboard.writeText(t);

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Input text</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to hash…" rows={3} />
      </div>
      <button type="button" className="button-primary" onClick={run}>Generate hashes</button>
      <div className="split">
        <HashRow label="MD5" value={md5Out} onCopy={() => copy(md5Out)} />
        <HashRow label="SHA-1" value={sha1Out} onCopy={() => copy(sha1Out)} />
        <HashRow label="SHA-256" value={sha256Out} onCopy={() => copy(sha256Out)} />
        <HashRow label="SHA-512" value={sha512Out} onCopy={() => copy(sha512Out)} />
      </div>
    </div>
  );
}

function HashRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="output-row">
        <pre className="output">{value || " "}</pre>
        <button type="button" className="card-link" onClick={onCopy} disabled={!value}>Copy</button>
      </div>
    </div>
  );
}
