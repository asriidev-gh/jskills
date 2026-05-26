import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireAdminAuth } from "@/lib/dashboard-auth";
import { isLocalDeleteEnabled } from "@/lib/dashboard-local";
import { getDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const COLLECTION = "users";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!isLocalDeleteEnabled()) {
    return NextResponse.json(
      { error: "Delete is only available in local development." },
      { status: 403 }
    );
  }

  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid registrant ID" }, { status: 400 });
    }

    const db = await getDatabase();
    const result = await db
      .collection(COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Registrant not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete registrant error:", err);
    return NextResponse.json({ error: "Failed to delete registrant" }, { status: 500 });
  }
}
