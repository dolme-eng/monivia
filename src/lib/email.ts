import nodemailer from 'nodemailer';
import { siteConfig } from '@/config/site';

interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: true },
  });
};

function generateMessageId(domain: string): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 10);
  return `<${ts}.${rand}@${domain}>`;
}

export const sendEmail = async (payload: EmailPayload): Promise<{ success: boolean; mocked?: boolean }> => {
  const transporter = createTransporter();

  if (!transporter) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[EMAIL MOCK] SMTP non configurato — email non inviata');
    } else {
      console.error('[EMAIL] SMTP non configurato — email non inviata in produzione');
    }
    return { success: false, mocked: true };
  }

  const fromEmail = process.env.SMTP_USER || siteConfig.contact.email;
  const domain = fromEmail.split('@')[1] || 'monivia.it';

  try {
    await transporter.sendMail({
      from: `"${siteConfig.name}" <${fromEmail}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      replyTo: payload.replyTo,
      messageId: generateMessageId(domain),
      headers: {
        'List-Unsubscribe': `<mailto:${siteConfig.contact.email}?subject=Disiscrizione>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        'X-Mailer': 'Monivia-Mail/1.0',
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send email via SMTP:', error);
    return { success: false };
  }
};
