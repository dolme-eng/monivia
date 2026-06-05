import { buildPageMetadata } from '@/lib/seo';
import ChiSiamoClient from './client';

export const metadata = buildPageMetadata({
  title: 'Chi siamo | Monivia — La nostra storia e missione',
  description: 'Scopri chi è Monivia: istituzione finanziaria italiana con oltre 38.000 pratiche finanziate, processo 100% digitale e assistenza dedicata.',
  path: '/chi-siamo',
  keywords: ['chi siamo Monivia', 'storia Monivia', 'istituto finanziario italiano'],
});

export default function ChiSiamo() {
  return <ChiSiamoClient />;
}
