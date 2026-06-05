import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { siteConfig } from '@/config/site';

export const DASHBOARD_SESSION_COOKIE = 'monivia_dashboard_session';

const FALLBACK_USERNAME = 'admin@monivia.it';
const FALLBACK_PASSWORD = 'Monivia2024!';
const DASHBOARD_SESSION_TTL_SECONDS = 60 * 60 * 12;
const DASHBOARD_REMEMBER_TTL_SECONDS = 60 * 60 * 24 * 30;

type SessionPayload = {
  kind: 'dashboard-session';
  username: string;
  iat: number;
  exp: number;
  rememberMe: boolean;
};

function getSecret() {
  return (
    process.env.DASHBOARD_AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    `${siteConfig.name}:${siteConfig.url}:${siteConfig.contact.email}`
  );
}

function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function getConfiguredUsername() {
  const configured = process.env.DASHBOARD_USERNAME?.trim();
  if (configured) {
    return configured;
  }

  return isProduction() ? '' : FALLBACK_USERNAME;
}

function getConfiguredPassword() {
  const configured = process.env.DASHBOARD_PASSWORD;
  if (configured) {
    return configured;
  }

  return isProduction() ? '' : FALLBACK_PASSWORD;
}

function hashToBuffer(value: string) {
  return createHash('sha256').update(value).digest();
}

function safeCompare(left: string, right: string) {
  const leftBuffer = hashToBuffer(left);
  const rightBuffer = hashToBuffer(right);
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function encodePayload(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = createHmac('sha256', getSecret()).update(body).digest('base64url');
  return `${body}.${signature}`;
}

function decodePayload(token: string): SessionPayload | null {
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  const expectedSignature = createHmac('sha256', getSecret()).update(body).digest('base64url');
  if (!safeCompare(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
    if (payload.kind !== 'dashboard-session') return null;
    return payload;
  } catch {
    return null;
  }
}

export function getDashboardCredentials() {
  return {
    username: getConfiguredUsername(),
    password: getConfiguredPassword(),
  };
}

export function verifyDashboardCredentials(username: string, password: string) {
  const credentials = getDashboardCredentials();
  if (!credentials.username || !credentials.password) {
    return false;
  }

  return (
    safeCompare(normalizeUsername(username), normalizeUsername(credentials.username)) &&
    safeCompare(password, credentials.password)
  );
}

export function createDashboardSessionToken(username: string, rememberMe = false) {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (rememberMe ? DASHBOARD_REMEMBER_TTL_SECONDS : DASHBOARD_SESSION_TTL_SECONDS);

  const payload: SessionPayload = {
    kind: 'dashboard-session',
    username: normalizeUsername(username),
    iat: now,
    exp,
    rememberMe,
  };

  return encodePayload(payload);
}

export function verifyDashboardSessionToken(token?: string) {
  if (!token) return null;

  const payload = decodePayload(token);
  if (!payload) return null;

  if (payload.exp <= Math.floor(Date.now() / 1000)) {
    return null;
  }

  const credentials = getDashboardCredentials();
  if (!credentials.username) {
    return null;
  }

  if (!safeCompare(payload.username, normalizeUsername(credentials.username))) {
    return null;
  }

  return payload;
}

export function getSessionCookieOptions(rememberMe = false) {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: 'lax' as const,
    path: '/',
    maxAge: rememberMe ? DASHBOARD_REMEMBER_TTL_SECONDS : DASHBOARD_SESSION_TTL_SECONDS,
  };
}
