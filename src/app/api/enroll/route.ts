import { NextResponse } from "next/server";
import packagesData from "@/data/packages.json";
import { sendEmail, escapeHtml } from "@/lib/email";
import { saveEnrollment } from "@/lib/enrollment-store";
import { getMongoConnectionHelp } from "@/lib/mongodb";
import { buildWelcomeEmailHtml } from "@/lib/enrollment-emails";
import { getPackagePriceLabel } from "@/lib/clinic-data";
import type { TrainingPackage } from "@/types/clinic";

const packages = packagesData as TrainingPackage[];

const skillLabels: Record<string, string> = {
  beginner: "A. Beginner",
  intermediate: "B. Intermediate",
  advance: "C. Advance",
};

const paymentLabels: Record<string, string> = {
  gcash: "GCash",
  bpi: "BPI Bank Transfer",
  cash: "Cash",
};

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database is not configured. Please add DATABASE_URL." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      name,
      age,
      contact,
      email,
      skillLevel,
      position,
      package: packageId,
      payment,
      notes,
    } = body;

    if (
      !name?.trim() ||
      !age ||
      !contact?.trim() ||
      !email?.trim() ||
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
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const selectedPackage = packages.find((p) => p.id === packageId);
    const packageName = selectedPackage?.name || packageId;
    const packagePrice = selectedPackage?.price ?? 0;
    const packagePriceLabel = selectedPackage
      ? getPackagePriceLabel(selectedPackage)
      : "—";
    const submittedAt = new Date();
    const registrantEmail = email.trim();

    const record = {
      name: name.trim(),
      age: String(age),
      contact: contact.trim(),
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
      notes: notes?.trim() || "",
      submittedAt,
    };

    const enrollmentId = await saveEnrollment(record);

    const adminResult = await sendEmail({
      subject: `[JSkills] New Enrollment — ${record.name}`,
      replyTo: registrantEmail,
      html: `
        <h2>New JSkills Basketball Clinic Enrollment</h2>
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
