import { z } from 'zod';

export const contactSchema = z.object({
  nome: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères').max(80),
  email: z.string().trim().email('L\'adresse email n\'est pas valide').max(120),
  oggetto: z.string().trim().min(2, 'L\'objet doit contenir au moins 2 caractères').max(120),
  message: z.string().trim().min(10, 'Le message doit contenir au moins 10 caractères').max(4000),
  sourcePage: z.string().trim().max(200).optional().default('/contatti'),
});

export const loanSchema = z.object({
  importo: z.coerce.number().min(5000, 'Minimum 5.000€').max(1000000, 'Maximum 1.000.000€'),
  durata: z.coerce.number().int().min(12, 'Minimum 12 mois').max(360, 'Maximum 360 mois'),
  impiego: z.string().trim().min(2).max(120),
  nome: z.string().trim().min(2, 'Le nom est obligatoire').max(80),
  cognome: z.string().trim().min(2, 'Le cognome est obligatoire').max(80),
  email: z.string().trim().email('Email invalide').max(120),
  telefono: z.string().trim().max(30).regex(/^(\+?\d{1,3})?[- .]?[\d- .]{8,15}$/, 'Numéro de téléphone non valide'),
  codiceFiscale: z.string().trim().regex(/^[A-Z0-9]{16}$/i, 'Codice fiscale non valido'),
  reddito: z.coerce.number().min(500, 'Minimum 500€').max(1000000),
  finalita: z.string().trim().min(2).max(120),
  anzianita: z.coerce.number().int().min(0).max(50),
  privacy: z.literal(true, { message: 'Vous devez accepter la politique de confidentialité' }),
  crif: z.literal(true, { message: 'Vous devez autoriser la consultation CRIF' }),
  sourcePage: z.string().trim().max(200).optional().default('/'),
});
