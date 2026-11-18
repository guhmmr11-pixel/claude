"use client";

import { useState } from "react";
import { CheckCircle2, LibraryBig, Newspaper, ShieldCheck } from "lucide-react";
import { newsArticles } from "@/data/news-articles";
import { newsCategories, premiumSources } from "@/data/news-sources";
import { ButtonLink, Card, Pill } from "@/components/ui";
import {
  difficultyTones,
  NewsArticleCard,
  SaveWordChip,
  StudyPanel
} from "@/components/news-lab-ui";

export function NewsLabPremium() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof newsCategories)[number]>("Markets");
  const [selectedArticleId, setSelectedArticleId] = useState(newsArticles[0]?.id ?? "");
  const [savedWords, setSavedWords] = useState<string[]>([]);

  const filteredArticles = newsArticles.filter(
    (article) => article.category === selectedCategory
  );

  const selectedArticle =
    filteredArticles.find((article) => article.id === selectedArticleId) ??
    filteredArticles[0] ??
    newsArticles[0];

  const businessCount = newsArticles.filter((article) => article.focus === "Business").length;
  const generalCount = newsArticles.length - businessCount;

  function toggleSavedWord(word: string) {
    setSavedWords((current) =>
      current.includes(word)
        ? current.filter((item) => item !== word)
        : [...current, word]
    );
  }

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
              <p className="mt-2 text-2xl font-semibold">70/30</p>
              <p className="mt-2 text-sm text-white/75">
                {businessCount} business-finance stories and {generalCount} professional English stories
              </p>
            </div>
            <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                Study design
              </p>
              <p className="mt-2 text-2xl font-semibold">Mini lesson</p>
              <p className="mt-2 text-sm text-white/75">
                Every article becomes guided reading, vocabulary, expressions, and comprehension.
              </p>
            </div>
            <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Source policy</p>
              <p className="mt-2 text-2xl font-semibold">Whitelist</p>
              <p className="mt-2 text-sm text-white/75">
                Only recognized publishers and curated fallback mocks
              </p>
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
              Select a category to browse premium stories that read like a global business desk.
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
              <span>/</span>
              <span>{selectedArticle.sourceTier} source</span>
            </div>
            <h4 className="mt-3 text-3xl font-semibold leading-tight text-slateblue">
              {selectedArticle.originalHeadline}
            </h4>
            <p className="mt-5 text-base leading-8 text-slateblue/74">
              {selectedArticle.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm font-semibold text-slateblue">
                <Newspaper className="h-4 w-4 text-coral" />
                {selectedArticle.estimatedMinutes} min
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm font-semibold text-slateblue">
                <LibraryBig className="h-4 w-4 text-coral" />
                {selectedArticle.lessonGoal}
              </div>
            </div>

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
            <StudyPanel title="Simplified reading notes" tone="highlight">
              {selectedArticle.guidedReading.map((item) => (
                <div
                  key={item}
                  className="rounded-[18px] bg-sand p-4 text-sm leading-6 text-slateblue/72"
                >
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
                  <SaveWordChip
                    label="Save word"
                    saved={savedWords.includes(item.term)}
                    onClick={() => toggleSavedWord(item.term)}
                  />
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

          <StudyPanel title="Save words to your dictionary" tone="highlight">
            <div className="flex flex-wrap gap-2">
              {selectedArticle.dictionarySuggestions.map((item) => (
                <SaveWordChip
                  key={item}
                  label={item}
                  saved={savedWords.includes(item)}
                  onClick={() => toggleSavedWord(item)}
                />
              ))}
            </div>
            <div className="rounded-[20px] bg-white p-4 text-sm text-slateblue/70">
              <div className="flex items-center gap-2 font-semibold text-slateblue">
                <CheckCircle2 className="h-4 w-4 text-teal" />
                Dictionary bridge
              </div>
              <p className="mt-2 leading-6">
                Saved words can be persisted to the personal dictionary later through the
                same interaction layer, without changing the News Lab UI.
              </p>
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
