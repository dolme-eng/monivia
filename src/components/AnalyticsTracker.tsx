'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics-client';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname || '/');
  }, [pathname]);

  return null;
}
