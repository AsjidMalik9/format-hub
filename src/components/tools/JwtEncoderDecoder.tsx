"use client";

import { useState } from "react";
import { decodeJwt, encodeJwt, verifyJwt } from "@/lib/jwtUtils";

const DEFAULT_HEADER = '{\n  "alg": "HS256",\n  "typ": "JWT"\n}';
const DEFAULT_PAYLOAD = '{\n  "sub": "user123",\n  "iat": 1516239022,\n  "exp": 1516242622\n}';

type Tab = "decode" | "encode" | "verify";

function formatTimestamp(ts: number): string {
  const d = new Date(ts * 1000);
  const now = Date.now() / 1000;
  const diff = ts - now;
  if (diff > 0 && diff < 86400) return `In ${Math.round(diff / 3600)}h (${d.toISOString()})`;
  if (diff > 0) return d.toISOString();
  return `Expired ${Math.round(-diff / 86400)}d ago (${d.toISOString()})`;
}

export function JwtEncoderDecoder() {
  const [tab, setTab] = useState<Tab>("decode");
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeHeader, setDecodeHeader] = useState("");
  const [decodePayload, setDecodePayload] = useState("");
  const [decodeError, setDecodeError] = useState("");
  const [encodeHeader, setEncodeHeader] = useState(DEFAULT_HEADER);
  const [encodePayload, setEncodePayload] = useState(DEFAULT_PAYLOAD);
  const [encodeSecret, setEncodeSecret] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [encodeError, setEncodeError] = useState("");
  const [encodeLoading, setEncodeLoading] = useState(false);
  const [verifySecret, setVerifySecret] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleDecode = () => {
    setDecodeError("");
    setDecodeHeader("");
    setDecodePayload("");
    const result = decodeJwt(decodeInput);
    if (result instanceof Error) {
      setDecodeError(result.message);
      return;
    }
    setDecodeHeader(result.header);
    setDecodePayload(result.payload);
  };

  const handleVerify = async () => {
    setVerifyResult(null);
    if (!decodeInput.trim() || !verifySecret.trim()) return;
    setVerifyLoading(true);
    const ok = await verifyJwt(decodeInput, verifySecret);
    setVerifyLoading(false);
    setVerifyResult(ok);
  };

  const copyBearer = () => {
    if (decodeInput.trim()) navigator.clipboard.writeText(`Authorization: Bearer ${decodeInput.trim()}`);
  };

  const copyCurl = () => {
    if (decodeInput.trim()) {
      const curl = `curl -H "Authorization: Bearer ${decodeInput.trim()}" https://api.example.com/endpoint`;
      navigator.clipboard.writeText(curl);
    }
  };

  const payloadClaims = (() => {
    if (!decodePayload || decodeError) return null;
    try {
      const p = JSON.parse(decodePayload) as Record<string, unknown>;
      return { iat: p.iat as number | undefined, exp: p.exp as number | undefined };
    } catch {
      return null;
    }
  })();

  const handleEncode = async () => {
    setEncodeError("");
    setEncodeOutput("");
    setEncodeLoading(true);
    const result = await encodeJwt(
      encodeHeader,
      encodePayload,
      encodeSecret.trim() || undefined
    );
    setEncodeLoading(false);
    if (result instanceof Error) {
      setEncodeError(result.message);
      return;
    }
    setEncodeOutput(result);
  };

  const decodeInputLines = (decodeInput || " ").split("\n").length;
  const decodeHeaderLines = (decodeHeader || " ").split("\n").length;
  const decodePayloadLines = (decodePayload || " ").split("\n").length;
  const encodeHeaderLines = (encodeHeader || " ").split("\n").length;
  const encodePayloadLines = (encodePayload || " ").split("\n").length;
  const encodeOutputLines = (encodeOutput || " ").split("\n").length;

  return (
    <div className="jwt-enc-dec">
      <div className="jed-tabs" role="tablist" aria-label="JWT mode">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "decode"}
          className={`jed-tab ${tab === "decode" ? "active" : ""}`}
          onClick={() => setTab("decode")}
        >
          Decode
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "encode"}
          className={`jed-tab ${tab === "encode" ? "active" : ""}`}
          onClick={() => setTab("encode")}
        >
          Encode
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "verify"}
          className={`jed-tab ${tab === "verify" ? "active" : ""}`}
          onClick={() => setTab("verify")}
        >
          Verify
        </button>
      </div>

      {tab === "decode" && (
        <>
          <div className="jed-actions">
            <button
              type="button"
              className="jed-btn jed-btn-primary"
              onClick={handleDecode}
            >
              Decode JWT
            </button>
            {(decodeHeader || decodePayload) && !decodeError && (
              <>
                <button type="button" className="jed-btn jed-btn-secondary" onClick={copyBearer}>
                  Copy as Bearer
                </button>
                <button type="button" className="jed-btn jed-btn-secondary" onClick={copyCurl}>
                  Copy as curl
                </button>
              </>
            )}
          </div>
          {payloadClaims && (payloadClaims.iat != null || payloadClaims.exp != null) && (
            <div className="jed-claims">
              {payloadClaims.iat != null && (
                <span title={new Date(payloadClaims.iat * 1000).toISOString()}>iat: {formatTimestamp(payloadClaims.iat)}</span>
              )}
              {payloadClaims.exp != null && (
                <span title={new Date(payloadClaims.exp * 1000).toISOString()}>exp: {formatTimestamp(payloadClaims.exp)}</span>
              )}
            </div>
          )}
          <div className="jed-cards">
            <section className="jed-card jed-card-input" aria-label="JWT token">
              <div className="jed-card-head">
                <span className="jed-card-title">Paste JWT</span>
              </div>
              <div className="jed-editor-wrap">
                <div className="jed-line-nums" aria-hidden>
                  {Array.from({ length: decodeInputLines }, (_, i) => i + 1).join("\n")}
                </div>
                <textarea
                  className="jed-textarea"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                  value={decodeInput}
                  onChange={(e) => setDecodeInput(e.target.value)}
                  spellCheck={false}
                  aria-label="JWT token input"
                />
              </div>
              {decodeError && (
                <div className="jed-output error" style={{ padding: "0.5rem 0.75rem", margin: 0 }}>
                  {decodeError}
                </div>
              )}
            </section>
            {(decodeHeader || decodePayload) && !decodeError && (
              <div className="jed-decode-grid">
                <div className="jed-segment">
                  <span className="jed-segment-label">Header</span>
                  <div className="jed-card">
                    <div className="jed-editor-wrap">
                      <div className="jed-line-nums" aria-hidden>
                        {Array.from({ length: decodeHeaderLines }, (_, i) => i + 1).join("\n")}
                      </div>
                      <pre className="jed-output">{decodeHeader || " "}</pre>
                    </div>
                  </div>
                </div>
                <div className="jed-segment">
                  <span className="jed-segment-label">Payload</span>
                  <div className="jed-card">
                    <div className="jed-editor-wrap">
                      <div className="jed-line-nums" aria-hidden>
                        {Array.from({ length: decodePayloadLines }, (_, i) => i + 1).join("\n")}
                      </div>
                      <pre className="jed-output">{decodePayload || " "}</pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {tab === "verify" && (
        <>
          <div className="jed-actions">
            <button
              type="button"
              className="jed-btn jed-btn-primary"
              onClick={handleVerify}
              disabled={verifyLoading || !decodeInput.trim() || !verifySecret.trim()}
            >
              {verifyLoading ? "Verifying…" : "Verify signature"}
            </button>
          </div>
          {verifyResult !== null && (
            <div className={`jed-verify-result ${verifyResult ? "valid" : "invalid"}`}>
              {verifyResult ? "✓ Signature valid" : "✗ Signature invalid or wrong secret"}
            </div>
          )}
          <div className="jed-cards">
            <section className="jed-card jed-card-input" aria-label="JWT token">
              <div className="jed-card-head">
                <span className="jed-card-title">Paste JWT</span>
              </div>
              <div className="jed-editor-wrap">
                <textarea
                  className="jed-textarea"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={decodeInput}
                  onChange={(e) => { setDecodeInput(e.target.value); setVerifyResult(null); }}
                  spellCheck={false}
                  aria-label="JWT token to verify"
                />
              </div>
            </section>
            <section className="jed-card">
              <div className="jed-card-head">
                <span className="jed-card-title">Secret (HMAC)</span>
              </div>
              <div className="jed-secret-wrap">
                <input
                  type="password"
                  className="jed-secret-input"
                  placeholder="Secret used to sign the JWT"
                  value={verifySecret}
                  onChange={(e) => { setVerifySecret(e.target.value); setVerifyResult(null); }}
                  aria-label="Verification secret"
                />
              </div>
            </section>
          </div>
        </>
      )}

      {tab === "encode" && (
        <>
          <div className="jed-actions">
            <button
              type="button"
              className="jed-btn jed-btn-primary"
              onClick={handleEncode}
              disabled={encodeLoading}
            >
              {encodeLoading ? "Encoding…" : "Encode JWT"}
            </button>
          </div>
          <div className="jed-cards">
            <div className="jed-decode-grid">
              <section className="jed-card jed-card-input" aria-label="Header">
                <div className="jed-card-head">
                  <span className="jed-card-title">Header (JSON)</span>
                  <button
                    type="button"
                    className="jed-card-btn"
                    onClick={() => setEncodeHeader(DEFAULT_HEADER)}
                  >
                    Reset
                  </button>
                </div>
                <div className="jed-editor-wrap">
                  <div className="jed-line-nums" aria-hidden>
                    {Array.from({ length: encodeHeaderLines }, (_, i) => i + 1).join("\n")}
                  </div>
                  <textarea
                    className="jed-textarea"
                    value={encodeHeader}
                    onChange={(e) => setEncodeHeader(e.target.value)}
                    spellCheck={false}
                    aria-label="JWT header JSON"
                  />
                </div>
              </section>
              <section className="jed-card jed-card-input" aria-label="Payload">
                <div className="jed-card-head">
                  <span className="jed-card-title">Payload (JSON)</span>
                  <button
                    type="button"
                    className="jed-card-btn"
                    onClick={() => setEncodePayload(DEFAULT_PAYLOAD)}
                  >
                    Reset
                  </button>
                </div>
                <div className="jed-editor-wrap">
                  <div className="jed-line-nums" aria-hidden>
                    {Array.from({ length: encodePayloadLines }, (_, i) => i + 1).join("\n")}
                  </div>
                  <textarea
                    className="jed-textarea"
                    value={encodePayload}
                    onChange={(e) => setEncodePayload(e.target.value)}
                    spellCheck={false}
                    aria-label="JWT payload JSON"
                  />
                </div>
              </section>
            </div>
            <section className="jed-card" aria-label="Secret and result">
              <div className="jed-card-head">
                <span className="jed-card-title">Secret (optional — leave empty for unsigned)</span>
              </div>
              <div className="jed-secret-wrap">
                <input
                  type="password"
                  className="jed-secret-input"
                  placeholder="HMAC secret for signing"
                  value={encodeSecret}
                  onChange={(e) => setEncodeSecret(e.target.value)}
                  aria-label="Signing secret"
                />
              </div>
              {(encodeOutput || encodeError) && (
                <>
                  <div className="jed-card-head">
                    <span className="jed-card-title">Encoded JWT</span>
                    {encodeOutput && (
                      <button
                        type="button"
                        className="jed-card-btn"
                        onClick={() => navigator.clipboard.writeText(encodeOutput)}
                      >
                        Copy
                      </button>
                    )}
                  </div>
                  <div className="jed-editor-wrap">
                    <div className="jed-line-nums" aria-hidden>
                      {Array.from({ length: encodeOutputLines }, (_, i) => i + 1).join("\n")}
                    </div>
                    <pre className={`jed-output ${encodeError ? "error" : ""}`}>
                      {encodeError || encodeOutput || " "}
                    </pre>
                  </div>
                </>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
