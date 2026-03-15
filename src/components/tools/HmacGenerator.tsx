"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

async function hmacSha256(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmacSha512(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-512" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HmacGenerator() {
  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [sha256Out, setSha256Out] = useState("");
  const [sha512Out, setSha512Out] = useState("");
  const [error, setError] = useState("");

  const run = async () => {
    setError("");
    if (!message || !secret) {
      setError("Message and secret required.");
      return;
    }
    try {
      setSha256Out(await hmacSha256(message, secret));
      setSha512Out(await hmacSha512(message, secret));
    } catch (e) {
      setError(safeTextFromError(e));
    }
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message to sign" rows={3} />
      </div>
      <div className="field">
        <label>Secret</label>
        <input type="password" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="HMAC secret" />
      </div>
      <button type="button" className="button-primary" onClick={run}>Compute HMAC</button>
      {error && <p className="error">{error}</p>}
      {(sha256Out || sha512Out) && (
        <div className="split">
          <div className="field">
            <label>HMAC-SHA256</label>
            <pre className="output">{sha256Out}</pre>
            <button type="button" className="card-link" onClick={() => sha256Out && navigator.clipboard.writeText(sha256Out)}>Copy</button>
          </div>
          <div className="field">
            <label>HMAC-SHA512</label>
            <pre className="output">{sha512Out}</pre>
            <button type="button" className="card-link" onClick={() => sha512Out && navigator.clipboard.writeText(sha512Out)}>Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
