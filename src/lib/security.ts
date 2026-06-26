import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';
import { kv } from '@vercel/kv';

type SubmissionKind = 'contact' | 'loan';

type GuardOptions = {
  kind: SubmissionKind;
  honeypot?: string;
  limit?: number;
  windowMs?: number;
};

type GuardResult =
  | { allowed: true }
  | { allowed: false; silent?: boolean; response?: NextResponse };

const limitConfig: Record<SubmissionKind, { limit: number; windowMs: number }> = {
  contact: { limit: 5, windowMs: 10 * 60 * 1000 },
  loan: { limit: 3, windowMs: 10 * 60 * 1000 },
};

// In-memory fallback when Redis is down
const memoryStore = new Map<string, { count: number; expiresAt: number }>();

// Periodic cleanup of expired entries (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryStore) {
      if (now > entry.expiresAt) memoryStore.delete(key);
    }
  }, 5 * 60 * 1000);
}

function getMemoryRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || now > entry.expiresAt) {
    memoryStore.set(key, { count: 1, expiresAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > limit;
}

function getAllowedHosts() {
  const hosts = new Set<string>(['localhost', 'localhost:3000', '127.0.0.1', '127.0.0.1:3000', '::1']);
  const candidates = [siteConfig.url, process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''];

  for (const candidate of candidates) {
    if (!candidate) continue;

    try {
      hosts.add(new URL(candidate).host);
    } catch {
      continue;
    }
  }

  return hosts;
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin') ?? request.headers.get('referer');
  if (!origin) return false;

  try {
    const host = new URL(origin).host;
    const allowed = getAllowedHosts();
    if (allowed.has(host)) return true;
    
    if (host.startsWith('www.') && allowed.has(host.replace('www.', ''))) return true;
    if (allowed.has(`www.${host}`)) return true;

    return false;
  } catch {
    return false;
  }
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

async function isRateLimited(request: Request, kind: SubmissionKind, limit: number, windowMs: number) {
  const key = `rate_limit:${kind}:${getClientIdentifier(request)}`;
  
  try {
    const current = await kv.get<number>(key);
    
    if (current === null) {
      await kv.set(key, 1, { ex: Math.ceil(windowMs / 1000) });
      return false;
    }

    const count = current + 1;
    await kv.set(key, count, { keepTtl: true });
    
    return count > limit;
  } catch (error) {
    console.error('Redis Rate Limit Error — falling back to in-memory:', error);
    // Fail closed: use in-memory fallback
    return getMemoryRateLimit(key, limit, windowMs);
  }
}

export async function guardSubmission(request: Request, options: GuardOptions): Promise<GuardResult> {
  const { kind, honeypot = '', limit = limitConfig[kind].limit, windowMs = limitConfig[kind].windowMs } = options;

  if (honeypot.trim().length > 0) {
    return { allowed: false, silent: true };
  }

  if (!isAllowedOrigin(request)) {
    return {
      allowed: false,
      response: NextResponse.json(
        { error: 'Origine non autorizzata' },
        { status: 403 }
      ),
    };
  }

  if (await isRateLimited(request, kind, limit, windowMs)) {
    return {
      allowed: false,
      response: NextResponse.json(
        { error: 'Troppe richieste, riprova tra qualche minuto.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(windowMs / 1000)),
          },
        }
      ),
    };
  }

  return { allowed: true };
}
