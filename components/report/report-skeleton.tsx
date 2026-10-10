export function ReportSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-80 shrink-0 space-y-4">
          <div className="rounded-2xl border border-[#dfe4e8] bg-white p-5 space-y-3">
            <div className="h-3 w-24 bg-[#dfe4e8] rounded" />
            <div className="h-5 w-40 bg-[#dfe4e8] rounded" />
            <div className="h-10 w-full bg-[#f7f8fa] rounded-xl" />
            <div className="h-9 w-full bg-[#dfe4e8] rounded-xl" />
          </div>
          <div className="rounded-2xl border border-[#dfe4e8] bg-[#f8fbf9] p-5 space-y-2">
            <div className="h-4 w-32 bg-[#dfe4e8] rounded" />
            <div className="h-12 w-full bg-[#dfe4e8]/60 rounded" />
          </div>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="space-y-3 pb-6 border-b border-[#dfe4e8]">
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 bg-[#dfe4e8] rounded" />
              <div className="flex gap-2">
                <div className="h-8 w-28 bg-[#dfe4e8] rounded-lg" />
                <div className="h-8 w-24 bg-[#dfe4e8] rounded-lg" />
              </div>
            </div>
            <div className="h-8 w-3/4 bg-[#dfe4e8] rounded-lg" />
            <div className="flex gap-3">
              <div className="h-4 w-24 bg-[#dfe4e8] rounded" />
              <div className="h-4 w-28 bg-[#dfe4e8] rounded-full" />
            </div>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#dfe4e8] bg-white p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-3/4">
                    <div className="h-4 w-6 bg-[#dfe4e8] rounded font-mono" />
                    <div className="h-5 w-5/6 bg-[#dfe4e8] rounded" />
                  </div>
                  <div className="h-6 w-20 bg-[#dfe4e8] rounded-full" />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#dfe4e8] bg-[#f8fbf9] p-6 space-y-3">
            <div className="h-4 w-28 bg-[#dfe4e8] rounded" />
            <div className="h-16 w-full bg-[#dfe4e8]/60 rounded-xl" />
          </div>

          <div className="rounded-2xl border border-[#dfe4e8] bg-white p-6 space-y-4">
            <div className="h-4 w-24 bg-[#dfe4e8] rounded" />
            <div className="h-4 w-full bg-[#dfe4e8] rounded-full" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-12 bg-[#f7f8fa] rounded-xl" />
              <div className="h-12 bg-[#f7f8fa] rounded-xl" />
              <div className="h-12 bg-[#f7f8fa] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
