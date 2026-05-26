"use client";

import { useCallback, useEffect, useState } from "react";
import { BarRow } from "@/components/dashboard/BarRow";
import { Loader2 } from "lucide-react";

interface InsightsData {
  summary: { total: number; today: number; thisWeek: number };
  byPackage: { name: string; count: number }[];
  bySkillLevel: { name: string; count: number }[];
  byPosition: { name: string; count: number }[];
  byPayment: { name: string; count: number }[];
  byAgeBracket: { name: string; count: number }[];
  registrationsByDay: { date: string; count: number; label: string }[];
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-2 font-display text-4xl font-black text-gray-900">{value}</p>
    </div>
  );
}

function BreakdownCard({
  title,
  rows,
}: {
  title: string;
  rows: { name: string; count: number }[];
}) {
  const max = rows[0]?.count ?? 0;
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400">No data yet</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <BarRow key={row.name} name={row.name} count={row.count} max={max} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function InsightsPage() {
  const [data, setData] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/insights");
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (!res.ok) throw new Error("Failed to load insights");
      setData(await res.json());
    } catch {
      setError("Could not load insights. Check your database connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
        {error || "No data"}
      </div>
    );
  }

  const dayMax = Math.max(...data.registrationsByDay.map((d) => d.count), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-black uppercase text-gray-900">Insights</h1>
        <p className="mt-1 text-sm text-gray-500">Enrollment overview from MongoDB</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total enrollments" value={data.summary.total} />
        <StatCard label="Today (UTC)" value={data.summary.today} />
        <StatCard label="This week (UTC)" value={data.summary.thisWeek} />
      </div>

      <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
          Last 14 days
        </h3>
        <div className="flex h-40 items-end gap-1">
          {data.registrationsByDay.map((day) => (
            <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full max-w-[2rem] rounded-t bg-orange-500 transition-all"
                style={{
                  height: `${Math.max(4, (day.count / dayMax) * 100)}%`,
                  minHeight: day.count > 0 ? "4px" : "2px",
                }}
                title={`${day.label}: ${day.count}`}
              />
              <span className="hidden text-[10px] text-gray-400 sm:block">{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BreakdownCard title="By package" rows={data.byPackage} />
        <BreakdownCard title="By skill level" rows={data.bySkillLevel} />
        <BreakdownCard title="By position" rows={data.byPosition} />
        <BreakdownCard title="By payment method" rows={data.byPayment} />
        <BreakdownCard title="By age bracket" rows={data.byAgeBracket} />
      </div>
    </div>
  );
}
