interface OverallReadCardProps {
  summary: string;
}

export function OverallReadCard({ summary }: OverallReadCardProps) {
  return (
    <div className="rounded-2xl border border-[#dfe4e8] bg-[#17212b] p-6 text-white shadow-sm space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a8cdb5]">
        Overall read
      </p>
      <p className="text-sm leading-relaxed text-[#c3ced6]">{summary}</p>
    </div>
  );
}
