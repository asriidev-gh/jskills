import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";

export const NOTIFY_EMAIL = process.env.DEVELOPER_EMAIL || "asriidev@gmail.com";
export const ENROLLMENT_NOTIFY_EMAIL =
  process.env.ENROLLMENT_NOTIFY_EMAIL || "edmarpateno7@gmail.com";
export const ENROLLMENT_BCC_EMAIL =
  process.env.ENROLLMENT_BCC_EMAIL || "asriidev@gmail.com";

function getSmtpUser(): string | undefined {
  return process.env.SMTP_USER?.trim() || undefined;
}

export const FROM_EMAIL =
  process.env.SMTP_FROM?.trim() ||
  (getSmtpUser() ? `JSkills Website <${getSmtpUser()}>` : "JSkills Website");

function getSmtpConfig() {
  const user = getSmtpUser();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  };
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatRecipients(value: string | string[]): string {
  return Array.isArray(value) ? value.join(", ") : value;
}

export async function sendEmail(options: {
  subject: string;
  html: string;
  replyTo?: string;
  to?: string | string[];
  bcc?: string | string[];
  attachments?: Attachment[];
}) {
  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    return {
      ok: false as const,
      error:
        "Email service is not configured. Please add SMTP_USER and SMTP_PASS to environment variables.",
    };
  }

  const transporter = nodemailer.createTransport(smtpConfig);

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: formatRecipients(options.to ?? NOTIFY_EMAIL),
      bcc: options.bcc ? formatRecipients(options.bcc) : undefined,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    });

    return { ok: true as const };
  } catch (err) {
    console.error("SMTP error:", err);
    return { ok: false as const, error: "Failed to send email. Please try again later." };
  }
}
