import { buildPageMetadata } from '@/lib/seo';
import { isLoanSlug, loanProducts } from '@/config/loans';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import PrestitoDettaglioClient from './client';

export function generateStaticParams() {
  return Object.keys(loanProducts).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isLoanSlug(slug)) {
    return buildPageMetadata({
      title: 'Prestito | Monivia',
      description: 'Scopri le soluzioni di prestito Monivia: personale, auto, immobiliare, business e consolidamento debiti.',
      path: '/prestiti',
    });
  }
  const product = loanProducts[slug];
  return buildPageMetadata({
    title: `${product.title} | Monivia`,
    description: product.seoDescription,
    path: `/prestiti/${slug}`,
    keywords: product.keywords,
    image: product.ogImage,
  });
}

export default async function PrestitoDettaglio({ params }: Props) {
  const { slug } = await params;
  const product = isLoanSlug(slug) ? loanProducts[slug] : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Prestiti', item: 'https://www.monivia.it/prestiti' },
      ...(product
        ? [{ '@type': 'ListItem', position: 3, name: product.shortTitle, item: `https://www.monivia.it/prestiti/${slug}` }]
        : []),
    ],
  };

  const productFaqs: Record<string, { question: string; answer: string }[]> = {
    personale: [
      { question: 'Qual è il tasso del prestito personale?', answer: 'Il TAN parte dal 2,0% fisso per tutta la durata del prestito. Il TAEG è indicato nella proposta personalizzata.' },
      { question: 'Posso usare il prestito personale per qualsiasi scopo?', answer: 'Sì, il prestito personale non richiede una finalità specifica. Puoi usarlo per ristrutturazioni, vacanze, spese mediche o qualsiasi altro progetto.' },
      { question: 'Quali documenti servono per il prestito personale?', answer: 'Documento di identità, codice fiscale, ultime 3 buste paga (dipendenti) o dichiarazione dei redditi (autonomi), e IBAN.' },
      { question: 'Quanto tempo ci vuole per ottenere i fondi?', answer: 'Dopo l\'approvazione della pratica, i fondi vengono accreditati sul tuo conto corrente entro 3-5 giorni lavorativi.' },
      { question: 'Posso rimborsare il prestito anticipatamente?', answer: 'Sì, è possibile il rimborso anticipato totale o parziale con una commissione massima dell\'1%.' },
    ],
    auto: [
      { question: 'Posso finanziare un\'auto usata?', answer: 'Sì, il prestito auto copre sia veicoli nuovi che usati, con un\'età massima di 10 anni al termine del prestito.' },
      { question: 'Serve un\'assicurazione auto?', answer: 'L\'assicurazione RC auto è obbligatoria per legge. L\'assicurazione sul prestito (copertura debito) è opzionale.' },
      { question: 'Qual è l\'importo massimo per il prestito auto?', answer: 'Puoi finanziare fino a 50.000€ per l\'acquisto del tuo veicolo.' },
      { question: 'Il tasso è fisso o variabile?', answer: 'Il tasso è fisso per tutta la durata del prestito, con un TAN che parte dal 1,8%.' },
      { question: 'Posso acquistare un veicolo da un privato?', answer: 'Sì, puoi acquistare da concessionari o privati. Ti servirà una proforma o fattura del veicolo.' },
    ],
    immobiliare: [
      { question: 'Posso usare il prestito immobiliare per ristrutturare?', answer: 'Sì, il prestito immobiliare è ideale per ristrutturazioni, acquisti e investimenti immobiliari.' },
      { question: 'Qual è l\'importo massimo?', answer: 'Puoi ottenere fino a 500.000€ con una durata fino a 360 mesi (30 anni).' },
      { question: 'Serve una perizia?', answer: 'Sì, è richiesta una perizia immobiliare. Con Monivia la perizia è gratuita.' },
      { question: 'Il tasso è fisso?', answer: 'Sì, il tasso è fisso per tutta la durata del prestito, con un TAN che parte dal 2,5%.' },
      { question: 'Posso estinguere il prestito anticipatamente?', answer: 'Sì, è possibile il rimborso anticipato totale o parziale con una commissione massima dell\'1%.' },
    ],
    consolidamento: [
      { question: 'Cos\'è il consolidamento debiti?', answer: 'È un finanziamento che unisce tutti i tuoi prestiti esistenti in un\'unica rata mensile più bassa.' },
      { question: 'Quanti prestiti posso consolidare?', answer: 'Puoi consolidare tutti i tuoi prestiti attivi in un unico piano di rimborso.' },
      { question: 'Quanto risparmio con il consolidamento?', answer: 'Il risparmio dipende dai tuoi tassi attuali. In media, i nostri clienti risparmiano il 15-20% sul costo totale degli interessi.' },
      { question: 'Posso consolidare prestiti con altri istituti?', answer: 'Sì, puoi consolidare prestiti contratti con qualsiasi banca o finanziaria.' },
      { question: 'Il consolidamento influisce sul merito creditizio?', answer: 'No, il consolidamento non influisce negativamente sul tuo merito creditizio. Anzi, può migliorarlo se riduce il tuo tasso di indebitamento.' },
    ],
    business: [
      { question: 'Chi può richiedere il prestito aziendale?', answer: 'Imprenditori, professionisti e freelance con partita IVA attiva da almeno 2 anni.' },
      { question: 'Quali documenti servono?', answer: 'Documento di identità, visura camerale, ultima dichiarazione dei redditi, e fatturato degli ultimi 2 anni.' },
      { question: 'Qual è l\'importo massimo?', answer: 'Puoi ottenere fino a 50.000€ con una durata fino a 120 mesi.' },
      { question: 'Il tasso è fisso?', answer: 'Sì, il tasso è fisso per tutta la durata del prestito, con un TAN che parte dal 3,0%.' },
      { question: 'A cosa posso usare il prestito aziendale?', answer: 'Per acquisto attrezzature, ristrutturazione locali, capitale circolante, espansione attività o qualsiasi esigenza aziendale.' },
    ],
  };

  const faqJsonLd = product && productFaqs[slug] ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: productFaqs[slug].map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LoanOrCredit',
              name: product.title,
              description: product.description,
              provider: {
                '@type': 'FinancialService',
                name: 'Monivia',
                url: siteConfig.url,
              },
              interestRate: {
                '@type': 'QuantitativeValue',
                value: product.tan * 100,
                unitText: 'TAN %',
                minValue: product.tan * 100,
              },
              amount: {
                '@type': 'MonetaryAmount',
                currency: 'EUR',
                maxValue: product.slug === 'immobiliare' ? 500000 : product.slug === 'consolidamento' ? 200000 : 100000,
              },
              url: `${siteConfig.url}/prestiti/${product.slug}`,
            }),
          }}
        />
      )}
      <PrestitoDettaglioClient />
    </>
  );
}
