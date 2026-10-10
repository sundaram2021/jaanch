import { ExternalLink, FileDown, Eye, User, Calendar } from "lucide-react";
import type { InvestigationReport } from "@/lib/schemas/report-schema";
import { formatDate } from "@/lib/helpers/formatters";

interface ReportHeaderProps {
  report: InvestigationReport;
  onOpenMarkdown: () => void;
  onDownloadMarkdown: () => void;
}

export function ReportHeader({
  report,
  onOpenMarkdown,
  onDownloadMarkdown,
}: ReportHeaderProps) {
  return (
    <div className="space-y-3 pb-6 border-b border-[#dfe4e8]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#408263]">
          Investigation report
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenMarkdown}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#dfe4e8] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#17212b] hover:bg-[#f7f8fa] transition-colors"
          >
            <Eye className="size-3.5 text-[#687581]" />
            <span>View Markdown</span>
          </button>
          <button
            type="button"
            onClick={onDownloadMarkdown}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#17212b] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2a3945] transition-colors"
          >
            <FileDown className="size-3.5 text-[#b7d9c2]" />
            <span>Export .md</span>
          </button>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-[#17212b] leading-tight">
        {report.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-xs text-[#687581]">
        <a
          href={report.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#408263] hover:underline"
        >
          <span>{report.domain}</span>
          <ExternalLink className="size-3" />
        </a>

        {report.author && (
          <>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-[#556370]">
              <User className="size-3 text-[#8a969f]" />
              <span>{report.author}</span>
            </span>
          </>
        )}

        {report.publishDate && (
          <>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-[#556370]">
              <Calendar className="size-3 text-[#8a969f]" />
              <span>{formatDate(report.publishDate)}</span>
            </span>
          </>
        )}

        <span>•</span>
        <span className="rounded-full bg-[#edf3ef] px-2.5 py-0.5 text-[11px] font-semibold text-[#408263]">
          {report.claimsCount} claims reviewed
        </span>
      </div>
    </div>
  );
}
