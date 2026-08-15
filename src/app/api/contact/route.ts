import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';
import { sendEmail } from '@/lib/email';
import { buildContactAutoReplyEmail, buildContactNotificationEmail } from '@/lib/email-templates';
import { guardSubmission } from '@/lib/security';
import { normalizeText } from '@/lib/sanitization';
import { contactSchema } from '@/lib/validations';
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
    const guard = await guardSubmission(request, { kind: 'contact', honeypot });
    if (!guard.allowed) {
      return guard.silent
        ? NextResponse.json({ success: true, message: 'Messaggio inviato con successo' })
        : guard.response;
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dati non validi' },
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

    // Save to DB (best effort — don't block on failure)
    try {
      const { prisma } = await import('@/lib/prisma');
      await prisma.contactMessage.create({ data });
    } catch (dbError) {
      console.error('Contact DB write failed (non-blocking):', dbError);
    }

    const [teamEmailResult, autoReplyEmailResult] = await Promise.all([
      sendEmail({
        to: siteConfig.contact.email,
        replyTo: data.email,
        subject: `Nuovo messaggio da ${data.nome}`,
        ...buildContactNotificationEmail(data),
      }),
      sendEmail({
        to: data.email,
        subject: 'Messaggio ricevuto | Monivia',
        ...buildContactAutoReplyEmail(data),
      }),
    ]);

    if (!teamEmailResult.success) {
      console.error('Internal contact notification email failed to send');
      return NextResponse.json(
        { error: 'Impossibile inviare il messaggio in questo momento. Riprova più tardi.' },
        { status: 503 }
      );
    }

    if (!autoReplyEmailResult.success) {
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
