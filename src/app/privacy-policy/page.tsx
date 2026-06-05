import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import LegalDocument from '@/components/LegalDocument';
import { buildPageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata = buildPageMetadata({
  title: 'Informativa Privacy | Monivia',
  description: 'Scopri come Monivia raccoglie, usa e protegge i tuoi dati personali in conformità al GDPR.',
  path: '/privacy-policy',
});

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <Navbar />

      <PageHero
        badge="Protezione dati"
        title="Informativa privacy"
        description="Spieghiamo in modo chiaro come raccogliamo, usiamo e proteggiamo i dati personali."
      />

      <div className="site-container mb-2 mt-6 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Informativa privacy' },
          ]}
        />
      </div>

      <LegalDocument
        updatedAt="01/06/2024"
        sections={[
          {
            id: 'titolare',
            title: '1. Titolare del trattamento',
            content: (
              <p>Monivia agisce come titolare del trattamento dei dati personali raccolti tramite questo sito web.</p>
            ),
          },
          {
            id: 'dati',
            title: '2. Dati raccolti',
            content: (
              <p>
                Raccogliamo i dati necessari per fornirti i nostri servizi finanziari, inclusi ma non limitati a: nome,
                email, numero di telefono e informazioni finanziarie per la valutazione del credito.
              </p>
            ),
          },
          {
            id: 'finalita',
            title: '3. Finalità del trattamento',
            content: (
              <p>
                I tuoi dati vengono utilizzati esclusivamente per l&apos;analisi della tua richiesta di prestito, per
                contattarti in merito ai nostri servizi e per adempiere agli obblighi di legge.
              </p>
            ),
          },
          {
            id: 'diritti',
            title: '4. I tuoi diritti',
            content: (
              <p>
                Hai il diritto di accedere ai tuoi dati, chiederne la rettifica, la cancellazione o opporti al loro
                trattamento contattandoci all&apos;indirizzo {siteConfig.contact.email}.
              </p>
            ),
          },
        ]}
      />

      <Footer />
    </main>
  );
}
