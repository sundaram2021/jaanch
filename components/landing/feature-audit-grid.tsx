import { ShieldCheck, Globe, FileCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function FeatureAuditGrid() {
  return (
    <section id="about" className="mt-10 scroll-mt-24">
      <div className="mb-4 flex items-center justify-between border-b border-[#dfe4e8]">
        <p className="border-b-2 border-[#408263] pb-3 text-sm font-semibold text-[#17212b]">
          What Jaanch audits
        </p>
        <Link
          href="/report"
          className="hidden items-center gap-1 text-xs font-semibold text-[#687581] sm:flex hover:text-[#17212b] transition-colors"
        >
          <span>Try an investigation</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#dfe4e8] bg-white p-5 hover:border-[#b7d9c2] transition-colors shadow-sm">
          <div className="mb-6 flex size-10 items-center justify-center rounded-xl bg-[#edf3ef]">
            <ShieldCheck className="size-5 text-[#408263]" />
          </div>
          <p className="font-semibold text-[#17212b]">Empirical claim isolation</p>
          <p className="mt-1 text-sm leading-6 text-[#7d8993]">
            Separates verifiable factual assertions, statistics, and reported events from journalistic opinion or PR spin.
          </p>
        </div>

        <div className="rounded-2xl border border-[#dfe4e8] bg-white p-5 hover:border-[#b7d9c2] transition-colors shadow-sm">
          <div className="mb-6 flex size-10 items-center justify-center rounded-xl bg-[#edf3ef]">
            <Globe className="size-5 text-[#408263]" />
          </div>
          <p className="font-semibold text-[#17212b]">Multi-source corroboration</p>
          <p className="mt-1 text-sm leading-6 text-[#7d8993]">
            Cross-references each extracted claim against independent web indexes, primary research, and news sources.
          </p>
        </div>

        <div className="rounded-2xl border border-[#dfe4e8] bg-white p-5 hover:border-[#b7d9c2] transition-colors shadow-sm">
          <div className="mb-6 flex size-10 items-center justify-center rounded-xl bg-[#edf3ef]">
            <FileCheck className="size-5 text-[#408263]" />
          </div>
          <p className="font-semibold text-[#17212b]">Forensic report dossier</p>
          <p className="mt-1 text-sm leading-6 text-[#7d8993]">
            Assigns transparent confidence ratings, categorizes verdicts, and generates exportable markdown dossiers with citations.
          </p>
        </div>
      </div>
    </section>
  );
}
