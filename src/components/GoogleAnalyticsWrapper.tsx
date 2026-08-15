'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function GoogleAnalyticsWrapper({ gaId, nonce }: { gaId: string; nonce?: string }) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('monivia_cookie_consent');
    if (consent === 'accepted') {
      setHasConsent(true);
    }

    const handleConsent = ((event: CustomEvent) => {
      setHasConsent(event.detail === 'accepted');
    }) as EventListener;

    window.addEventListener('monivia:cookie-consent', handleConsent);
    return () => window.removeEventListener('monivia:cookie-consent', handleConsent);
  }, []);

  if (!hasConsent || !gaId) return null;

  return <GoogleAnalytics gaId={gaId} nonce={nonce} />;
}
