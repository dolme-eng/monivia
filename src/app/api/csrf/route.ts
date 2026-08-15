import { NextResponse } from 'next/server';
import { generateCsrfToken } from '@/lib/csrf';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const rl = await checkRateLimit(`csrf:${ip}`, 30, 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Troppe richieste' }, { status: 429 });
  }

  const token = generateCsrfToken();
  return NextResponse.json({ csrfToken: token }, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
  });
}
