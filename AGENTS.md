<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes -- APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` -- verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## Jaanch -- Agent and Architecture Guide

### What this project is

Jaanch is an autonomous AI investigation tool. The user pastes an article URL. The backend agent extracts claims, verifies each one against independent sources using SerpAPI, and returns a structured report.

### Key Conventions

- **No emojis** in code, UI, or markdown output.
- **File naming**: all lowercase, hyphen-separated (e.g. `hero-section.tsx`, `serpapi-tool.ts`).
- **No unnecessary comments**. Only comment non-obvious logic.
- **All files stay under 200 lines.**
- **All pages are Server Components** unless client interactivity is required (hooks, event handlers).
- **Zod validation** on every boundary: API route input, agent output, SerpAPI parameters, and report schema.

### Architecture

```
[Client Browser]
      |
      | POST /api/investigate { url }
      v
[API Route: app/api/investigate/route.ts]
      |
      | 1. Validate URL with Zod
      | 2. Extract article text (article-extractor.ts)
      | 3. Run investigation agent (investigation-agent.ts)
      |    - Agent uses Vercel AI Gateway (meta/muse-spark-1.3-contributor)
      |    - Agent calls SerpAPI tool for each claim
      |    - Agent returns structured JSON (report-schema.ts)
      | 4. Return InvestigationReport JSON
      v
[Client: hooks/use-investigation.ts]
      |
      | Renders report via components/report/*
      v
[Report Page: app/report/page.tsx]
```

### Environment Variables

| Variable | Purpose |
|---|---|
| `VERCEL_AI_API_KEY` | API key for Vercel AI Gateway |
| `VERCEL_AI_GATEWAY_MODEL_NAME` | Model identifier (currently `meta/muse-spark-1.3-contributor`) |
| `SERPAPI_KEY` | API key for SerpAPI (Google search) |

### Agent Behavior

The investigation agent (`lib/agent/investigation-agent.ts`):
1. Receives the extracted article text and URL.
2. Identifies 2-5 verifiable factual claims (not opinions).
3. For each claim, constructs a targeted search query and invokes the SerpAPI tool.
4. Evaluates search results against the claim, assigning a verdict: `SUPPORTED`, `MISLEADING`, or `NEEDS_CONTEXT`.
5. Returns a typed `InvestigationReport` object matching `report-schema.ts`.

### Resilience Patterns

- `AbortSignal.timeout` on all external fetch calls (article extraction, SerpAPI).
- Suspense boundary around dynamic `searchParams` usage in report page.
- Graceful error states in `use-investigation.ts` with user-facing messages.

### Test Verification

Two real articles were tested end-to-end:
- BBC: `https://www.bbc.com/news/articles/c4gz69j7eero` -- 200 OK, 2 claims verified.
- The Verge: `https://www.theverge.com/news/619890/openai-gpt-5-orion-preview-launch` -- 200 OK, 2 claims verified.

Both produced correct structured reports with citations and markdown dossiers.
