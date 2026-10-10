import {
  serpapiQuerySchema,
  serpapiResponseSchema,
  type SerpapiQueryInput,
  type SerpapiResponse,
  type SerpapiResultItem,
} from "../schemas/serpapi-schema";

export async function searchSerpApi(
  params: SerpapiQueryInput
): Promise<SerpapiResponse> {
  const parsedParams = serpapiQuerySchema.parse(params);
  const apiKey = process.env.SERPAPI_KEY || "";

  if (!apiKey) {
    return {
      query: parsedParams.query,
      results: [],
      error: "Missing SERPAPI_KEY in environment variables",
    };
  }

  const searchUrl = new URL("https://serpapi.com/search.json");
  searchUrl.searchParams.set("q", parsedParams.query);
  searchUrl.searchParams.set("engine", parsedParams.engine);
  searchUrl.searchParams.set("gl", parsedParams.gl);
  searchUrl.searchParams.set("hl", parsedParams.hl);
  searchUrl.searchParams.set("num", String(parsedParams.num));
  searchUrl.searchParams.set("api_key", apiKey);

  try {
    const res = await fetch(searchUrl.toString(), {
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return {
        query: parsedParams.query,
        results: [],
        error: `SerpAPI HTTP ${res.status}: ${res.statusText}`,
      };
    }

    const json = (await res.json()) as {
      organic_results?: Array<{
        position?: number;
        title?: string;
        link?: string;
        snippet?: string;
        source?: string;
      }>;
      search_information?: { total_results?: number };
    };

    const organic = json.organic_results || [];
    const results: SerpapiResultItem[] = organic.map((item, index) => ({
      position: item.position ?? index + 1,
      title: item.title || "Untitled source",
      link: item.link || "#",
      snippet: item.snippet || "No snippet available",
      source: item.source || "",
    }));

    const responseData: SerpapiResponse = {
      query: parsedParams.query,
      results,
      totalResults: json.search_information?.total_results,
    };

    return serpapiResponseSchema.parse(responseData);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown SerpAPI error";
    return {
      query: parsedParams.query,
      results: [],
      error: message,
    };
  }
}
