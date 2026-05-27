import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Contatti() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error();
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <section className="pt-40 pb-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Contattaci</h1>
            <p className="text-xl text-slate-300">
              Hai una domanda? Il nostro team di esperti è a tua disposizione 24 ore su 24, 7 giorni su 7.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-[32px] text-center shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
               <h3 className="font-bold text-primary text-xl mb-2">Chiamaci</h3>
               <p className="text-slate-500">+39 350 853 3366</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] text-center shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h3 className="font-bold text-primary text-xl mb-2">Email</h3>
              <p className="text-slate-500">supporto@finora.it</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] text-center shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h3 className="font-bold text-primary text-xl mb-2">Indirizzo</h3>
              <p className="text-slate-500">Milano, Italia</p>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-xl max-w-4xl mx-auto border border-slate-100">
            <h3 className="text-3xl font-black text-primary mb-8 text-center">Inviaci un messaggio</h3>
             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                   <input name="nome" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors text-slate-800" required />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                   <input name="email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors text-slate-800" required />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Oggetto</label>
                 <input name="oggetto" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors text-slate-800" required />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Messaggio</label>
                 <textarea name="message" rows={6} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors resize-none text-slate-800" required></textarea>
               </div>
               <button type="submit" disabled={status === 'loading'} className="w-full btn-primary py-5 text-sm font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-transform disabled:opacity-50">
                 {status === 'loading' ? 'Invio in corso...' : status === 'success' ? 'Messaggio Inviato!' : 'Invia Messaggio'}
               </button>
               {status === 'error' && <p className="text-red-500 text-xs text-center font-bold">Errore durante l'invio. Riprova più tardi.</p>}
             </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
