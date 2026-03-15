"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";
import { safeTextFromError } from "@/lib/toolUtils";

export function BcryptHash() {
  const [password, setPassword] = useState("");
  const [rounds, setRounds] = useState(10);
  const [hashOut, setHashOut] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const doHash = async () => {
    setError("");
    if (!password) return;
    try {
      const salt = await bcrypt.genSalt(Math.min(12, Math.max(4, rounds)));
      setHashOut(await bcrypt.hash(password, salt));
    } catch (e) {
      setError(safeTextFromError(e));
    }
  };

  const doVerify = async () => {
    setError("");
    if (!verifyPassword || !verifyHash) return;
    try {
      const ok = await bcrypt.compare(verifyPassword, verifyHash);
      setVerifyResult(ok ? "Match" : "No match");
    } catch (e) {
      setError(safeTextFromError(e));
    }
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>Password to hash</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <div className="field">
        <label>Rounds (4–12)</label>
        <input type="number" min={4} max={12} value={rounds} onChange={(e) => setRounds(Number(e.target.value))} />
      </div>
      <button type="button" className="button-primary" onClick={doHash}>Hash</button>
      {hashOut && <div className="field"><label>Bcrypt hash</label><pre className="output">{hashOut}</pre><button type="button" className="card-link" onClick={() => navigator.clipboard.writeText(hashOut)}>Copy</button></div>}
      <div className="split">
        <h4>Verify</h4>
        <div className="field">
          <label>Password</label>
          <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
        </div>
        <div className="field">
          <label>Hash</label>
          <input type="text" value={verifyHash} onChange={(e) => setVerifyHash(e.target.value)} placeholder="Paste hash" />
        </div>
        <button type="button" className="button-secondary" onClick={doVerify}>Verify</button>
        {verifyResult && <p className="muted">Result: {verifyResult}</p>}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
