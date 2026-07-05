import { siteConfig } from '@/config/site';
import { escapeHtml, formatEuro } from '@/lib/sanitization';

type BrandEmailShellProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  body: string;
  plainText: string;
  footer?: string;
};

function brandEmailShell({ eyebrow, title, intro, body, plainText, footer }: BrandEmailShellProps) {
  const safeEyebrow = escapeHtml(eyebrow);
  const safeTitle = escapeHtml(title);
  const safeIntro = intro
    ? `<p style="margin:0 0 24px 0;color:#475569;font-size:16px;line-height:1.7;">${escapeHtml(intro)}</p>`
    : '';
  const safeFooter = footer
    ? `<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.6;">${footer}</div>`
    : '';

  const html = `
    <div style="margin:0;padding:0;background:#f8fafc;">
      <div style="max-width:640px;margin:0 auto;padding:24px 16px 40px 16px;">
        <div style="background:#0a1628;border-radius:24px 24px 0 0;padding:32px;text-align:center;">
          <div style="color:#ffffff;font-size:32px;font-weight:900;letter-spacing:-1px;">MO<span style="color:#00d4ff;">NIVIA</span></div>
          <div style="margin-top:8px;color:#94a3b8;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${safeEyebrow}</div>
        </div>
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 24px 24px;padding:32px;">
          <h1 style="margin:0 0 16px 0;color:#0f172a;font-size:24px;line-height:1.2;">${safeTitle}</h1>
          ${safeIntro}
          ${body}
          ${safeFooter}
        </div>
        <div style="padding:18px 8px 0 8px;text-align:center;color:#94a3b8;font-size:11px;line-height:1.6;">
          <a href="mailto:${siteConfig.contact.email}" style="color:#94a3b8;text-decoration:underline;">${escapeHtml(siteConfig.contact.email)}</a>
        </div>
      </div>
    </div>
  `;

  const fullPlainText = [
    plainText,
    '',
    '---',
    `${siteConfig.contact.email}`,
  ].join('\n');

  return { html, text: fullPlainText };
}

