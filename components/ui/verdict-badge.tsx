import { Check, Flag, Minus } from "lucide-react";
import type { VerdictType } from "@/lib/schemas/claim-schema";

interface VerdictBadgeProps {
  verdict: VerdictType;
  className?: string;
}

export function VerdictBadge({ verdict, className = "" }: VerdictBadgeProps) {
  if (verdict === "supported") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-[#e2f0e6] px-3 py-1 text-xs font-semibold text-[#2a6647] ${className}`}
      >
        <Check className="size-3.5 stroke-[2.5]" />
        <span>Supported</span>
      </span>
    );
  }

  if (verdict === "misleading") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-[#fcf4e4] px-3 py-1 text-xs font-semibold text-[#966014] ${className}`}
      >
        <Flag className="size-3.5 stroke-[2.5]" />
        <span>Misleading</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#f3edf7] px-3 py-1 text-xs font-semibold text-[#6b4683] ${className}`}
    >
      <Minus className="size-3.5 stroke-[2.5]" />
      <span>Needs context</span>
    </span>
  );
}
