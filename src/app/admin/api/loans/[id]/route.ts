import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { verifyCsrfToken } from '@/lib/csrf';

const updateSchema = z.object({
  status: z.enum(['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED', 'CONTACTED']).optional(),
  notes: z.string().max(5000).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Non autorizzato' }, { status: 401 });
  }

  const csrfToken = req.headers.get('x-csrf-token');
  if (!verifyCsrfToken(csrfToken)) {
    return NextResponse.json({ success: false, error: 'Token CSRF non valido' }, { status: 403 });
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    const { id } = await params;
    const body = await req.json();
    const data = updateSchema.parse(body);

    const existing = await prisma.loanApplication.findUnique({ where: { id }, select: { id: true, status: true } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Pratica non trovata' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = { ...data };
    if (data.status && data.status !== 'PENDING') {
      updateData.reviewedAt = new Date();
      updateData.reviewedBy = admin.email || admin.userId || 'Admin';
    }

    const adminEmail = admin.email || admin.userId || 'Admin';

    const [application] = await prisma.$transaction([
      prisma.loanApplication.update({ where: { id }, data: updateData }),
      prisma.auditLog.create({
        data: {
          entity: 'LoanApplication',
          entityId: id,
          action: data.status ? `STATUS:${existing.status}->${data.status}` : 'NOTES_UPDATE',
          details: data.notes ? data.notes.slice(0, 500) : undefined,
          adminEmail,
        },
      }),
    ]);

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Admin loan update error:', error);
    return NextResponse.json({ success: false, error: 'Errore interno' }, { status: 500 });
  }
}
