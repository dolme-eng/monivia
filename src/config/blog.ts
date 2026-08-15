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
    ogImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
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
    ogImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
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
    ogImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200',
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
    ogImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200',
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
    ogImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200',
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
    ogImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
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
  {
    slug: 'guida-prestito-personale-completa',
    title: 'Guida completa al prestito personale: tutto quello che devi sapere',
    excerpt: 'Tutto sulla richiesta di un prestito personale: requisiti, documenti, tempi, costi e come ottenere le migliori condizioni con Monivia.',
    category: 'Guida',
    date: '2025-09-01',
    readTime: 7,
    ogImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200',
    content: `
      <h2>Cos'è il prestito personale</h2>
      <p>Il prestito personale è un finanziamento a rate che ti permette di ottenere una somma di denaro da restituire in un periodo concordato. A differenza di altri prodotti finanziari, non richiede una finalità specifica: puoi usarlo per qualsiasi scopo.</p>

      <h2>Chi può richiederlo</h2>
      <p>Per ottenere un prestito personale con Monivia devi:</p>
      <ul>
        <li>Avere almeno 18 anni</li>
        <li>Essere residente in Italia</li>
        <li>Avere un reddito documentabile (stipendio, pensione, partita IVA)</li>
        <li>Possedere un codice fiscale italiano</li>
        <li>Non essere iscritto come protestato (valutazione caso per caso)</li>
      </ul>

      <h2>Documenti necessari</h2>
      <ul>
        <li><strong>Documento di identità</strong> — carta d'identità o passaporto in corso di validità</li>
        <li><strong>Codice fiscale</strong> — tessera o cartoncino</li>
        <li><strong>Reddito</strong> — ultime 3 buste paga (dipendenti), ultima dichiarazione dei redditi (autonomi), o certificazione pensionistica (pensionati)</li>
        <li><strong>IBAN</strong> — per l'erogazione dei fondi</li>
      </ul>

      <h2>Importo e durata</h2>
      <p>Con Monivia puoi richiedere da <strong>5.000€ a 100.000€</strong> con una durata che va da <strong>12 a 120 mesi</strong>. Il tasso è fisso per tutta la durata del prestito, quindi la rata non cambia mai.</p>

      <h2>Come si calcola la rata</h2>
      <p>La rata mensile dipende da tre fattori: importo, durata e tasso di interesse. Usa il nostro <a href="/calcola">simulatore gratuito</a> per calcolare la rata ideale prima di inviare la richiesta.</p>

      <h2>Tempi di erogazione</h2>
      <p>Dopo l'invio della richiesta, ricevi una risposta entro <strong>48 ore lavorative</strong>. Una volta approvata la pratica e firmato il contratto digitale, i fondi vengono accreditati sul tuo conto corrente entro <strong>3-5 giorni lavorativi</strong>.</p>

      <h2>Assicurazione: obbligatoria o opzionale?</h2>
      <p>L'assicurazione sul prestito non è obbligatoria con Monivia. Puoi scegliere di includerla o meno durante la compilazione della richiesta. L'assicurazione copre la rata mensile in caso di imprevisti come perdita del lavoro o problemi di salute.</p>

      <h2>Perché scegliere Monivia</h2>
      <ul>
        <li><strong>Tasso fisso</strong> — la rata resta uguale per tutta la durata</li>
        <li><strong>Zero spese nascoste</strong> — tutti i costi sono chiari prima della firma</li>
        <li><strong>100% digitale</strong> — nessuno spostamento in filiale</li>
        <li><strong>Assistenza dedicata</strong> — un team ti segue dall'inizio alla fine</li>
      </ul>
    `,
  },
  {
    slug: 'guida-prestito-auto',
    title: 'Guida al prestito auto: come ottenere le migliori condizioni',
    excerpt: 'Come finanziare l\'acquisto della tua auto con un prestito auto a tasso fisso. Requisiti, importi, durata e consigli pratici.',
    category: 'Guida',
    date: '2025-09-05',
    readTime: 6,
    ogImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200',
    content: `
      <h2>Prestito auto: cos'è e come funziona</h2>
      <p>Il prestito auto è un finanziamento pensato specificamente per l'acquisto di un veicolo, nuovo o usato. Rispetto al prestito personale, offre spesso un <strong>TAN più basso</strong> perché l'acquisto dell'auto costituisce una garanzia indiretta.</p>

      <h2>Importo e durata</h2>
      <p>Con Monivia puoi finanziare fino a <strong>50.000€</strong> per l'acquisto della tua auto, con una durata fino a <strong>84 mesi</strong> (7 anni). Il tasso parte dal <strong>1,8% TAN fisso</strong>.</p>

      <h2>Quali auto possono essere finanziate</h2>
      <ul>
        <li><strong>Auto nuove</strong> — acquistate da concessionari o privati</li>
        <li><strong>Auto usate</strong> — con età massima di 10 anni al termine del prestito</li>
        <li><strong>Auto elettriche e ibride</strong> — nessuna restrizione</li>
        <li><strong>Furgoni e veicoli commerciali</strong> — per professionisti e aziende</li>
      </ul>

      <h2>Documenti necessari</h2>
      <ul>
        <li>Documento di identità e codice fiscale</li>
        <li>Proforma o fattura dell'auto (con prezzo e dettagli)</li>
        <li>Ultime 3 buste paga o dichiarazione dei redditi</li>
        <li>IBAN per l'erogazione</li>
      </ul>

      <h2>Assicurazione auto: serve?</h2>
      <p>L'assicurazione RC auto è obbligatoria per legge. L'assicurazione sul prestito (copertura debito) è invece opzionale e ti protegge in caso di impossibilità di pagamento.</p>

      <h2>Confronta prima di scegliere</h2>
      <p>Prima di firmare, confronta sempre il TAEG di diverse offerte. Il TAEG include tutti i costi (interessi, spese di istruttoria, assicurazione) e ti dà il costo reale del prestito.</p>

      <h2>Consiglio Monivia</h2>
      <p>Usa il nostro <a href="/calcola">calcolatore</a> per simulare la rata dell'auto. Se hai già un'offerta dal concessionario, confrontala con quella di Monivia: spesso riusciamo a offrire condizioni migliori.</p>
    `,
  },
  {
    slug: 'come-scegliere-durata-prestito',
    title: 'Come scegliere la durata giusta del prestito',
    excerpt: 'Durata lunga o breve? Scopri come scegliere la durata del prestito in base al tuo budget, al tuo reddito e al costo totale.',
    category: 'Consigli',
    date: '2025-09-10',
    readTime: 5,
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    content: `
      <h2>Perché la durata è importante</h2>
      <p>La durata del prestito determina due cose: l'importo della <strong>rata mensile</strong> e il <strong>costo totale degli interessi</strong>. Scegliere la durata giusta è fondamentale per bilanciare comfort mensile e risparmio complessivo.</p>

      <h2>La regola generale</h2>
      <ul>
        <li><strong>Durata breve (12-36 mesi)</strong> — rata più alta, ma meno interessi totali</li>
        <li><strong>Durata media (37-72 mesi)</strong> — equilibrio tra rata sostenibile e costo contenuto</li>
        <li><strong>Durata lunga (73-120 mesi)</strong> — rata più bassa, ma più interessi totali</li>
      </ul>

      <h2>Esempio pratico</h2>
      <p>Prestito da 20.000€ al 2% TAN fisso:</p>
      <ul>
        <li><strong>24 mesi</strong> — rata ~854€/mese, interessi totali ~500€</li>
        <li><strong>48 mesi</strong> — rata ~434€/mese, interessi totali ~830€</li>
        <li><strong>84 mesi</strong> — rata ~253€/mese, interessi totali ~1.250€</li>
        <li><strong>120 mesi</strong> — rata ~181€/mese, interessi totali ~1.720€</li>
      </ul>

      <h2>Come scegliere</h2>
      <p>Chiediti:</p>
      <ul>
        <li>Quanto posso permettermi di pagare al mese?</li>
        <li>Quanto è importante per me risparmiare sugli interessi totali?</li>
        <li>Ho bisogno di liquidità per altre spese?</li>
      </ul>

      <h2>Il consiglio di Monivia</h2>
      <p>Non scegliere mai la durata solo per avere la rata più bassa. Trova il compromesso giusto: una rata che puoi sostenere senza problemi, ma con una durata che non ti faccia pagare troppi interessi.</p>
      <p>Usa il nostro <a href="/calcola">simulatore</a> per provare diverse combinazioni.</p>
    `,
  },
  {
    slug: 'prestito-lavoratori-autonomi',
    title: 'Prestito per lavoratori autonomi: requisiti e documenti',
    excerpt: 'Guida completa al prestito per freelance, partita IVA e lavoratori autonomi. Documenti, requisiti e come ottenere il finanziamento.',
    category: 'Guida',
    date: '2025-09-15',
    readTime: 6,
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    content: `
      <h2>Prestito per autonomi: è più difficile?</h2>
      <p>No. I lavoratori autonomi possono ottenere prestiti alle stesse condizioni dei dipendenti, con qualche differenza nella documentazione richiesta. Monivia valuta la solidità del reddito, non il tipo di contratto.</p>

      <h2>Chi può richiederlo</h2>
      <ul>
        <li><strong>Freelance e professionisti</strong> — con partita IVA attiva da almeno 2 anni</li>
        <li><strong>Artigiani e commercianti</strong> — con reddito dimostrabile</li>
        <li><strong>Possessori di P.IVA</strong> — in regime ordinario o forfettario</li>
        <li><strong>Collaboratori coordinati e continuativi</strong> — con contratto attivo</li>
      </ul>

      <h2>Documenti necessari</h2>
      <ul>
        <li><strong>Documento di identità e codice fiscale</strong></li>
        <li><strong>Ultima dichiarazione dei redditi</strong> (Modello Redditi o 730)</li>
        <li><strong>Visura camerale</strong> (per commercianti e artigiani)</li>
        <li><strong>Ultima fattura</strong> o certificazione dei redditi</li>
        <li><strong>IBAN</strong> per l'erogazione</li>
      </ul>

      <h2>Importo e durata</h2>
      <p>Gli autonomi possono richiedere da <strong>5.000€ a 100.000€</strong> con durata fino a <strong>120 mesi</strong>. Il tasso è lo stesso dei dipendenti: fisso e trasparente.</p>

      <h2>Consiglio pratico</h2>
      <p>Se il tuo reddito è variabile, scegli una durata più lunga per avere una rata più bassa e gestire meglio i periodi di minore fatturato. Il nostro team può aiutarti a trovare la soluzione più adatta alla tua situazione.</p>
    `,
  },
  {
    slug: 'prestito-online-vs-banca-guida',
    title: 'Prestito online o in banca? Guida completa per scegliere',
    excerpt: 'Confronto dettagliato tra prestito online e prestito tradizionale in banca. Tempi, costi, comodità e trasparenza a confronto.',
    category: 'Confronto',
    date: '2025-09-20',
    readTime: 6,
    ogImage: 'https://images.unsplash.com/photo-1556742049-6726b3ff858f?w=1200',
    content: `
      <h2>Prestito online: vantaggi</h2>
      <ul>
        <li><strong>Velocità</strong> — risposta in 48 ore vs 5-15 giorni in banca</li>
        <li><strong>Comodità</strong> — tutto da casa, senza spostamenti</li>
        <li><strong>Trasparenza</strong> — tutti i costi visibili online prima della richiesta</li>
        <li><strong>Tasso</strong> — spesso più basso grazie ai costi operativi ridotti</li>
        <li><strong>Documenti</strong> — upload digitale, niente copie cartacee</li>
      </ul>

      <h2>Prestito in banca: vantaggi</h2>
      <ul>
        <li><strong>Relazione personale</strong> — faccia a faccia con il consulente</li>
        <li><strong>Fiducia</strong> — il marchio della banca dà sicurezza a qualcuno</li>
        <li><strong>Prodotti combinati</strong> — possibilità di collegare a conto corrente o mutuo</li>
      </ul>

      <h2>Confronto diretto</h2>
      <p><strong>Tempi:</strong> Online vince con 48 ore vs 5-15 giorni.</p>
      <p><strong>Costi:</strong> Online vince con spese di istruttoria zero e TAN più basso.</p>
      <p><strong>Comodità:</strong> Online vince con processo 100% digitale.</p>
      <p><strong>Relazione:</strong> Banca vince con consulente dedicato in filiale.</p>

      <h2>Quale scegliere?</h2>
      <p>Se cerchi <strong>velocità, trasparenza e risparmio</strong>, il prestito online è la scelta migliore. Se preferisci un rapporto personale e hai già un conto attivo con una banca, valuta entrambe le opzioni.</p>
      <p>In ogni caso, confronta sempre il TAEG prima di decidere.</p>
    `,
  },
  {
    slug: 'migliori-prestiti-personali-2026',
    title: 'Migliori prestiti personali 2026: confronto completo',
    excerpt: 'Analisi e confronto dei migliori prestiti personali disponibili in Italia nel 2026. TAN, TAEG, condizioni e recensioni.',
    category: 'Confronto',
    date: '2025-09-25',
    readTime: 7,
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    content: `
      <h2>Cosa cercare in un prestito personale</h2>
      <p>Quando scegli un prestito personale, considera: <strong>TAN fisso</strong> (per prevedibilità), <strong>TAEG basso</strong> (per risparmiare), <strong>spese di istruttoria</strong> (ideali zero), e <strong>flessibilità</strong> (rimborso anticipato senza penali).</p>

      <h2>Top prestiti personali 2026</h2>

      <h3>1. Monivia — Il migliore in assoluto</h3>
      <ul>
        <li><strong>TAN:</strong> 2,0% fisso</li>
        <li><strong>Importo:</strong> fino a 100.000€</li>
        <li><strong>Durata:</strong> 12-120 mesi</li>
        <li><strong>Spese istruttoria:</strong> 0€</li>
        <li><strong>Vantaggi:</strong> tasso fisso, zero costi nascosti, processo 100% digitale, risposta in 48 ore</li>
      </ul>

      <h3>2. Banca tradizionale A</h3>
      <ul>
        <li><strong>TAN:</strong> 2,8% fisso</li>
        <li><strong>Importo:</strong> fino a 50.000€</li>
        <li><strong>Spese istruttoria:</strong> 250€</li>
        <li><strong>Vantaggi:</strong> filiale fisica, consulente dedicato</li>
      </ul>

      <h3>3. Fintech B</h3>
      <ul>
        <li><strong>TAN:</strong> 2,5% fisso</li>
        <li><strong>Importo:</strong> fino a 75.000€</li>
        <li><strong>Spese istruttoria:</strong> 100€</li>
        <li><strong>Vantaggi:</strong> 100% online, approvazione rapida</li>
      </ul>

      <h2>La nostra conclusione</h2>
      <p>Monivia offre il <strong>TAN più basso</strong>, <strong>zero spese di istruttoria</strong> e un processo completamente digitale. Per la maggior parte dei consumatori, è la scelta migliore nel 2026.</p>
    `,
  },
  {
    slug: 'come-calcolare-taeg',
    title: 'Come calcolare il TAEG di un prestito: guida pratica',
    excerpt: 'Scopri come calcolare il TAEG manualmente e perché è l\'indicatore più importante per confrontare i prestiti.',
    category: 'Finanze',
    date: '2025-09-30',
    readTime: 5,
    ogImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
    content: `
      <h2>Cos'è il TAEG</h2>
      <p>Il <strong>TAEG (Tasso Annuo Effettivo Globale)</strong> rappresenta il costo reale del prestito. Include tutti gli oneri: interessi, spese di istruttoria, assicurazione, e qualsiasi altro costo correlato al finanziamento.</p>

      <h2>Formula semplificata</h2>
      <p>Il TAEG si calcola trovando il tasso che eguaglia il valore attuale di tutti i flussi (erogazione iniziale e rate future). La formula matematica è complessa, ma il concetto è semplice: è il <strong>costo reale annuo</strong> del tuo prestito.</p>

      <h2>Come verificarlo</h2>
      <p>Ogni proposta di prestito è obbligata per legge a indicare il TAEG. Verifica che:</p>
      <ul>
        <li>Il TAEG sia indicato chiaramente nel contratto</li>
        <li>Il TAEG sia confrontabile con altre offerte</li>
        <li>Non ci siano costi non inclusi nel TAEG</li>
      </ul>

      <h2>Esempio pratico</h2>
      <p>Prestito di 10.000€:</p>
      <ul>
        <li>TAN: 2,0%</li>
        <li>Spese istruttoria: 0€</li>
        <li>Assicurazione: 0€</li>
        <li><strong>TAEG: 2,0%</strong> (stesso del TAN perché non ci sono costi aggiuntivi)</li>
      </ul>
      <p>Stesso prestito con 200€ di spese di istruttoria:</p>
      <ul>
        <li>TAN: 2,0%</li>
        <li>Spese istruttoria: 200€</li>
        <li><strong>TAEG: ~3,8%</strong> (più alto perché include le spese)</li>
      </ul>

      <h2>Il consiglio di Monivia</h2>
      <p>Confronta sempre il TAEG, mai solo il TAN. Con Monivia il TAEG è uguale al TAN perché non ci sono spese di istruttoria nascoste. È la trasparenza che ti meriti.</p>
    `,
  },
  {
    slug: 'prestito-per-protestati',
    title: 'Prestito per protestati: si può ottenere? Guida completa',
    excerpt: 'Hai un protesto? Scopri se puoi ottenere un prestito, quali sono le opzioni disponibili e come Monivia può aiutarti.',
    category: 'Finanze',
    date: '2025-10-05',
    readTime: 5,
    ogImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
    content: `
      <h2>Cos'è un protesto</h2>
      <p>Un <strong>protesto</strong> è un atto formale che viene elevato quando un assegno, una cambiale o un titolo di credito viene rifiutato al pagamento. È registrato nell'Archivio protesti gestito dalla Camera di Commercio.</p>

      <h2>Come influenza la possibilità di prestito</h2>
      <p>Un protesto non è un divieto assoluto di ottenere crediti, ma rende la richiesta più difficile. Le banche tradizionali generalmente rifiutano automaticamente chi è protestato.</p>

      <h2>Opzioni disponibili</h2>
      <ul>
        <li><strong>Cessione del quinto</strong> — la soluzione principale per protestati. La rata viene trattenuta direttamente dalla busta paga o pensione, senza bisogno di garanzie aggiuntive</li>
        <li><strong>Prestiti con garante</strong> — un soggetto terzo si fa garante del debito</li>
        <li><strong>Prestiti con garanzia immobiliare</strong> — per chi possiede un immobile</li>
      </ul>

      <h2>La cessione del quinto con Monivia</h2>
      <p>Monivia offre <strong>cessione del quinto</strong> anche per protestati. La valutazione è basata sul tuo reddito attuale, non sul tuo passato creditizio. Se hai un reddito stabile e documentabile, puoi ottenere il prestito.</p>

      <h2>Documenti necessari</h2>
      <ul>
        <li>Documento di identità e codice fiscale</li>
        <li>Ultime 3 buste paga o certificazione pensionistica</li>
        <li>Protesti ultimi 5 anni (Monivia li valuterà)</li>
      </ul>

      <h2>Il nostro consiglio</h2>
      <p>Non lasciare che un protesto ti bloffi. Contattaci per una valutazione gratuita e senza impegno. Il nostro team ti guiderà verso la soluzione più adatta alla tua situazione.</p>
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
