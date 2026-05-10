import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-8">Cookie Policy</h1>
          <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-slate-100 prose prose-slate max-w-none">
            <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>
            <h3>1. Cosa sono i cookie?</h3>
            <p>I cookie sono piccoli file di testo che i siti visitati inviano al tuo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.</p>
            <h3>2. Come utilizziamo i cookie</h3>
            <p>Finora utilizza cookie tecnici necessari per il corretto funzionamento del sito e cookie analitici per comprendere come gli utenti interagiscono con la nostra piattaforma.</p>
            <h3>3. Gestione dei cookie</h3>
            <p>Puoi gestire le tue preferenze sui cookie direttamente dalle impostazioni del tuo browser, impedendone ad esempio l'installazione o cancellando quelli già salvati.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
