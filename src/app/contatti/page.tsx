'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

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
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      <Navbar />
      
      <section className="pt-40 pb-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary/20 via-primary to-primary"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl"
            >
              Contattaci
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
              className="text-xl text-slate-300 drop-shadow-md"
            >
              Hai una domanda? Il nostro team di esperti è a tua disposizione 24 ore su 24, 7 giorni su 7.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
                title: "Chiamaci",
                desc: siteConfig.contact.phone.display
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
                title: "Email",
                desc: siteConfig.contact.email
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
                title: "Indirizzo",
                desc: "Milano, Italia"
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-[32px] text-center shadow-soft border border-slate-100 hover:shadow-2xl hover:shadow-secondary/10 hover:border-secondary/20 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {card.icon}
                </div>
                 <h3 className="font-bold text-primary text-xl mb-2 group-hover:text-secondary transition-colors">{card.title}</h3>
                 <p className="text-slate-500">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl shadow-primary/5 max-w-4xl mx-auto border border-slate-100"
          >
            <h3 className="text-3xl font-black text-primary mb-8 text-center">Inviaci un messaggio</h3>
             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs uppercase tracking-widest font-black text-slate-400 ml-1 mb-2">Nome Completo</label>
                   <input name="nome" type="text" placeholder="Il tuo nome completo" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10 transition-all text-sm font-medium" required />
                 </div>
                 <div>
                   <label className="block text-xs uppercase tracking-widest font-black text-slate-400 ml-1 mb-2">Email</label>
                   <input name="email" type="email" placeholder="La tua email" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10 transition-all text-sm font-medium" required />
                 </div>
               </div>
               <div>
                 <label className="block text-xs uppercase tracking-widest font-black text-slate-400 ml-1 mb-2">Oggetto</label>
                 <input name="oggetto" type="text" placeholder="Oggetto del messaggio" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10 transition-all text-sm font-medium" required />
               </div>
               <div>
                 <label className="block text-xs uppercase tracking-widest font-black text-slate-400 ml-1 mb-2">Messaggio</label>
                 <textarea name="message" rows={6} placeholder="Scrivi il tuo messaggio qui..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10 transition-all resize-none text-sm font-medium" required></textarea>
               </div>
               <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 type="submit" 
                 disabled={status === 'loading'} 
                 className="w-full btn-primary py-5 text-sm font-black uppercase tracking-widest rounded-2xl disabled:opacity-50 shadow-xl shadow-secondary/20"
               >
                 {status === 'loading' ? 'Invio in corso...' : status === 'success' ? 'Messaggio Inviato!' : 'Invia Messaggio'}
               </motion.button>
               <AnimatePresence>
                 {status === 'error' && (
                   <motion.p 
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="text-red-500 text-xs text-center font-bold bg-red-50 p-3 rounded-xl border border-red-100"
                   >
                     Errore durante l&apos;invio. Riprova più tardi.
                   </motion.p>
                 )}
               </AnimatePresence>
             </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
