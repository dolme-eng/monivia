import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NoteLegali() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-8">Note Legali</h1>
          <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-slate-100 prose prose-slate max-w-none">
            <p><strong>Informazioni Societarie</strong></p>
            <p>Finora S.p.A.</p>
            <p>Sede Legale: Via Dante, 10 - 20121 Milano (MI)</p>
            <p>P.IVA: 01234567890</p>
            <p>Iscrizione OAM n. M123456</p>
            
            <h3>Messaggio pubblicitario con finalità promozionale</h3>
            <p>Tutte le operazioni di finanziamento sono soggette ad approvazione da parte degli istituti eroganti. Prima di sottoscrivere il contratto, si prega di leggere attentamente il modulo SECCI e le Informazioni Europee di Base sul Credito ai Consumatori.</p>
            <p>Le condizioni riportate sul sito sono a titolo di esempio e possono variare in base al profilo finanziario del richiedente.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
