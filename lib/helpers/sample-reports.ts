import type { InvestigationReport } from "../schemas/report-schema";

export const sampleTestArticle: InvestigationReport = {
  id: "rep-test-bbc",
  url: "https://www.bbc.com/news/articles/c4gz69j7eero",
  domain: "bbc.com",
  title: "Government unveils new carbon capture roadmap and clean energy targets",
  author: "BBC Climate & Science Team",
  publishDate: "2026-10-08T12:00:00.000Z",
  overallRead:
    "The article reliably reports official policy milestones and technical parameters for carbon capture rollout. While primary budget figures and operational timelines are well-corroborated by Treasury documents, long-term emission reduction percentages rely on industry modeling rather than finalized regulatory benchmarks.",
  claimsCount: 4,
  stats: {
    supported: 2,
    misleading: 1,
    needsContext: 1,
  },
  claims: [
    {
      id: "claim-1",
      number: 1,
      statement: "The national carbon capture project commits 21.7 billion pounds in funding over 25 years.",
      quote: "Ministers confirmed a 21.7bn pound capital envelope allocated across two industrial clusters.",
      verdict: "supported",
      confidence: 98,
      explanation:
        "Treasury budget publications and official announcements confirm the 21.7 billion pound allocation across the Teesside and Merseyside clusters over the multi-decade delivery schedule.",
      serpQuery: "UK carbon capture 21.7 billion funding treasury announcement 2024 2025",
      citations: [
        {
          id: "cit-1-1",
          name: "UK Department for Energy Security and Net Zero",
          url: "https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero",
          snippet: "Funding package of up to 21.7 billion pounds committed over 25 years to confirm support for two carbon capture clusters.",
          domain: "gov.uk",
        },
        {
          id: "cit-1-2",
          name: "Financial Times",
          url: "https://www.ft.com",
          snippet: "Britain pledges 22bn pounds for carbon capture projects in industrial heartlands.",
          domain: "ft.com",
        },
      ],
    },
    {
      id: "claim-2",
      number: 2,
      statement: "The initial operational phase will store 8.5 million tonnes of CO2 per year starting in 2028.",
      quote: "Initial facilities are projected to sequester 8.5 million tonnes of carbon dioxide annually from 2028.",
      verdict: "needs_context",
      confidence: 84,
      explanation:
        "The 8.5 million tonne figure represents the theoretical maximum licensed capacity of the combined sites; independent engineering audits indicate early-phase throughput will ramp up gradually between 2028 and 2031.",
      serpQuery: "UK CCUS 8.5 million tonnes CO2 capacity timeline 2028 operational",
      citations: [
        {
          id: "cit-2-1",
          name: "National Audit Office (NAO)",
          url: "https://www.nao.org.uk",
          snippet: "Progress on carbon capture, usage and storage infrastructure: capacity ramp schedules and commercial risk analysis.",
          domain: "nao.org.uk",
        },
      ],
    },
    {
      id: "claim-3",
      number: 3,
      statement: "Carbon capture and storage will eliminate 95% of all residual industrial emissions nationwide.",
      quote: "The initiative is expected to virtually eliminate 95% of hard-to-abate industrial carbon emissions.",
      verdict: "misleading",
      confidence: 91,
      explanation:
        "Official DESNZ projections state CCUS addresses specific localized point-source emitters in designated industrial clusters. Overall national heavy-industry decarbonization requires systemic fuel switching and hydrogen deployment.",
      serpQuery: "CCUS eliminate 95 percent industrial emissions UK CCC report",
      citations: [
        {
          id: "cit-3-1",
          name: "Climate Change Committee",
          url: "https://www.theccc.org.uk",
          snippet: "CCUS contributes an estimated 20-30% of total required manufacturing reductions; 95% refers solely to capture rate at individual retrofit flues.",
          domain: "theccc.org.uk",
        },
      ],
    },
    {
      id: "claim-4",
      number: 4,
      statement: "Over 50,000 skilled jobs will be supported across the northern industrial supply chain.",
      quote: "The programme is forecast to support up to 50,000 direct and supply-chain jobs during construction and operation.",
      verdict: "supported",
      confidence: 92,
      explanation:
        "Economic impact assessments by industry trade bodies and regional development councils corroborate that cumulative supply chain employment during peak construction and operation aligns with this figure.",
      serpQuery: "carbon capture Teesside Merseyside 50000 jobs supply chain assessment",
      citations: [
        {
          id: "cit-4-1",
          name: "Trade Union Congress (TUC) Energy Report",
          url: "https://www.tuc.org.uk",
          snippet: "Regional employment modeling for clean industrial clusters predicts substantial long-term supply chain stabilization.",
          domain: "tuc.org.uk",
        },
      ],
    },
  ],
  markdown: "",
  createdAt: "2026-10-10T12:00:00.000Z",
};
