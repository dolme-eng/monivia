import { siteConfig } from '@/config/site';
import { escapeHtml, formatEuro } from '@/lib/sanitization';

type BrandEmailShellProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  body: string;
  footer?: string;
};

function brandEmailShell({ eyebrow, title, intro, body, footer }: BrandEmailShellProps) {
  const safeEyebrow = escapeHtml(eyebrow);
  const safeTitle = escapeHtml(title);
  const safeIntro = intro
    ? `<p style="margin:0 0 24px 0;color:#475569;font-size:16px;line-height:1.7;">${escapeHtml(intro)}</p>`
    : '';
  const safeFooter = footer
    ? `<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.6;">${footer}</div>`
    : '';

  return `
    <div style="margin:0;padding:0;background:#f8fafc;">
      <div style="max-width:640px;margin:0 auto;padding:24px 16px 40px 16px;">
        <div style="background:#0f172a;border-radius:24px 24px 0 0;padding:28px 32px;text-align:center;">
          <div style="color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">MO<span style="color:#06b6d4;">NIVIA</span></div>
          <div style="margin-top:8px;color:#94a3b8;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${safeEyebrow}</div>
        </div>
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 24px 24px;padding:32px;">
          <h1 style="margin:0 0 16px 0;color:#0f172a;font-size:24px;line-height:1.2;">${safeTitle}</h1>
          ${safeIntro}
          ${body}
          ${safeFooter}
        </div>
        <div style="padding:18px 8px 0 8px;text-align:center;color:#94a3b8;font-size:11px;line-height:1.6;">
          ${escapeHtml(siteConfig.name)} · ${escapeHtml(siteConfig.contact.address)} · ${escapeHtml(siteConfig.contact.email)}
        </div>
      </div>
    </div>
  `;
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
    title: `Nuovo messaggio da ${safeName}`,
    intro: 'Hai ricevuto un nuovo messaggio dal form contatti del sito.',
    body: `
      ${sectionCard('Dettagli contatto', [
        ['Nome', safeName],
        ['Email', `<a href="mailto:${safeEmail}" style="color:#06b6d4;text-decoration:none;">${safeEmail}</a>`],
        ['Oggetto', safeSubject],
      ])}
      <div style="background:#f1f5f9;border-left:4px solid #06b6d4;border-radius:14px;padding:20px;">
        <p style="margin:0 0 8px 0;color:#0f172a;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">Messaggio</p>
        <div style="color:#334155;font-size:15px;line-height:1.75;">${safeMessage}</div>
      </div>
    `,
    footer: `Rispondi direttamente a <a href="mailto:${safeEmail}" style="color:#06b6d4;text-decoration:none;">${safeEmail}</a> per continuare la conversazione.`,
  });
}

export function buildContactAutoReplyEmail(data: { nome: string; oggetto: string }) {
  const safeName = escapeHtml(data.nome);
  const safeSubject = escapeHtml(data.oggetto);

  return brandEmailShell({
    eyebrow: 'Conferma contatto',
    title: `Grazie ${safeName}, abbiamo ricevuto il tuo messaggio`,
    intro: 'Ti confermiamo la ricezione della tua richiesta. Un consulente Monivia la prenderà in carico al più presto.',
    body: `
      ${paragraph(`Abbiamo registrato il tuo messaggio relativo a <strong>${safeSubject}</strong>.`)}
      ${paragraph('In genere rispondiamo entro 24 ore lavorative.')}
      <div style="text-align:center;margin-top:28px;">
        <a href="${siteConfig.url}" style="display:inline-block;background:#06b6d4;color:#ffffff;text-decoration:none;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;padding:14px 22px;border-radius:14px;">Torna al sito</a>
      </div>
    `,
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
    eyebrow: 'Nuova pratica finanziamento',
    title: `Pratica ${escapeHtml(data.practiceId)}`,
    intro: 'Hai ricevuto una nuova richiesta di prestito dal sito Monivia.',
    body: `
      ${sectionCard('Dettagli richiedente', [
        ['Nome', fullName],
        ['Email', `<a href="mailto:${safeEmail}" style="color:#06b6d4;text-decoration:none;">${safeEmail}</a>`],
        ['Telefono', safePhone],
        ['Codice fiscale', safeTaxCode],
      ])}
      ${sectionCard('Dettagli prestito', [
        ['Pratica', escapeHtml(data.practiceId)],
        ['Importo', formatEuro(data.importo, 0)],
        ['Durata', `${escapeHtml(String(data.durata))} mesi`],
        ['Impiego', escapeHtml(data.impiego)],
        ['Finalità', escapeHtml(data.finalita ?? '-')],
        ['Reddito mensile', data.reddito != null ? formatEuro(data.reddito, 0) : '-'],
        ['Anzianità lavorativa', data.anzianita != null ? `${escapeHtml(String(data.anzianita))} anni` : '-'],
        ['Privacy', data.privacy ? 'Accettata' : 'Non indicata'],
        ['CRIF', data.crif ? 'Autorizzato' : 'Non indicato'],
      ])}
      <div style="background:#f1f5f9;border-left:4px solid #10b981;border-radius:14px;padding:20px;">
        <p style="margin:0;color:#334155;font-size:15px;line-height:1.75;">Il dossier è stato salvato e può essere preso in carico manualmente dalla squadra. Il cliente riceverà subito una conferma automatica.</p>
      </div>
    `,
    footer: `Rispondi direttamente al cliente con un clic: <a href="mailto:${safeEmail}" style="color:#06b6d4;text-decoration:none;">${safeEmail}</a>.`,
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
    title: `Grazie ${safeName}, la tua pratica è stata ricevuta`,
    intro: `Ti confermiamo la ricezione della pratica ${escapeHtml(data.practiceId)}.`,
    body: `
      ${paragraph('La nostra squadra sta analizzando la tua richiesta e ti contatterà al più presto con il prossimo passo.')}
      ${sectionCard('Riepilogo pratica', [
        ['Pratica', escapeHtml(data.practiceId)],
        ['Importo', formatEuro(data.importo, 0)],
        ['Durata', `${escapeHtml(String(data.durata))} mesi`],
        ['Impiego', escapeHtml(data.impiego)],
        ['Finalità', escapeHtml(data.finalita ?? '-')],
      ])}
      <div style="text-align:center;margin-top:28px;">
        <a href="${siteConfig.url}" style="display:inline-block;background:#06b6d4;color:#ffffff;text-decoration:none;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;padding:14px 22px;border-radius:14px;">Visita Monivia</a>
      </div>
    `,
    footer: 'Tempo medio di risposta: entro 48 ore lavorative.',
  });
}
