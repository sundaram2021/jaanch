import { Radar, FileSearch, Search, CircleCheck, Check } from "lucide-react";

export function LivePreviewCard() {
  return (
    <div
      aria-label="How Jaanch investigates an article"
      className="relative mx-auto w-full max-w-[400px] rounded-[1.5rem] border border-[#dfe8e2] bg-[#f8fbf9] p-5 shadow-[0_20px_50px_-30px_rgba(64,130,99,0.5)] sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
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
        <div className="flex items-center gap-3 rounded-xl border border-[#dce8df] bg-white p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf3ef] text-[#408263]">
            <FileSearch className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#34434e]">
                Extracting claims
              </span>
              <span className="text-[10px] font-semibold text-[#408263]">01</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#e9f0eb]">
              <div className="h-full w-2/3 rounded-full bg-[#79ad8c] animate-pulse" />
            </div>
          </div>
        </div>

        <div className="ml-7 flex items-center gap-3 rounded-xl border border-[#dce8df] bg-white p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf3ef] text-[#408263]">
            <Search className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#34434e]">
                Tracing sources
              </span>
              <span className="text-[10px] font-semibold text-[#408263]">02</span>
            </div>
            <div className="mt-2 flex gap-1">
              <span className="h-1.5 flex-1 rounded-full bg-[#408263] animate-pulse" />
              <span className="h-1.5 flex-1 rounded-full bg-[#b7d9c2]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#e2ece5]" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#cfe1d4] bg-[#edf5ef] p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#408263]">
            <CircleCheck className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#34434e]">
                Building your report
              </span>
              <Check className="size-4 text-[#408263]" />
            </div>
            <p className="mt-1 text-[11px] text-[#6e8576]">
              Verdicts, context, and citations
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-[#dce8df] pt-3 text-[10px] font-medium text-[#789083]">
        <span className="size-1.5 rounded-full bg-[#408263] animate-pulse" />
        <span>Comparing independent sources</span>
      </div>
    </div>
  );
}
