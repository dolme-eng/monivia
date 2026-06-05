import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  DASHBOARD_SESSION_COOKIE,
  createDashboardSessionToken,
  getSessionCookieOptions,
  verifyDashboardCredentials,
} from '@/lib/dashboard-auth';

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(256),
  rememberMe: z.coerce.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Dati non validi' }, { status: 400 });
    }

    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: 'Accesso non valido' }, { status: 400 });
    }

    if (!verifyDashboardCredentials(result.data.email, result.data.password)) {
      return NextResponse.json(
        { success: false, error: 'Email o password non corretti' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(
      DASHBOARD_SESSION_COOKIE,
      createDashboardSessionToken(result.data.email, result.data.rememberMe),
      getSessionCookieOptions(result.data.rememberMe)
    );

    return response;
  } catch (error) {
    console.error('API /auth/login Error:', error);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
