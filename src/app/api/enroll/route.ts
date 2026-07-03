import { NextResponse } from "next/server";
import packagesData from "@/data/packages.json";
import { sendEmail, escapeHtml, ENROLLMENT_BCC_EMAIL, ENROLLMENT_NOTIFY_EMAIL } from "@/lib/email";
import { saveEnrollment } from "@/lib/enrollment-store";
import { getMongoConnectionHelp } from "@/lib/mongodb";
import { buildWelcomeEmailHtml } from "@/lib/enrollment-emails";
import { getPackagePriceLabel } from "@/lib/clinic-data";
import {
  PAYMENTS_REQUIRING_PROOF,
  paymentProofFromFile,
  validatePaymentProofFile,
} from "@/lib/payment-proof";
import type { TrainingPackage } from "@/types/clinic";

const packages = packagesData as TrainingPackage[];

const skillLabels: Record<string, string> = {
  beginner: "A. Beginner",
  intermediate: "B. Intermediate",
  advance: "C. Advance",
};

const paymentLabels: Record<string, string> = {
  paymaya: "PayMaya",
  gcash: "GCash",
  bpi: "BPI Bank Transfer",
  cash: "Cash",
};

function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database is not configured. Please add DATABASE_URL." },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const name = getString(formData.get("name"));
    const age = getString(formData.get("age"));
    const contact = getString(formData.get("contact"));
    const email = getString(formData.get("email"));
    const skillLevel = getString(formData.get("skillLevel"));
    const position = getString(formData.get("position"));
    const packageId = getString(formData.get("package"));
    const payment = getString(formData.get("payment"));
    const notes = getString(formData.get("notes"));
    const paymentProofFile = formData.get("paymentProof");

    if (
      !name ||
      !age ||
      !contact ||
      !email ||
      !skillLevel ||
      !position ||
      !packageId ||
      !payment
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const ageNum = Number.parseInt(age, 10);
    if (!/^\d{1,2}$/.test(age) || Number.isNaN(ageNum) || ageNum < 5 || ageNum > 50) {
      return NextResponse.json(
        { error: "Please enter a valid age between 5 and 50." },
        { status: 400 }
      );
    }

    const requiresPaymentProof = PAYMENTS_REQUIRING_PROOF.has(payment);
    let paymentProof;

    if (requiresPaymentProof) {
      const proofError = validatePaymentProofFile(
        paymentProofFile instanceof File ? paymentProofFile : null
      );
      if (proofError) {
        return NextResponse.json({ error: proofError }, { status: 400 });
      }

      paymentProof = await paymentProofFromFile(paymentProofFile as File);
    }

    const selectedPackage = packages.find((p) => p.id === packageId);
    const packageName = selectedPackage?.name || packageId;
    const packagePrice = selectedPackage?.price ?? 0;
    const packagePriceLabel = selectedPackage
      ? getPackagePriceLabel(selectedPackage)
      : "—";
    const submittedAt = new Date();
    const registrantEmail = email;

    const record = {
      name,
      age,
      contact,
      email: registrantEmail,
      skillLevel: skillLabels[skillLevel] || skillLevel,
      skillLevelRaw: skillLevel,
      position,
      packageId,
      packageName,
      packagePrice,
      packagePriceLabel,
      payment: paymentLabels[payment] || payment,
      paymentRaw: payment,
      notes,
      submittedAt,
      ...(paymentProof ? { paymentProof } : {}),
    };

    const enrollmentId = await saveEnrollment(record);

    const adminResult = await sendEmail({
      to: ENROLLMENT_NOTIFY_EMAIL,
      bcc: ENROLLMENT_BCC_EMAIL,
      subject: `[JSkills] New Enrollment — ${record.name}`,
      replyTo: registrantEmail,
      attachments: paymentProof
        ? [
            {
              filename: paymentProof.filename,
              content: paymentProof.data,
              contentType: paymentProof.contentType,
              cid: "payment-proof",
            },
          ]
        : undefined,
      html: `
        <h2>New JSkills Basketball Enrollment</h2>
        <p><strong>Submitted:</strong> ${escapeHtml(
          submittedAt.toLocaleString("en-PH", { timeZone: "Asia/Manila" })
        )}</p>
        <hr />
        <p><strong>Player Name:</strong> ${escapeHtml(record.name)}</p>
        <p><strong>Age:</strong> ${escapeHtml(record.age)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(record.contact)}</p>
        <p><strong>Email:</strong> ${escapeHtml(record.email)}</p>
        <p><strong>Skill Level:</strong> ${escapeHtml(record.skillLevel)}</p>
        <p><strong>Position:</strong> ${escapeHtml(record.position)}</p>
        <p><strong>Package:</strong> ${escapeHtml(record.packageName)}</p>
        <p><strong>Price:</strong> ${escapeHtml(record.packagePriceLabel)}</p>
        <p><strong>Payment Method:</strong> ${escapeHtml(record.payment)}</p>
        ${
          paymentProof
            ? `<p><strong>Payment Proof:</strong> ${escapeHtml(paymentProof.filename)}</p>
        <p><img src="cid:payment-proof" alt="Payment proof screenshot" style="display:block;max-width:420px;width:100%;height:auto;border:1px solid #ddd;border-radius:8px;" /></p>`
            : ""
        }
        <hr />
        <p><strong>Notes:</strong></p>
        <p>${escapeHtml(record.notes || "—").replace(/\n/g, "<br>")}</p>
        <hr />
        <p style="color:#888;font-size:12px;">MongoDB ID: ${escapeHtml(enrollmentId)}</p>
      `,
    });

    if (!adminResult.ok) {
      return NextResponse.json(
        { error: adminResult.error },
        {
          status: adminResult.error.includes("not configured") ? 503 : 500,
        }
      );
    }

    if (process.env.SEND_REGISTRANT_EMAIL === "true" && selectedPackage) {
      const welcomeResult = await sendEmail({
        to: registrantEmail,
        subject: `Welcome to JSkills — ${selectedPackage.name}`,
        html: buildWelcomeEmailHtml({
          playerName: record.name,
          pkg: selectedPackage,
          paymentLabel: record.payment,
        }),
      });

      if (!welcomeResult.ok) {
        console.error("Welcome email failed:", welcomeResult.error);
      }
    }

    return NextResponse.json({ success: true, id: enrollmentId });
  } catch (err) {
    console.error("Enrollment error:", err);
    const mongoHelp = getMongoConnectionHelp(err);
    return NextResponse.json(
      {
        error: mongoHelp ?? "Failed to save enrollment. Please try again.",
      },
      { status: mongoHelp ? 503 : 500 }
    );
  }
}
