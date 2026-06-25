import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';
import { sendEmail } from '@/lib/email';
import { buildLoanAutoReplyEmail, buildLoanNotificationEmail } from '@/lib/email-templates';
import { guardSubmission } from '@/lib/security';
import { normalizeText } from '@/lib/sanitization';
import { loanSchema } from '@/lib/validations';
import { verifyCsrfToken } from '@/lib/csrf';

export async function POST(request: Request) {
  try {
    // CSRF check
    const csrfToken = request.headers.get('x-csrf-token');
    if (!verifyCsrfToken(csrfToken)) {
      return NextResponse.json({ error: 'Token CSRF non valido' }, { status: 403 });
    }

    // Content-Type check
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type non valido' }, { status: 415 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Dati non validi' }, { status: 400 });
    }

    const honeypot = normalizeText((body as Record<string, unknown>).website);
    const guard = await guardSubmission(request, { kind: 'loan', honeypot });
    if (!guard.allowed) {
      return guard.silent
        ? NextResponse.json({ success: true, message: 'Richiesta inviata con successo' })
        : guard.response;
    }

    const result = loanSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = {
      importo: result.data.importo,
      durata: result.data.durata,
      impiego: normalizeText(result.data.impiego),
      nome: normalizeText(result.data.nome),
      cognome: normalizeText(result.data.cognome),
      email: normalizeText(result.data.email).toLowerCase(),
      telefono: normalizeText(result.data.telefono),
      codiceFiscale: normalizeText(result.data.codiceFiscale).toUpperCase(),
      reddito: result.data.reddito,
      finalita: normalizeText(result.data.finalita),
      anzianita: result.data.anzianita,
      privacy: result.data.privacy,
      crif: result.data.crif,
      sourcePage: normalizeText(result.data.sourcePage) || '/',
    };

    const practiceId = `PD-${randomUUID().split('-')[0].toUpperCase()}`;

    const [teamEmail, autoReplyEmail] = await Promise.all([
      sendEmail({
        to: siteConfig.contact.email,
        replyTo: data.email,
        subject: `Nuova pratica ${practiceId} - ${data.nome} ${data.cognome}`,
        html: buildLoanNotificationEmail({ ...data, practiceId }),
      }),
      sendEmail({
        to: data.email,
        subject: `Conferma pratica ${practiceId} | Monivia`,
        html: buildLoanAutoReplyEmail({ ...data, practiceId }),
      }),
    ]);

    if (!teamEmail.success) {
      console.error('Internal loan notification email failed to send');
      return NextResponse.json(
        { error: 'Impossibile inviare la richiesta in questo momento. Riprova più tardi.' },
        { status: 503 }
      );
    }

    if (!autoReplyEmail.success) {
      console.warn('Loan auto-reply email failed to send');
    }

    return NextResponse.json({
      success: true,
      message: 'Richiesta inviata con successo',
      practiceId,
    });
  } catch (error) {
    console.error('API /loan Error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
