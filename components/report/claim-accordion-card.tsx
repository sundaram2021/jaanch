"use client";

import { ChevronDown } from "lucide-react";
import { VerdictBadge } from "../ui/verdict-badge";
import { ClaimCitationList } from "./claim-citation-list";
import type { ClaimItem } from "@/lib/schemas/claim-schema";

interface ClaimAccordionCardProps {
  claim: ClaimItem;
  isOpen: boolean;
  onToggle: () => void;
}

export function ClaimAccordionCard({
  claim,
  isOpen,
  onToggle,
}: ClaimAccordionCardProps) {
  const formattedNumber = String(claim.number).padStart(2, "0");

  return (
    <div className="rounded-2xl border border-[#dfe4e8] bg-white transition-all shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-5 text-left flex items-start justify-between gap-4 select-none"
      >
        <div className="flex items-start gap-3.5 min-w-0">
          <span className="text-xs font-bold text-[#8a969f] font-mono mt-0.5">
            {formattedNumber}
          </span>
          <div className="space-y-1">
            <h2 className="text-sm sm:text-base font-semibold text-[#17212b] leading-snug">
              {claim.statement}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <VerdictBadge verdict={claim.verdict} />
          <div
            className={`p-1 rounded-full text-[#8a969f] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="size-4" />
          </div>
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 border-t border-[#edf0f2] space-y-4 text-xs text-[#4b5563]">
            <div className="rounded-xl border border-[#dfe4e8] bg-[#f7f8fa] p-3 italic text-[#556370] leading-relaxed">
              &ldquo;{claim.quote}&rdquo;
            </div>

            <div className="leading-relaxed space-y-1">
              <p className="font-semibold text-[11px] uppercase tracking-wider text-[#8a969f]">
                Investigative Finding
              </p>
              <p className="text-xs text-[#374151]">{claim.explanation}</p>
            </div>

            <ClaimCitationList citations={claim.citations} />
          </div>
        </div>
      </div>
    </div>
  );
}
