import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { LivePreviewCard } from "./live-preview-card";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden rounded-[2rem] border border-[#dfe4e8] bg-white px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 shadow-[0_18px_45px_-28px_rgba(23,33,43,0.38)]">
      <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[#edf3ef] blur-3xl" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-12">
        <div>
          <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-[#cfe1d4] bg-[#f4f8f5] px-3 py-1.5 text-xs font-semibold text-[#408263]">
            <Sparkles className="size-3.5" />
            <span>Evidence, not noise</span>
          </div>

          <h1 className="max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.06em] text-[#17212b] sm:text-5xl lg:text-[3.4rem]">
            Know what an article is really saying.
          </h1>

          <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-[#687581]">
            Jaanch investigates the claims behind an article, traces them to
            independent sources, and gives you a clear report with evidence and
            citations.
          </p>

          <div className="mt-6 sm:mt-7 flex flex-col items-start gap-3.5 sm:flex-row sm:items-center">
            <Link
              href="/report"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17212b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3945]"
            >
              <span>Get started</span>
              <ArrowUpRight className="size-4" />
            </Link>
            <span className="text-xs text-[#8a969f]">
              No account. No chat history. Just a report.
            </span>
          </div>
        </div>

        <LivePreviewCard />
      </div>
    </section>
  );
}
