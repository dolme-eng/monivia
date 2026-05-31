import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

const contactSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  oggetto: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    
    // 1. Validate data
    const result = contactSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: result.error.format() }, 
        { status: 400 }
      );
    }
    
    const data = result.data;

    // 2. Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        nome: data.nome,
        email: data.email,
        oggetto: data.oggetto,
        message: data.message,
      }
    });

    // 3. Send email to internal team
    await sendEmail({
      to: 'contatto@monivia.it',
      subject: `Nuovo Messaggio da ${data.nome} - ${data.oggetto}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">MO<span style="color: #06b6d4;">NIVIA</span></h1>
          </div>
          <div style="padding: 32px;">
            <h2 style="margin-top: 0; color: #0f172a; font-size: 20px;">Nuova Richiesta di Contatto</h2>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px 0;"><strong>Nome:</strong> ${data.nome}</p>
              <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #06b6d4; text-decoration: none;">${data.email}</a></p>
              <p style="margin: 0;"><strong>Oggetto:</strong> ${data.oggetto}</p>
            </div>
            <h3 style="color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Messaggio</h3>
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
            </div>
          </div>
        </div>
      `,
    });

    // 4. Send auto-reply to user
    await sendEmail({
      to: data.email,
      subject: `Abbiamo ricevuto il tuo messaggio - Monivia`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0f172a; padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">MO<span style="color: #06b6d4;">NIVIA</span></h1>
          </div>
          <div style="padding: 40px 32px;">
            <p style="font-size: 16px; margin-top: 0;">Gentile <strong>${data.nome}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #475569;">
              Grazie per averci contattato. Ti confermiamo di aver ricevuto con successo il tuo messaggio relativo a "<strong>${data.oggetto}</strong>".
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #475569;">
              Un nostro consulente dedicato analizzerà la tua richiesta e ti risponderà al più presto, solitamente entro 24 ore lavorative.
            </p>
            
            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #0f172a;">Il Team di Monivia</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Trasparenza e velocità al tuo servizio.</p>
              <p style="margin: 12px 0 0 0; font-size: 12px; color: #06b6d4;"><a href="https://monivia.it" style="color: #06b6d4; text-decoration: none;">www.monivia.it</a></p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Messaggio inviato con successo',
      messageId: contactMessage.id
    });

  } catch (error) {
    console.error('API /contact Error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' }, 
      { status: 500 }
    );
  }
}
