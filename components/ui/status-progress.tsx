import { Radar, FileSearch, Search, CircleCheck } from "lucide-react";

interface StatusProgressProps {
  step: number;
}

export function StatusProgress({ step }: StatusProgressProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-[#dfe8e2] bg-[#f8fbf9] p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#408263]">
            Live investigation
          </p>
          <p className="mt-1 text-sm font-semibold text-[#17212b]">
            From article to evidence
          </p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-full bg-white text-[#408263] shadow-sm">
          <Radar className="size-4 animate-spin" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div
          className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
            step >= 1
              ? "border-[#cfe1d4] bg-white text-[#17212b]"
              : "border-[#e5e9eb] bg-slate-50 text-slate-400"
          }`}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf3ef] text-[#408263]">
            <FileSearch className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold">Extracting claims</span>
              <span className="text-[10px] font-semibold text-[#408263]">01</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#e9f0eb]">
              <div
                className={`h-full rounded-full bg-[#79ad8c] transition-all duration-500 ${
                  step >= 1 ? "w-full" : "w-1/4"
                }`}
              />
            </div>
          </div>
        </div>

        <div
          className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
            step >= 2
              ? "border-[#cfe1d4] bg-white text-[#17212b]"
              : "border-[#e5e9eb] bg-slate-50 text-slate-400"
          }`}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf3ef] text-[#408263]">
            <Search className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold">Tracing sources with SerpAPI</span>
              <span className="text-[10px] font-semibold text-[#408263]">02</span>
            </div>
            <div className="mt-2 flex gap-1">
              <span
                className={`h-1.5 flex-1 rounded-full ${
                  step >= 2 ? "bg-[#408263] animate-pulse" : "bg-[#e2ece5]"
                }`}
              />
              <span
                className={`h-1.5 flex-1 rounded-full ${
                  step >= 2 ? "bg-[#b7d9c2]" : "bg-[#e2ece5]"
                }`}
              />
            </div>
          </div>
        </div>

        <div
          className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
            step >= 3
              ? "border-[#cfe1d4] bg-[#edf5ef] text-[#17212b]"
              : "border-[#e5e9eb] bg-slate-50 text-slate-400"
          }`}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#408263]">
            <CircleCheck className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold">Building markdown report</span>
              <span className="text-[10px] font-semibold text-[#408263]">03</span>
            </div>
            <p className="mt-1 text-[11px] text-[#6e8576]">
              Verdicts, context, and citations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
