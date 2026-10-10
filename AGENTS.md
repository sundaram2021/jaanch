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
      |    - Agent uses Anthropic (claude-haiku-5-5 via anthropic-client.ts)
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
| `AI_API_KEY` | API key for Anthropic |
| `AI_MODEL_NAME` | Model identifier (currently `claude-haiku-5-5`) |
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
- `assertModelConfigured()` fails fast with an actionable message when `AI_API_KEY` is unset.
- `maxOutputTokens` caps each model call (2000 claim extraction, 500 claim evaluation).
- Suspense boundary around dynamic `searchParams` usage in report page.
- Graceful error states in `use-investigation.ts` with user-facing messages.

### Test Verification

Articles tested end-to-end against `claude-haiku-5-5`:
- `https://en.wikipedia.org/wiki/Five_elements` -- 4 claims, 3 supported / 1 needs context, 8.0s.
- `https://en.wikipedia.org/wiki/Photosynthesis` -- 4 claims, 3 supported / 1 needs context.
- `https://en.wikipedia.org/wiki/Mitochondrion` via `POST /api/investigate` -- 200 OK, 4 claims, 5,816-char markdown.

Note: `temperature` is not supported by `claude-haiku-5-5` and must not be passed to `generateText`.

Article URLs rot. A 404 from the extractor returns HTTP 404 with a clear message rather than failing the pipeline.
