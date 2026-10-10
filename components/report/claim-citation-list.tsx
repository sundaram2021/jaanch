import { ExternalLink } from "lucide-react";
import type { CitationSource } from "@/lib/schemas/claim-schema";

interface ClaimCitationListProps {
  citations: CitationSource[];
}

export function ClaimCitationList({ citations }: ClaimCitationListProps) {
  if (citations.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-[#dfe4e8] bg-[#f8fbf9] p-4 text-xs text-[#8a969f]">
        No direct external sources identified for this statement.
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-3 pt-4 border-t border-[#edf0f2]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#408263]">
        Evidence and citations
      </p>

      <div className="space-y-2.5">
        {citations.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-[#dfe4e8] bg-[#f8fbf9] p-3 text-xs space-y-1.5 transition-colors hover:bg-white"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-[#17212b] line-clamp-1">
                {c.name}
              </span>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded bg-white px-2 py-0.5 text-[11px] font-medium text-[#408263] border border-[#dce8df] hover:border-[#408263] transition-colors"
              >
                <span>{c.domain || "Source"}</span>
                <ExternalLink className="size-2.5" />
              </a>
            </div>
            <p className="text-[11px] leading-relaxed text-[#687581]">
              &ldquo;{c.snippet}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
