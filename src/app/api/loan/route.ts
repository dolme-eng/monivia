import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

// Validation schema matching the frontend LoanForm
const loanSchema = z.object({
  importo: z.coerce.number().min(5000).max(1000000),
  durata: z.coerce.number().min(12).max(360),
  impiego: z.string().trim().min(1),
  nome: z.string().trim().min(2),
  cognome: z.string().trim().min(2),
  email: z.string().trim().email(),
  telefono: z.string().trim().regex(/^(\+?\d{1,3})?[- .]?[\d- .]{8,15}$/, "Numero di telefono non valido"),
  codiceFiscale: z.string().trim().toUpperCase().length(16),
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
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0f172a; padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">MO<span style="color: #06b6d4;">NIVIA</span></h1>
            <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Richiesta Finanziamento</p>
          </div>
          <div style="padding: 40px 32px;">
            <p style="font-size: 16px; margin-top: 0;">Gentile <strong>${data.nome} ${data.cognome}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #475569;">
              Ti confermiamo di aver ricevuto correttamente la tua richiesta di prestito. Di seguito il riepilogo della tua pratica:
            </p>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 32px 0;">
              <div style="text-align: center; margin-bottom: 24px;">
                <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Codice Pratica</p>
                <p style="margin: 4px 0 0 0; color: #06b6d4; font-size: 24px; font-weight: 800; letter-spacing: 1px;">${practiceId}</p>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Importo richiesto</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: bold; text-align: right; border-bottom: 1px solid #e2e8f0;">€ ${data.importo.toLocaleString('it-IT')}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Durata</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: bold; text-align: right; border-bottom: 1px solid #e2e8f0;">${data.durata} mesi</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Finalità</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: bold; text-align: right;">${data.impiego}</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #475569;">
              Il nostro algoritmo e i nostri consulenti stanno già analizzando il tuo profilo. Riceverai un esito definitivo entro e non oltre <strong>48 ore lavorative</strong>.
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

    // 4. (Optional) Send notification to internal team
    await sendEmail({
      to: 'contatto@monivia.it',
      subject: `🔔 Nuova Pratica Ricevuta: ${practiceId} (€${data.importo.toLocaleString('it-IT')})`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="background-color: #06b6d4; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">Nuova Richiesta di Finanziamento</h2>
          </div>
          <div style="padding: 24px;">
            <h3 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Dettagli Richiedente</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 6px 0; color: #64748b; width: 120px;">Nome:</td><td style="padding: 6px 0; font-weight: bold;">${data.nome} ${data.cognome}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Email:</td><td style="padding: 6px 0; font-weight: bold;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Telefono:</td><td style="padding: 6px 0; font-weight: bold;">${data.telefono}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Codice Fiscale:</td><td style="padding: 6px 0; font-weight: bold;">${data.codiceFiscale}</td></tr>
            </table>

            <h3 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Dettagli Prestito</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #64748b; width: 120px;">Pratica:</td><td style="padding: 6px 0; font-weight: bold; color: #06b6d4;">${practiceId}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Importo:</td><td style="padding: 6px 0; font-weight: bold; font-size: 18px;">€ ${data.importo.toLocaleString('it-IT')}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Durata:</td><td style="padding: 6px 0; font-weight: bold;">${data.durata} mesi</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Impiego:</td><td style="padding: 6px 0; font-weight: bold;">${data.impiego}</td></tr>
            </table>
          </div>
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
