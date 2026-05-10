import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LavoraConNoi() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">Lavora con noi</h1>
          <p className="text-xl text-slate-500 mb-12">
            Unisciti al team di Finora e aiutaci a rivoluzionare il mondo del credito.
          </p>
          <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-primary mb-4">Posizioni aperte</h3>
            <p className="text-slate-600 mb-8">
              Al momento non ci sono posizioni aperte, ma siamo sempre alla ricerca di talenti. Inviaci il tuo CV!
            </p>
            <a href="mailto:lavoro@finora.it" className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-xs font-black uppercase tracking-widest rounded-2xl">
              Invia Candidatura Spontanea
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
