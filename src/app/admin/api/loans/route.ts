import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Non autorizzato' }, { status: 401 });
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    const VALID_STATUSES = ['ALL', 'PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'CONTACTED'];

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const q = searchParams.get('q');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status && status !== 'ALL') {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ success: false, error: 'Status non valido' }, { status: 400 });
      }
      where.status = status;
    }
    if (q) {
      const qSafe = q.trim().slice(0, 200);
      where.OR = [
        { nome: { contains: qSafe, mode: 'insensitive' } },
        { cognome: { contains: qSafe, mode: 'insensitive' } },
        { email: { contains: qSafe, mode: 'insensitive' } },
        { practiceId: { contains: qSafe, mode: 'insensitive' } },
      ];
    }

    const [applications, total] = await Promise.all([
      prisma.loanApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.loanApplication.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin loans list error:', error);
    return NextResponse.json({ success: false, error: 'Errore interno' }, { status: 500 });
  }
}
