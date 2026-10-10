import { Layers, Search, BookOpen } from "lucide-react";

export function HowItWorksGrid() {
  return (
    <section id="how-it-works" className="mt-10 scroll-mt-24 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-[#dfe4e8] bg-white p-5">
        <Layers className="mb-8 size-5 text-[#408263]" />
        <p className="font-semibold text-[#17212b]">Extract the claims</p>
        <p className="mt-1 text-sm leading-6 text-[#7d8993]">
          Separate verifiable statements from opinion and framing.
        </p>
      </div>

      <div className="rounded-2xl border border-[#dfe4e8] bg-white p-5">
        <Search className="mb-8 size-5 text-[#408263]" />
        <p className="font-semibold text-[#17212b]">Trace the evidence</p>
        <p className="mt-1 text-sm leading-6 text-[#7d8993]">
          Search independent sources and follow the trail behind each claim.
        </p>
      </div>

      <div className="rounded-2xl border border-[#dfe4e8] bg-white p-5">
        <BookOpen className="mb-8 size-5 text-[#408263]" />
        <p className="font-semibold text-[#17212b]">Read the report</p>
        <p className="mt-1 text-sm leading-6 text-[#7d8993]">
          See verdicts, context, and citations in one focused view.
        </p>
      </div>
    </section>
  );
}
