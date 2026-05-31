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
      to: 'contact@monivia.it',
      subject: `Nuovo Messaggio da ${data.nome} - ${data.oggetto}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nuovo Contatto dal Sito Web</h2>
          <p><strong>Nome:</strong> ${data.nome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Oggetto:</strong> ${data.oggetto}</p>
          <hr/>
          <p><strong>Messaggio:</strong></p>
          <p>${data.message.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
    });

    // 4. Send auto-reply to user
    await sendEmail({
      to: data.email,
      subject: `Abbiamo ricevuto il tuo messaggio - Monivia`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <p>Gentile ${data.nome},</p>
          <p>Abbiamo ricevuto il tuo messaggio relativo a "<strong>${data.oggetto}</strong>".</p>
          <p>Un membro del nostro team ti risponderà al più presto, solitamente entro 24 ore lavorative.</p>
          <br/>
          <p>Cordiali saluti,<br/>Il Team di Monivia</p>
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
