import { NextResponse } from "next/server";
import { newsArticles } from "@/data/news-articles";
import { premiumSources, sourceStrategy } from "@/data/news-sources";

export async function GET() {
  return NextResponse.json({
    provider: "mock",
    sourceMode: sourceStrategy.fallbackPolicy.mode,
    acceptedSources: premiumSources,
    articles: newsArticles,
    integrationNotes: [
      "Replace mocked feed with a business-news API that supports source filtering.",
      "Reject or down-rank outlets outside the premium source whitelist.",
      "Store simplified summary, expressions, comprehension prompts and correction logic from the AI layer.",
      "Filter articles by learner level, editorial category, and 70/30 curriculum balance."
    ]
  });
}
