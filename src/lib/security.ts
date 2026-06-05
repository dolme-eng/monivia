import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

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

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

const limitConfig: Record<SubmissionKind, { limit: number; windowMs: number }> = {
  contact: { limit: 5, windowMs: 10 * 60 * 1000 },
  loan: { limit: 3, windowMs: 10 * 60 * 1000 },
};

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
  if (!origin) return true;

  try {
    const host = new URL(origin).host;
    const allowed = getAllowedHosts();
    if (allowed.has(host)) return true;
    
    // Also allow www. prefix if base domain is allowed (and vice versa)
    if (host.startsWith('www.') && allowed.has(host.replace('www.', ''))) return true;
    if (allowed.has(`www.${host}`)) return true;

    return false;
  } catch {
    return true;
  }
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function isRateLimited(request: Request, kind: SubmissionKind, limit: number, windowMs: number) {
  const key = `${kind}:${getClientIdentifier(request)}`;
  const now = Date.now();
  const current = rateBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > limit;
}

export function guardSubmission(request: Request, options: GuardOptions): GuardResult {
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

  if (isRateLimited(request, kind, limit, windowMs)) {
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
