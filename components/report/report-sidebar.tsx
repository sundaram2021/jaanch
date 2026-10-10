"use client";

import { useState } from "react";
import { ArrowUpRight, Info } from "lucide-react";

interface ReportSidebarProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

export function ReportSidebar({ onSearch, isLoading }: ReportSidebarProps) {
  const [sidebarUrl, setSidebarUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sidebarUrl.trim()) {
      onSearch(sidebarUrl.trim());
      setSidebarUrl("");
    }
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-4">
      <div className="rounded-2xl border border-[#dfe4e8] bg-white p-5 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#408263]">
          New investigation
        </p>
        <h2 className="mt-1 text-sm font-semibold text-[#17212b]">
          Check another article
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            type="url"
            required
            value={sidebarUrl}
            onChange={(e) => setSidebarUrl(e.target.value)}
            placeholder="https://example.com/article"
            className="w-full rounded-xl border border-[#dfe4e8] bg-[#f7f8fa] px-3.5 py-2.5 text-xs text-[#17212b] placeholder-[#8a969f] focus:border-[#408263] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#408263]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#17212b] py-2.5 text-xs font-semibold text-white transition hover:bg-[#2a3945] disabled:opacity-50"
          >
            <span>{isLoading ? "Investigating..." : "Investigate"}</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-[#dfe4e8] bg-[#f8fbf9] p-5 text-xs text-[#687581]">
        <div className="flex items-center gap-2 font-semibold text-[#17212b]">
          <Info className="size-4 text-[#408263]" />
          <span>Public sources only</span>
        </div>
        <p className="mt-2 leading-5 text-[#7d8993]">
          Jaanch works best on publicly accessible articles and news reports.
          Paywalled or gated articles may limit the amount of claims we can
          extract.
        </p>
      </div>
    </aside>
  );
}
