import { escapeHtml } from "@/lib/email";
import type { TrainingPackage } from "@/types/clinic";
import { getPackagePriceLabel } from "@/lib/clinic-data";

export function buildWelcomeEmailHtml(options: {
  playerName: string;
  pkg: TrainingPackage;
  paymentLabel: string;
}) {
  const { playerName, pkg, paymentLabel } = options;
  const priceLabel = getPackagePriceLabel(pkg);

  const details: string[] = [];
  if (pkg.sessions > 0) {
    details.push(
      `${pkg.sessions} session${pkg.sessions > 1 ? "s" : ""}${
        pkg.validity ? ` · ${pkg.validity}` : ""
      }${pkg.period ? ` · ${pkg.period}` : ""}`
    );
  }
  if (pkg.duration) details.push(pkg.duration);
  if (pkg.ages) details.push(pkg.ages);
  if (pkg.schedule) details.push(pkg.schedule);

  const skillsList = [...(pkg.skills ?? []), ...(pkg.includes ?? [])]
    .map(
      (item) =>
        `<li style="margin:6px 0;color:#444">${escapeHtml(item)}</li>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <div style="background:#0a0a0f;padding:28px 24px;text-align:center">
        <h1 style="margin:0;color:#ff6b35;font-size:22px;letter-spacing:1px">JSkills Basketball</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:14px">Play with excellence play with Purpose</p>
      </div>
      <div style="padding:32px 24px;background:#ffffff">
        <p style="margin:0 0 8px;font-size:16px">Hi ${escapeHtml(playerName)},</p>
        <h2 style="margin:0 0 16px;font-size:20px;color:#0a0a0f">Welcome to JSkills!</h2>
        <p style="margin:0 0 16px;line-height:1.6;color:#444">
          Thank you for enrolling with <strong>JSkills Basketball</strong>.
          We have received your registration and are excited to help you grow on and off the court.
        </p>
        <div style="margin:24px 0;padding:20px;border-radius:12px;border:1px solid #ffe0d4;background:#fff8f5">
          <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#888">Your chosen package</p>
          <p style="margin:0;font-size:20px;font-weight:bold;color:#0a0a0f">${escapeHtml(pkg.name)}</p>
          <p style="margin:8px 0 0;font-size:24px;font-weight:bold;color:#ff6b35">${escapeHtml(priceLabel)}</p>
          ${
            details.length
              ? `<p style="margin:12px 0 0;font-size:14px;color:#666">${details.map((d) => escapeHtml(d)).join("<br>")}</p>`
              : ""
          }
          ${
            pkg.description
              ? `<p style="margin:12px 0 0;font-size:14px;color:#666;line-height:1.5">${escapeHtml(pkg.description)}</p>`
              : ""
          }
          ${
            skillsList
              ? `<ul style="margin:16px 0 0;padding-left:20px;font-size:14px">${skillsList}</ul>`
              : ""
          }
          <p style="margin:16px 0 0;font-size:14px;color:#666"><strong>Payment method selected:</strong> ${escapeHtml(paymentLabel)}</p>
        </div>
        <p style="margin:0 0 16px;line-height:1.6;color:#444">
          <strong>We will contact you soon</strong> to confirm your schedule, first evaluation session,
          and payment details. Please keep your phone available.
        </p>
        <p style="margin:0;line-height:1.6;color:#444">
          Session 1 includes evaluation, assessment, and program planning. If you have urgent questions,
          reach Coach Edmar at <a href="tel:+639272731688" style="color:#ff6b35">0927 273 1688</a>.
        </p>
      </div>
      <p style="margin:0;padding:16px 24px;background:#f5f5f5;font-size:12px;color:#888;text-align:center">
        JSkills Basketball · BGC · Greenhills · Quezon City
      </p>
    </div>
  `;
}
