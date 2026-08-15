import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateCsrfToken } from './csrf';

process.env.CSRF_SECRET = 'test-secret-for-api-integration';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    contactMessage: { create: vi.fn().mockResolvedValue({}) },
    loanApplication: { create: vi.fn().mockResolvedValue({}) },
  },
}));

vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}));

function makeRequest(path: string, body: unknown, csrfToken?: string) {
  return new Request(`https://monivia.it${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'origin': 'https://monivia.it',
      ...(csrfToken ? { 'x-csrf-token': csrfToken } : {}),
    },
    body: JSON.stringify(body),
  });
}

describe('/api/contact', () => {
  let csrfToken: string;

  beforeEach(async () => {
    csrfToken = generateCsrfToken();
    vi.clearAllMocks();
    const { prisma } = await import('@/lib/prisma');
    (prisma.contactMessage.create as ReturnType<typeof vi.fn>).mockResolvedValue({});
  });

  it('rejects without CSRF token', async () => {
    const req = makeRequest('/api/contact', { nome: 'Mario' });
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it('rejects invalid JSON body', async () => {
    const req = new Request('https://monivia.it/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'origin': 'https://monivia.it', 'x-csrf-token': csrfToken },
      body: 'not json',
    });
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('rejects missing required fields', async () => {
    const req = makeRequest('/api/contact', { nome: 'M' }, csrfToken);
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('succeeds with valid data', async () => {
    const data = { nome: 'Mario Rossi', email: 'mario@test.com', oggetto: 'Info', message: 'Vorrei sapere di più' };
    const req = makeRequest('/api/contact', data, csrfToken);
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(req);
    const json = await res.json();
    expect(json.success).toBe(true);
  });
});

describe('/api/loan', () => {
  let csrfToken: string;

  const validLoan = {
    importo: 50000,
    durata: 48,
    impiego: 'Impiegato',
    nome: 'Mario',
    cognome: 'Rossi',
    email: 'mario@test.com',
    telefono: '+39 02 1234567',
    codiceFiscale: 'RSSMRA80A01H501Z',
    reddito: 30000,
    finalita: 'Ristrutturazione',
    anzianita: 5,
    privacy: true,
    crif: true,
  };

  beforeEach(async () => {
    csrfToken = generateCsrfToken();
    vi.clearAllMocks();
    const { prisma } = await import('@/lib/prisma');
    (prisma.loanApplication.create as ReturnType<typeof vi.fn>).mockResolvedValue({});
  });

  it('rejects without CSRF token', async () => {
    const req = makeRequest('/api/loan', validLoan);
    const { POST } = await import('@/app/api/loan/route');
    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it('rejects invalid codiceFiscale', async () => {
    const req = makeRequest('/api/loan', { ...validLoan, codiceFiscale: 'INVALID' }, csrfToken);
    const { POST } = await import('@/app/api/loan/route');
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('rejects privacy=false', async () => {
    const req = makeRequest('/api/loan', { ...validLoan, privacy: false }, csrfToken);
    const { POST } = await import('@/app/api/loan/route');
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('blocks honeypot', async () => {
    const req = makeRequest('/api/loan', { ...validLoan, website: 'spam' }, csrfToken);
    const { POST } = await import('@/app/api/loan/route');
    const res = await POST(req);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it('succeeds with valid data', async () => {
    const req = makeRequest('/api/loan', validLoan, csrfToken);
    const { POST } = await import('@/app/api/loan/route');
    const res = await POST(req);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.practiceId).toMatch(/^PD-/);
  });
});
