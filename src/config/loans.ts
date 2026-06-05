export type LoanSlug = 'personale' | 'auto' | 'immobiliare' | 'consolidamento' | 'business';

export type LoanProduct = {
  slug: LoanSlug;
  title: string;
  shortTitle: string;
  description: string;
  seoDescription: string;
  keywords: string[];
  benefits: string[];
  ogImage: string;
};

export const loanProducts: Record<LoanSlug, LoanProduct> = {
  personale: {
    slug: 'personale',
    title: 'Prestito Personale',
    shortTitle: 'Personale',
    description:
      'Per progetti personali, imprevisti o spese importanti con un percorso digitale semplice.',
    seoDescription:
      'Richiedi un prestito personale online con Monivia: importi flessibili, rata chiara e assistenza dedicata.',
    keywords: ['prestito personale', 'finanziamento personale', 'Monivia prestito'],
    benefits: ['Importi flessibili', 'Rata chiara', 'Richiesta guidata'],
    ogImage: '/assets/hero_lifestyle.png',
  },
  auto: {
    slug: 'auto',
    title: 'Prestito Auto',
    shortTitle: 'Auto',
    description: 'Finanzia la tua nuova auto, nuova o usata, con tassi agevolati.',
    seoDescription:
      'Finanzia la tua auto con un percorso digitale, veloce e chiaro. Scopri il prestito auto Monivia.',
    keywords: ['prestito auto', 'finanziamento auto', 'Monivia auto'],
    benefits: ['Fino a 50.000€', 'Erogazione rapida', 'Assicurazione inclusa opzionale'],
    ogImage: '/assets/consultation.png',
  },
  immobiliare: {
    slug: 'immobiliare',
    title: 'Prestito Immobiliare',
    shortTitle: 'Immobiliare',
    description: 'Ristruttura la tua casa o acquista il tuo primo immobile.',
    seoDescription:
      'Richiedi un prestito immobiliare per ristrutturare o acquistare casa con una soluzione digitale e semplice.',
    keywords: ['prestito immobiliare', 'finanziamento casa', 'Monivia immobiliare'],
    benefits: ['Fino a più di 500.000€', 'Piani fino a 360 mesi', 'Perizia gratuita'],
    ogImage: '/assets/premium_hero.png',
  },
  consolidamento: {
    slug: 'consolidamento',
    title: 'Consolidamento Debiti',
    shortTitle: 'Consolidamento',
    description: "Raggruppa tutti i tuoi prestiti in un'unica rata mensile più bassa.",
    seoDescription:
      'Unisci i tuoi prestiti in un’unica rata e semplifica la gestione del tuo budget con Monivia.',
    keywords: ['consolidamento debiti', 'unica rata', 'prestito consolidamento'],
    benefits: ['Rata unica', 'Minori interessi totali', 'Gestione semplificata'],
    ogImage: '/assets/hero_lifestyle_new.png',
  },
  business: {
    slug: 'business',
    title: 'Prestito aziendale',
    shortTitle: 'Aziendale',
    description: 'Supporto concreto per la crescita della tua impresa o iniziativa professionale.',
    seoDescription:
      'Sostieni la crescita della tua impresa con un prestito aziendale pensato per liquidità e flessibilità.',
    keywords: ['prestito aziendale', 'finanziamento impresa', 'Monivia impresa'],
    benefits: ['Liquidità immediata', 'Piani ammortamento flessibili', 'Consulenza dedicata'],
    ogImage: '/assets/pro_bg.png',
  },
};

export const loanSlugs = Object.keys(loanProducts) as LoanSlug[];

export function isLoanSlug(value: string): value is LoanSlug {
  return value in loanProducts;
}

export const transparencyDocuments = [
  {
    id: 'guida-consumatori',
    title: 'Guida al Credito ai Consumatori',
    file: '/documents/guida-credito-consumatori.pdf',
    available: true,
  },
  {
    id: 'guida-abf',
    title: 'Guida Arbitro Bancario Finanziario (ABF)',
    file: '/documents/guida-abf.pdf',
    available: true,
  },
  {
    id: 'tegm',
    title: 'Tassi Effettivi Globali Medi (TEGM)',
    file: '/documents/tegm.pdf',
    available: true,
  },
] as const;
