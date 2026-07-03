import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/dashboard-auth";
import { buildRegistrantsFilter } from "@/lib/build-registrants-filter";
import { isLocalDeleteEnabled } from "@/lib/dashboard-local";
import { getDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const COLLECTION = "users";

const SORT_FIELDS = new Set([
  "name",
  "email",
  "age",
  "contact",
  "skillLevel",
  "position",
  "packageName",
  "payment",
  "createdAt",
]);

export async function GET(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;

    const sortByRaw = (searchParams.get("sortBy") || "createdAt").trim();
    const sortDirRaw = (searchParams.get("sortDir") || "desc").trim().toLowerCase();
    const sortBy = SORT_FIELDS.has(sortByRaw) ? sortByRaw : "createdAt";
    const sortDir = sortDirRaw === "asc" ? 1 : -1;

    const db = await getDatabase();
    const collection = db.collection(COLLECTION);
    const listFilter = buildRegistrantsFilter(searchParams);

    const total = await collection.countDocuments(listFilter);
    const users = await collection
      .find(listFilter)
      .sort({ [sortBy]: sortDir })
      .skip(skip)
      .limit(limit)
      .toArray();

    const formatted = users.map((user) => ({
      _id: user._id.toString(),
      name: user.name ?? "",
      age: user.age ?? "",
      contact: user.contact ?? "",
      email: user.email ?? "",
      skillLevel: user.skillLevel ?? "",
      position: user.position ?? "",
      packageId: user.packageId ?? "",
      packageName: user.packageName ?? "",
      packagePriceLabel: user.packagePriceLabel ?? "",
      payment: user.payment ?? "",
      notes: user.notes ?? "",
      hasPaymentProof: Boolean(user.paymentProof?.data),
      createdAt: user.createdAt
        ? new Date(user.createdAt).toISOString()
        : user.submittedAt
          ? new Date(user.submittedAt).toISOString()
          : null,
    }));

    return NextResponse.json({
      users: formatted,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      deleteEnabled: isLocalDeleteEnabled(),
    });
  } catch (err) {
    console.error("Registrants list error:", err);
    return NextResponse.json({ error: "Failed to load registrants" }, { status: 500 });
  }
}
