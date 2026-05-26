import { NextResponse } from "next/server";
import { news } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");

  let result = news;

  if (category) {
    result = result.filter(
      (n) => n.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (limit) {
    result = result.slice(0, parseInt(limit, 10));
  }

  return NextResponse.json({ data: result, count: result.length });
}
