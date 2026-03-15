/**
 * Base64url encode string (no padding, - and _ instead of + and /).
 */
export function base64urlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  return base64urlEncodeBytes(bytes);
}

/**
 * Base64url encode raw bytes (e.g. signature).
 */
export function base64urlEncodeBytes(bytes: Uint8Array): string {
  const binary = String.fromCharCode(...bytes);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Base64url decode.
 */
export function base64urlDecode(str: string): string {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export type JwtDecoded = {
  header: string;
  payload: string;
  signature: string;
  raw: { header: unknown; payload: unknown };
};

export function decodeJwt(token: string): JwtDecoded | Error {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return new Error("Invalid JWT: expected 3 parts separated by dots");
  }
  try {
    const headerJson = base64urlDecode(parts[0]);
    const payloadJson = base64urlDecode(parts[1]);
    const header = JSON.parse(headerJson) as unknown;
    const payload = JSON.parse(payloadJson) as unknown;
    const signature = parts[2];
    return {
      header: JSON.stringify(header, null, 2),
      payload: JSON.stringify(payload, null, 2),
      signature,
      raw: { header, payload }
    };
  } catch (e) {
    return e instanceof Error ? e : new Error(String(e));
  }
}

/**
 * Verify JWT signature with HMAC-SHA256 and a secret.
 * Returns true if the signature matches, false otherwise.
 */
export async function verifyJwt(token: string, secret: string): Promise<boolean> {
  const parts = token.trim().split(".");
  if (parts.length !== 3 || !parts[2]) return false;
  try {
    const message = `${parts[0]}.${parts[1]}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(message)
    );
    const expectedSig = base64urlEncodeBytes(new Uint8Array(sig));
    return parts[2] === expectedSig;
  } catch {
    return false;
  }
}

/**
 * Create an unsigned JWT (header.payload.) or sign with HMAC-SHA256 if secret is provided.
 */
export async function encodeJwt(
  headerJson: string,
  payloadJson: string,
  secret?: string
): Promise<string | Error> {
  try {
    JSON.parse(headerJson);
    JSON.parse(payloadJson);
  } catch (e) {
    return e instanceof Error ? e : new Error("Invalid JSON in header or payload");
  }

  const headerB64 = base64urlEncode(headerJson);
  const payloadB64 = base64urlEncode(payloadJson);
  const message = `${headerB64}.${payloadB64}`;

  if (!secret || secret.trim() === "") {
    return `${message}.`;
  }

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(message)
    );
    const sigB64 = base64urlEncodeBytes(new Uint8Array(sig));
    return `${message}.${sigB64}`;
  } catch (e) {
    return e instanceof Error ? e : new Error(String(e));
  }
}
