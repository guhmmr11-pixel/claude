"use client";

import { useState } from "react";
import { ArrowRight, BookmarkPlus, ShieldCheck, Sparkles } from "lucide-react";
import { newsArticles } from "@/data/news-articles";
import { newsCategories, premiumSources } from "@/data/news-sources";
import { ButtonLink, Card, Pill } from "@/components/ui";
import type { NewsArticle } from "@/types";

const difficultyTones = {
  Beginner: "bg-mint text-teal",
  Intermediate: "bg-gold/15 text-gold",
  Advanced: "bg-coral/10 text-coral"
} as const;

export function NewsLabClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof newsCategories)[number]>("Markets");
  const [selectedArticleId, setSelectedArticleId] = useState(newsArticles[0]?.id ?? "");

  const filteredArticles = newsArticles.filter(
    (article) => article.category === selectedCategory
  );

  const selectedArticle =
    filteredArticles.find((article) => article.id === selectedArticleId) ??
    filteredArticles[0] ??
    newsArticles[0];

  const businessCount = newsArticles.filter((article) => article.focus === "Business").length;
  const generalCount = newsArticles.length - businessCount;

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <Card className="overflow-hidden bg-gradient-to-br from-slateblue via-slateblue to-rosewood text-white">
          <div className="flex flex-wrap items-center gap-2">
            <Pill className="bg-white/15 text-white">News Lab</Pill>
            <Pill className="bg-white/12 text-white">Editorial premium</Pill>
          </div>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight">
            Read like a global business professional.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82">
            Each article is selected for editorial credibility and transformed into an
            English-learning session with simplified summary, vocabulary, expressions,
            comprehension prompts and dictionary-ready terms.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Business mix</p>
              <p className="mt-2 text-2xl font-semibold">70%</p>
              <p className="mt-2 text-sm text-white/75">{businessCount} articles focused on business and finance</p>
            </div>
            <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">General transfer</p>
              <p className="mt-2 text-2xl font-semibold">30%</p>
              <p className="mt-2 text-sm text-white/75">{generalCount} articles with professional English carryover</p>
            </div>
            <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Source policy</p>
              <p className="mt-2 text-2xl font-semibold">Whitelist</p>
              <p className="mt-2 text-sm text-white/75">Only recognized publishers and curated fallback mocks</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-white to-blush/35">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slateblue">Approved publishers</p>
              <p className="mt-1 text-sm text-slateblue/60">
                A premium editorial layer keeps the experience far from generic blogs.
              </p>
            </div>
            <div className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-teal">
              Verified
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {premiumSources.map((source) => (
              <span
                key={source}
                className="rounded-full border border-slateblue/8 bg-white px-3 py-2 text-xs font-semibold text-slateblue"
              >
                {source}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] bg-white p-5">
            <div className="flex items-center gap-2 text-teal">
              <ShieldCheck className="h-4 w-4" />
              <p className="text-sm font-semibold">Credibility is visible in the UI</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slateblue/70">
              Every article card surfaces publisher, category, date, difficulty and a
              premium credibility badge before the learner decides to study it.
            </p>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slateblue">Editorial filters</p>
            <p className="mt-1 text-sm text-slateblue/60">
              Select a category to browse curated premium stories.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {newsCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  const nextArticle = newsArticles.find((article) => article.category === category);
                  if (nextArticle) setSelectedArticleId(nextArticle.id);
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === selectedCategory
                    ? "bg-coral text-white shadow-sm"
                    : "bg-white text-slateblue hover:bg-sand"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <NewsArticleCard
              key={article.id}
              article={article}
              isSelected={article.id === selectedArticle.id}
              onStudy={() => setSelectedArticleId(article.id)}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="overflow-hidden bg-gradient-to-br from-white to-sand">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slateblue">Study this article</p>
              <p className="mt-1 text-sm text-slateblue/60">
                Original headline plus a premium learning breakdown.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill className="bg-slateblue text-white">{selectedArticle.category}</Pill>
              <Pill className="bg-mint text-teal">{selectedArticle.source}</Pill>
              <Pill className={difficultyTones[selectedArticle.level]}>
                {selectedArticle.level}
              </Pill>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-slateblue/8 bg-white p-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slateblue/55">
              <span>{selectedArticle.publishedAt}</span>
              <span>•</span>
              <span>{selectedArticle.sourceTier} source</span>
            </div>
            <h4 className="mt-3 text-3xl font-semibold leading-tight text-slateblue">
              {selectedArticle.originalHeadline}
            </h4>
            <p className="mt-5 text-base leading-8 text-slateblue/74">
              {selectedArticle.summary}
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[22px] bg-sand p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slateblue/45">
                  Why this source is trusted
                </p>
                <p className="mt-3 text-sm leading-6 text-slateblue/72">
                  {selectedArticle.credibilityNote}
                </p>
              </div>
              <div className="rounded-[22px] bg-sand p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slateblue/45">
                  Editorial value
                </p>
                <p className="mt-3 text-sm leading-6 text-slateblue/72">
                  {selectedArticle.editorialReason}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <StudyPanel title="Simplified reading notes">
              {selectedArticle.guidedReading.map((item) => (
                <div key={item} className="rounded-[18px] bg-sand p-4 text-sm leading-6 text-slateblue/72">
                  {item}
                </div>
              ))}
            </StudyPanel>

            <StudyPanel title="Useful business expressions">
              <div className="flex flex-wrap gap-2">
                {selectedArticle.usefulExpressions.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-sand px-3 py-2 text-sm font-semibold text-coral"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </StudyPanel>
          </div>
        </Card>

        <div className="space-y-6">
          <StudyPanel title="Key vocabulary">
            {selectedArticle.keyVocabulary.map((item) => (
              <div key={item.term} className="rounded-[18px] bg-sand p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slateblue">{item.term}</p>
                  <button className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slateblue">
                    Save word
                  </button>
                </div>
                <p className="mt-2 text-sm leading-6 text-slateblue/68">{item.meaning}</p>
                <p className="mt-2 text-sm italic text-coral">{item.example}</p>
              </div>
            ))}
          </StudyPanel>

          <StudyPanel title="Comprehension questions">
            {selectedArticle.questions.map((question, index) => (
              <div key={question} className="rounded-[18px] bg-sand p-4">
                <p className="text-sm font-semibold text-slateblue">Question {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-slateblue/68">{question}</p>
              </div>
            ))}
          </StudyPanel>

          <StudyPanel title="Save words to your dictionary">
            <div className="flex flex-wrap gap-2">
              {selectedArticle.dictionarySuggestions.map((item) => (
                <button
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-2 text-sm font-semibold text-teal"
                >
                  <BookmarkPlus className="h-4 w-4" />
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <ButtonLink href="/dictionary">Open dictionary</ButtonLink>
              <ButtonLink href="/chat" variant="secondary">
                Review with coach
              </ButtonLink>
            </div>
          </StudyPanel>
        </div>
      </section>
    </div>
  );
}

function NewsArticleCard({
  article,
  isSelected,
  onStudy
}: {
  article: NewsArticle;
  isSelected: boolean;
  onStudy: () => void;
}) {
  return (
    <Card
      className={`border transition ${
        isSelected
          ? "border-coral/40 bg-gradient-to-br from-blush/45 to-white shadow-md"
          : "border-white/70 bg-white/85"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Pill className="bg-slateblue/8 text-slateblue">{article.category}</Pill>
        <Pill className={difficultyTones[article.level]}>{article.level}</Pill>
        <Pill className="bg-mint text-teal">Premium source</Pill>
      </div>

      <h4 className="mt-4 text-xl font-semibold leading-7 text-slateblue">
        {article.originalHeadline}
      </h4>
      <div className="mt-3 flex items-center gap-2 text-sm text-slateblue/58">
        <span>{article.source}</span>
        <span>•</span>
        <span>{article.publishedAt}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slateblue/72">{article.editorialReason}</p>

      <div className="mt-5 rounded-[20px] bg-sand p-4">
        <div className="flex items-center gap-2 text-teal">
          <ShieldCheck className="h-4 w-4" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">
            Credibility
          </p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slateblue/70">{article.credibilityNote}</p>
      </div>

      <button
        onClick={onStudy}
        className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
          isSelected
            ? "bg-slateblue text-white"
            : "bg-coral text-white hover:bg-coral/90"
        }`}
      >
        {isSelected ? "Studying now" : "Study this article"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </Card>
  );
}

function StudyPanel({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-coral" />
        <p className="text-sm font-semibold text-slateblue">{title}</p>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </Card>
  );
}
