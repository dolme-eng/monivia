export type FaqCategory = 'Generale' | 'Requisiti' | 'Tassi e costi' | 'Processo' | 'Rimborso';

export type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategory;
};

export const FAQ_CATEGORIES: FaqCategory[] = ['Generale', 'Requisiti', 'Tassi e costi', 'Processo', 'Rimborso'];

export const faqItems: FaqItem[] = [
  // --- Generale ---
  {
    category: 'Generale',
    question: 'Cos\'è Monivia?',
    answer: 'Monivia è un servizio di prestito online che offre finanziamenti personali, auto, immobiliari, consolidamento debiti e prestiti aziendali. Tutto il processo avviene online, senza spostamenti in filiale.',
  },
  {
    category: 'Generale',
    question: 'Chi può richiedere un prestito con Monivia?',
    answer: 'Possono richiedere un prestito le persone maggiorenni (18 anni) con residenza in Italia, in possesso di un reddito documentabile e un codice fiscale italiano.',
  },
  {
    category: 'Generale',
    question: 'Quali tipi di prestiti offrite?',
    answer: 'Offriamo cinque tipi di prestito: Personale (per qualsiasi scopo), Auto (per l\'acquisto di un veicolo), Immobiliare (per ristrutturazioni o acquisti), Consolidamento debiti (per unire più prestiti in uno) e Aziendale (per imprese e professionisti).',
  },
  {
    category: 'Generale',
    question: 'Il prestito è sicuro?',
    answer: 'Sì. Monivia utilizza crittografia SSL a 213 bit per proteggere tutti i tuoi dati. Inoltre, siamo iscritti all\'OAM (Organismo di Agenti e Mediatori) e operiamo nel pieno rispetto della normativa italiana e europea.',
  },

  // --- Requisiti ---
  {
    category: 'Requisiti',
    question: 'Quali documenti servono?',
    answer: 'Per richiedere un prestito ti servono: un documento di identità valido (carta d\'identità o passaporto), il codice fiscale, e la documentazione relativa al tuo reddito (ultime buste paga, dichiarazione dei redditi o visura camerale per i freelance).',
  },
  {
    category: 'Requisiti',
    question: 'Qual è l\'importo minimo e massimo?',
    answer: 'L\'importo minimo è 5.000€ e il massimo è 1.000.000€ per il prestito personale. Per il prestito auto il massimo è 50.000€, per l\'immobiliare fino a 500.000€, e per il consolidamento fino a 200.000€.',
  },
  {
    category: 'Requisiti',
    question: 'Qual è la durata minima e massima?',
    answer: 'La durata minima è 12 mesi e la massima è 120 mesi (10 anni) per il prestito personale. Per l\'immobiliare la durata può arrivare fino a 360 mesi (30 anni).',
  },
  {
    category: 'Requisiti',
    question: 'Serve un\'assicurazione?',
    answer: 'L\'assicurazione sul prestito non è obbligatoria. Puoi scegliere di includerla o meno durante la compilazione della richiesta. L\'assicurazione copre eventuali problemi finanziari in caso di imprevisti.',
  },

  // --- Tassi e costi ---
  {
    category: 'Tassi e costi',
    question: 'Qual è il tasso di interesse?',
    answer: 'Il tasso varia in base al tipo di prestito. Il TAN parte dal 1.8% per il prestito auto fino al 3% per il prestito aziendale. Il TAEG (che include tutti i costi) è indicato nella pagina di ogni prodotto. Il tasso è fisso per tutta la durata del prestito.',
  },
  {
    category: 'Tassi e costi',
    question: 'Ci sono spese nascoste?',
    answer: 'No. Monivia applica la massima trasparenza: tutti i costi (TAN, TAEG, spese di istruttoria, costi dell\'assicurazione se inclusa) sono chiaramente indicati prima della firma del contratto. Non ci sono costi nascosti.',
  },
  {
    category: 'Tassi e costi',
    question: 'Come si calcola la rata mensile?',
    answer: 'La rata mensile si calcola in base all\'importo, alla durata e al tasso di interesse. Puoi usare il nostro simulatore nella homepage per calcolare la rata stimata in tempo reale, con o senza assicurazione.',
  },
  {
    category: 'Tassi e costi',
    question: 'Cos\'è il TAEG e perché è importante?',
    answer: 'Il TAEG (Tasso Annuo Effettivo Globale) rappresenta il costo complessivo del prestito, inclusi interessi, spese di istruttoria e assicurazione. È l\'indicatore più affidabile per confrontare diverse offerte di finanziamento.',
  },

  // --- Processo ---
  {
    category: 'Processo',
    question: 'Quanto tempo ci vuole per ottenere i soldi?',
    answer: 'Dopo aver inviato la richiesta, la nostra squadra la analizza e ti contatta entro 48 ore lavorative. Una volta approvata la pratica, i fondi vengono erogati entro 3-5 giorni lavorativi sul tuo conto corrente.',
  },
  {
    category: 'Processo',
    question: 'Come segue lo stato della mia pratica?',
    answer: 'Dopo l\'invio della richiesta riceverai una email di conferma con il numero di pratica. Puoi contattarci in qualsiasi momento per aggiornamenti sulla stato della tua pratica.',
  },
  {
    category: 'Processo',
    question: 'Posso annullare la richiesta dopo l\'invio?',
    answer: 'Sì, puoi annullare la richiesta in qualsiasi momento prima della firma del contratto. Contattaci il prima possibile al numero +39 350 853 3366 o all\'email contatto@monivia.it.',
  },

  // --- Rimborso ---
  {
    category: 'Rimborso',
    question: 'Posso rimborsare il prestito anticipatamente?',
    answer: 'Sì, è possibile il rimborso anticipato totale o parziale. La normativa italiana prevede una commissione massima dell\'1% per il rimborso anticipato. Contattaci per conoscere i dettagli specifici della tua pratica.',
  },
  {
    category: 'Rimborso',
    question: 'Posso modificare la rata mensile?',
    answer: 'In linea di massima la rata è fissa per tutta la durata del prestito. In caso di esigenze particolari, contattaci per valutare eventuali modifiche al piano di ammortamento.',
  },
  {
    category: 'Rimborso',
    question: 'Cosa succede se salto un\'rata?',
    answer: 'In caso di ritardo nel pagamento viene applicata una commissione di incasso. Se il ritardo supera i 30 giorni, potrebbe essere applicato un tasso di mora. Ti consigliamo di contattarci immediatamente per trovare una soluzione.',
  },
];
