'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { 
    id: 1, 
    title: 'Personale', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> 
  },
  { 
    id: 2, 
    title: 'Finanziario', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="5 21 5 10"></polyline><polyline points="9 21 9 10"></polyline><polyline points="13 21 13 10"></polyline><polyline points="17 21 17 10"></polyline><path d="M2 10l10-8 10 8"></path></svg> 
  },
  { 
    id: 3, 
    title: 'Documenti', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
  },
];

export default function LoanForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '', cognome: '', codiceFiscale: '', email: '', telefono: '',
    impiego: 'dipendente', reddito: '', finalita: 'auto', importo: '', durata: '',
    privacy: false, crif: false
  });
  const [practiceId, setPracticeId] = useState(0);

  const nextStep = () => {
    if (currentStep === 3) {
      setPracticeId(Math.floor(Math.random() * 1000000));
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const validateCodiceFiscale = (cf: string) => {
    const re = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
    return re.test(cf);
  };

  if (currentStep === 4) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-white rounded-3xl shadow-xl border border-slate-100"
      >
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h2 className="text-3xl font-black text-primary mb-4">Richiesta Ricevuta!</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto text-sm">
          Grazie per aver scelto Finora. La tua pratica <strong>#PD-{practiceId}</strong> è in fase di analisi. Ti contatteremo entro 48 ore lavorative.
        </p>
        <button onClick={() => window.location.href = '/'} className="btn-primary">Torna alla Home</button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Stepper */}
      <div className="flex justify-between mb-12 relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10"></div>
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              currentStep >= step.id ? 'bg-secondary border-secondary text-white shadow-lg shadow-cyan-500/30' : 'bg-white border-slate-200 text-slate-400'
            }`}>
              {step.icon}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-secondary' : 'text-slate-400'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8 text-center md:text-left">
                  <h3 className="text-2xl font-black text-primary mb-2">Informazioni Personali</h3>
                  <p className="text-sm text-slate-500">Inserisci i tuoi dati anagrafici corretti.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Nome</label>
                    <input type="text" placeholder="Es: Mario" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Cognome</label>
                    <input type="text" placeholder="Es: Rossi" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Codice Fiscale</label>
                    <input 
                      type="text" 
                      placeholder="RSSMRA80A01H501W" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all uppercase text-sm"
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        if (val.length > 16) return;
                        setFormData({...formData, codiceFiscale: val});
                      }}
                      value={formData.codiceFiscale}
                    />
                    {formData.codiceFiscale && !validateCodiceFiscale(formData.codiceFiscale) && (
                      <span className="text-[10px] text-red-500 font-bold uppercase ml-1">Formato non valido</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Email</label>
                    <input type="email" placeholder="mario.rossi@email.it" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm" />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8 text-center md:text-left">
                  <h3 className="text-2xl font-black text-primary mb-2">Dettagli Finanziari</h3>
                  <p className="text-sm text-slate-500">Aiutaci a capire meglio le tue esigenze.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Tipo di Impiego</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm">
                      <option>Dipendente Tempo Indeterminato</option>
                      <option>Dipendente Tempo Determinato</option>
                      <option>Autonomo / Libero Professionista</option>
                      <option>Pensionato</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Reddito Mensile Netto (€)</label>
                    <input type="number" placeholder="Es: 2500" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Finalità</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm">
                      <option>Acquisto Auto</option>
                      <option>Ristrutturazione Casa</option>
                      <option>Consolidamento Debiti</option>
                      <option>Viaggi / Benessere</option>
                      <option>Altro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Anzianità lavorativa</label>
                    <input type="number" placeholder="Es: 5" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm" />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8 text-center md:text-left">
                  <h3 className="text-2xl font-black text-primary mb-2">Documentazione</h3>
                  <p className="text-sm text-slate-500">Carica i documenti necessari per velocizzare la pratica.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-secondary hover:bg-cyan-50 transition-all cursor-pointer group">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-slate-300 mb-3 group-hover:text-secondary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <p className="text-sm font-bold text-primary">Documento Identità</p>
                    <p className="text-[10px] text-slate-400">PDF o JPG (max 5MB)</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-secondary hover:bg-cyan-50 transition-all cursor-pointer group">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-slate-300 mb-3 group-hover:text-secondary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <p className="text-sm font-bold text-primary">Ultima Busta Paga</p>
                    <p className="text-[10px] text-slate-400">Documento reddituale</p>
                  </div>
                </div>

                <div className="space-y-3 pt-6">
                   <label className="flex items-start gap-3 cursor-pointer group">
                     <input type="checkbox" className="mt-1 accent-secondary h-4 w-4 rounded" />
                     <span className="text-[10px] text-slate-500 group-hover:text-primary transition-colors leading-relaxed">
                       Acconsento al trattamento dei dati personali ai fini della legge sulla privacy (RGPD).
                     </span>
                   </label>
                   <label className="flex items-start gap-3 cursor-pointer group">
                     <input type="checkbox" className="mt-1 accent-secondary h-4 w-4 rounded" />
                     <span className="text-[10px] text-slate-500 group-hover:text-primary transition-colors leading-relaxed">
                       Autorizzo Finora a consultare i sistemi di informazioni creditizie (CRIF).
                     </span>
                   </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
            {currentStep > 1 && (
              <button onClick={prevStep} className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg> Indietro
              </button>
            )}
            <div className="grow"></div>
            <button 
              onClick={nextStep} 
              className="btn-primary flex items-center gap-2 text-xs uppercase tracking-widest px-8"
            >
              {currentStep === 3 ? 'Invia Richiesta' : 'Continua'} 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
