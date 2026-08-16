import { describe, it, expect } from 'vitest';
import { contactSchema, careerSchema, loanSchema, loanFormSchema } from './validations';

describe('contactSchema', () => {
  const valid = {
    nome: 'Mario Rossi',
    email: 'mario@example.com',
    oggetto: 'Richiesta informazioni',
    message: 'Vorrei sapere di più sui vostri servizi.',
  };

  it('accepts valid contact', () => {
    expect(contactSchema.parse(valid)).toEqual(expect.objectContaining(valid));
  });

  it('rejects short name', () => {
    expect(() => contactSchema.parse({ ...valid, nome: 'M' })).toThrow();
  });

  it('rejects invalid email', () => {
    expect(() => contactSchema.parse({ ...valid, email: 'not-an-email' })).toThrow();
  });

  it('rejects short message', () => {
    expect(() => contactSchema.parse({ ...valid, message: 'Ciao' })).toThrow();
  });

  it('defaults sourcePage to /contatti', () => {
    const result = contactSchema.parse(valid);
    expect(result.sourcePage).toBe('/contatti');
  });

  it('trims whitespace', () => {
    const result = contactSchema.parse({ ...valid, nome: '  Mario  ' });
    expect(result.nome).toBe('Mario');
  });
});

describe('careerSchema', () => {
  const valid = {
    nome: 'Luca Bianchi',
    email: 'luca@example.com',
    message: 'Sono interessato a una posizione nel vostro team.',
  };

  it('accepts valid career application', () => {
    expect(careerSchema.parse(valid)).toEqual(expect.objectContaining(valid));
  });

  it('rejects short message', () => {
    expect(() => careerSchema.parse({ ...valid, message: 'Ciao' })).toThrow();
  });

  it('ignores honeypot website field', () => {
    const result = careerSchema.parse({ ...valid, website: '' });
    expect(result.website).toBe('');
  });
});

describe('loanSchema (server-side)', () => {
  const valid = {
    importo: 25000,
    durata: 60,
    impiego: 'Dipendente a tempo indeterminato',
    nome: 'Anna',
    cognome: 'Verdi',
    email: 'anna@example.com',
    telefono: '+39 02 1234567',
    codiceFiscale: 'RSSMRA80A01H501U',
    reddito: 30000,
    finalita: 'Ristrutturazione',
    anzianita: 5,
    privacy: true as const,
    crif: true as const,
  };

  it('accepts valid loan', () => {
    expect(loanSchema.parse(valid)).toEqual(expect.objectContaining(valid));
  });

  it('rejects privacy false (literal)', () => {
    expect(() => loanSchema.parse({ ...valid, privacy: false })).toThrow();
  });

  it('rejects crif false (literal)', () => {
    expect(() => loanSchema.parse({ ...valid, crif: false })).toThrow();
  });

  it('rejects importo below 5000', () => {
    expect(() => loanSchema.parse({ ...valid, importo: 4000 })).toThrow();
  });

  it('accepts importo at max 1000000', () => {
    expect(loanSchema.parse({ ...valid, importo: 1000000 })).toBeDefined();
  });

  it('rejects importo above 1000000', () => {
    expect(() => loanSchema.parse({ ...valid, importo: 1000001 })).toThrow();
  });

  it('rejects durata below 12', () => {
    expect(() => loanSchema.parse({ ...valid, durata: 11 })).toThrow();
  });

  it('rejects durata above 360', () => {
    expect(() => loanSchema.parse({ ...valid, durata: 361 })).toThrow();
  });

  it('rejects invalid codice fiscale', () => {
    expect(() => loanSchema.parse({ ...valid, codiceFiscale: 'ABC' })).toThrow();
  });

  it('accepts valid Italian codice fiscale', () => {
    expect(loanSchema.parse({ ...valid, codiceFiscale: 'RSSMRA80A01H501U' })).toBeDefined();
  });

  it('rejects invalid phone', () => {
    expect(() => loanSchema.parse({ ...valid, telefono: '123' })).toThrow();
  });

  it('accepts international phone format', () => {
    expect(loanSchema.parse({ ...valid, telefono: '+44 20 7946 0958' })).toBeDefined();
  });

  it('rejects reddito below 500', () => {
    expect(() => loanSchema.parse({ ...valid, reddito: 400 })).toThrow();
  });

  it('defaults sourcePage to /', () => {
    const result = loanSchema.parse(valid);
    expect(result.sourcePage).toBe('/');
  });
});

describe('loanFormSchema (client-side)', () => {
  const valid = {
    importo: 25000,
    durata: 60,
    impiego: 'Dipendente a tempo indeterminato',
    nome: 'Anna',
    cognome: 'Verdi',
    email: 'anna@example.com',
    telefono: '+39 02 1234567',
    codiceFiscale: 'RSSMRA80A01H501U',
    reddito: 30000,
    finalita: 'Ristrutturazione',
    anzianita: 5,
    privacy: true,
    crif: true,
  };

  it('accepts valid form data', () => {
    expect(loanFormSchema.parse(valid)).toEqual(expect.objectContaining(valid));
  });

  it('rejects privacy false (boolean refine)', () => {
    expect(() => loanFormSchema.parse({ ...valid, privacy: false })).toThrow();
  });
});
