import { buildPageMetadata } from '@/lib/seo';
import ContattiClient from './client';

export const metadata = buildPageMetadata({
  title: 'Contattaci | Monivia — Supporto e assistenza',
  description: 'Contatta il team Monivia per domande su prestiti, pratiche o assistenza. Risposta entro 48 ore lavorative.',
  path: '/contatti',
  keywords: ['contatti Monivia', 'assistenza prestiti', 'supporto finanziario'],
});

export default function Contatti() {
  return <ContattiClient />;
}
