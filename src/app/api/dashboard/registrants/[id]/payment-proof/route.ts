import { NextResponse } from "next/server";
import { Binary, ObjectId } from "mongodb";
import { requireAdminAuth } from "@/lib/dashboard-auth";
import { getDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const COLLECTION = "users";

function toBuffer(data: unknown): Buffer {
  if (Buffer.isBuffer(data)) return data;
  if (data instanceof Binary) return Buffer.from(data.buffer);
  if (data instanceof Uint8Array) return Buffer.from(data);
  throw new Error("Invalid payment proof data");
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid registrant ID" }, { status: 400 });
    }

    const db = await getDatabase();
    const user = await db.collection(COLLECTION).findOne(
      { _id: new ObjectId(id) },
      { projection: { paymentProof: 1 } }
    );

    if (!user?.paymentProof?.data) {
      return NextResponse.json({ error: "Payment proof not found" }, { status: 404 });
    }

    const data = toBuffer(user.paymentProof.data);

    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": user.paymentProof.contentType || "image/jpeg",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Payment proof error:", err);
    return NextResponse.json({ error: "Failed to load payment proof" }, { status: 500 });
  }
}
