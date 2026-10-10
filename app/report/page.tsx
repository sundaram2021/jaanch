import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InvestigationView } from "@/components/report/investigation-view";
import { ReportSkeleton } from "@/components/report/report-skeleton";

interface ReportContentProps {
  searchParams?: Promise<{ url?: string | string[] }>;
}

async function ReportContent({ searchParams }: ReportContentProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const initialUrl = typeof resolved?.url === "string" ? resolved.url : undefined;

  return <InvestigationView initialUrl={initialUrl} />;
}

export default function ReportPage({
  searchParams,
}: {
  searchParams?: Promise<{ url?: string | string[] }>;
}) {
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#17212b] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 mx-auto max-w-7xl w-full px-5 py-6 sm:px-8">
        <Suspense fallback={<ReportSkeleton />}>
          <ReportContent searchParams={searchParams} />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
