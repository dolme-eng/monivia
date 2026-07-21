import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma');
    if (!prisma) {
      return NextResponse.json({ success: false, error: 'Database non configurato' }, { status: 503 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const q = searchParams.get('q');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (q) {
      where.OR = [
        { nome: { contains: q, mode: 'insensitive' } },
        { cognome: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { practiceId: { contains: q, mode: 'insensitive' } },
        { codiceFiscale: { contains: q, mode: 'insensitive' } },
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
