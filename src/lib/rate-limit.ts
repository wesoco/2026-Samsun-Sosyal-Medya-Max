/**
 * Bellek içi sabit pencere sayacı (tek konteyner). Yeniden başlatmada sıfırlanır;
 * giriş denemesi ve form spam'i için yeterli, dağıtık sınır gerekmez.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, b] of buckets) if (b.resetAt <= now) buckets.delete(key);
}

/** Sayacı artırmadan sınırın aşılıp aşılmadığına bakar */
export function isLimited(key: string, limit: number) {
  const b = buckets.get(key);
  return Boolean(b && b.resetAt > Date.now() && b.count >= limit);
}

/** Sayacı artırır; sınır aşıldıysa false döner */
export function hit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  sweep(now);
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= limit;
}

export function reset(key: string) {
  buckets.delete(key);
}

/** Proxy (Coolify/Traefik, Cloudflare) arkasında istemci IP'si */
export function clientIp(headers: Headers) {
  return (
    headers.get("cf-connecting-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
