import { extractDomain } from "../helpers/formatters";
import { cleanHtmlEntities } from "./html-entities";

export { cleanHtmlEntities };

export interface ExtractedArticle {
  url: string;
  domain: string;
  title: string;
  text: string;
  author?: string;
  publishDate?: string;
}

export class ArticleExtractionError extends Error {
  constructor(message: string, public readonly statusCode: number = 422) {
    super(message);
    this.name = "ArticleExtractionError";
  }
}

function extractMetaTag(html: string, name: string): string | undefined {
  const patterns = [
    new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*name=["']${name}["']`, "i"),
    new RegExp(`<meta[^>]*property=["']${name}["'][^>]*content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']${name}["']`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]?.trim()) {
      return match[1].trim();
    }
  }
  return undefined;
}



export async function extractArticleContent(
  url: string
): Promise<ExtractedArticle> {
  const domain = extractDomain(url);

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 JaanchBot/1.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "TimeoutError";
    throw new ArticleExtractionError(
      isTimeout
        ? `Request timed out while connecting to ${domain}`
        : `Could not reach ${domain}. Please verify the URL is accessible.`,
      504
    );
  }

  if (!res.ok) {
    throw new ArticleExtractionError(
      `Failed to access article at ${domain} (HTTP ${res.status})`,
      res.status === 404 ? 404 : 422
    );
  }

  const html = await res.text();

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  let title = titleMatch ? cleanHtmlEntities(titleMatch[1].trim()) : `Article from ${domain}`;
  title = title.replace(/\s*[-|–—]\s*(BBC News|The Verge|CNN|Reuters|The Guardian|The New York Times|AP News).*$/i, "");

  const author =
    extractMetaTag(html, "author") ||
    extractMetaTag(html, "article:author") ||
    extractMetaTag(html, "byl") ||
    extractMetaTag(html, "dc.creator") ||
    extractMetaTag(html, "og:site_name");

  const publishDate =
    extractMetaTag(html, "article:published_time") ||
    extractMetaTag(html, "pubdate") ||
    extractMetaTag(html, "date") ||
    extractMetaTag(html, "DC.date.issued");

  const stripped = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "")
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, "")
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, "")
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const text = cleanHtmlEntities(stripped.slice(0, 10000));

  if (text.length < 150) {
    throw new ArticleExtractionError(
      `Insufficient article body extracted from ${domain}. The article may be behind a paywall, require login, or rely exclusively on client JavaScript.`,
      422
    );
  }

  return {
    url,
    domain,
    title,
    text,
    author: author ? cleanHtmlEntities(author) : undefined,
    publishDate,
  };
}
