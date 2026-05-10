import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-8">Privacy Policy</h1>
          <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-slate-100 prose prose-slate max-w-none">
            <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>
            <h3>1. Titolare del Trattamento</h3>
            <p>Finora agisce come titolare del trattamento dei dati personali raccolti tramite questo sito web.</p>
            <h3>2. Dati raccolti</h3>
            <p>Raccogliamo i dati necessari per fornirti i nostri servizi finanziari, inclusi ma non limitati a: nome, email, numero di telefono, e informazioni finanziarie per la valutazione del credito.</p>
            <h3>3. Finalità del trattamento</h3>
            <p>I tuoi dati vengono utilizzati esclusivamente per l'analisi della tua richiesta di prestito, per contattarti in merito ai nostri servizi e per adempiere agli obblighi di legge.</p>
            <h3>4. I tuoi diritti</h3>
            <p>Hai il diritto di accedere ai tuoi dati, chiederne la rettifica, la cancellazione o opporti al loro trattamento contattandoci all'indirizzo supporto@finora.it.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
