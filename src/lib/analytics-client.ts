'use client';

import type { AnalyticsEventInput } from '@/lib/analytics';

const SESSION_KEY = 'monivia:analytics-session';
const CONSENT_KEY = 'monivia_cookie_consent';

export function canTrackAnalytics(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) !== 'declined';
}

function getStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

export function getAnalyticsSessionId() {
  const storage = getStorage();
  if (!storage) return '';

  const existing = storage.getItem(SESSION_KEY);
  if (existing) return existing;

  const created = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  storage.setItem(SESSION_KEY, created);
  return created;
}

function shouldDedupePageView(page: string) {
  if (typeof window === 'undefined') return false;

  const key = `monivia:page-view:${page}`;
  const current = window.sessionStorage.getItem(key);
  if (current) return true;

  window.sessionStorage.setItem(key, String(Date.now()));
  return false;
}

export function trackAnalyticsEvent(event: AnalyticsEventInput) {
  if (typeof window === 'undefined' || !canTrackAnalytics()) {
    return;
  }

  const payload = {
    ...event,
    sessionId: event.sessionId || getAnalyticsSessionId(),
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics', blob);
    return;
  }

  void fetch('/api/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  });
}

export function trackPageView(page: string, metadata?: Record<string, unknown>) {
  if (shouldDedupePageView(page)) {
    return;
  }

  trackAnalyticsEvent({
    eventType: 'page_view',
    page,
    metadata,
  });
}

export function trackCtaClick(
  page: string,
  label: string,
  metadata?: Record<string, unknown>
) {
  trackAnalyticsEvent({
    eventType: 'cta_click',
    page,
    label,
    metadata,
  });
}
