import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import LegalDocument from '@/components/LegalDocument';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Informativa Cookie | Monivia',
  description: 'Scopri quali cookie utilizziamo su Monivia e come gestire le tue preferenze di tracciamento.',
  path: '/cookie-policy',
});

export default function CookiePolicy() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <Navbar />

      <PageHero
        badge="Cookie e tracciamento"
        title="Informativa cookie"
        description="Ti spieghiamo quali cookie utilizziamo e come puoi gestire le tue preferenze."
      />

      <div className="site-container mb-2 mt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Informativa cookie' }]} />
      </div>

      <LegalDocument
        updatedAt="01/06/2024"
        sections={[
          {
            id: 'cosa-sono',
            title: '1. Cosa sono i cookie?',
            content: (
              <p>
                I cookie sono piccoli file di testo che i siti visitati inviano al tuo terminale, dove vengono
                memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.
              </p>
            ),
          },
          {
            id: 'utilizzo',
            title: '2. Come utilizziamo i cookie',
            content: (
              <p>
                Monivia utilizza cookie tecnici necessari per il corretto funzionamento del sito e cookie analitici per
                comprendere come gli utenti interagiscono con la nostra piattaforma.
              </p>
            ),
          },
          {
            id: 'gestione',
            title: '3. Gestione dei cookie',
            content: (
              <p>
                Puoi gestire le tue preferenze sui cookie direttamente dalle impostazioni del tuo browser, impedendone ad
                esempio l&apos;installazione o cancellando quelli già salvati.
              </p>
            ),
          },
        ]}
      />

      <Footer />
    </main>
  );
}
