import { z } from 'zod';

export const contactSchema = z.object({
  nome: z.string().trim().min(2, 'Il nome deve contenere almeno 2 caratteri').max(80),
  email: z.string().trim().email('Indirizzo email non valido').max(120),
  oggetto: z.string().trim().min(2, 'L\'oggetto deve contenere almeno 2 caratteri').max(120),
  message: z.string().trim().min(10, 'Il messaggio deve contenere almeno 10 caratteri').max(4000),
  sourcePage: z.string().trim().max(200).optional().default('/contatti'),
});

export const careerSchema = z.object({
  nome: z.string().trim().min(2, 'Il nome deve contenere almeno 2 caratteri').max(80),
  email: z.string().trim().email('Indirizzo email non valido').max(120),
  message: z.string().trim().min(20, 'La presentazione deve contenere almeno 20 caratteri').max(4000),
  website: z.string().optional(),
});

const baseLoanFields = {
  importo: z.coerce.number().min(5000, 'Minimo 5.000€').max(1000000, 'Massimo 1.000.000€'),
  durata: z.coerce.number().int().min(12, 'Minimo 12 mesi').max(360, 'Massimo 360 mesi'),
  impiego: z.string().trim().min(2).max(120),
  nome: z.string().trim().min(2, 'Il nome è obbligatorio').max(80),
  cognome: z.string().trim().min(2, 'Il cognome è obbligatorio').max(80),
  email: z.string().trim().email('Email non valida').max(120),
  telefono: z.string().trim().max(30).regex(/^\+?[\d\s\-().]{8,20}$/, 'Numero di telefono non valido'),
  codiceFiscale: z.string().trim().regex(/^[A-Z]{6}\d{2}[A-EHLMPR-T]\d{2}[A-Z]\d{3}[A-Z]$/i, 'Codice fiscale non valido'),
  reddito: z.coerce.number().min(500, 'Minimo 500€').max(1000000),
  finalita: z.string().trim().min(2).max(120),
  anzianita: z.coerce.number().int().min(0).max(50),
  sourcePage: z.string().trim().max(200).optional().default('/'),
};

// Client-side schema: boolean fields with refinement
export const loanFormSchema = z.object({
  ...baseLoanFields,
  privacy: z.boolean().refine((v) => v === true, { message: 'Devi accettare l\'informativa privacy' }),
  crif: z.boolean().refine((v) => v === true, { message: 'Devi autorizzare la consultazione CRIF' }),
  website: z.string().optional(),
});

// Server-side schema: strict literal(true) for API validation
export const loanSchema = z.object({
  ...baseLoanFields,
  privacy: z.literal(true, { message: 'Devi accettare l\'informativa privacy' }),
  crif: z.literal(true, { message: 'Devi autorizzare la consultazione CRIF' }),
});
