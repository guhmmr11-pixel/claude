import {
  ActivityItem,
  DictionaryEntry,
  ProgressStat,
  Recommendation,
  SpeakingEvaluation,
  TeacherMessage
} from "@/types";
import { CURRENT_MODULE, modules } from "@/data/modules";

export const learnerName = "Marina";

export const dashboardStats: ProgressStat[] = [
  { label: "Progress", value: `${CURRENT_MODULE - 1}/150`, caption: "40% of the full premium journey completed" },
  { label: "Streak", value: "18 days", caption: "Consistency powered by short daily sessions" },
  { label: "XP", value: "12,480", caption: "Built through lessons, review and speaking" },
  { label: "Business Focus", value: "70%", caption: "Curriculum balance optimized for career impact" }
];

export const recommendations: Recommendation[] = [
  { id: "rec-1", title: "Continue module 61: Interpreting central bank news", reason: "Best next step because it reinforces market vocabulary and reading accuracy.", cta: "Resume trail", href: "/learn" },
  { id: "rec-2", title: "Speaking drill: explain this week's inflation surprise", reason: "Your fluency is improving, but clarity drops when you summarize macro topics.", cta: "Train speaking", href: "/speaking" },
  { id: "rec-3", title: "Review 8 hard words from recent chats", reason: "Adaptive review can lift retention before your next news session.", cta: "Open dictionary", href: "/dictionary" }
];

export const activities: ActivityItem[] = [
  { id: "a1", title: "Completed: Revenue vs profit", type: "Module", time: "Today, 08:40", outcome: "+25 XP" },
  { id: "a2", title: "News Lab: Fed signal and bond yields", type: "News", time: "Yesterday", outcome: "3/4 comprehension answers correct" },
  { id: "a3", title: "Speaking practice: investor update", type: "Speaking", time: "Yesterday", outcome: "Clarity improved to 82/100" },
  { id: "a4", title: "Added 5 words to personal dictionary", type: "Dictionary", time: "2 days ago", outcome: "2 words marked hard" }
];

export const weaknessSignals = [
  "Prepositions in finance phrases: 'increase in', 'exposure to', 'impact on'.",
  "Natural transitions in presentations: 'moving on', 'in contrast', 'from a margin perspective'.",
  "Fluency under time pressure during speaking tasks."
];

export const teacherMessages: TeacherMessage[] = [
  { id: "m1", role: "assistant", tag: "Coach", content: "Let's work on business English today. Tell me how your company performed this quarter, and I’ll help you make it sound more natural and executive-ready." },
  { id: "m2", role: "user", content: "This quarter we had a good increase on revenue, but the costs also grow a lot and the margin was pressure." },
  { id: "m3", role: "assistant", tag: "Correction", content: "Strong idea. A more natural version is: 'This quarter, our revenue increased nicely, but costs also grew significantly, which put pressure on our margin.' Use 'increase in revenue' or 'revenue increased', and 'put pressure on' is the natural business expression." },
  { id: "m4", role: "assistant", tag: "Next step", content: "Now try a sharper version for a leadership meeting in 2 sentences only. Focus on clarity and confidence." }
];

