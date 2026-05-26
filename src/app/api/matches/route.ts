import { NextResponse } from "next/server";
import { matches } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let result = matches;

  if (status === "upcoming" || status === "completed" || status === "live") {
    result = result.filter((m) => m.status === status);
  }

  return NextResponse.json({ data: result, count: result.length });
}
