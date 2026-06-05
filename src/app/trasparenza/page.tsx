import { buildPageMetadata } from '@/lib/seo';
import TrasparenzaClient from './client';

export const metadata = buildPageMetadata({
  title: 'Trasparenza bancaria | Monivia — Documenti e condizioni',
  description: 'Consulta la documentazione ufficiale Monivia: fogli informativi, condizioni generali e guide in conformità alle disposizioni Banca d\'Italia.',
  path: '/trasparenza',
  keywords: ['trasparenza bancaria', 'fogli informativi', 'documenti prestito Monivia'],
});

export default function Trasparenza() {
  return <TrasparenzaClient />;
}
