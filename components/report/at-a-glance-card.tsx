import type { ReportStats } from "@/lib/schemas/report-schema";

interface AtAGlanceCardProps {
  stats: ReportStats;
  total: number;
}

export function AtAGlanceCard({ stats, total }: AtAGlanceCardProps) {
  const supportedPct = total > 0 ? (stats.supported / total) * 100 : 0;
  const misleadingPct = total > 0 ? (stats.misleading / total) * 100 : 0;
  const contextPct = total > 0 ? (stats.needsContext / total) * 100 : 0;

  return (
    <div className="rounded-2xl border border-[#dfe4e8] bg-white p-6 shadow-sm space-y-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#408263]">
        At a glance
      </p>

      <div className="h-2 w-full overflow-hidden rounded-full bg-[#edf0f2] flex gap-1">
        <div
          style={{ width: `${supportedPct}%` }}
          className="bg-[#2a6647] rounded-full transition-all duration-300"
        />
        <div
          style={{ width: `${misleadingPct}%` }}
          className="bg-[#966014] rounded-full transition-all duration-300"
        />
        <div
          style={{ width: `${contextPct}%` }}
          className="bg-[#6b4683] rounded-full transition-all duration-300"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
        <div className="p-3 rounded-xl bg-[#f4f8f5] border border-[#cfe1d4]">
          <span className="text-[#2a6647] font-bold text-lg block">
            {stats.supported}
          </span>
          <span className="text-[#408263] font-medium">Supported</span>
        </div>

        <div className="p-3 rounded-xl bg-[#fcf4e4] border border-[#f5e3bc]">
          <span className="text-[#966014] font-bold text-lg block">
            {stats.misleading}
          </span>
          <span className="text-[#966014] font-medium">Misleading</span>
        </div>

        <div className="p-3 rounded-xl bg-[#f3edf7] border border-[#e2d5ea]">
          <span className="text-[#6b4683] font-bold text-lg block">
            {stats.needsContext}
          </span>
          <span className="text-[#6b4683] font-medium">Needs context</span>
        </div>
      </div>
    </div>
  );
}
