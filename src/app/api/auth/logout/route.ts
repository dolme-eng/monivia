import { NextResponse } from 'next/server';
import { DASHBOARD_SESSION_COOKIE } from '@/lib/dashboard-auth';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  response.cookies.delete(DASHBOARD_SESSION_COOKIE);
  return response;
}
