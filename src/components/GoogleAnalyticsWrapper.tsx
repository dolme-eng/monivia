'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function GoogleAnalyticsWrapper({ gaId }: { gaId: string }) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check initial consent
    if (localStorage.getItem('monivia_cookie_consent') === 'accepted') {
      setHasConsent(true);
    }

    // Listen for consent event from CookieBanner
    const handleConsent = ((event: CustomEvent) => {
      if (event.detail === 'accepted') {
        setHasConsent(true);
      }
    }) as EventListener;

    window.addEventListener('monivia:cookie-consent', handleConsent);
    return () => window.removeEventListener('monivia:cookie-consent', handleConsent);
  }, []);

  if (!hasConsent || !gaId) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
