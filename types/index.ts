export type ModuleStatus = "completed" | "current" | "locked";
export type ModuleType =
  | "vocabulary"
  | "reading"
  | "speaking"
  | "grammar"
  | "business_case"
  | "news"
  | "review";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type LearningCategory =
  | "Business Fundamentals"
  | "Finance Vocabulary"
  | "Meetings & Presentations"
  | "Market News Interpretation"
  | "Emails & Writing"
  | "Negotiation & Conversation"
  | "General English Essentials"
  | "Speaking Practice"
  | "Review & Dictionary Reinforcement";

export interface LearningModule {
  id: number;
  title: string;
  category: LearningCategory;
  status: ModuleStatus;
  xp: number;
  type: ModuleType;
  difficulty: Difficulty;
  estimatedMinutes: number;
  checkpoint: boolean;
  description: string;
}

export interface ProgressStat {
  label: string;
  value: string;
  caption: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  type: string;
  time: string;
  outcome: string;
}

export interface Recommendation {
  id: string;
  title: string;
  reason: string;
  cta: string;
  href: string;
}

export interface CategoryProgress {
  category: LearningCategory;
  completed: number;
  total: number;
  focus: "Business" | "General";
}

export interface TeacherMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  tag?: string;
}

export interface TeacherContext {
  learnerLevel?: "Beginner" | "Intermediate" | "Advanced";
  progressLabel?: string;
  currentModuleTitle?: string;
  recurringErrors?: string[];
  curriculumFocus?: "70/30 business-general";
}

export interface TeacherApiRequest {
  messages: Array<Pick<TeacherMessage, "role" | "content">>;
  context?: TeacherContext;
}

export interface TeacherApiResponse {
  message: Pick<TeacherMessage, "role" | "content">;
  provider: "openai";
}

export interface NewsArticle {
  id: string;
  originalHeadline: string;
  source: string;
  publishedAt: string;
  category: "Markets" | "Companies" | "Economy" | "Strategy" | "Tech" | "Leadership";
  sourceTier: "Premium" | "Trusted";
  credibilityNote: string;
  editorialReason: string;
  summary: string;
  usefulExpressions: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  guidedReading: string[];
  keyVocabulary: Array<{
    term: string;
    meaning: string;
    example: string;
  }>;
  questions: string[];
  correctionGuide: string[];
  dictionarySuggestions: string[];
  focus: "Business" | "General";
  estimatedMinutes: number;
  lessonGoal: string;
}

export interface SpeakingEvaluation {
  overall: number;
  grammar: number;
  clarity: number;
  vocabulary: number;
  naturality: number;
  pronunciation: number;
  fluency: number;
  feedback: string[];
  improvedAnswer: string;
  usefulVocabulary: string[];
  nextFocus: string[];
}

export interface DictionaryEntry {
  id: string;
  word: string;
  translation: string;
  simpleDefinition: string;
  example: string;
  category: string;
  origin: "module" | "news" | "chat" | "speaking";
  reviewStatus: "learned" | "review" | "hard";
  addedAt: string;
}
