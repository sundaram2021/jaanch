"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { InvestigationReport } from "../lib/schemas/report-schema";
import { sampleTestArticle } from "../lib/helpers/sample-reports";
import {
  generateReportMarkdown,
  downloadMarkdownFile,
} from "../lib/helpers/markdown-helper";

export function useInvestigation(initialUrlFromQuery?: string) {
  const [url, setUrl] = useState(initialUrlFromQuery || "");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [report, setReport] = useState<InvestigationReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasTriggeredInitial = useRef(false);

  const startInvestigation = useCallback(async (targetUrl: string) => {
    const cleanUrl = targetUrl.trim();
    if (!cleanUrl) return;

    setIsLoading(true);
    setError(null);
    setStep(1);

    const stepInterval = setInterval(() => {
      setStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1500);

    try {
      const res = await fetch("/api/investigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanUrl }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        const errMsg =
          errJson?.error || `Investigation failed with status ${res.status}`;
        throw new Error(errMsg);
      }

      const data: InvestigationReport = await res.json();
      setReport(data);
      setUrl(cleanUrl);
      setError(null);
    } catch (err) {
      clearInterval(stepInterval);
      const msg = err instanceof Error ? err.message : "Investigation failed";
      setError(msg);
    } finally {
      setIsLoading(false);
      setStep(1);
    }
  }, []);

  const loadSample = useCallback(() => {
    const testArticle = { ...sampleTestArticle };
    testArticle.markdown = generateReportMarkdown(testArticle);
    setUrl(testArticle.url);
    setReport(testArticle);
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setReport(null);
    setUrl("");
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const copyMarkdown = useCallback(() => {
    if (!report) return;
    const content = report.markdown || generateReportMarkdown(report);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [report]);

  const downloadMarkdown = useCallback(() => {
    if (!report) return;
    const content = report.markdown || generateReportMarkdown(report);
    downloadMarkdownFile(`jaanch-report-${report.domain}.md`, content);
  }, [report]);

  useEffect(() => {
    if (initialUrlFromQuery && !hasTriggeredInitial.current) {
      hasTriggeredInitial.current = true;
      startInvestigation(initialUrlFromQuery);
    }
  }, [initialUrlFromQuery, startInvestigation]);

  return {
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
    reset,
    copyMarkdown,
    downloadMarkdown,
  };
}
