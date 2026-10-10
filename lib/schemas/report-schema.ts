import { z } from "zod";
import { claimItemSchema } from "./claim-schema";

export const reportStatsSchema = z.object({
  supported: z.number().nonnegative(),
  misleading: z.number().nonnegative(),
  needsContext: z.number().nonnegative(),
});

export type ReportStats = z.infer<typeof reportStatsSchema>;

export const investigationReportSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  domain: z.string(),
  title: z.string(),
  author: z.string().optional(),
  publishDate: z.string().optional(),
  overallRead: z.string(),
  claimsCount: z.number().int().positive(),
  stats: reportStatsSchema,
  claims: z.array(claimItemSchema),
  markdown: z.string(),
  createdAt: z.string(),
});

export type InvestigationReport = z.infer<typeof investigationReportSchema>;

export const investigationRequestSchema = z.object({
  url: z.string().url(),
});

export type InvestigationRequest = z.infer<typeof investigationRequestSchema>;
