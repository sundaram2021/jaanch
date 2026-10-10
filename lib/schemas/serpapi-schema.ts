import { z } from "zod";

export const serpapiQuerySchema = z.object({
  query: z.string().min(1),
  engine: z.string().default("google"),
  gl: z.string().default("us"),
  hl: z.string().default("en"),
  num: z.number().int().positive().default(5),
});

export type SerpapiQuery = z.infer<typeof serpapiQuerySchema>;
export type SerpapiQueryInput = z.input<typeof serpapiQuerySchema>;

export const serpapiResultItemSchema = z.object({
  position: z.number().optional(),
  title: z.string(),
  link: z.string().url(),
  snippet: z.string(),
  source: z.string().optional(),
});

export type SerpapiResultItem = z.infer<typeof serpapiResultItemSchema>;

export const serpapiResponseSchema = z.object({
  query: z.string(),
  results: z.array(serpapiResultItemSchema),
  totalResults: z.number().optional(),
  error: z.string().optional(),
});

export type SerpapiResponse = z.infer<typeof serpapiResponseSchema>;
