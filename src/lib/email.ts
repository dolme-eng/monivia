import nodemailer from 'nodemailer';
import { siteConfig } from '@/config/site';

interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

// Create the SMTP transporter using Hostinger credentials from environment variables.
// If credentials are not set, we fall back to "mock" mode (console log).
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
    secure: true, // true for port 465
    auth: { user, pass },
  });
};

export const sendEmail = async (payload: EmailPayload): Promise<{ success: boolean; mocked?: boolean }> => {
  const transporter = createTransporter();

  // Mock mode: no SMTP credentials configured yet
  if (!transporter) {
    console.log('================= MOCK EMAIL SENT =================');
    console.log(`To: ${Array.isArray(payload.to) ? payload.to.join(', ') : payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    if (payload.replyTo) {
      console.log(`Reply-To: ${payload.replyTo}`);
    }
    console.log(`Body (HTML):\n${payload.html}`);
    console.log('===================================================');
    return { success: true, mocked: true };
  }

  try {
    await transporter.sendMail({
      from: `"${siteConfig.name}" <${process.env.SMTP_USER}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send email via SMTP:', error);
    return { success: false };
  }
};
