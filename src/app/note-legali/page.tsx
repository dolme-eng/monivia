import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import LegalDocument from '@/components/LegalDocument';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Note Legali | Monivia',
  description: 'Informazioni societarie, iscrizione OAM e avvertenze legali sul servizio Monivia.',
  path: '/note-legali',
});

export default function NoteLegali() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <Navbar />

      <PageHero
        badge="Informazioni legali"
        title="Note legali"
        description="Le informazioni societarie e i riferimenti utili per la trasparenza del servizio."
      />

      <div className="site-container mb-2 mt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Note legali' }]} />
      </div>

      <LegalDocument
        updatedAt="01/06/2024"
        sections={[
          {
            id: 'societa',
            title: 'Informazioni societarie',
            content: (
              <>
                <p>Monivia S.p.A.</p>
                <p>Sede Legale: Via Dante, 10 - 20121 Milano (MI)</p>
                <p>P.IVA: 01234567890</p>
                <p>Iscrizione OAM n. M123456</p>
              </>
            ),
          },
          {
            id: 'messaggio',
            title: 'Messaggio pubblicitario',
            content: (
              <>
                <p>
                  Tutte le operazioni di finanziamento sono soggette ad approvazione da parte degli istituti eroganti.
                  Prima di sottoscrivere il contratto, si prega di leggere attentamente il modulo SECCI e le Informazioni
                  Europee di Base sul Credito ai Consumatori.
                </p>
                <p>
                  Le condizioni riportate sul sito sono a titolo di esempio e possono variare in base al profilo
                  finanziario del richiedente.
                </p>
              </>
            ),
          },
        ]}
      />

      <Footer />
    </main>
  );
}
