import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/dashboard-auth";
import {
  fillLastNDailyCounts,
  getUtcDayBounds,
  getUtcWeekStart,
  parseDateRangeFilter,
} from "@/lib/dashboard-periods";
import { getDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const COLLECTION = "users";

type CountRow = { _id: string; count: number };

function toBarRows(rows: CountRow[]) {
  return rows
    .map((r) => ({ name: r._id || "Unknown", count: r.count }))
    .sort((a, b) => b.count - a.count);
}

export async function GET(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const searchParams = request.nextUrl.searchParams;
    const db = await getDatabase();
    const collection = db.collection(COLLECTION);

    const rangeFilter = parseDateRangeFilter(searchParams);
    const baseFilter = rangeFilter ?? {};

    const today = getUtcDayBounds();
    const weekStart = getUtcWeekStart();

    const [total, todayCount, weekCount] = await Promise.all([
      collection.countDocuments(baseFilter),
      collection.countDocuments({
        ...baseFilter,
        createdAt: { $gte: today.start, $lte: today.end },
      }),
      collection.countDocuments({
        ...baseFilter,
        createdAt: { $gte: weekStart, $lte: today.end },
      }),
    ]);

    const [byPackage, bySkill, byPosition, byPayment, dailyRows, ageRows] =
      await Promise.all([
        collection
          .aggregate<{ _id: string; count: number }>([
            { $match: baseFilter },
            { $group: { _id: "$packageName", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ])
          .toArray(),
        collection
          .aggregate<{ _id: string; count: number }>([
            { $match: baseFilter },
            { $group: { _id: "$skillLevel", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ])
          .toArray(),
        collection
          .aggregate<{ _id: string; count: number }>([
            { $match: baseFilter },
            { $group: { _id: "$position", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ])
          .toArray(),
        collection
          .aggregate<{ _id: string; count: number }>([
            { $match: baseFilter },
            { $group: { _id: "$payment", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ])
          .toArray(),
        collection
          .aggregate<{ _id: string; count: number }>([
            { $match: baseFilter },
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "UTC" },
                },
                count: { $sum: 1 },
              },
            },
          ])
          .toArray(),
        collection
          .aggregate<{ _id: string; count: number }>([
            { $match: baseFilter },
            {
              $group: {
                _id: {
                  $switch: {
                    branches: [
                      { case: { $lt: [{ $toInt: "$age" }, 10] }, then: "Under 10" },
                      { case: { $lt: [{ $toInt: "$age" }, 16] }, then: "10–15" },
                      { case: { $lt: [{ $toInt: "$age" }, 19] }, then: "16–18" },
                      { case: { $lt: [{ $toInt: "$age" }, 26] }, then: "19–25" },
                      { case: { $lt: [{ $toInt: "$age" }, 36] }, then: "26–35" },
                    ],
                    default: "36+",
                  },
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ])
          .toArray(),
      ]);

    const registrationsByDay = fillLastNDailyCounts(
      14,
      dailyRows.map((r) => ({ date: r._id, count: r.count }))
    );

    return NextResponse.json({
      summary: {
        total,
        today: todayCount,
        thisWeek: weekCount,
      },
      byPackage: toBarRows(byPackage),
      bySkillLevel: toBarRows(bySkill),
      byPosition: toBarRows(byPosition),
      byPayment: toBarRows(byPayment),
      byAgeBracket: toBarRows(ageRows),
      registrationsByDay,
    });
  } catch (err) {
    console.error("Insights error:", err);
    return NextResponse.json({ error: "Failed to load insights" }, { status: 500 });
  }
}
