import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import CreditAccessibility from '@/components/CreditAccessibility';
import WhyChooseUs from '@/components/WhyChooseUs';
import VideoPromo from '@/components/VideoPromo';
import Stats from '@/components/Stats';
import OffersTabs from '@/components/OffersTabs';
import ContactSection from '@/components/ContactSection';
import LoanForm from '@/components/LoanForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-secondary/30 selection:text-primary">
      <Navbar />
      
      <Hero />
      
      <TrustBar />
      
      <CreditAccessibility />
      
      <WhyChooseUs />
      
      <VideoPromo />
      
      <Stats />
      
      <OffersTabs />
      
      <section id="richiedi" className="py-24 bg-slate-50 relative">
        {/* Decorazioni di background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Inizia la tua richiesta</h2>
            <p className="text-lg text-slate-600">
              Compila il modulo in meno di 2 minuti. Nessun impegno e impatto nullo sul tuo credit score.
            </p>
          </div>
          <LoanForm />
        </div>
      </section>
      
      <ContactSection />
      
      <Footer />
    </main>
  );
}
