import { NextResponse } from "next/server";
import { standings } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ data: standings, count: standings.length });
}