export const newsArticles = [
  {
    id: "n1",
    originalHeadline: "Global stocks edge higher as inflation data cools",
    source: "Reuters",
    publishedAt: "2026-04-13",
    category: "Markets",
    sourceTier: "Premium",
    credibilityNote: "Global wire service widely trusted for speed, clarity, and market relevance.",
    editorialReason: "High-value article for rate-cut language, investor sentiment, and market reaction verbs.",
    summary: "Stocks moved higher after softer inflation data made investors more hopeful that central banks could cut interest rates later this year.",
    usefulExpressions: ["edge higher", "cooling inflation", "rate-cut hopes", "bond yields fell"],
    level: "Intermediate",
    guidedReading: ["This article links lower inflation to possible interest-rate cuts.", "When rates may fall, growth stocks often benefit because future earnings look more attractive.", "Watch how journalists connect data, central banks, and market sentiment in one paragraph."],
    keyVocabulary: [
      { term: "cools", meaning: "becomes less intense or grows more slowly", example: "Inflation cooled faster than analysts expected." },
      { term: "edge higher", meaning: "increase slightly", example: "European shares edged higher in morning trading." },
      { term: "bond yields", meaning: "the return investors earn from government or corporate bonds", example: "Bond yields fell after the data release." }
    ],
    questions: ["Why did stocks react positively to the inflation reading?", "What is the connection between rates and growth stocks?", "How would you explain 'investor sentiment' in simple English?"],
    correctionGuide: [
      "If the learner writes 'stocks grow because inflation lower', correct to 'Stocks rose because lower inflation increased hopes of rate cuts.'",
      "Encourage cause-and-effect connectors such as 'because', 'which led to', and 'as a result'.",
      "Prefer natural finance phrasing such as 'markets priced in', 'investors reacted positively', and 'bond yields declined'."
    ],
    dictionarySuggestions: ["bond yields", "rate cut", "investor sentiment", "growth stocks"],
    focus: "Business"
  },
  {
    id: "n2",
    originalHeadline: "Oil slips as traders weigh demand outlook and supply risks",
    source: "Bloomberg",
    publishedAt: "2026-04-12",
    category: "Economy",
    sourceTier: "Premium",
    credibilityNote: "Top-tier financial newsroom with strong commodities and macro coverage.",
    editorialReason: "Excellent for commodity language, uncertainty verbs, and balancing opposing market forces.",
    summary: "Oil prices moved lower as traders balanced weak demand expectations against geopolitical risks that could reduce supply.",
    usefulExpressions: ["weigh the outlook", "supply risks", "prices slipped", "demand weakness"],
    level: "Advanced",
    guidedReading: ["The article contrasts demand weakness with supply constraints.", "This is a common structure in finance writing: one force pulls prices down while another supports them.", "Notice verbs that signal uncertainty, such as 'weigh', 'assess', and 'monitor'."],
    keyVocabulary: [
      { term: "demand outlook", meaning: "expectation for future demand", example: "A weaker demand outlook pushed prices down." },
      { term: "supply risks", meaning: "events that may reduce available supply", example: "Supply risks kept traders cautious." },
      { term: "dipped", meaning: "fell slightly", example: "Brent crude dipped below a key level." }
    ],
    questions: ["What two opposite forces are shaping oil prices here?", "Why do journalists use the verb 'weigh' in market articles?", "Summarize the article in one sentence for a colleague."],
    correctionGuide: [
      "If the learner says only one side of the story, prompt them to mention both demand and supply.",
      "Upgrade vague verbs like 'think about' to business verbs such as 'assess', 'weigh', and 'monitor'.",
      "Help the learner summarize in one balanced sentence with contrast language like 'while' or 'even as'."
    ],
    dictionarySuggestions: ["demand outlook", "supply risks", "shipping disruptions", "commodity traders"],
    focus: "Business"
  },
  {
    id: "n3",
    originalHeadline: "Big banks prepare for slower loan growth as rates stay elevated",
    source: "Financial Times",
    publishedAt: "2026-04-11",
    category: "Companies",
    sourceTier: "Premium",
    credibilityNote: "Highly credible international business publication with strong banking and corporate analysis.",
    editorialReason: "Useful for earnings language, loan growth vocabulary, and explaining management guidance.",
    summary: "Large banks are becoming more cautious because high interest rates may slow borrowing and make customers less willing to take new loans.",
    usefulExpressions: ["loan growth slows", "management guidance", "higher-for-longer rates", "credit demand softens"],
    level: "Intermediate",
    guidedReading: [
      "The article focuses on how elevated rates affect bank growth expectations.",
      "Notice the difference between what already happened and what executives expect next quarter.",
      "This is useful language for earnings calls and investor updates."
    ],
    keyVocabulary: [
      { term: "loan growth", meaning: "the pace at which a bank's loan book expands", example: "Loan growth slowed in the retail segment." },
      { term: "elevated", meaning: "still high compared with a normal level", example: "Rates remained elevated through the quarter." },
      { term: "guidance", meaning: "management's forecast or expectations", example: "The bank lowered its guidance for the year." }
    ],
    questions: [
      "Why could high rates reduce loan growth?",
      "What does 'guidance' mean in a business context?",
      "How would you explain this story to a colleague in simple English?"
    ],
    correctionGuide: [
      "Push the learner to separate current performance from future expectations.",
      "Correct 'the bank is with less loans' to 'the bank expects slower loan growth'.",
      "Encourage earnings vocabulary such as 'outlook', 'guidance', and 'credit demand'."
    ],
    dictionarySuggestions: ["loan growth", "guidance", "credit demand", "elevated rates"],
    focus: "Business"
  },
  {
    id: "n4",
    originalHeadline: "Why top managers are rewriting team rituals after the return to office",
    source: "Harvard Business Review",
    publishedAt: "2026-04-09",
    category: "Leadership",
    sourceTier: "Premium",
    credibilityNote: "Trusted leadership and management source with strong executive communication relevance.",
    editorialReason: "Supports the 30% general-professional English slice with leadership vocabulary and workplace communication.",
    summary: "Managers are redesigning meetings, feedback habits, and team routines so hybrid work can feel clearer and more intentional.",
    usefulExpressions: ["team rituals", "feedback cadence", "hybrid norms", "manager expectations"],
    level: "Beginner",
    guidedReading: [
      "This is not pure finance, but it is high-value professional English.",
      "Focus on management verbs like redesign, align, reinforce, and clarify.",
      "Notice how leadership articles often frame problems around culture and behavior."
    ],
    keyVocabulary: [
      { term: "rituals", meaning: "repeated team habits or routines", example: "Weekly check-ins became an important team ritual." },
      { term: "cadence", meaning: "the regular timing of something", example: "The team changed the cadence of feedback sessions." },
      { term: "hybrid", meaning: "a mix of in-office and remote work", example: "Hybrid teams need clearer communication rules." }
    ],
    questions: [
      "Why are managers changing team rituals now?",
      "What does 'cadence' mean in a workplace setting?",
      "Which useful leadership expression from this article would you use at work?"
    ],
    correctionGuide: [
      "If the learner is too literal, help them sound more natural with phrases like 'set expectations' and 'align the team'.",
      "Encourage concise workplace summaries rather than word-for-word translation.",
      "Reinforce leadership vocabulary that transfers well to daily work communication."
    ],
    dictionarySuggestions: ["cadence", "hybrid norms", "set expectations", "team rituals"],
    focus: "General"
  },
  {
    id: "n5",
    originalHeadline: "Chipmakers rally as AI spending outlook lifts semiconductor shares",
    source: "CNBC",
    publishedAt: "2026-04-08",
    category: "Tech",
    sourceTier: "Premium",
    credibilityNote: "Widely followed business network with strong public-markets and corporate technology coverage.",
    editorialReason: "Useful for earnings-driven tech English, sector rotation language, and investor optimism vocabulary.",
    summary: "Semiconductor stocks rose after investors became more confident that companies will keep spending on AI infrastructure and data centers.",
    usefulExpressions: ["AI spending outlook", "sector rally", "chipmakers surged", "capex momentum"],
    level: "Intermediate",
    guidedReading: [
      "This story links one business theme, AI investment, to stock-market performance.",
      "Watch how the article connects demand expectations to valuation and momentum.",
      "This is useful language for tech briefings and market commentary."
    ],
    keyVocabulary: [
      { term: "chipmakers", meaning: "companies that design or produce semiconductors", example: "Chipmakers led the Nasdaq higher." },
      { term: "outlook", meaning: "expectation for the future", example: "The outlook for AI infrastructure remains strong." },
      { term: "capex", meaning: "capital expenditure, or money spent on long-term assets", example: "Management increased capex guidance for new servers." }
    ],
    questions: [
      "Why did semiconductor shares rise in this article?",
      "What does 'capex' mean in a business context?",
      "How would you summarize this story for a product or strategy team?"
    ],
    correctionGuide: [
      "Encourage the learner to explain both the business driver and the market reaction.",
      "Upgrade 'companies spend more in AI' to 'companies are expected to sustain AI-related capital expenditure'.",
      "Use sector language such as 'semiconductor names', 'the tech sector', and 'investor optimism'."
    ],
    dictionarySuggestions: ["chipmakers", "capex", "AI infrastructure", "sector rally"],
    focus: "Business"
  },
  {
    id: "n6",
    originalHeadline: "Executives rethink pricing as consumers show new signs of fatigue",
    source: "The Wall Street Journal",
    publishedAt: "2026-04-07",
    category: "Strategy",
    sourceTier: "Premium",
    credibilityNote: "Major global business publication with strong corporate, consumer, and executive reporting.",
    editorialReason: "Strong article for pricing strategy language, consumer behavior vocabulary, and decision-making tone.",
    summary: "Business leaders are reviewing their pricing strategies because customers are becoming more careful about spending after a long period of higher prices.",
    usefulExpressions: ["consumer fatigue", "pricing power", "pass through costs", "demand softens"],
    level: "Intermediate",
    guidedReading: [
      "This article is valuable for strategy and management discussions, not only finance teams.",
      "Notice how pricing, margins, and consumer behavior are connected.",
      "The tone is useful for executive summaries and board updates."
    ],
    keyVocabulary: [
      { term: "pricing power", meaning: "the ability to raise prices without losing too many customers", example: "Brands with strong pricing power protected their margins." },
      { term: "pass through", meaning: "to transfer higher costs to customers through prices", example: "Retailers struggled to pass through rising input costs." },
      { term: "fatigue", meaning: "a growing unwillingness to continue with the same pressure or pattern", example: "Signs of consumer fatigue worried management teams." }
    ],
    questions: [
      "Why are executives rethinking pricing now?",
      "What does 'pricing power' mean?",
      "How could this topic appear in a leadership meeting?"
    ],
    correctionGuide: [
      "Correct overly literal phrasing like 'people are tired to buy' to 'consumers are showing signs of spending fatigue'.",
      "Encourage strategy language such as 'reassess', 'protect margins', and 'balance demand with pricing'.",
      "Help the learner describe management trade-offs more precisely."
    ],
    dictionarySuggestions: ["pricing power", "pass through costs", "consumer fatigue", "protect margins"],
    focus: "Business"
  },
  {
    id: "n7",
    originalHeadline: "Hiring holds up as wage growth cools, giving policymakers mixed signals",
    source: "New York Times Business",
    publishedAt: "2026-04-06",
    category: "Economy",
    sourceTier: "Premium",
    credibilityNote: "Recognized international newsroom with strong explanatory coverage of business and economic policy.",
    editorialReason: "Good macro article for labor-market English, wage vocabulary, and policy interpretation.",
    summary: "The labor market remains resilient, but slower wage growth gives central bankers a more balanced picture of inflation pressure.",
    usefulExpressions: ["labor market resilience", "wage growth cools", "mixed signals", "policy outlook"],
    level: "Beginner",
    guidedReading: [
      "This is a macroeconomic article with language that often appears in central-bank coverage.",
      "Focus on how journalists describe mixed data without sounding too certain.",
      "The summary style is helpful for brief spoken updates."
    ],
    keyVocabulary: [
      { term: "holds up", meaning: "remains strong or stable", example: "Consumer demand held up better than expected." },
      { term: "wage growth", meaning: "the rate at which salaries are increasing", example: "Wage growth cooled in the latest report." },
      { term: "policymakers", meaning: "officials who make policy decisions", example: "Policymakers are watching the labor market closely." }
    ],
    questions: [
      "Why does slower wage growth matter for policymakers?",
      "What does 'holds up' mean here?",
      "How would you explain 'mixed signals' in simple English?"
    ],
    correctionGuide: [
      "Guide the learner to mention both hiring and wage growth, not only one data point.",
      "Replace vague language with macro terms like 'labor market', 'inflation pressure', and 'policy outlook'.",
      "Encourage balanced summaries rather than strong conclusions."
    ],
    dictionarySuggestions: ["wage growth", "holds up", "policymakers", "inflation pressure"],
    focus: "General"
  },
  {
    id: "n8",
    originalHeadline: "Europe’s dealmakers test the waters again as financing markets reopen",
    source: "The Economist",
    publishedAt: "2026-04-05",
    category: "Markets",
    sourceTier: "Premium",
    credibilityNote: "Highly respected international publication known for analytical economic and business reporting.",
    editorialReason: "Rich source for M&A, financing, and capital-markets vocabulary in polished international English.",
    summary: "More companies are considering deals again because financing conditions have improved and investors are showing greater appetite for risk.",
    usefulExpressions: ["test the waters", "financing markets reopen", "deal pipeline", "risk appetite improves"],
    level: "Advanced",
    guidedReading: [
      "This article uses polished analytical English with strong idioms and capital-markets vocabulary.",
      "Look at how it links financing conditions to M&A activity.",
      "This style is especially useful for executive and investor-facing communication."
    ],
    keyVocabulary: [
      { term: "dealmakers", meaning: "people or firms involved in mergers, acquisitions, or large transactions", example: "Dealmakers returned as credit spreads narrowed." },
      { term: "risk appetite", meaning: "willingness to accept investment risk", example: "Stronger risk appetite supported equity issuance." },
      { term: "pipeline", meaning: "the group of deals or projects expected to happen soon", example: "Bankers said the deal pipeline is improving." }
    ],
    questions: [
      "Why are dealmakers more active again?",
      "What does 'test the waters' imply in this context?",
      "How would you explain this article in an investor-ready tone?"
    ],
    correctionGuide: [
      "Encourage more polished market language and less literal translation.",
      "Use capital-markets collocations such as 'financing conditions improved' and 'risk appetite recovered'.",
      "Help the learner build one concise sentence with clear business causality."
    ],
    dictionarySuggestions: ["test the waters", "risk appetite", "deal pipeline", "financing conditions"],
    focus: "Business"
  }
];

