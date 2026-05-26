import { NextResponse } from "next/server";
import { sendEmail, escapeHtml } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, contact, message } = body;

    if (!name?.trim() || !email?.trim() || !contact?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
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

    const result = await sendEmail({
      replyTo: email,
      subject: `[JSkills Website] Contact Developer — ${name}`,
      html: `
        <h2>New Contact Developer message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error.includes("not configured") ? 503 : 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact developer error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
