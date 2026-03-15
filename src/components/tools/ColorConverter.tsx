"use client";

import { useState } from "react";
import { safeTextFromError } from "@/lib/toolUtils";

function hexToRgb(hex: string): string {
  const m = hex.replace(/^#/, "").match(/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/);
  if (!m) return "Invalid HEX";
  return `rgb(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)})`;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => Math.max(0, Math.min(255, x)).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("59, 130, 246");
  const [hsl, setHsl] = useState("217, 91%, 60%");
  const [error, setError] = useState("");

  const fromHex = () => {
    setError("");
    try {
      const m = hex.replace(/^#/, "").match(/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/);
      if (!m) { setError("Invalid HEX"); return; }
      const r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
      setRgb(`${r}, ${g}, ${b}`);
      setHsl(rgbToHsl(r, g, b).replace(/^hsl\(|\)$/g, "").replace(/%/g, ""));
    } catch (e) {
      setError(safeTextFromError(e));
    }
  };

  const fromRgb = () => {
    setError("");
    try {
      const parts = rgb.split(",").map((x) => parseInt(x.trim(), 10));
      const [r = 0, g = 0, b = 0] = parts;
      if (parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) { setError("Invalid RGB"); return; }
      setHex(rgbToHex(r, g, b));
      const hslStr = rgbToHsl(r, g, b);
      setHsl(hslStr.replace(/^hsl\(|\)$/g, "").replace(/%/g, ""));
    } catch (e) {
      setError(safeTextFromError(e));
    }
  };

  return (
    <div className="tool-surface-inner">
      <div className="field">
        <label>HEX</label>
        <div className="output-row">
          <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#3b82f6" />
          <button type="button" className="button-primary" onClick={fromHex}>From HEX</button>
        </div>
      </div>
      <div className="field">
        <label>RGB</label>
        <div className="output-row">
          <input type="text" value={rgb} onChange={(e) => setRgb(e.target.value)} placeholder="59, 130, 246" />
          <button type="button" className="button-primary" onClick={fromRgb}>From RGB</button>
        </div>
      </div>
      <div className="field">
        <label>HSL</label>
        <input type="text" value={hsl} readOnly placeholder="217, 91%, 60%" />
      </div>
      <div className="field">
        <label>Preview</label>
        <div style={{ width: 100, height: 50, background: hex, border: "1px solid #ccc", borderRadius: 6 }} />
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
