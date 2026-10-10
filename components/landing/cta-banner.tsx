import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="mt-10 flex flex-col gap-6 rounded-2xl border border-[#dfe4e8] bg-[#17212b] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a8cdb5]">
          Ready when you are
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
          Start with one article.
        </h2>
        <p className="mt-2 text-sm text-[#b4c0c8]">
          Paste the link on the report page and let Jaanch do the digging.
        </p>
      </div>

      <Link
        href="/report"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#b7d9c2] px-5 py-3 text-sm font-semibold text-[#17212b] transition hover:bg-white"
      >
        <span>Open report</span>
        <ArrowUpRight className="size-4" />
      </Link>
    </section>
  );
}
