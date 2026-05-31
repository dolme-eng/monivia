'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';

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
];

interface FormValues {
  nome: string;
  cognome: string;
  codiceFiscale: string;
  email: string;
  telefono: string;
  impiego: string;
  reddito: number | '';
  finalita: string;
  importo: number;
  durata: number;
  anzianita: number | '';
  privacy: boolean;
  crif: boolean;
}

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1 absolute -bottom-5">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      {message}
    </p>
  );
};

export default function LoanForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [practiceId, setPracticeId] = useState(0);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, control, trigger, formState: { errors, isSubmitting }, setValue } = useForm<FormValues>({
    defaultValues: {
      nome: '', cognome: '', codiceFiscale: '', email: '', telefono: '',
      impiego: 'Dipendente Tempo Indeterminato', reddito: '', finalita: 'Acquisto Auto', 
      importo: 50000, durata: 48, anzianita: '', privacy: false, crif: false
    },
    mode: 'onTouched'
  });

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(['nome', 'cognome', 'codiceFiscale', 'email', 'telefono']);
      if (isValid) setCurrentStep(2);
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: FormValues) => {
    setServerError('');
    try {
      const response = await fetch('/api/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Errore durante l\'invio');
      setPracticeId(result.practiceId.replace('PD-', '')); 
      setCurrentStep(3);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Errore durante l\'invio');
    }
  };

  if (currentStep === 3) {
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
          Grazie per aver scelto Monivia. La tua pratica <strong>#PD-{practiceId}</strong> è in fase di analisi. Ti contatteremo entro 48 ore lavorative.
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
      <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden mx-4 md:mx-0">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-12">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="space-y-6"
              >
                <div className="mb-8 text-center md:text-left">
                  <h3 className="text-2xl font-black text-primary mb-2">Informazioni Personali</h3>
                  <p className="text-sm text-slate-500">Inserisci i tuoi dati anagrafici corretti.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
                  <div className="space-y-2 relative">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Nome *</label>
                    <input 
                      {...register('nome', { required: 'Il nome è obbligatorio', minLength: { value: 2, message: 'Minimo 2 caratteri' }, pattern: { value: /^[a-zA-ZÀ-ÿ\s'-]+$/, message: 'Caratteri non validi' } })}
                      placeholder="Es: Mario" 
                      className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm ${errors.nome ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                    />
                    <ErrorMessage message={errors.nome?.message} />
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Cognome *</label>
                    <input 
                      {...register('cognome', { required: 'Il cognome è obbligatorio', minLength: { value: 2, message: 'Minimo 2 caratteri' }, pattern: { value: /^[a-zA-ZÀ-ÿ\s'-]+$/, message: 'Caratteri non validi' } })}
                      placeholder="Es: Rossi" 
                      className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm ${errors.cognome ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                    />
                    <ErrorMessage message={errors.cognome?.message} />
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Codice Fiscale *</label>
                    <input 
                      {...register('codiceFiscale', { 
                        required: 'Il codice fiscale è obbligatorio', 
                        pattern: { value: /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i, message: 'Formato non valido' },
                        onChange: (e) => e.target.value = e.target.value.toUpperCase()
                      })}
                      placeholder="RSSMRA80A01H501W" 
                      className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all uppercase text-sm ${errors.codiceFiscale ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                    />
                    <ErrorMessage message={errors.codiceFiscale?.message} />
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Email *</label>
                    <input 
                      type="email"
                      {...register('email', { required: 'L\'email è obbligatoria', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email non valida' } })}
                      placeholder="mario.rossi@email.it" 
                      className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                    />
                    <ErrorMessage message={errors.email?.message} />
                  </div>
                  <div className="space-y-2 relative md:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Telefono *</label>
                    <input 
                      type="tel"
                      {...register('telefono', { required: 'Il telefono è obbligatorio', pattern: { value: /^(\+?\d{1,3})?[- ]?[\d- ]{8,15}$/, message: 'Numero non valido' } })}
                      placeholder="Es: +39 333 1234567" 
                      className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm ${errors.telefono ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                    />
                    <ErrorMessage message={errors.telefono?.message} />
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
                 transition={{ type: "spring", stiffness: 300, damping: 25 }}
                 className="space-y-6"
               >
                 <div className="mb-8 text-center md:text-left">
                   <h3 className="text-2xl font-black text-primary mb-2">Dettagli Finanziari</h3>
                   <p className="text-sm text-slate-500">Aiutaci a capire meglio le tue esigenze.</p>
                 </div>
 
                 <div className="space-y-8">
                   <div className="space-y-4 relative">
                     <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Importo Richiesto (€) *</label>
                     <div className={`bg-linear-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border-2 ${errors.importo ? 'border-red-500' : 'border-slate-200'}`}>
                       <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                           <span className="text-3xl md:text-4xl font-black text-primary">€</span>
                           <input
                             type="number"
                             min={5000}
                             max={1000000}
                             step={1000}
                             {...register('importo', {
                               required: 'Richiesto',
                               min: { value: 5000, message: 'Minimo 5.000€' },
                               max: { value: 1000000, message: 'Massimo 1.000.000€' },
                               onBlur: (e) => {
                                 const val = Number(e.target.value);
                                 if (val < 5000) setValue('importo', 5000, { shouldValidate: true });
                                 else if (val > 1000000) setValue('importo', 1000000, { shouldValidate: true });
                               }
                             })}
                             onChange={(e) => {
                               const val = Number(e.target.value);
                               if (val > 1000000) e.target.value = '1000000';
                               setValue('importo', Number(e.target.value), { shouldValidate: true });
                             }}
                             className="text-3xl md:text-4xl font-black text-primary bg-transparent border-b-2 border-slate-300 focus:border-secondary outline-none w-32 md:w-48"
                           />
                         </div>
                         <div className="text-right">
                           <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Min: 5.000€</p>
                           <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Max: 1.000.000€</p>
                         </div>
                       </div>
                       <Controller
                         name="importo"
                         control={control}
                         render={({ field }) => (
                           <input
                             type="range"
                             min={5000}
                             max={1000000}
                             step={1000}
                             value={field.value}
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                             aria-label="Seleziona importo del prestito"
                             title="Importo del prestito"
                           />
                         )}
                       />
                     </div>
                     <ErrorMessage message={errors.importo?.message} />
                   </div>

                   <div className="space-y-4 relative">
                     <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Durata del Prestito (mesi) *</label>
                     <div className={`bg-linear-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border-2 ${errors.durata ? 'border-red-500' : 'border-slate-200'}`}>
                       <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                           <input
                             type="number"
                             min={12}
                             max={360}
                             step={6}
                             {...register('durata', {
                               required: 'Richiesto',
                               min: { value: 12, message: 'Minimo 12 mesi' },
                               max: { value: 360, message: 'Massimo 360 mesi' },
                               onBlur: (e) => {
                                 const val = Number(e.target.value);
                                 if (val < 12) setValue('durata', 12, { shouldValidate: true });
                                 else if (val > 360) setValue('durata', 360, { shouldValidate: true });
                               }
                             })}
                             className="text-3xl md:text-4xl font-black text-primary bg-transparent border-b-2 border-slate-300 focus:border-secondary outline-none w-24 md:w-32"
                           />
                           <span className="text-2xl md:text-3xl font-bold text-slate-600">mesi</span>
                         </div>
                         <div className="text-right">
                           <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Min: 12 mesi</p>
                           <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Max: 360 mesi</p>
                         </div>
                       </div>
                       <Controller
                         name="durata"
                         control={control}
                         render={({ field }) => (
                           <input
                             type="range"
                             min={12}
                             max={360}
                             step={6}
                             value={field.value}
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                             aria-label="Seleziona durata del prestito in mesi"
                             title="Durata del prestito"
                           />
                         )}
                       />
                     </div>
                     <ErrorMessage message={errors.durata?.message} />
                   </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 pt-4">
                   <div className="space-y-2">
                     <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Tipo di Impiego</label>
                     <select 
                       {...register('impiego')}
                       className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm"
                     >
                       <option>Dipendente Tempo Indeterminato</option>
                       <option>Dipendente Tempo Determinato</option>
                       <option>Autonomo / Libero Professionista</option>
                       <option>Pensionato</option>
                     </select>
                   </div>
                   <div className="space-y-2 relative">
                     <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Reddito Mensile Netto (€) *</label>
                     <input 
                       type="number"
                       {...register('reddito', { required: 'Obbligatorio', min: { value: 500, message: 'Min 500€' }, max: { value: 1000000, message: 'Max 1.000.000€' } })}
                       placeholder="Es: 2500" 
                       className={`w-full p-4 bg-slate-50 border-2 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm ${errors.reddito ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                     />
                     <ErrorMessage message={errors.reddito?.message} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Finalità</label>
                     <select 
                       {...register('finalita')}
                       className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm"
                     >
                       <option>Acquisto Auto</option>
                       <option>Ristrutturazione Casa</option>
                       <option>Consolidamento Debiti</option>
                       <option>Viaggi / Benessere</option>
                       <option>Altro</option>
                     </select>
                   </div>
                   <div className="space-y-2 relative">
                     <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Anzianità lavorativa (anni) *</label>
                     <input 
                       type="number"
                       {...register('anzianita', { required: 'Obbligatorio', min: { value: 0, message: 'Minimo 0' }, max: { value: 50, message: 'Massimo 50' } })}
                       placeholder="Es: 5" 
                       className={`w-full p-4 bg-slate-50 border-2 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm ${errors.anzianita ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                     />
                     <ErrorMessage message={errors.anzianita?.message} />
                   </div>
                 </div>

                 <div className="space-y-4 pt-6">
                   {serverError && (
                     <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-200 flex items-center gap-3">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                       {serverError}
                     </div>
                   )}
                    <div className="relative pb-2">
                      <label className={`flex items-start gap-3 cursor-pointer group p-4 rounded-xl border-2 transition-all ${errors.privacy ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-secondary/30'}`}>
                         <input 
                           type="checkbox" 
                           {...register('privacy', { required: 'Devi accettare la privacy policy' })}
                           className="mt-1 accent-secondary h-5 w-5 rounded" 
                         />
                         <span className="text-[10px] text-slate-500 group-hover:text-primary transition-colors leading-relaxed">
                           Acconsento al trattamento dei dati personali ai fini della legge sulla privacy (RGPD). *
                         </span>
                       </label>
                       <ErrorMessage message={errors.privacy?.message} />
                    </div>
                    <div className="relative pb-2">
                      <label className={`flex items-start gap-3 cursor-pointer group p-4 rounded-xl border-2 transition-all ${errors.crif ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-secondary/30'}`}>
                         <input 
                           type="checkbox" 
                           {...register('crif', { required: 'Devi autorizzare CRIF' })}
                           className="mt-1 accent-secondary h-5 w-5 rounded" 
                         />
                         <span className="text-[10px] text-slate-500 group-hover:text-primary transition-colors leading-relaxed">
                           Autorizzo Monivia a consultare i sistemi di informazioni creditizie (CRIF). *
                         </span>
                       </label>
                       <ErrorMessage message={errors.crif?.message} />
                    </div>
                 </div>
               </motion.div>
             )}
          </AnimatePresence>

          <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
            {currentStep > 1 ? (
              <button type="button" onClick={prevStep} className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg> Indietro
              </button>
            ) : <div></div>}
            
            {currentStep === 1 ? (
              <button 
                type="button"
                onClick={nextStep} 
                className="btn-primary flex items-center gap-2 text-xs uppercase tracking-widest px-8"
              >
                Continua 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-2 text-xs uppercase tracking-widest px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'} 
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
