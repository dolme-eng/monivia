export type AnalyticsEventType =
  | 'page_view'
  | 'contact_submit'
  | 'loan_submit'
  | 'contact_form_view'
  | 'loan_form_view'
  | 'simulator_view'
  | 'simulator_continue'
  | 'loan_form_prefilled'
  | 'cta_click'
  | 'offer_tab_change'
  | 'whatsapp_click';

export type AnalyticsMetadata = Record<string, unknown>;

export type AnalyticsEventInput = {
  eventType: AnalyticsEventType;
  page: string;
  label?: string;
  value?: number;
  sessionId?: string;
  metadata?: AnalyticsMetadata;
};

export function serializeAnalyticsMetadata(metadata?: AnalyticsMetadata) {
  if (!metadata || Object.keys(metadata).length === 0) {
    return null;
  }

  return JSON.stringify(metadata);
}
