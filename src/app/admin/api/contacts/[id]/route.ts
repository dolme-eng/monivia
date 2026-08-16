import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { verifyCsrfToken } from '@/lib/csrf';
import { prisma } from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const csrfToken = req.headers.get('x-csrf-token');
  if (!verifyCsrfToken(csrfToken)) {
    return NextResponse.json({ error: 'CSRF non valido' }, { status: 403 });
  }

  const { id } = await params;

  const existing = await prisma.contactMessage.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Messaggio non trovato' }, { status: 404 });
  }

  await prisma.contactMessage.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
