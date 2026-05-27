import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation
    if (!data.email || !data.message) {
      return NextResponse.json(
        { error: 'Email e messaggio sono obbligatori' }, 
        { status: 400 }
      );
    }

    console.log('Nuovo messaggio di contatto ricevuto:', data);

    // TODO: Implementare l'invio email
    
    return NextResponse.json({ 
      success: true, 
      message: 'Messaggio inviato con successo' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Errore interno del server' }, 
      { status: 500 }
    );
  }
}