function sectionCard(title: string, rows: Array<[string, string]>) {
  return `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px;margin:24px 0;">
      <h2 style="margin:0 0 16px 0;color:#0f172a;font-size:16px;font-weight:800;">${escapeHtml(title)}</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;vertical-align:top;">${escapeHtml(label)}</td>
                <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:700;text-align:right;">${value}</td>
              </tr>
            `
          )
          .join('')}
      </table>
    </div>
  `;
}

function paragraph(html: string) {
  return `<p style="margin:0 0 16px 0;color:#475569;font-size:16px;line-height:1.7;">${html}</p>`;
}

export function buildContactNotificationEmail(data: { nome: string; email: string; oggetto: string; message: string }) {
  const safeName = escapeHtml(data.nome);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.oggetto);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />');

  return brandEmailShell({
    eyebrow: 'Nuovo contatto',
    title: `Messaggio da ${safeName}`,
    intro: 'Hai ricevuto un nuovo messaggio dal form contatti.',
    body: `
      ${sectionCard('Dettagli contatto', [
        ['Nome', safeName],
        ['Email', `<a href="mailto:${encodeURIComponent(data.email)}" style="color:#00d4ff;text-decoration:none;">${safeEmail}</a>`],
        ['Oggetto', safeSubject],
      ])}
      <div style="background:#f1f5f9;border-radius:14px;padding:20px;">
        <p style="margin:0 0 8px 0;color:#0f172a;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">Messaggio</p>
        <div style="color:#334155;font-size:15px;line-height:1.75;">${safeMessage}</div>
      </div>
      <div style="margin-top:24px;">
        <p style="margin:0;color:#475569;font-size:14px;">
          Per rispondere, invia una email a
          <a href="mailto:${encodeURIComponent(data.email)}" style="color:#00d4ff;text-decoration:none;">${safeEmail}</a>
        </p>
      </div>
    `,
    plainText: [
      `NUOVO CONTATTO`,
      '',
      `Nome: ${data.nome}`,
      `Email: ${data.email}`,
      `Oggetto: ${data.oggetto}`,
      '',
      `Messaggio:`,
      data.message,
    ].join('\n'),
    footer: `Rispondi a <a href="mailto:${encodeURIComponent(data.email)}" style="color:#00d4ff;text-decoration:none;">${safeEmail}</a> per continuare.`,
  });
}

export function buildContactAutoReplyEmail(data: { nome: string; oggetto: string }) {
  const safeName = escapeHtml(data.nome);
  const safeSubject = escapeHtml(data.oggetto);

  return brandEmailShell({
    eyebrow: 'Conferma contatto',
    title: `Grazie ${safeName}`,
    intro: 'Abbiamo ricevuto il tuo messaggio. Un consulente Monivia ti contatterà al più presto.',
    body: `
      ${paragraph(`Messaggio relativo a: <strong>${safeSubject}</strong>`)}
      ${paragraph('Rispondiamo entro 24 ore lavorative.')}
    `,
    plainText: [
      `Ciao ${data.nome},`,
      '',
      `Abbiamo ricevuto il tuo messaggio relativo a "${data.oggetto}".`,
      'Un consulente Monivia ti contatterà al più presto.',
      '',
      'Rispondiamo entro 24 ore lavorative.',
    ].join('\n'),
  });
}

export function buildLoanNotificationEmail(data: {
  practiceId: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  codiceFiscale: string;
  importo: number;
  durata: number;
  impiego: string;
  reddito?: number | null;
  finalita?: string | null;
  anzianita?: number | null;
  privacy?: boolean | null;
  crif?: boolean | null;
}) {
  const fullName = escapeHtml(`${data.nome} ${data.cognome}`);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.telefono);
  const safeTaxCode = escapeHtml(data.codiceFiscale);

  return brandEmailShell({
    eyebrow: 'Nuova pratica',
    title: `Pratica ${escapeHtml(data.practiceId)}`,
    intro: 'Nuova richiesta di prestito ricevuta dal sito.',
    body: `
      ${sectionCard('Richiedente', [
        ['Nome', fullName],
        ['Email', `<a href="mailto:${encodeURIComponent(data.email)}" style="color:#00d4ff;text-decoration:none;">${safeEmail}</a>`],
        ['Telefono', safePhone],
        ['Cod. Fiscale', safeTaxCode],
      ])}
      ${sectionCard('Prestito', [
        ['Pratica', escapeHtml(data.practiceId)],
        ['Importo', formatEuro(data.importo, 0)],
        ['Durata', `${escapeHtml(String(data.durata))} mesi`],
        ['Impiego', escapeHtml(data.impiego)],
        ['Finalità', escapeHtml(data.finalita ?? '-')],
        ['Reddito', data.reddito != null ? formatEuro(data.reddito, 0) : '-'],
        ['Anzianità', data.anzianita != null ? `${escapeHtml(String(data.anzianita))} anni` : '-'],
      ])}
      <div style="margin-top:24px;">
        <p style="margin:0;color:#475569;font-size:14px;">
          Per rispondere, invia una email a
          <a href="mailto:${encodeURIComponent(data.email)}" style="color:#00d4ff;text-decoration:none;">${safeEmail}</a>
        </p>
      </div>
    `,
    plainText: [
      `NUOVA PRATICA: ${data.practiceId}`,
      '',
      `RICHIEDENTE`,
      `Nome: ${data.nome} ${data.cognome}`,
      `Email: ${data.email}`,
      `Telefono: ${data.telefono}`,
      `Cod. Fiscale: ${data.codiceFiscale}`,
      '',
      `PRESTITO`,
      `Importo: ${data.importo} EUR`,
      `Durata: ${data.durata} mesi`,
      `Impiego: ${data.impiego}`,
      `Finalità: ${data.finalita ?? '-'}`,
    ].join('\n'),
    footer: `Rispondi a <a href="mailto:${encodeURIComponent(data.email)}" style="color:#00d4ff;text-decoration:none;">${safeEmail}</a> per gestire la pratica.`,
  });
}

export function buildLoanAutoReplyEmail(data: {
  practiceId: string;
  nome: string;
  cognome: string;
  importo: number;
  durata: number;
  impiego: string;
  finalita?: string | null;
}) {
  const safeName = escapeHtml(`${data.nome} ${data.cognome}`);

  return brandEmailShell({
    eyebrow: 'Conferma pratica',
    title: `Pratica ${escapeHtml(data.practiceId)} ricevuta`,
    intro: `Grazie ${safeName}. La tua richiesta è stata registrata.`,
    body: `
      ${paragraph('La nostra squadra analizza la richiesta e ti contatterà con il prossimo passo.')}
      ${sectionCard('Riepilogo', [
        ['Pratica', escapeHtml(data.practiceId)],
        ['Importo', formatEuro(data.importo, 0)],
        ['Durata', `${escapeHtml(String(data.durata))} mesi`],
        ['Impiego', escapeHtml(data.impiego)],
      ])}
    `,
    plainText: [
      `Ciao ${data.nome} ${data.cognome},`,
      '',
      `La tua pratica ${data.practiceId} è stata registrata.`,
      '',
      `Importo: ${data.importo} EUR`,
      `Durata: ${data.durata} mesi`,
      `Impiego: ${data.impiego}`,
      '',
      'La nostra squadra ti contatterà con il prossimo passo.',
    ].join('\n'),
  });
}
