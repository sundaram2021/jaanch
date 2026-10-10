import { NextResponse } from "next/server";
import { runInvestigation } from "@/lib/agent/investigation-agent";
import { investigationRequestSchema } from "@/lib/schemas/report-schema";
import { ArticleExtractionError } from "@/lib/agent/article-extractor";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_BODY_BYTES = 16 * 1024;

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export async function POST(req: Request) {
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded. Please wait before submitting another investigation.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) },
      }
    );
  }

  const contentLength = Number(req.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Payload too large. Request body must be under 16KB." },
      { status: 413 }
    );
  }

  try {
    const body = await req.json();
    const parsed = investigationRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid article URL provided", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const report = await runInvestigation(parsed.data.url);
    return NextResponse.json(report, { status: 200 });
  } catch (err) {
    if (err instanceof ArticleExtractionError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }

    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