export const speakingPrompt = "You are presenting to your manager. In 45 seconds, explain why your team should monitor inflation, rates, and consumer demand before revising the budget.";
export const speakingTranscript = "I think we should observe inflation and rates because they change the costs and also the clients behavior. If demand slow down, maybe our sales projection will be very optimistic and then the budget can be not realistic.";

export const speakingEvaluation: SpeakingEvaluation = {
  overall: 84,
  grammar: 80,
  clarity: 86,
  vocabulary: 88,
  naturality: 79,
  pronunciation: 82,
  fluency: 84,
  feedback: ["Your message is clear and relevant for a finance context.", "Use 'customer behavior' instead of 'clients behavior' for a more natural business tone.", "Say 'if demand slows down' and 'the budget may become unrealistic' to improve grammar and polish."],
  improvedAnswer: "We should monitor inflation, interest rates, and customer demand because they directly affect our cost base, pricing decisions, and sales outlook. If demand slows down, our current sales projections may become too optimistic, which means the budget would need to be revised to stay realistic.",
  usefulVocabulary: ["cost base", "sales outlook", "pricing decisions", "revise projections"],
  nextFocus: ["Third-person verbs in conditionals", "More natural finance collocations", "Longer pauses between key ideas for stronger delivery"]
};

export const dictionaryEntries: DictionaryEntry[] = [
  { id: "d1", word: "headwind", translation: "vento contrário / obstáculo", simpleDefinition: "something that makes progress or growth harder", example: "Higher rates remain a headwind for consumer spending.", category: "Market News Interpretation", origin: "news", reviewStatus: "review", addedAt: "2026-04-12" },
  { id: "d2", word: "rollout", translation: "lançamento / implementação", simpleDefinition: "the process of introducing something new", example: "The product rollout will happen in three phases.", category: "Business Fundamentals", origin: "chat", reviewStatus: "learned", addedAt: "2026-04-11" },
  { id: "d3", word: "beat expectations", translation: "superar expectativas", simpleDefinition: "perform better than people expected", example: "The company beat expectations in the first quarter.", category: "Finance Vocabulary", origin: "module", reviewStatus: "hard", addedAt: "2026-04-10" },
  { id: "d4", word: "push back", translation: "contestar / resistir", simpleDefinition: "to oppose or question an idea", example: "Investors pushed back on the revised guidance.", category: "Negotiation & Conversation", origin: "speaking", reviewStatus: "review", addedAt: "2026-04-09" }
];

export const reviewDeck = dictionaryEntries.map((entry, index) => ({ ...entry, prompt: index % 2 === 0 ? entry.simpleDefinition : entry.translation }));
export const nextModule = modules.find((module) => module.id === CURRENT_MODULE)!;
