"use client";

import { useEffect, useCallback } from "react";
import { X, Copy, Check, Download } from "lucide-react";

interface MarkdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdown: string;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
}

export function MarkdownModal({
  isOpen,
  onClose,
  markdown,
  copied,
  onCopy,
  onDownload,
}: MarkdownModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dossier-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17212b]/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl border border-[#dfe4e8] bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#dfe4e8] px-6 py-4">
          <div>
            <h3
              id="modal-dossier-title"
              className="text-base font-semibold text-[#17212b]"
            >
              Investigation Markdown Dossier
            </h3>
            <p className="text-xs text-[#687581]">
              GitHub Flavored Markdown formatted report
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-[#687581] hover:bg-[#f7f8fa] hover:text-[#17212b] transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#f7f8fa]">
          <pre className="font-mono text-xs text-[#17212b] whitespace-pre-wrap leading-relaxed select-all">
            {markdown}
          </pre>
        </div>

        <div className="flex items-center justify-between border-t border-[#dfe4e8] px-6 py-3.5 bg-white rounded-b-2xl">
          <span className="text-xs text-[#8a969f]">
            {markdown.split(/\s+/).filter(Boolean).length} words
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#dfe4e8] bg-white px-3 py-1.5 text-xs font-semibold text-[#17212b] hover:bg-[#f7f8fa] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-[#2a6647]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-[#687581]" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#17212b] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#2a3945] transition-colors"
            >
              <Download className="size-3.5 text-[#b7d9c2]" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
