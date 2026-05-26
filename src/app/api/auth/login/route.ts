import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials are not configured on the server." },
        { status: 500 }
      );
    }

    const { email, password } = await request.json();
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    if (trimmedEmail === adminEmail && trimmedPassword === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Failed to process login" }, { status: 500 });
  }
}
