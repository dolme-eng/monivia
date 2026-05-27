import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Trasparenza() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-8">Trasparenza Bancaria</h1>
          <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-slate-100 prose prose-slate max-w-none">
             <p>In ottemperanza alle disposizioni della Banca d&apos;Italia in materia di &quot;Trasparenza delle operazioni e dei servizi bancari e finanziari&quot;, mettiamo a disposizione del pubblico i fogli informativi dei nostri prodotti.</p>
            
            <div className="mt-8 space-y-4">
              <div className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50">
                <span className="font-bold">Guida al Credito ai Consumatori</span>
                <button className="text-secondary font-bold text-sm uppercase">Scarica PDF</button>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50">
                <span className="font-bold">Guida Arbitro Bancario Finanziario (ABF)</span>
                <button className="text-secondary font-bold text-sm uppercase">Scarica PDF</button>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50">
                <span className="font-bold">Tassi Effettivi Globali Medi (TEGM)</span>
                <button className="text-secondary font-bold text-sm uppercase">Scarica PDF</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
