import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SimulatorHorizontal from '@/components/SimulatorHorizontal';
import TrustBar from '@/components/TrustBar';
import CreditAccessibility from '@/components/CreditAccessibility';
import WhyChooseUs from '@/components/WhyChooseUs';
import VideoPromo from '@/components/VideoPromo';
import Stats from '@/components/Stats';
import OffersTabs from '@/components/OffersTabs';
import ContactSection from '@/components/ContactSection';
import LoanForm from '@/components/LoanForm';
import Footer from '@/components/Footer';
import TrustStrip from '@/components/TrustStrip';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Monivia | Prestiti online chiari e veloci',
  description: 'Richiedi prestito online con Monivia: simulatore gratuito, tasso fisso dal 2%, risposta in 48h. Zero costi nascosti.',
  path: '/',
  keywords: ['prestito online', 'prestiti personali', 'simulatore prestito', 'Monivia'],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-secondary/30 selection:text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Quanto costa un prestito con Monivia?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Il TAN parte dal 1,8% fisso. Non ci sono spese nascoste: il costo totale è indicato chiaramente prima della firma. Esempio: 10.000€ in 60 mesi, rata mensile 179,50€, totale 10.770€.',
                },
              },
              {
                '@type': 'Question',
                name: 'Come richiedere un prestito online con Monivia?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Compila il modulo online in 5 minuti, ricevi l\'esito entro 48 ore lavorative e firma digitalmente il contratto. I fondi arrivano sul tuo conto in 3-5 giorni lavorativi.',
                },
              },
              {
                '@type': 'Question',
                name: 'Quali documenti servono per un prestito?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Documento di identità valido, Codice Fiscale, ultima busta paga o Modello Unico, e IBAN del conto corrente.',
                },
              },
              {
                '@type': 'Question',
                name: 'Qual è la differenza tra TAN e TAEG?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Il TAN (Tasso Annuo Nominale) indica il tasso di interesse puro. Il TAEG (Tasso Annuo Effettivo Globale) include anche interessi, spese accessorie e costi del servizio di intermediazione. Il TAEG è l\'indicatore più importante per confrontare i prestiti.',
                },
              },
              {
                '@type': 'Question',
                name: 'Posso rimborsare il prestito anticipatamente?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sì, è possibile il rimborso anticipato totale o parziale con una commissione massima dell\'1%, come previsto dalla normativa italiana.',
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Monivia — Prestiti online chiari e veloci',
            description: 'Richiedi un prestito online con Monivia: importi da 5.000€ a 500.000€, tasso fisso dal 1,8%, risposta entro 48 ore.',
            url: 'https://www.monivia.it',
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', '.section-copy'],
            },
          }),
        }}
      />
      <Navbar />

      <Hero />
      
      <section id="calcolatore" className="relative z-30 -mt-16 px-4 pb-10 sm:-mt-20 md:px-6 lg:-mt-24">
        <div className="mx-auto max-w-6xl">
          <SimulatorHorizontal />
        </div>
      </section>
      
      <TrustBar />

      <CreditAccessibility />

      <WhyChooseUs />

      <VideoPromo />

      <Stats />

      <OffersTabs />

      <section id="richiedi" className="section-pad relative bg-slate-50">
        <div className="site-container relative z-10">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <h2 className="section-heading">Inizia la tua richiesta</h2>
            <p className="section-copy mt-5">
              Compila il modulo in meno di 2 minuti. Nessun impegno e impatto nullo sul tuo punteggio creditizio.
            </p>
          </div>
          <LoanForm />
          <TrustStrip className="mx-auto mt-8 max-w-4xl" />
        </div>
      </section>

      <ContactSection />

      <Footer />
    </main>
  );
}
