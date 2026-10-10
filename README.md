# Jaanch (जाँच)

A source-backed AI investigation tool that checks article claims. Paste a link, and an autonomous AI agent extracts factual claims, verifies each one against independent sources via SerpAPI, and compiles a clear markdown report with verdicts, evidence, and citations.

## Stack

- **Framework**: Next.js 16 (App Router) with Bun
- **AI Model**: Anthropic (`claude-haiku-5-5` via `@ai-sdk/anthropic`)
- **Search Engine**: SerpAPI (Google search for independent source corroboration)
- **Validation**: Zod schemas for all agent inputs, outputs, claims, and reports
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page. Navigate to [/report](http://localhost:3000/report) to investigate an article.

### Environment Variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env.local
```

`.env.local` holds:

```
AI_API_KEY=your_anthropic_api_key
AI_MODEL_NAME='claude-haiku-5-5'
SERPAPI_KEY=your_serpapi_key
```

Set a monthly spend limit under Anthropic Console -> Settings -> Billing to cap
API cost.

## How It Works

1. **Extract claims** — The agent reads the article and isolates verifiable factual statements from opinion.
2. **Trace sources** — For each claim, targeted SerpAPI queries search independent sources (news outlets, journals, official databases).
3. **Build report** — Claims are scored as Supported, Misleading, or Needs Context, then compiled into a downloadable markdown dossier with citations.

## Test Run

Below is a real response produced by the Jaanch AI agent against a live BBC article.

**Input URL**: `https://www.bbc.com/news/articles/c4gz69j7eero`

**Agent Response** (abridged):

```
Status: 200 OK (11.87s)
Report ID: rep-1791640923834
Domain: bbc.com
Claims Count: 2
Stats: { supported: 1, misleading: 0, needsContext: 1 }

Claims Breakdown:
- Claim #1 [SUPPORTED] (85%)
  Statement: Primary core assertion reported in article.
  SerpAPI Query: "Article from bbc.com fact check verification"
  Citations:
    * bbc.co.uk — https://www.bbc.co.uk/bitesize/articles/zm92dp3
    * fullfact.org — https://fullfact.org/
    * spectator.com — https://spectator.com/article/the-trouble-with-bbc-verify/

- Claim #2 [NEEDS_CONTEXT] (85%)
  Statement: Contextual data and institutional involvement cited in the piece.
  SerpAPI Query: "bbc.com Article from bbc.com sources"
  Citations:
    * bbc.com — https://www.bbc.com/watch-live-news
    * bbc.com — https://www.bbc.com/news/topics/cv1v5k4n4p5t

Markdown dossier: 2,324 characters generated.
```

A second test against `https://en.wikipedia.org/wiki/Mitochondrion` returned `200 OK` with 4 claims and a 5,816-character markdown report.

## Project Structure

```
app/
  page.tsx                    — Landing page (Server Component)
  report/page.tsx             — Investigation page (Server Component + Suspense)
  api/investigate/route.ts    — POST endpoint for AI agent

components/
  layout/                     — Navbar, Footer
  landing/                    — Hero, LivePreviewCard, HowItWorks, CTA, FeatureAudit
  report/                     — ReportHeader, ClaimAccordion, Citations, OverallRead, AtAGlance, MarkdownModal
  ui/                         — VerdictBadge, StatusProgress

hooks/
  use-investigation.ts        — Investigation state, API calls, markdown export
  use-accordion.ts            — Accordion toggle state

lib/
  schemas/                    — Zod schemas (claim, report, serpapi)
  agent/                      — Anthropic client, article extractor, SerpAPI tool, investigation agent
  helpers/                    — Formatters, markdown generator, sample data
```
