import { describe, it, expect } from 'vitest';
import {
  buildContactNotificationEmail,
  buildContactAutoReplyEmail,
  buildLoanNotificationEmail,
  buildLoanAutoReplyEmail,
} from './email-templates';

describe('Email Templates', () => {
  const contactData = { nome: 'Mario Rossi', email: 'mario@example.com', oggetto: 'Test', message: 'Hello' };
  const loanData = {
    practiceId: 'P-12345',
    nome: 'Mario',
    cognome: 'Rossi',
    email: 'mario@example.com',
    telefono: '1234567890',
    codiceFiscale: 'RSSMRA80A01H501Z',
    importo: 50000,
    durata: 48,
    impiego: 'Impiegato',
  };

  describe('buildContactNotificationEmail', () => {
    it('returns html and text', () => {
      const result = buildContactNotificationEmail(contactData);
      expect(result.html).toContain('Monivia');
      expect(result.text).toContain('Mario Rossi');
    });
    it('escapes HTML in user input', () => {
      const result = buildContactNotificationEmail({ ...contactData, nome: '<script>alert(1)</script>' });
      expect(result.html).not.toContain('<script>');
      expect(result.html).toContain('&lt;script&gt;');
    });
  });

  describe('buildContactAutoReplyEmail', () => {
    it('returns html and text', () => {
      const result = buildContactAutoReplyEmail(contactData);
      expect(result.html).toContain('Grazie');
      expect(result.text).toContain('Mario Rossi');
    });
  });

  describe('buildLoanNotificationEmail', () => {
    it('returns html and text', () => {
      const result = buildLoanNotificationEmail(loanData);
      expect(result.html).toContain('P-12345');
      expect(result.text).toContain('50000');
    });
    it('escapes HTML in user input', () => {
      const result = buildLoanNotificationEmail({ ...loanData, nome: '<img onerror=alert(1)>' });
      expect(result.html).not.toContain('<img');
      expect(result.html).toContain('&lt;img');
    });
  });

  describe('buildLoanAutoReplyEmail', () => {
    it('returns html and text', () => {
      const result = buildLoanAutoReplyEmail(loanData);
      expect(result.html).toContain('P-12345');
      expect(result.text).toContain('Mario Rossi');
    });
  });
});
