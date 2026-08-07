import { createHmac, timingSafeEqual } from "node:crypto";

export function signPayload(
  secret: string,
  timestamp: string,
  body: string,
): string {
  return createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("hex");
}

export function verifySignature(input: {
  secret: string;
  timestamp: string;
  body: string;
  signature: string;
  maxSkewMs?: number;
}): boolean {
  const maxSkew = input.maxSkewMs ?? 5 * 60 * 1000;
  const ts = Number(input.timestamp);
  if (!Number.isFinite(ts)) return false;
  if (Math.abs(Date.now() - ts) > maxSkew) return false;

  const expected = signPayload(input.secret, input.timestamp, input.body);
  const a = Buffer.from(expected);
  const b = Buffer.from(input.signature);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function buildSignedHeaders(
  siteKey: string,
  secret: string,
  body: string,
): Record<string, string> {
  const timestamp = String(Date.now());
  const signature = signPayload(secret, timestamp, body);
  return {
    "content-type": "application/json",
    "x-seo-agent-key": siteKey,
    "x-seo-agent-timestamp": timestamp,
    "x-seo-agent-signature": signature,
  };
}
