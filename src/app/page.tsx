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
  description: 'Scopri Monivia: simulatore, richiesta prestito guidata, assistenza dedicata e un percorso pensato prima per i dispositivi mobili.',
  path: '/',
  keywords: ['prestito online', 'prestiti personali', 'simulatore prestito', 'Monivia'],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-secondary/30 selection:text-primary">
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
