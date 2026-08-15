import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export interface AdminPayload {
  role?: string;
  userId?: string;
  email?: string;
}

export async function requireAdmin(req: NextRequest): Promise<AdminPayload | null> {
  const token = req.cookies.get('authjs.session-token')?.value
    || req.cookies.get('__Secure-authjs.session-token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== 'ADMIN') return null;
    return payload as AdminPayload;
  } catch {
    return null;
  }
}
