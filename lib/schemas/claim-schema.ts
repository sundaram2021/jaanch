import { z } from "zod";

export const verdictTypeSchema = z.enum([
  "supported",
  "misleading",
  "needs_context",
]);

export type VerdictType = z.infer<typeof verdictTypeSchema>;

export const citationSourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  snippet: z.string(),
  domain: z.string().optional(),
});

export type CitationSource = z.infer<typeof citationSourceSchema>;

export const claimItemSchema = z.object({
  id: z.string(),
  number: z.number(),
  statement: z.string(),
  quote: z.string(),
  verdict: verdictTypeSchema,
  confidence: z.number().min(0).max(100),
  explanation: z.string(),
  serpQuery: z.string(),
  citations: z.array(citationSourceSchema),
});

export type ClaimItem = z.infer<typeof claimItemSchema>;

export const rawClaimExtractionSchema = z.object({
  number: z.number(),
  statement: z.string().min(5),
  quote: z.string().default(""),
  serpQuery: z.string().min(3),
});

export type RawClaimExtraction = z.infer<typeof rawClaimExtractionSchema>;

export const claimEvaluationOutputSchema = z.object({
  verdict: verdictTypeSchema,
  confidence: z.number().min(0).max(100),
  explanation: z.string().min(5),
});

export type ClaimEvaluationOutput = z.infer<typeof claimEvaluationOutputSchema>;
