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
];

interface FormErrors {
  nome?: string;
  cognome?: string;
  codiceFiscale?: string;
  email?: string;
  telefono?: string;
  reddito?: string;
  anzianita?: string;
  privacy?: string;
  crif?: string;
  general?: string;
}

export default function LoanForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '', cognome: '', codiceFiscale: '', email: '', telefono: '',
    impiego: 'Dipendente Tempo Indeterminato', reddito: '', finalita: 'Acquisto Auto', importo: '50000', durata: '48',
    anzianita: '', privacy: false, crif: false
  });
  const [practiceId, setPracticeId] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName);
  };

  const validateField = (fieldName: string): string | undefined => {
    let error: string | undefined;
    const value = formData[fieldName as keyof typeof formData];

    switch (fieldName) {
      case 'nome':
        const nomeValue = String(value || '');
        if (!value || nomeValue.trim() === '') {
          error = 'Il nome è obbligatorio';
        } else if (nomeValue.trim().length < 2) {
          error = 'Il nome deve contenere almeno 2 caratteri';
        } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(nomeValue)) {
          error = 'Il nome contiene caratteri non validi';
        }
        break;

      case 'cognome':
        const cognomeValue = String(value || '');
        if (!value || cognomeValue.trim() === '') {
          error = 'Il cognome è obbligatorio';
        } else if (cognomeValue.trim().length < 2) {
          error = 'Il cognome deve contenere almeno 2 caratteri';
        } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(cognomeValue)) {
          error = 'Il cognome contiene caratteri non validi';
        }
        break;

      case 'codiceFiscale':
        const cfValue = String(value || '');
        if (!value || cfValue.trim() === '') {
          error = 'Il codice fiscale è obbligatorio';
        } else if (!validateCodiceFiscale(cfValue)) {
          error = 'Formato codice fiscale non valido (es: RSSMRA80A01H501W)';
        }
        break;

      case 'email':
        const emailValue = String(value || '');
        if (!value || emailValue.trim() === '') {
          error = 'L\'email è obbligatoria';
        } else if (!validateEmail(emailValue)) {
          error = 'Inserisci un\'email valida (es: nome@esempio.com)';
        }
        break;

      case 'telefono':
        const telefonoValue = String(value || '');
        if (!value || telefonoValue.trim() === '') {
          error = 'Il numero di telefono è obbligatorio';
        } else if (!validateTelefono(telefonoValue)) {
          error = 'Inserisci un numero di telefono valido (es: +39 333 1234567)';
        }
        break;

      case 'reddito':
        const redditoValue = String(value || '');
        if (!value || redditoValue === '') {
          error = 'Il reddito è obbligatorio';
        } else if (Number(redditoValue) < 500) {
          error = 'Il reddito minimo è di 500€';
        } else if (Number(redditoValue) > 1000000) {
          error = 'Il reddito massimo è di 1.000.000€';
        }
        break;

      case 'anzianita':
        const anzianitaValue = String(value || '');
        if (!value || anzianitaValue === '') {
          error = 'L\'anzianità lavorativa è obbligatoria';
        } else if (Number(anzianitaValue) < 0) {
          error = 'L\'anzianità non può essere negativa';
        } else if (Number(anzianitaValue) > 50) {
          error = 'Inserisci un valore realistico per l\'anzianità';
        }
        break;

      case 'privacy':
        if (!value) {
          error = 'Devi accettare la privacy policy per continuare';
        }
        break;

      case 'crif':
        if (!value) {
          error = 'Devi autorizzare la consultazione CRIF per continuare';
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return error;
  };

  const validateStep = (step: number): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (step === 1) {
      const fields = ['nome', 'cognome', 'codiceFiscale', 'email', 'telefono'];
      fields.forEach(field => {
        const error = validateField(field);
        if (error) {
          newErrors[field as keyof FormErrors] = error;
          isValid = false;
        }
      });
    } else if (step === 2) {
      const fields = ['reddito', 'anzianita', 'privacy', 'crif'];
      fields.forEach(field => {
        const error = validateField(field);
        if (error) {
          newErrors[field as keyof FormErrors] = error;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    
    // Mark all fields as touched when validating step
    if (step === 1) {
      setTouched({ nome: true, cognome: true, codiceFiscale: true, email: true, telefono: true });
    } else if (step === 2) {
      setTouched(prev => ({ ...prev, reddito: true, anzianita: true, privacy: true, crif: true }));
    }

    return isValid;
  };

  const nextStep = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep === 2) {
      setIsSubmitting(true);
      setErrors({});
      try {
        const response = await fetch('/api/loan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Errore durante l\'invio');
        setPracticeId(result.practiceId.replace('PD-', '')); 
        setCurrentStep(3);
      } catch (err: unknown) {
        setErrors({ general: err instanceof Error ? err.message : 'Errore durante l\'invio' });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const validateCodiceFiscale = (cf: string) => {
    const re = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
    return re.test(cf);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateTelefono = (telefono: string) => {
    // Accept formats: +39 333 1234567, +393331234567, 333 1234567, 3331234567
    const re = /^(\+?\d{1,3}[- ]?)?\d{9,15}$/;
    return re.test(telefono.replace(/\s/g, ''));
  };

  const getFieldError = (fieldName: string) => {
    return touched[fieldName] ? errors[fieldName as keyof FormErrors] : undefined;
  };

  const isFieldInvalid = (fieldName: string) => {
    return touched[fieldName] && !!errors[fieldName as keyof FormErrors];
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
      <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden mx-4 md:mx-0">
        <div className="p-6 md:p-12">
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
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Nome *</label>
                    <div className="relative">
                      <input 
                        name="nome" 
                        type="text" 
                        placeholder="Es: Mario" 
                        value={formData.nome} 
                        onChange={handleChange}
                        onBlur={() => handleBlur('nome')}
                        className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm ${
                          isFieldInvalid('nome') ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        required 
                      />
                      {isFieldInvalid('nome') && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                      )}
                    </div>
                    {getFieldError('nome') && (
                      <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        {getFieldError('nome')}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Cognome *</label>
                    <div className="relative">
                      <input 
                        name="cognome" 
                        type="text" 
                        placeholder="Es: Rossi" 
                        value={formData.cognome} 
                        onChange={handleChange}
                        onBlur={() => handleBlur('cognome')}
                        className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm ${
                          isFieldInvalid('cognome') ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        required 
                      />
                      {isFieldInvalid('cognome') && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                      )}
                    </div>
                    {getFieldError('cognome') && (
                      <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        {getFieldError('cognome')}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Codice Fiscale *</label>
                    <div className="relative">
                      <input 
                        name="codiceFiscale"
                        type="text" 
                        placeholder="RSSMRA80A01H501W" 
                        value={formData.codiceFiscale}
                        onChange={(e) => {
                          const val = e.target.value.toUpperCase();
                          if (val.length > 16) return;
                          setFormData({...formData, codiceFiscale: val});
                        }}
                        onBlur={() => handleBlur('codiceFiscale')}
                        className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all uppercase text-sm ${
                          isFieldInvalid('codiceFiscale') ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        required
                      />
                      {isFieldInvalid('codiceFiscale') && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                      )}
                    </div>
                    {getFieldError('codiceFiscale') && (
                      <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        {getFieldError('codiceFiscale')}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Email *</label>
                    <div className="relative">
                      <input 
                        name="email" 
                        type="email" 
                        placeholder="mario.rossi@email.it" 
                        value={formData.email} 
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm ${
                          isFieldInvalid('email') ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        required 
                      />
                      {isFieldInvalid('email') && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                      )}
                    </div>
                    {getFieldError('email') && (
                      <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        {getFieldError('email')}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Telefono *</label>
                    <div className="relative">
                      <input 
                        name="telefono" 
                        type="tel" 
                        placeholder="Es: +39 333 1234567" 
                        value={formData.telefono} 
                        onChange={handleChange}
                        onBlur={() => handleBlur('telefono')}
                        className={`w-full p-4 bg-slate-50 border-2 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all text-sm ${
                          isFieldInvalid('telefono') ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        required 
                      />
                      {isFieldInvalid('telefono') && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                      )}
                    </div>
                    {getFieldError('telefono') && (
                      <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        {getFieldError('telefono')}
                      </p>
                    )}
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
                     <label htmlFor="impiego" className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Tipo di Impiego</label>
                     <select 
                       id="impiego"
                       name="impiego" 
                       value={formData.impiego} 
                       onChange={handleChange} 
                       className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm"
                       aria-label="Tipo di Impiego"
                     >
                       <option>Dipendente Tempo Indeterminato</option>
                       <option>Dipendente Tempo Determinato</option>
                       <option>Autonomo / Libero Professionista</option>
                       <option>Pensionato</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Reddito Mensile Netto (€) *</label>
                     <div className="relative">
                       <input 
                         name="reddito" 
                         type="number" 
                         placeholder="Es: 2500" 
                         value={formData.reddito} 
                         onChange={handleChange}
                         onBlur={() => handleBlur('reddito')}
                         className={`w-full p-4 bg-slate-50 border-2 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm ${
                           isFieldInvalid('reddito') ? 'border-red-500 bg-red-50' : 'border-slate-200'
                         }`}
                         required 
                       />
                       {isFieldInvalid('reddito') && (
                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                         </div>
                       )}
                     </div>
                     {getFieldError('reddito') && (
                       <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                         {getFieldError('reddito')}
                       </p>
                     )}
                   </div>
                   <div className="space-y-2">
                     <label htmlFor="finalita" className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Finalità</label>
                     <select 
                       id="finalita"
                       name="finalita" 
                       value={formData.finalita} 
                       onChange={handleChange} 
                       className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm"
                       aria-label="Finalità del prestito"
                     >
                       <option>Acquisto Auto</option>
                       <option>Ristrutturazione Casa</option>
                       <option>Consolidamento Debiti</option>
                       <option>Viaggi / Benessere</option>
                       <option>Altro</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Anzianità lavorativa (anni) *</label>
                     <div className="relative">
                       <input 
                         name="anzianita" 
                         type="number" 
                         placeholder="Es: 5" 
                         value={formData.anzianita} 
                         onChange={handleChange}
                         onBlur={() => handleBlur('anzianita')}
                         className={`w-full p-4 bg-slate-50 border-2 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-sm ${
                           isFieldInvalid('anzianita') ? 'border-red-500 bg-red-50' : 'border-slate-200'
                         }`}
                         required 
                       />
                       {isFieldInvalid('anzianita') && (
                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                         </div>
                       )}
                     </div>
                     {getFieldError('anzianita') && (
                       <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                         {getFieldError('anzianita')}
                       </p>
                     )}
                   </div>
                 </div>

                 <div className="space-y-4 pt-6">
                   {errors.general && (
                     <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-200 flex items-center gap-3">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                       {errors.general}
                     </div>
                   )}
                    <label className={`flex items-start gap-3 cursor-pointer group p-4 rounded-xl border-2 transition-all ${
                      isFieldInvalid('privacy') ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-secondary/30'
                    }`}>
                       <input 
                         name="privacy" 
                         type="checkbox" 
                         checked={formData.privacy} 
                         onChange={(e) => {
                           handleChange(e);
                           handleBlur('privacy');
                         }}
                         className="mt-1 accent-secondary h-5 w-5 rounded" 
                       />
                       <span className="text-[10px] text-slate-500 group-hover:text-primary transition-colors leading-relaxed">
                         Acconsento al trattamento dei dati personali ai fini della legge sulla privacy (RGPD). *
                       </span>
                       {isFieldInvalid('privacy') && (
                         <div className="ml-auto text-red-500">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                         </div>
                       )}
                     </label>
                     {getFieldError('privacy') && (
                       <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                         {getFieldError('privacy')}
                       </p>
                     )}
                     <label className={`flex items-start gap-3 cursor-pointer group p-4 rounded-xl border-2 transition-all ${
                      isFieldInvalid('crif') ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-secondary/30'
                    }`}>
                       <input 
                         name="crif" 
                         type="checkbox" 
                         checked={formData.crif} 
                         onChange={(e) => {
                           handleChange(e);
                           handleBlur('crif');
                         }}
                         className="mt-1 accent-secondary h-5 w-5 rounded" 
                       />
                       <span className="text-[10px] text-slate-500 group-hover:text-primary transition-colors leading-relaxed">
                         Autorizzo Finora a consultare i sistemi di informazioni creditizie (CRIF). *
                       </span>
                       {isFieldInvalid('crif') && (
                         <div className="ml-auto text-red-500">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                         </div>
                       )}
                     </label>
                     {getFieldError('crif') && (
                       <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                         {getFieldError('crif')}
                       </p>
                     )}
                 </div>
               </motion.div>
             )}
 
             {/* Removed Step 3 (Documenti) */}
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
          {currentStep > 1 && (
            <button onClick={prevStep} className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg> Indietro
            </button>
          )}
          <div className="grow"></div>
          <button 
            onClick={nextStep} 
            disabled={isSubmitting}
            className="btn-primary flex items-center gap-2 text-xs uppercase tracking-widest px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Invio in corso...' : currentStep === 3 ? 'Invia Richiesta' : 'Continua'} 
            {!isSubmitting && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>}
          </button>
        </div>
       </div>
     </div>
   );
 }
