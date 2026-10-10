import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b border-[#e3e7eb] bg-white/90 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#17212b] text-white shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          <span className="text-xl font-semibold tracking-[-0.04em] text-[#17212b]">
            Jaanch
          </span>
          <span className="hidden rounded-full bg-[#edf3ef] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#408263] sm:inline-flex">
            Early access
          </span>
        </Link>

        <nav className="flex items-center gap-7 text-sm text-[#687581]">
          <Link
            href="/report"
            className="font-medium text-[#17212b] hover:text-[#408263] transition-colors"
          >
            Investigate
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-[#17212b] transition-colors hidden sm:inline"
          >
            How it works
          </Link>
        </nav>
      </div>
    </header>
  );
}
