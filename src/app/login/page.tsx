import { buildPageMetadata } from '@/lib/seo';
import LoginClient from './client';

export const metadata = buildPageMetadata({
  title: 'Accesso riservato | Monivia',
  description: 'Area di accesso riservata agli operatori Monivia.',
  path: '/login',
  noindex: true,
});

export default function LoginPage() {
  return <LoginClient />;
}
