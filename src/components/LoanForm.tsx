'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import {
  buildPrefillBanner,
  finalitaFromPathname,
  readLoanPrefill,
  type LoanPrefill,
} from '@/lib/loan-prefill';
import { calculateLoan } from '@/utils/finance';
import TrustStrip from '@/components/TrustStrip';

const steps = [
  { id: 1, title: 'Personale' },
  { id: 2, title: 'Finanziario' },
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
  website: string;
  sourcePage: string;
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-2 block ml-1 text-[11px] font-black uppercase tracking-widest text-slate-400">
    {children}
  </span>
);

const ErrorMessage = ({ message, id }: { message?: string; id?: string }) => {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-red-500">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  );
};

const fieldClass = (hasError?: boolean) =>
  `field-shell transition-all ${hasError ? 'border-red-300 bg-red-50 focus:ring-red-200' : ''}`;

function getInitialPrefillBanner() {
  if (typeof window === 'undefined') return null;
  const prefill = readLoanPrefill();
  if (!prefill) return null;
  const monthly =
    prefill.monthlyEstimate ?? calculateLoan(prefill.importo, prefill.durata, prefill.insurance).monthly;
  return buildPrefillBanner(prefill, monthly);
}

function applyPrefillValues(
  prefill: LoanPrefill,
  setValue: ReturnType<typeof useForm<FormValues>>['setValue']
) {
  setValue('importo', prefill.importo, { shouldDirty: false, shouldTouch: false });
  setValue('durata', prefill.durata, { shouldDirty: false, shouldTouch: false });
  if (prefill.finalita) {
    setValue('finalita', prefill.finalita, { shouldDirty: false, shouldTouch: false });
  }
}

