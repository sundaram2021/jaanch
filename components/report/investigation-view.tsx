"use client";

import { useInvestigation } from "@/hooks/use-investigation";
import { useAccordion } from "@/hooks/use-accordion";
import { ReportHeroSearch } from "./report-hero-search";
import { ReportSidebar } from "./report-sidebar";
import { ReportHeader } from "./report-header";
import { ClaimAccordionCard } from "./claim-accordion-card";
import { OverallReadCard } from "./overall-read-card";
import { AtAGlanceCard } from "./at-a-glance-card";
import { MarkdownModal } from "./markdown-modal";
import { StatusProgress } from "../ui/status-progress";
import { ReportSkeleton } from "./report-skeleton";
import { AlertCircle, X } from "lucide-react";

interface InvestigationViewProps {
  initialUrl?: string;
}

export function InvestigationView({ initialUrl }: InvestigationViewProps) {
  const {
    url,
    setUrl,
    isLoading,
    step,
    report,
    error,
    clearError,
    showMarkdown,
    setShowMarkdown,
    copied,
    startInvestigation,
    loadSample,
    copyMarkdown,
    downloadMarkdown,
  } = useInvestigation(initialUrl);

  const { isOpen, toggle } = useAccordion(report?.claims[0]?.id || null);

  if (!report) {
    return (
      <div className="py-6 sm:py-12">
        <ReportHeroSearch
          url={url}
          setUrl={setUrl}
          isLoading={isLoading}
          step={step}
          error={error}
          onClearError={clearError}
          onSearch={startInvestigation}
          onLoadSample={loadSample}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      {error && (
        <div className="rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-4 text-left shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="size-4 text-[#b91c1c] shrink-0 mt-0.5" />
              <p className="text-xs text-[#7f1d1d]">{error}</p>
            </div>
            <button
              type="button"
              onClick={clearError}
              aria-label="Dismiss error"
              className="text-[#b91c1c] hover:text-[#7f1d1d]"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center py-4">
            <StatusProgress step={step} />
          </div>
          <ReportSkeleton />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <ReportSidebar
            onSearch={startInvestigation}
            isLoading={isLoading}
          />

          <main className="flex-1 w-full space-y-6">
            <ReportHeader
              report={report}
              onOpenMarkdown={() => setShowMarkdown(true)}
              onDownloadMarkdown={downloadMarkdown}
            />

            <div className="space-y-3">
              {report.claims.map((claim) => (
                <ClaimAccordionCard
                  key={claim.id}
                  claim={claim}
                  isOpen={isOpen(claim.id)}
                  onToggle={() => toggle(claim.id)}
                />
              ))}
            </div>

            <OverallReadCard summary={report.overallRead} />

            <AtAGlanceCard stats={report.stats} total={report.claimsCount} />
          </main>
        </div>
      )}

      <MarkdownModal
        isOpen={showMarkdown}
        onClose={() => setShowMarkdown(false)}
        markdown={report.markdown}
        copied={copied}
        onCopy={copyMarkdown}
        onDownload={downloadMarkdown}
      />
    </div>
  );
}
