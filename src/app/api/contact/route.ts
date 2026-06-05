import { NextResponse } from 'next/server';
import { z } from 'zod';
import { siteConfig } from '@/config/site';
import { sendEmail } from '@/lib/email';
import { buildContactAutoReplyEmail, buildContactNotificationEmail } from '@/lib/email-templates';
import { prisma } from '@/lib/prisma';
import { guardSubmission } from '@/lib/security';
import { normalizeText } from '@/lib/sanitization';

const contactSchema = z.object({
  nome: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  oggetto: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(4000),
  sourcePage: z.string().trim().max(200).optional().default('/contatti'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Dati non validi' }, { status: 400 });
    }

    const honeypot = normalizeText((body as Record<string, unknown>).website);
    const guard = guardSubmission(request, { kind: 'contact', honeypot });
    if (!guard.allowed) {
      return guard.silent
        ? NextResponse.json({ success: true, message: 'Messaggio inviato con successo' })
        : guard.response;
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = {
      nome: normalizeText(result.data.nome),
      email: normalizeText(result.data.email).toLowerCase(),
      oggetto: normalizeText(result.data.oggetto),
      message: normalizeText(result.data.message),
      sourcePage: normalizeText(result.data.sourcePage) || '/contatti',
    };

    try {
      await prisma.contactMessage.create({
        data: {
          nome: data.nome,
          email: data.email,
          oggetto: data.oggetto,
          message: data.message,
          sourcePage: data.sourcePage,
        },
      });
    } catch (dbError) {
      console.warn('Database save failed (expected on Vercel with SQLite), continuing to email:', dbError);
    }

    const [teamEmail, autoReplyEmail] = await Promise.all([
      sendEmail({
        to: siteConfig.contact.email,
        replyTo: data.email,
        subject: `Nuovo messaggio da ${data.nome} - ${data.oggetto}`,
        html: buildContactNotificationEmail(data),
      }),
      sendEmail({
        to: data.email,
        subject: 'Abbiamo ricevuto il tuo messaggio | Monivia',
        html: buildContactAutoReplyEmail(data),
      }),
    ]);

    if (!teamEmail.success) {
      console.warn('Internal contact email failed to send');
    }

    if (!autoReplyEmail.success) {
      console.warn('Contact auto-reply email failed to send');
    }

    return NextResponse.json({
      success: true,
      message: 'Messaggio inviato con successo',
    });
  } catch (error) {
    console.error('API /contact Error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
