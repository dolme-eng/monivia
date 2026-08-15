export type BlogCategory = 'Guida' | 'Finanze' | 'Consigli' | 'Confronto' | 'Errori' | 'Simulatore';

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO date
  readTime: number; // minutes
  ogImage: string;
  content: string; // HTML content
};

export const BLOG_CATEGORIES: BlogCategory[] = ['Guida', 'Finanze', 'Consigli', 'Confronto', 'Errori', 'Simulatore'];

export const CATEGORY_COLORS: Record<BlogCategory, string> = {
  Guida: 'bg-blue-100 text-blue-700',
  Finanze: 'bg-emerald-100 text-emerald-700',
  Consigli: 'bg-amber-100 text-amber-700',
  Confronto: 'bg-purple-100 text-purple-700',
  Errori: 'bg-red-100 text-red-700',
  Simulatore: 'bg-cyan-100 text-cyan-700',
};

export const blogArticles: BlogArticle[] = [
  {
    slug: 'come-richiedere-prestito-online',
    title: 'Come richiedere un prestito online in 5 minuti',
    excerpt: 'Scopri come ottenere un prestito personale, auto o immobiliare con Monivia in pochi click, senza spostamenti e senza lunghe attese.',
    category: 'Guida',
    date: '2025-08-10',
    readTime: 4,
    ogImage: '/assets/hero_lifestyle.webp',
    content: `
      <h2>Come funziona il prestito online con Monivia</h2>
      <p>Richiedere un prestito con Monivia è semplice, veloce e completamente online. Non devi recarti in filiale: tutto il processo avviene dal tuo computer o smartphone.</p>

      <h3>Step 1: Scegli il tipo di prestito</h3>
      <p>Monivia offre diverse soluzioni pensate per ogni esigenza:</p>
      <ul>
        <li><strong>Prestito personale</strong> — per progetti personali, imprevisti o spese importanti</li>
        <li><strong>Prestito auto</strong> — per acquistare la tua nuova auto, nuova o usata</li>
        <li><strong>Prestito immobiliare</strong> — per ristrutturare casa o acquistare un immobile</li>
        <li><strong>Consolidamento debiti</strong> — per raggruppare tutti i tuoi prestiti in un'unica rata</li>
        <li><strong>Prestito aziendale</strong> — per la crescita della tua impresa</li>
      </ul>

      <h3>Step 2: Usa il simulatore</h3>
      <p>Il nostro simulatore ti permette di calcolare la rata mensile in base all'importo e alla durata che preferisci. Puoi scegliere se includere o meno l'assicurazione.</p>

      <h3>Step 3: Compila la richiesta</h3>
      <p>Il modulo è diviso in due semplici sezioni: dati personali e dati finanziari. Ti servono solo:</p>
      <ul>
        <li>Nome e cognome</li>
        <li>Codice fiscale</li>
        <li>Indirizzo email e numero di telefono</li>
        <li>Tipo di impiego e reddito mensile</li>
        <li>Importo e durata desiderati</li>
      </ul>

      <h3>Step 4: Attendi la risposta</h3>
      <p>Dopo aver inviato la richiesta, la nostra squadra la analizzerà e ti contatterà entro 48 ore lavorative con una proposta personalizzata.</p>

      <h2>Perché scegliere Monivia</h2>
      <p>Monivia ti offre trasparenza totale: il tasso fisso resta lo stesso per tutta la durata del prestito, senza sorprese. La rata è sempre la stessa, facile da gestire.</p>
    `,
  },
  {
    slug: 'tan-taeg-cosa-sono',
    title: 'TAN e TAEG: cosa sono e come leggerli',
    excerpt: 'Guida semplice per comprendere il Tasso Annuo Nominale e il Tasso Annuo Effettivo Globale, i due indicatori fondamentali per confrontare i prestiti.',
    category: 'Finanze',
    date: '2025-08-05',
    readTime: 5,
    ogImage: '/assets/consultation.webp',
    content: `
      <h2>Cos'è il TAN</h2>
      <p>Il <strong>TAN (Tasso Annuo Nominale)</strong> è il tasso di interesse puro applicato al prestito. Indica la percentuale di interessi che paghi sul capitale preso in prestito, senza considerare i costi accessori come l'assicurazione o le spese di gestione.</p>
      <p>Ad esempio, un TAN del 2% su un prestito di 50.000€ significa che pagherai circa 1.000€ di interessi all'anno.</p>

      <h2>Cos'è il TAEG</h2>
      <p>Il <strong>TAEG (Tasso Annuo Effettivo Globale)</strong> include invece tutti i costi del prestito: interessi, spese di istruttoria, assicurazione opzionale e qualsiasi altro costo. È il indicatore più affidabile per confrontare diverse proposte di finanziamento.</p>
      <p>Un TAEG più basso significa un prestito più conveniente.</p>

      <h2>TAN vs TAEG: la differenza</h2>
      <p>La differenza fondamentale è che il TAN considera solo gli interessi, mentre il TAEG considera il costo complessivo del prestito. Per questo motivo il TAEG è sempre uguale o superiore al TAN.</p>

      <h2>Come confrontare le offerte</h2>
      <p>Quando ricevi più proposte di prestito, confronta sempre il TAEG, non solo il TAN. È il modo più affidabile per capire quale prestito è realmente più conveniente.</p>
      <p>Normativa europea obbliga tutti i creditori a indicare il TAEG nelle proposte di finanziamento, così puoi confrontare facilmente le diverse offerte.</p>
    `,
  },
  {
    slug: 'consolidamento-debiti-quando-conviene',
    title: 'Consolidamento debiti: quando conviene?',
    excerpt: 'Scopri quando ha senso unire tutti i tuoi prestiti in un\'unica rata mensile più bassa e come può aiutarti a risparmiare.',
    category: 'Consigli',
    date: '2025-07-28',
    readTime: 5,
    ogImage: '/assets/hero_lifestyle_new.webp',
    content: `
      <h2>Cos'è il consolidamento debiti</h2>
      <p>Il consolidamento debiti è un finanziamento che permette di <strong>raggruppare tutti i prestiti esistenti</strong> in un'unica rata mensile. Invece di gestire più rate con diversi importi e scadenze, ne paghi una sola, spesso più bassa della somma delle precedenti.</p>

      <h2>Quando conviene</h2>
      <p>Il consolidamento è una buona soluzione quando:</p>
      <ul>
        <li>Hai più prestiti in corso con rate elevate</li>
        <li>Il tasso medio dei tuoi prestiti attuali è più alto di quello offerto da Monivia</li>
        <li>Vuoi semplificare la gestione delle tue finanze</li>
        <li>Hai bisogno di una rata più bassa per migliorare il tuo cash flow mensile</li>
      </ul>

      <h2>Quando NON conviene</h2>
      <p>Il consolidamento potrebbe non essere la scelta migliore se:</p>
      <ul>
        <li>I tuoi prestiti attuali hanno già un tasso molto basso</li>
        <li>La durata residua dei tuoi prestiti è breve (meno di 12 mesi)</li>
        <li>Il costo totale del consolidamento sarebbe superiore ai prestiti attuali</li>
      </ul>

      <h2>Esempio pratico</h2>
      <p>Supponiamo di avere tre prestiti: uno da 15.000€ al 4%, uno da 10.000€ al 3.5%, e uno da 8.000€ al 4.5%. Con un consolidamento al 2.2% su 48 mesi, potresti risparmiare centinaia di euro di interessi totali e avere una rata mensile più bassa.</p>

      <h2>come procedere</h2>
      <p>Compila il modulo di richiesta consolidamento su Monivia. Dopo aver analizzato la tua situazione, ti proporremo un piano di rientro personalizzato con un'unica rata fissa e trasparente.</p>
    `,
  },
  {
    slug: 'prestito-personale-vs-auto',
    title: 'Prestito personale vs prestito auto: quali differenze?',
    excerpt: 'Confronto dettagliato tra prestito personale e prestito auto per aiutarti a scegliere la soluzione più adatta alle tue esigenze.',
    category: 'Confronto',
    date: '2025-07-20',
    readTime: 4,
    ogImage: '/assets/premium_hero.webp',
    content: `
      <h2>Prestito personale</h2>
      <p>Il prestito personale è la soluzione più flessibile. Puoi usarlo per qualsiasi scopo: ristrutturare casa, partire in vacanza, coprire una spesa imprevista, o semplicemente avere una riserva di liquidità.</p>
      <ul>
        <li><strong>Importo:</strong> da 5.000€ a 100.000€</li>
        <li><strong>Durata:</strong> da 12 a 120 mesi</li>
        <li><strong>Finalità:</strong> libera, senza giustificativi</li>
        <li><strong>Garanzie:</strong> non richieste</li>
      </ul>

      <h2>Prestito auto</h2>
      <p>Il prestito auto è pensato specificamente per l'acquisto di un veicolo, nuovo o usato. Spesso offre condizioni leggermente più vantaggiose rispetto al prestito personale.</p>
      <ul>
        <li><strong>Importo:</strong> fino a 50.000€</li>
        <li><strong>Durata:</strong> fino a 84 mesi</li>
        <li><strong>Finalità:</strong> acquisto veicolo (documentazione richiesta)</li>
        <li><strong>TAN:</strong> generalmente più basso del personale</li>
      </ul>

      <h2>Quale scegliere?</h2>
      <p>Scegli il <strong>prestito personale</strong> se hai bisogno di massima flessibilità nell'uso dei fondi. Scegli il <strong>prestito auto</strong> se stai acquistando un veicolo e vuoi un tasso leggermente più basso.</p>
      <p>In entrambi i casi con Monivia hai tasso fisso, rata costante e totale trasparenza.</p>
    `,
  },
  {
    slug: '5-errori-evitare-finanziamento',
    title: 'I 5 errori da evitare quando richiedi un finanziamento',
    excerpt: 'Ecco gli errori più comuni quando si richiede un prestito e come evitarli per ottenere le migliori condizioni.',
    category: 'Errori',
    date: '2025-07-15',
    readTime: 4,
    ogImage: '/assets/pro_bg.webp',
    content: `
      <h2>Errore 1: Confrontare solo il TAN</h2>
      <p>Molti confrontano solo il TAN tra le diverse offerte, ma il <strong>TAEG</strong> è l'indicatore più affidabile perché include tutti i costi: interessi, spese, assicurazione. Un TAN basso con costi nascosti può rivelarsi più caro.</p>

      <h2>Errore 2: Scegliere la durata più lunga possibile</h2>
      <p>Una rata più bassa è allettante, ma una durata troppo lunga significa pagare molti più interessi totali. Trova il giusto equilibrio tra rata sostenibile e costo totale accettabile.</p>

      <h2>Errore 3: Non considerare l'assicurazione</h2>
      <p>L'assicurazione sul prestito non è obbligatoria, ma può essere utile. Valuta se il costo dell'assicurazione giustifica la copertura che offre, e confronta con polizze esterne.</p>

      <h2>Errore 4: Accettare la prima proposta senza confrontare</h2>
      <p>Richiedi sempre almeno 2-3 preventivi prima di decidere. Ogni istituto di credito offre condizioni diverse, e un confronto attento può farti risparmiare centinaia di euro.</p>

      <h2>Errore 5: Non leggere le condizioni generali</h2>
      <p>Leggi sempre le condizioni generali del contratto: penali di rimborso anticipato, costi di gestione, modalità di incasso rata. La trasparenza è un tuo diritto.</p>

      <h2>Conclusione</h2>
      <p>Con un po' di attenzione e confronto, puoi ottenere un prestito davvero conveniente. Monivia ti offre trasparenza totale: tutti i costi sono chiari prima della firma.</p>
    `,
  },
  {
    slug: 'simulare-rata-prestito-guida',
    title: 'Simulare la rata del prestito: guida pratica',
    excerpt: 'Come usare il simulatore Monivia per calcolare la rata mensile ideale e pianificare il tuo finanziamento con precisione.',
    category: 'Simulatore',
    date: '2025-07-10',
    readTime: 3,
    ogImage: '/assets/consultation.webp',
    content: `
      <h2>Perché simulare la rata</h2>
      <p>Prima di richiedere un prestito, è fondamentale capire quanto pagherai ogni mese. Il simulatore Monivia ti aiuta a visualizzare l'impatto del finanziamento sul tuo budget mensile.</p>

      <h2>Come usare il simulatore</h2>
      <p>Il simulatore si trova nella homepage di Monivia. Ecco come usarlo:</p>
      <ul>
        <li><strong>Importo:</strong> usa lo slider o inserisci direttamente l'importo desiderato (da 5.000€ a 1.000.000€)</li>
        <li><strong>Durata:</strong> scegli la durata in mesi (da 12 a 360)</li>
        <li><strong>Assicurazione:</strong> attiva o disattiva l'opzione assicurativa per vedere l'impatto sulla rata</li>
      </ul>

      <h2>Cosa mostra il simulatore</h2>
      <p>In tempo reale vedrai:</p>
      <ul>
        <li>La <strong>rata mensile stimata</strong></li>
        <li>Il <strong>TAEG indicativo</strong></li>
        <li>Il <strong>TAN</strong></li>
        <li>Il <strong>totale da restituire</strong></li>
      </ul>

      <h2>Suggerimento</h2>
      <p>Prova diverse combinazioni di importo e durata per trovare la rata che si adatta meglio al tuo budget. Ricorda che una durata più lunga abbassa la rata ma aumenta il costo totale degli interessi.</p>
    `,
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: BlogCategory): BlogArticle[] {
  return blogArticles.filter((a) => a.category === category);
}

export function getAllSlugs(): string[] {
  return blogArticles.map((a) => a.slug);
}
