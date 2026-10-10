# Jaanch (जाँच)

A source-backed AI investigation tool that checks article claims. Paste a link, and an autonomous AI agent extracts factual claims, verifies each one against independent sources via SerpAPI, and compiles a clear markdown report with verdicts, evidence, and citations.

## Demo
https://www.loom.com/share/801ca4e5751b42409c6a164cf7304983

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

**Input URL**: `https://www.bbc.com/news/articles/cwvgdpv642g5o`

**Report** (abridged):

```
# Investigation Report: Ukraine war: Russian glide bomb attack on Zaporizhzhia kills at least 15 people

- Source URL: https://www.bbc.com/news/articles/cwvgdpv642g5o
- Domain: bbc.com
- Date of Investigation: October 10, 2026
- Author: Editorial Staff
- Published: 2026-10-10T16:03:42.278Z
- Claims Analyzed: 4
- Summary: 3 supported, 0 misleading, 1 needs context

## Overall Read

This article contains 4 key empirical claims. Our autonomous agent verified 3 claims as backed by reputable sources, while 0 appeared misleading or exaggerated, and 1 require additional context or qualifications to be fully evaluated.

## Claims and Evidence

### Claim 1: Russia attacked the Ukrainian city of Zaporizhzhia with five glide bombs on Saturday morning, killing at least 15 people, including three children.

- Verdict: **Needs Context** (Confidence: 60%)
- Quote from article: "Russia has attacked the Ukrainian city of Zaporizhzhia with five glide bombs, killing at least 15 people including three children, officials said."

The only relevant result, a post from an official Ukrainian account, corroborates the five glide bombs and the three children but reports twelve confirmed deaths, not the at least fifteen in the claim. The other results (NRC on dirty bombs, PBS on Jakarta bombings) are unrelated, so the higher toll and the Saturday-morning timing remain unverified and may reflect a later update.

#### Evidence and Citations

- **[Nuclear Regulatory Commission (NRC) (.gov)](https://www.nrc.gov/regulations-legislation/fact-sheets-brochures/backgrounder-on-dirty-bombs)**: Background. A "dirty bomb" is a type of "radiological dispersal device" that combines a conventional explosive, such as dynamite, with radioactive material.
- **[PBS](https://www.pbs.org/newshour/show/terrorists-detonate-bombs-in-indonesian-hotels)**: That all follows the suicide bombings in Jakarta, Indonesia. Eight people were killed; more than 50 wounded at two American luxury hotels.
- **[Instagram · zelenskyy_official](https://www.instagram.com/reel/DeTwDqiM-Vg/)**: ... five glide bombs on residential buildings in Zaporizhzhia. As of now, sadly, twelve people have been confirmed killed, including three children.

### Claim 2: Ukrainian President Volodymyr Zelensky said the Zaporizhzhia attacks were Russia expressing thanks for a deal announced by US President Donald Trump easing sanctions on Moscow to import Russian diesel.

- Verdict: **Supported** (Confidence: 75%)
- Quote from article: "Russia expressing "its thanks" for a deal announced by US President Donald Trump last night easing sanctions on Moscow to import Russian diesel."

Cross-referenced against 3 independent search results. Core assertion aligns with reported facts.

#### Evidence and Citations

- **[The Guardian](https://www.theguardian.com/world/2026/oct/10/ukraine-russia-strikes-war-trump-diesel-deal-zelenskyy)**: Ukraine hit by deadly Russian strikes as 'thanks' for Trump diesel deal, Zelenskyy says. Ukrainian president says money from fuel sales will ...
- **[CNN](https://www.cnn.com/2026/10/09/politics/trump-putin-russian-diesel)**: Zelensky has slammed an agreement on diesel fuel between the US and Russia, casting the decision as an “investment in a war that must be ended, ...
- **[South China Morning Post](https://www.scmp.com/news/world/europe/article/3370451/russian-attacks-kill-15-ukraine-after-trump-strikes-diesel-deal-putin?module=top_story&pgtype=subsection)**: Zelensky said Ukraine was preparing meetings and coordinating steps to counter the extra revenue Russia will receive from the diesel deal. In a ...

### Claim 3: On Thursday, at least 33 people were killed in a Russian glide bomb attack on two civilian buses in Kramatorsk, in the eastern Donetsk region.

- Verdict: **Supported** (Confidence: 75%)
- Quote from article: "On Thursday, at least 33 people were killed in another Russian glide bomb attack on two civilian buses in Kramatorsk, in the eastern Donetsk region."

Cross-referenced against 3 independent search results. Core assertion aligns with reported facts.

#### Evidence and Citations

- **[Radio Free Europe/Radio Liberty](https://www.rferl.org/a/ukraine-russia-bombs-dead-energy-winter/33672540.html)**: At least three people were killed in overnight Russian strikes that targeted residential buildings in the eastern city of Kramatorsk.
- **[Instagram · themorning.lk](https://www.instagram.com/p/DePEM0BDUGZ/)**: Thirty-three people have been killed in a Russian glide bomb attack on two civilian buses in the frontline city of Kramatorsk, rescue officials ...
- **[upday News](https://www.upday.com/uk/world/at-least-33-killed-after-russian-glide-bomb-hits-two-passenger-buses-in-kramatorsk/5szmceg)**: A Russian glide bomb attack on two passenger buses in the frontline city of Kramatorsk in eastern Ukraine has killed up to 33 people and ...

### Claim 4: According to the UN, the number of civilian casualties in Ukraine jumped by 55% in the first eight months of the year.

- Verdict: **Supported** (Confidence: 88%)
- Quote from article: "The number of civilian casualties in Ukraine jumped by 55% in the first eight months of this year, according to the UN."

The UN Human Rights Monitoring Mission in Ukraine reports that civilian casualties from January to August were 55 per cent higher than in the same period the previous year, and independent outlets report the same figure. The claim omits that the 55% is a year-over-year comparison against the same period in 2025, but the figure and attribution to the UN are accurate.

#### Evidence and Citations

- **[Kyiv Post](https://www.kyivpost.com/post/86061)**: In brief: The United Nations has verified 15,280 civilian casualties in Ukraine during the first eight months of 2026, marking a 55% surge ...
- **[Euromaidan Press](https://euromaidanpress.com/2026/10/06/ukraines-civilian-casualties-55-higher-in-first-eight-months-than-in-the-same-period-in-2025-un-says/)**: The UN Human Rights Office verified some 15,280 civilian casualties in Ukraine during the first eight months of 2026, 55% more than in the ...
- **[UN Human Rights Monitoring Mission in Ukraine](https://ukraine.ohchr.org/en/Protection-of-Civilians-in-Armed-Conflict-August-2026)**: Civilian casualties from January to August 2026 (2,222 killed; 13,058 injured) were 55 per cent higher than in the same period in 2025 and more ...

---
_Generated by Jaanch Investigation Engine._

```


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
