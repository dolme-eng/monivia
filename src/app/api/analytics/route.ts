import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { serializeAnalyticsMetadata } from '@/lib/analytics';

const analyticsSchema = z.object({
  eventType: z.enum([
    'page_view',
    'contact_submit',
    'loan_submit',
    'contact_form_view',
    'loan_form_view',
    'simulator_view',
    'simulator_continue',
    'loan_form_prefilled',
    'cta_click',
    'offer_tab_change',
    'whatsapp_click',
  ]),
  page: z.string().trim().min(1).max(200),
  label: z.string().trim().max(160).optional(),
  value: z.number().finite().optional(),
  sessionId: z.string().trim().max(120).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Dati non validi' }, { status: 400 });
    }

    const result = analyticsSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Événement invalide', details: result.error.format() },
        { status: 400 }
      );
    }

    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: result.data.eventType,
          page: result.data.page,
          label: result.data.label,
          value: result.data.value,
          sessionId: result.data.sessionId,
          metadata: serializeAnalyticsMetadata(result.data.metadata),
        },
      });
    } catch (dbError) {
      console.warn('Analytics save failed (non-blocking):', dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /analytics Error:', error);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
