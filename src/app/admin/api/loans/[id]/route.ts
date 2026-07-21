import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  status: z.enum(['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED', 'CONTACTED']).optional(),
  notes: z.string().max(5000).optional(),
  reviewedBy: z.string().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { prisma } = await import('@/lib/prisma');
    if (!prisma) {
      return NextResponse.json({ success: false, error: 'Database non configurato' }, { status: 503 });
    }

    const { id } = await params;
    const body = await req.json();
    const data = updateSchema.parse(body);

    const existing = await prisma.loanApplication.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Pratica non trovata' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = { ...data };
    if (data.status && data.status !== 'PENDING') {
      updateData.reviewedAt = new Date();
    }

    const application = await prisma.loanApplication.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Admin loan update error:', error);
    return NextResponse.json({ success: false, error: 'Errore interno' }, { status: 500 });
  }
}
