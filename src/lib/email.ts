import { Resend } from "resend";

export const NOTIFY_EMAIL = process.env.DEVELOPER_EMAIL || "asriidev@gmail.com";
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "JSkills Website <onboarding@resend.dev>";

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendEmail(options: {
  subject: string;
  html: string;
  replyTo?: string;
  to?: string | string[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false as const,
      error: "Email service is not configured. Please add RESEND_API_KEY to environment variables.",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: options.to ?? NOTIFY_EMAIL,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  });

  if (error) {
    console.error("Resend error:", error);
    return { ok: false as const, error: "Failed to send email. Please try again later." };
  }

  return { ok: true as const };
}
