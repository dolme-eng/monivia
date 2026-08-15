import { kv } from '@vercel/kv';

const memoryStore = new Map<string, { count: number; expiresAt: number }>();
let cleanupStarted = false;
function ensureCleanup() {
  if (cleanupStarted) return;
  cleanupStarted = true;
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryStore) {
      if (now > entry.expiresAt) memoryStore.delete(key);
    }
  }, 5 * 60 * 1000);
}

export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    'unknown'
  );
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean; count: number }> {
  try {
    const count = await kv.incr(key);
    if (count === 1) {
      await kv.expire(key, Math.ceil(windowMs / 1000));
    }
    return { allowed: count <= limit, count };
  } catch {
    ensureCleanup();
    const now = Date.now();
    const entry = memoryStore.get(key);
    if (!entry || now > entry.expiresAt) {
      memoryStore.set(key, { count: 1, expiresAt: now + windowMs });
      return { allowed: true, count: 1 };
    }
    entry.count += 1;
    return { allowed: entry.count <= limit, count: entry.count };
  }
}
