"use client";

import { Link2, ArrowUpRight, AlertCircle, RotateCcw, X } from "lucide-react";
import { StatusProgress } from "../ui/status-progress";
import { ReportSkeleton } from "./report-skeleton";

interface ReportHeroSearchProps {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  step: number;
  error?: string | null;
  onClearError?: () => void;
  onSearch: (url: string) => void;
  onLoadSample: () => void;
}

export function ReportHeroSearch({
  url,
  setUrl,
  isLoading,
  step,
  error,
  onClearError,
  onSearch,
  onLoadSample,
}: ReportHeroSearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8 py-6">
        <div className="flex flex-col items-center justify-center py-4">
          <StatusProgress step={step} />
        </div>
        <ReportSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[520px] max-w-2xl flex-col items-center justify-center text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#408263]">
        Begin an investigation
      </p>

      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#17212b] sm:text-4xl">
        Investigate an article
      </h1>

      <p className="mt-3 max-w-lg text-sm leading-6 text-[#687581]">
        Paste the link to a news article, editorial, or report. Jaanch will extract
        the core claims, trace the citations, and compile an evidence-backed report.
      </p>

      {error && (
        <div className="mt-6 w-full max-w-xl rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-4 text-left shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-[#b91c1c] shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="text-xs font-semibold text-[#991b1b]">
                Investigation could not be completed
              </p>
              <p className="text-xs text-[#7f1d1d] leading-relaxed">
                {error}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSearch(url)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#991b1b] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#7f1d1d] transition-colors"
                >
                  <RotateCcw className="size-3" />
                  <span>Retry</span>
                </button>
                <button
                  type="button"
                  onClick={onLoadSample}
                  className="text-xs font-medium text-[#991b1b] hover:underline"
                >
                  Load sample report instead
                </button>
              </div>
            </div>
            {onClearError && (
              <button
                type="button"
                onClick={onClearError}
                aria-label="Dismiss error"
                className="text-[#b91c1c] hover:text-[#7f1d1d] p-1"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xl">
        <div className="relative flex items-center rounded-2xl border border-[#dfe4e8] bg-white p-2 shadow-sm focus-within:border-[#408263] focus-within:ring-2 focus-within:ring-[#408263]/10">
          <Link2 className="ml-3 size-5 text-[#8a969f] shrink-0" />
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article"
            className="w-full bg-transparent px-3 py-2 text-sm text-[#17212b] placeholder-[#8a969f] focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#17212b] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2a3945]"
          >
            <span>Investigate</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={onLoadSample}
        className="mt-4 text-xs font-medium text-[#687581] hover:text-[#17212b] transition-colors underline underline-offset-4 decoration-[#dfe4e8]"
      >
        Use a test article
      </button>
    </div>
  );
}
