export function getUtcDayBounds(date = new Date()) {
  const start = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const end = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );
  return { start, end };
}

export function getUtcWeekStart(date = new Date()) {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = d.getUTCDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setUTCDate(d.getUTCDate() - diff);
  return d;
}

export function parseDateRangeFilter(
  searchParams: URLSearchParams
): Record<string, unknown> | null {
  const startRaw = searchParams.get("startDate")?.trim() ?? "";
  const endRaw = searchParams.get("endDate")?.trim() ?? "";
  if (!startRaw && !endRaw) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startRaw) || !/^\d{4}-\d{2}-\d{2}$/.test(endRaw)) {
    return null;
  }
  const start = new Date(`${startRaw}T00:00:00.000Z`);
  const end = new Date(`${endRaw}T23:59:59.999Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
    return null;
  }
  return { createdAt: { $gte: start, $lte: end } };
}

export function fillLastNDailyCounts(
  days: number,
  rows: { date: string; count: number }[]
) {
  const byDate = new Map(rows.map((r) => [r.date, r.count]));
  const out: { date: string; count: number; label: string }[] = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const iso = d.toISOString().slice(0, 10);
    out.push({
      date: iso,
      count: byDate.get(iso) ?? 0,
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
    });
  }
  return out;
}
