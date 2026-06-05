import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { DASHBOARD_SESSION_COOKIE, verifyDashboardSessionToken } from '@/lib/dashboard-auth';

function escapeCsv(value: unknown) {
  const text = value == null ? '' : String(value);
  if (/[",\n;]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

function buildCsv(rows: Array<Array<unknown>>) {
  return rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n');
}

async function ensureAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;
  return verifyDashboardSessionToken(token);
}

export async function GET(request: Request) {
  try {
    const session = await ensureAuth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Non autorizzato' }, { status: 401 });
    }

    const url = new URL(request.url);
    const kind = url.searchParams.get('kind') ?? 'loans';

    if (kind === 'contacts') {
      const status = url.searchParams.get('status') ?? undefined;
      const messages = await prisma.contactMessage.findMany({
        where: status ? { status } : undefined,
        orderBy: { createdAt: 'desc' },
      });

      const csv = buildCsv([
        ['id', 'nome', 'email', 'oggetto', 'status', 'sourcePage', 'createdAt'],
        ...messages.map((message) => [
          message.id,
          message.nome,
          message.email,
          message.oggetto,
          message.status,
          message.sourcePage ?? '',
          message.createdAt.toISOString(),
        ]),
      ]);

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="monivia-contact-messages.csv"',
        },
      });
    }

    if (kind === 'events') {
      const events = await prisma.analyticsEvent.findMany({
        orderBy: { createdAt: 'desc' },
      });

      const csv = buildCsv([
        ['id', 'eventType', 'page', 'label', 'value', 'sessionId', 'createdAt'],
        ...events.map((event) => [
          event.id,
          event.eventType,
          event.page,
          event.label ?? '',
          event.value ?? '',
          event.sessionId ?? '',
          event.createdAt.toISOString(),
        ]),
      ]);

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="monivia-analytics-events.csv"',
        },
      });
    }

    const status = url.searchParams.get('status') ?? undefined;
    const requests = await prisma.loanRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    const csv = buildCsv([
      ['id', 'practiceId', 'nome', 'cognome', 'email', 'telefono', 'importo', 'durata', 'impiego', 'status', 'sourcePage', 'createdAt'],
      ...requests.map((loan) => [
        loan.id,
        loan.practiceId,
        loan.nome,
        loan.cognome,
        loan.email,
        loan.telefono,
        loan.importo,
        loan.durata,
        loan.impiego,
        loan.status,
        loan.sourcePage ?? '',
        loan.createdAt.toISOString(),
      ]),
    ]);

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="monivia-loan-requests.csv"',
      },
    });
  } catch (error) {
    console.error('API /dashboard/export Error:', error);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