export default function LoanForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [practiceId, setPracticeId] = useState('');
  const [serverError, setServerError] = useState('');
  const [prefillBanner, setPrefillBanner] = useState(getInitialPrefillBanner);
  const pathname = usePathname();
  const formTopRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, control, trigger, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      nome: '', cognome: '', codiceFiscale: '', email: '', telefono: '',
      impiego: 'Dipendente Tempo Indeterminato', reddito: '', finalita: 'Acquisto Auto',
      importo: 50000, durata: 48, anzianita: '', privacy: false, crif: false,
      website: '', sourcePage: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    setValue('sourcePage', pathname || '/', { shouldDirty: false, shouldTouch: false });
    const productFinalita = finalitaFromPathname(pathname || '/');
    if (productFinalita) setValue('finalita', productFinalita, { shouldDirty: false, shouldTouch: false });

    const prefill = readLoanPrefill();
    if (prefill) {
      applyPrefillValues(prefill, setValue);
    }
  }, [pathname, setValue]);

  useEffect(() => {
    const onPrefillUpdated = () => {
      const prefill = readLoanPrefill();
      if (!prefill) return;
      const monthly =
        prefill.monthlyEstimate ?? calculateLoan(prefill.importo, prefill.durata, prefill.insurance).monthly;
      setPrefillBanner(buildPrefillBanner(prefill, monthly));
      applyPrefillValues(prefill, setValue);
    };

    window.addEventListener('monivia:loan-prefill', onPrefillUpdated);
    return () => window.removeEventListener('monivia:loan-prefill', onPrefillUpdated);
  }, [pathname, setValue]);

  const scrollToTop = () => {
    setTimeout(() => formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(['nome', 'cognome', 'codiceFiscale', 'email', 'telefono']);
      if (isValid) {
        setCurrentStep(2);
        scrollToTop();
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    scrollToTop();
  };

  const onSubmit = async (data: FormValues) => {
    setServerError('');
    try {
      const response = await fetch('/api/loan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Errore durante l'invio");
      setPracticeId(String(result.practiceId || '').replace(/^PD-/, ''));
      setCurrentStep(3);
      scrollToTop();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Errore durante l'invio");
    }
  };

  /* ── Step 3: Successo ── */
  if (currentStep === 3) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="rounded-xl border border-slate-100 bg-white p-6 text-center sm:p-10"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2 className="mb-3 text-2xl font-black text-primary sm:text-3xl">Richiesta ricevuta</h2>
        <p className="mx-auto mb-7 max-w-sm text-sm leading-relaxed text-slate-500">
          Grazie per aver scelto Monivia. La tua pratica <strong className="text-primary">#PD-{practiceId}</strong> è in fase di analisi.
          Ti contatteremo entro 48 ore lavorative.
        </p>
        <button onClick={() => { window.location.href = '/'; }} className="btn-primary mx-auto px-8 py-4">
          Torna alla pagina iniziale
        </button>
      </motion.div>
    );
  }

  /* ── Step 1 & 2 ── */
  return (
    <div className="w-full scroll-mt-24" ref={formTopRef}>
      {/* Prefill banner */}
      {prefillBanner && (
        <div className="mb-5 rounded-lg border border-secondary/25 bg-secondary/6 px-4 py-3.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Dal simulatore</p>
          <p className="mt-1 text-sm font-bold text-primary">
            Rata stimata{' '}
            <span className="text-secondary">{Math.round(prefillBanner.monthly).toLocaleString('it-IT')} €/mese</span>
            {' '}· {prefillBanner.importo.toLocaleString('it-IT')} € / {prefillBanner.durata} mesi
          </p>
        </div>
      )}

      {/* Progress stepper */}
      <div className="relative mb-8 flex justify-between px-2">
        <div className="absolute top-5 left-6 right-6 h-0.5 -z-10 bg-slate-100" aria-hidden />
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-2">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-black transition-all duration-500 ${
              currentStep >= step.id
                ? 'border-secondary bg-secondary text-primary'
                : 'border-slate-200 bg-white text-slate-400'
            }`}>
              {step.id}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-wider ${currentStep >= step.id ? 'text-secondary' : 'text-slate-400'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white" style={{ boxShadow: 'var(--shadow-soft)' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-7">
          <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" {...register('website')} />
          <input type="hidden" {...register('sourcePage')} />

          <AnimatePresence mode="wait">
            {/* ── Step 1: Personale ── */}
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ type: 'spring', stiffness: 320, damping: 28 }} className="space-y-5">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-primary sm:text-2xl">Informazioni personali</h3>
                  <p className="mt-1 text-sm text-slate-500">Inserisci i tuoi dati anagrafici corretti.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Nome *</Label>
                    <input {...register('nome', { required: 'Il nome è obbligatorio', minLength: { value: 2, message: 'Minimo 2 caratteri' }, pattern: { value: /^[a-zA-ZÀ-ÿ\s'-]+$/, message: 'Caratteri non validi' } })} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? 'error-nome' : undefined} placeholder="Es: Mario" autoComplete="given-name" className={fieldClass(!!errors.nome)} />
                    <ErrorMessage id="error-nome" message={errors.nome?.message} />
                  </div>
                  <div>
                    <Label>Cognome *</Label>
                    <input {...register('cognome', { required: 'Il cognome è obbligatorio', minLength: { value: 2, message: 'Minimo 2 caratteri' }, pattern: { value: /^[a-zA-ZÀ-ÿ\s'-]+$/, message: 'Caratteri non validi' } })} aria-invalid={!!errors.cognome} aria-describedby={errors.cognome ? 'error-cognome' : undefined} placeholder="Es: Rossi" autoComplete="family-name" className={fieldClass(!!errors.cognome)} />
                    <ErrorMessage id="error-cognome" message={errors.cognome?.message} />
                  </div>
                  <div>
                    <Label>Codice Fiscale *</Label>
                    <input {...register('codiceFiscale', { required: 'Il codice fiscale è obbligatorio', pattern: { value: /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i, message: 'Formato non valido' }, onChange: (e) => { e.target.value = e.target.value.toUpperCase(); } })} aria-invalid={!!errors.codiceFiscale} aria-describedby={errors.codiceFiscale ? 'error-cf' : undefined} placeholder="RSSMRA80A01H501W" className={`${fieldClass(!!errors.codiceFiscale)} uppercase`} />
                    <ErrorMessage id="error-cf" message={errors.codiceFiscale?.message} />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <input type="email" inputMode="email" autoComplete="email" {...register('email', { required: "L'email è obbligatoria", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email non valida' } })} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'error-email' : undefined} placeholder="mario.rossi@email.it" className={fieldClass(!!errors.email)} />
                    <ErrorMessage id="error-email" message={errors.email?.message} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Telefono *</Label>
                    <input type="tel" inputMode="tel" autoComplete="tel" {...register('telefono', { required: 'Il telefono è obbligatorio', pattern: { value: /^(\+?\d{1,3})?[- .]?[\d- .]{8,15}$/, message: 'Numero non valido' } })} aria-invalid={!!errors.telefono} aria-describedby={errors.telefono ? 'error-telefono' : undefined} placeholder="Es: +39 333 1234567" className={fieldClass(!!errors.telefono)} />
                    <ErrorMessage id="error-telefono" message={errors.telefono?.message} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Finanziario ── */}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ type: 'spring', stiffness: 320, damping: 28 }} className="space-y-5">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-primary sm:text-2xl">Dettagli finanziari</h3>
                  <p className="mt-1 text-sm text-slate-500">Aiutaci a capire meglio le tue esigenze.</p>
                </div>

                {/* Importo slider */}
                <div>
                  <Label>Importo richiesto (€) *</Label>
                  <div className={`rounded-lg border-2 bg-slate-50 p-5 ${errors.importo ? 'border-red-300' : 'border-slate-200'}`}>
                    <Controller name="importo" control={control} rules={{ required: 'Richiesto', min: { value: 5000, message: 'Minimo 5.000€' }, max: { value: 1000000, message: 'Massimo 1.000.000€' } }}
                      render={({ field }) => (
                        <>
                          <div className="mb-4 flex items-baseline justify-between">
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-black text-primary">€</span>
                              <input type="number" min={5000} max={1000000} step={1000} aria-label="Importo prestito" aria-invalid={!!errors.importo} aria-describedby={errors.importo ? 'error-importo' : undefined} value={field.value} onChange={(e) => { let v = Number(e.target.value); if (v > 1000000) v = 1000000; field.onChange(v); }} onBlur={() => { if (field.value < 5000) field.onChange(5000); field.onBlur(); }} className="w-28 bg-transparent text-2xl font-black text-primary outline-none border-b-2 border-slate-300 focus:border-secondary" />
                            </div>
                            <div className="text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              <p>Min 5.000€</p><p>Max 1.000.000€</p>
                            </div>
                          </div>
                          <input type="range" min={5000} max={1000000} step={1000} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} aria-label="Seleziona importo" aria-invalid={!!errors.importo} aria-describedby={errors.importo ? 'error-importo' : undefined} />
                        </>
                      )}
                    />
                  </div>
                  <ErrorMessage id="error-importo" message={errors.importo?.message} />
                </div>

                {/* Durata slider */}
                <div>
                  <Label>Durata del prestito (mesi) *</Label>
                  <div className={`rounded-lg border-2 bg-slate-50 p-5 ${errors.durata ? 'border-red-300' : 'border-slate-200'}`}>
                    <Controller name="durata" control={control} rules={{ required: 'Richiesto', min: { value: 12, message: 'Minimo 12 mesi' }, max: { value: 360, message: 'Massimo 360 mesi' } }}
                      render={({ field }) => (
                        <>
                          <div className="mb-4 flex items-baseline justify-between">
                            <div className="flex items-baseline gap-2">
                              <input type="number" min={12} max={360} step={6} aria-label="Durata prestito in mesi" aria-invalid={!!errors.durata} aria-describedby={errors.durata ? 'error-durata' : undefined} value={field.value} onChange={(e) => { let v = Number(e.target.value); if (v > 360) v = 360; field.onChange(v); }} onBlur={() => { if (field.value < 12) field.onChange(12); field.onBlur(); }} className="w-20 bg-transparent text-2xl font-black text-primary outline-none border-b-2 border-slate-300 focus:border-secondary" />
                              <span className="text-lg font-bold text-slate-500">mesi</span>
                            </div>
                            <div className="text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              <p>Min 12 mesi</p><p>Max 360 mesi</p>
                            </div>
                          </div>
                          <input type="range" min={12} max={360} step={6} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} aria-label="Seleziona durata" aria-invalid={!!errors.durata} aria-describedby={errors.durata ? 'error-durata' : undefined} />
                        </>
                      )}
                    />
                  </div>
                  <ErrorMessage id="error-durata" message={errors.durata?.message} />
                </div>

                {/* Campi aggiuntivi */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Tipo di impiego</Label>
                    <select {...register('impiego')} className="field-shell">
                      <option>Dipendente Tempo Indeterminato</option>
                      <option>Dipendente Tempo Determinato</option>
                      <option>Autonomo / Libero Professionista</option>
                      <option>Pensionato</option>
                    </select>
                  </div>
                  <div>
                    <Label>Reddito mensile netto (€) *</Label>
                    <input type="number" {...register('reddito', { required: 'Obbligatorio', min: { value: 500, message: 'Min 500€' }, max: { value: 1000000, message: 'Max 1.000.000€' } })} aria-invalid={!!errors.reddito} aria-describedby={errors.reddito ? 'error-reddito' : undefined} placeholder="Es: 2500" className={fieldClass(!!errors.reddito)} />
                    <ErrorMessage id="error-reddito" message={errors.reddito?.message} />
                  </div>
                  <div>
                    <Label>Finalità</Label>
                    <select {...register('finalita')} className="field-shell">
                      <option>Acquisto Auto</option>
                      <option>Ristrutturazione Casa</option>
                      <option>Consolidamento Debiti</option>
                      <option>Viaggi / Benessere</option>
                      <option>Altro</option>
                    </select>
                  </div>
                  <div>
                    <Label>Anzianità lavorativa (anni) *</Label>
                    <input type="number" {...register('anzianita', { required: 'Obbligatorio', min: { value: 0, message: 'Minimo 0' }, max: { value: 50, message: 'Massimo 50' } })} aria-invalid={!!errors.anzianita} aria-describedby={errors.anzianita ? 'error-anzianita' : undefined} placeholder="Es: 5" className={fieldClass(!!errors.anzianita)} />
                    <ErrorMessage id="error-anzianita" message={errors.anzianita?.message} />
                  </div>
                </div>

                {/* Consensi */}
                <div className="space-y-3 pt-2">
                  {serverError && (
                    <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                      {serverError}
                    </div>
                  )}
                  {[
                    { name: 'privacy' as const, label: 'Acconsento al trattamento dei dati personali ai sensi dell\'informativa privacy e del GDPR. *', error: errors.privacy?.message, rule: { required: 'Devi accettare l\'informativa privacy' } },
                    { name: 'crif' as const, label: 'Autorizzo Monivia a consultare i sistemi di informazioni creditizie (CRIF). *', error: errors.crif?.message, rule: { required: 'Devi autorizzare CRIF' } },
                  ].map(({ name, label, error, rule }) => (
                    <div key={name}>
                      <label className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all ${error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-secondary/30'}`}>
                        <input type="checkbox" {...register(name, rule)} aria-invalid={!!error} aria-describedby={error ? `error-${name}` : undefined} className="mt-0.5 h-5 w-5 accent-secondary rounded" />
                        <span className="text-[11px] leading-relaxed text-slate-500">{label}</span>
                      </label>
                      <ErrorMessage id={`error-${name}`} message={error} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">
            {currentStep > 1 ? (
              <button type="button" onClick={prevStep} className="flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-xs font-black uppercase tracking-widest text-slate-400 transition-colors hover:bg-slate-50 hover:text-primary sm:justify-start">
                <ChevronLeft size={15} /> Indietro
              </button>
            ) : <div />}

            {currentStep === 1 ? (
              <button type="button" onClick={nextStep} className="btn-primary flex w-full items-center px-7 py-4 text-xs uppercase tracking-widest sm:w-auto">
                Continua <ChevronRight size={15} />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="btn-primary flex w-full items-center px-7 py-4 text-xs uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
                {isSubmitting ? 'Invio in corso...' : <><Send size={14} /> Invia richiesta</>}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
