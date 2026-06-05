import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Chi siamo | Monivia',
  description: 'Scopri la missione di Monivia, il nostro approccio digitale e il modo in cui accompagniamo privati e professionisti nel finanziamento.',
  path: '/chi-siamo',
  keywords: ['chi siamo Monivia', 'fintech', 'prestiti online', 'credibilità'],
});

export default function ChiSiamoLayout({ children }: { children: ReactNode }) {
  return children;
}
