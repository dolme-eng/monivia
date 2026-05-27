import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation
    if (!data.email || !data.codiceFiscale) {
      return NextResponse.json(
        { error: 'Dati obbligatori mancanti' }, 
        { status: 400 }
      );
    }

    console.log('Nuova richiesta di prestito ricevuta:', data);

    // TODO: Implementare l'invio email o il salvataggio in DB
    // Esempio con Resend o Nodemailer qui

    const practiceId = `PD-${Math.floor(Math.random() * 1000000)}`;

    return NextResponse.json({ 
      success: true, 
      message: 'Richiesta inviata con successo', 
      practiceId 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Errore interno del server' }, 
      { status: 500 }
    );
  }
}
