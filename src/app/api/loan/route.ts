import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { siteConfig } from '@/config/site';
import { sendEmail } from '@/lib/email';
import { buildLoanAutoReplyEmail, buildLoanNotificationEmail } from '@/lib/email-templates';
import { prisma } from '@/lib/prisma';
import { guardSubmission } from '@/lib/security';
import { normalizeText } from '@/lib/sanitization';

const loanSchema = z.object({
  importo: z.coerce.number().min(5000).max(1000000),
  durata: z.coerce.number().int().min(12).max(360),
  impiego: z.string().trim().min(2).max(120),
  nome: z.string().trim().min(2).max(80),
  cognome: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  telefono: z.string().trim().max(30).regex(/^(\+?\d{1,3})?[- .]?[\d- .]{8,15}$/, 'Numero di telefono non valido'),
  codiceFiscale: z.string().trim().regex(/^[A-Z0-9]{16}$/i, 'Codice fiscale non valido'),
  reddito: z.coerce.number().min(500).max(1000000),
  finalita: z.string().trim().min(2).max(120),
  anzianita: z.coerce.number().int().min(0).max(50),
  privacy: z.literal(true),
  crif: z.literal(true),
  sourcePage: z.string().trim().max(200).optional().default('/'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Dati non validi' }, { status: 400 });
    }

    const honeypot = normalizeText((body as Record<string, unknown>).website);
    const guard = guardSubmission(request, { kind: 'loan', honeypot });
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

    try {
      await prisma.loanRequest.create({
        data: {
          practiceId,
          importo: data.importo,
          durata: data.durata,
          impiego: data.impiego,
          nome: data.nome,
          cognome: data.cognome,
          email: data.email,
          telefono: data.telefono,
          codiceFiscale: data.codiceFiscale,
          reddito: data.reddito,
          finalita: data.finalita,
          anzianita: data.anzianita,
          sourcePage: data.sourcePage,
          privacyAccepted: data.privacy,
          crifAccepted: data.crif,
        },
      });
    } catch (dbError) {
      console.warn('Database save failed (expected on Vercel with SQLite), continuing to email:', dbError);
    }

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
      console.warn('Internal loan email failed to send');
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
