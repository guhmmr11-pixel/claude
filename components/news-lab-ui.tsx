import { ArrowRight, BookmarkPlus, Check, ShieldCheck, Sparkles } from "lucide-react";
import { ReactNode } from "react";
import { Card, Pill } from "@/components/ui";
import type { NewsArticle } from "@/types";

export const difficultyTones = {
  Beginner: "bg-mint text-teal",
  Intermediate: "bg-gold/15 text-gold",
  Advanced: "bg-coral/10 text-coral"
} as const;

export function NewsArticleCard({
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
        <span>/</span>
        <span>{article.publishedAt}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slateblue/72">{article.editorialReason}</p>

      <div className="mt-5 rounded-[20px] bg-sand p-4">
        <div className="flex items-center gap-2 text-teal">
          <ShieldCheck className="h-4 w-4" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Credibility</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slateblue/70">{article.credibilityNote}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="rounded-[18px] bg-sand px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slateblue/60">
          {article.estimatedMinutes} min lesson
        </div>
        <button
          onClick={onStudy}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            isSelected
              ? "bg-slateblue text-white"
              : "bg-coral text-white hover:bg-coral/90"
          }`}
        >
          {isSelected ? "Studying now" : "Study this article"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}

export function StudyPanel({
  title,
  children,
  tone = "default"
}: {
  title: string;
  children: ReactNode;
  tone?: "default" | "highlight";
}) {
  return (
    <Card className={tone === "highlight" ? "bg-gradient-to-br from-white to-mint/35" : undefined}>
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-coral" />
        <p className="text-sm font-semibold text-slateblue">{title}</p>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </Card>
  );
}

export function SaveWordChip({
  label,
  saved,
  onClick
}: {
  label: string;
  saved: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
        saved ? "bg-teal text-white" : "bg-mint text-teal"
      }`}
    >
      {saved ? <Check className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
      {saved ? `${label} saved` : label}
    </button>
  );
}
