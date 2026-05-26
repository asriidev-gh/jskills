import { NextResponse } from "next/server";
import { players } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const teamId = searchParams.get("teamId");

  let result = players;

  if (featured === "true") {
    result = result.filter((p) => p.featured);
  }

  if (teamId) {
    result = result.filter((p) => p.teamId === teamId);
  }

  return NextResponse.json({ data: result, count: result.length });
}
