import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

// Validation schema matching the frontend LoanForm
const loanSchema = z.object({
  importo: z.number().min(5000).max(1000000),
  durata: z.number().min(12).max(360),
  impiego: z.string().min(1),
  nome: z.string().min(2),
  cognome: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(5),
  codiceFiscale: z.string().length(16),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    
    // 1. Validate data
    const result = loanSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: result.error.format() }, 
        { status: 400 }
      );
    }
    
    const data = result.data;
    
    // Generate a practice ID
    const practiceId = `PD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

    // 2. Save to database
    const loanRequest = await prisma.loanRequest.create({
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
      }
    });

    // 3. Send confirmation email to the user
    await sendEmail({
      to: data.email,
      subject: `Conferma Ricezione Pratica ${practiceId} - Monivia`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0f172a;">Richiesta Ricevuta</h2>
          <p>Gentile ${data.nome} ${data.cognome},</p>
          <p>Ti confermiamo di aver ricevuto la tua richiesta di prestito di <strong>€${data.importo.toLocaleString('it-IT')}</strong> da rimborsare in <strong>${data.durata} mesi</strong>.</p>
          <p>Il codice della tua pratica è: <strong>${practiceId}</strong></p>
          <p>Il nostro team sta già analizzando il tuo profilo. Riceverai un esito entro 48 ore.</p>
          <br/>
          <p>Cordiali saluti,<br/>Il Team di Monivia</p>
        </div>
      `,
    });

    // 4. (Optional) Send notification to internal team
    await sendEmail({
      to: 'supporto@monivia.it',
      subject: `Nuova Richiesta Prestito: ${practiceId}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nuova Richiesta</h2>
          <ul>
            <li><strong>Nome:</strong> ${data.nome} ${data.cognome}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Telefono:</strong> ${data.telefono}</li>
            <li><strong>Importo:</strong> €${data.importo}</li>
            <li><strong>Durata:</strong> ${data.durata} mesi</li>
            <li><strong>Impiego:</strong> ${data.impiego}</li>
          </ul>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Richiesta inviata con successo', 
      practiceId: loanRequest.practiceId
    });

  } catch (error) {
    console.error('API /loan Error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' }, 
      { status: 500 }
    );
  }
}
