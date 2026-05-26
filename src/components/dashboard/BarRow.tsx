interface BarRowProps {
  name: string;
  count: number;
  max: number;
}

export function BarRow({ name, count, max }: BarRowProps) {
  const width = max > 0 ? Math.round((count / max) * 100) : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="truncate font-medium text-gray-800">{name}</span>
        <span className="shrink-0 font-semibold text-gray-600">{count}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
