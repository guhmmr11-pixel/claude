import {
  CategoryProgress,
  LearningCategory,
  LearningModule
} from "@/types";

const businessCategories: LearningCategory[] = [
  "Business Fundamentals",
  "Finance Vocabulary",
  "Meetings & Presentations",
  "Market News Interpretation",
  "Emails & Writing",
  "Negotiation & Conversation",
  "Speaking Practice",
  "Review & Dictionary Reinforcement"
];

const generalCategories: LearningCategory[] = [
  "General English Essentials",
  "Speaking Practice",
  "Review & Dictionary Reinforcement"
];

const categoryTitles: Record<LearningCategory, string[]> = {
  "Business Fundamentals": ["Introducing your role", "Talking about priorities", "Company structure essentials", "Describing responsibilities", "Professional small talk"],
  "Finance Vocabulary": ["Reading a P&L snapshot", "Revenue vs profit", "Cash flow language", "Budget planning terms", "Investor update vocabulary"],
  "Meetings & Presentations": ["Opening a meeting", "Clarifying action items", "Presenting a quarterly result", "Handling stakeholder questions", "Summarizing decisions"],
  "Market News Interpretation": ["Inflation headline breakdown", "Interpreting central bank news", "Market reaction signals", "Stocks and sector movement", "Macro trend language"],
  "Emails & Writing": ["Polite follow-up email", "Writing concise updates", "Tone for senior stakeholders", "Requesting information clearly", "Status report writing"],
  "Negotiation & Conversation": ["Negotiating deadlines", "Discussing scope changes", "Expressing disagreement well", "Finding middle ground", "Persuasion language"],
  "General English Essentials": ["Daily routines with confidence", "Travel and logistics", "Ordering and preferences", "Making plans naturally", "Everyday listening signals"],
  "Speaking Practice": ["One-minute market recap", "Pitch your idea clearly", "Answering interview questions", "Explain a chart aloud", "Spontaneous opinion practice"],
  "Review & Dictionary Reinforcement": ["Flashcard sprint", "Error pattern review", "Vocabulary recall drill", "Mixed challenge checkpoint", "Adaptive revision round"]
};

const types = ["vocabulary", "reading", "speaking", "grammar", "business_case", "news", "review"] as const;
const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;

function categoryForIndex(index: number): LearningCategory {
  if (index < 105) return businessCategories[index % businessCategories.length];
  return generalCategories[index % generalCategories.length];
}

export const CURRENT_MODULE = 61;

export const modules: LearningModule[] = Array.from({ length: 150 }, (_, i) => {
  const id = i + 1;
  const category = categoryForIndex(i);
  const titlePool = categoryTitles[category];

  return {
    id,
    title: titlePool[i % titlePool.length],
    category,
    status: id < CURRENT_MODULE ? "completed" : id === CURRENT_MODULE ? "current" : "locked",
    xp: 20 + (i % 4) * 5,
    type: types[i % types.length],
    difficulty: id <= 45 ? difficulties[0] : id <= 105 ? difficulties[1] : difficulties[2],
    estimatedMinutes: 8 + (i % 5) * 3,
    checkpoint: id % 10 === 0,
    description: category === "General English Essentials"
      ? "General English module to build everyday fluency and transfer confidence."
      : "Business-oriented lesson designed for practical communication in finance and corporate contexts."
  };
});

export const categoryProgress: CategoryProgress[] = [...new Set(modules.map((module) => module.category))].map((category) => {
  const all = modules.filter((module) => module.category === category);
  const completed = all.filter((module) => module.status === "completed").length;

  return {
    category,
    completed,
    total: all.length,
    focus: category === "General English Essentials" ? "General" : "Business"
  };
});
