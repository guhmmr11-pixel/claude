export const premiumSources = [
  "Financial Times",
  "The Wall Street Journal",
  "Bloomberg",
  "Reuters",
  "CNBC",
  "The Economist",
  "New York Times Business",
  "Harvard Business Review"
] as const;

export const newsCategories = [
  "Markets",
  "Companies",
  "Economy",
  "Strategy",
  "Tech",
  "Leadership"
] as const;

export const sourceStrategy = {
  acceptedSources: premiumSources,
  editorialRules: [
    "Prefer premium, globally recognized business and economics publishers.",
    "Prioritize recent stories with strong value for business English and finance English.",
    "Maintain a 70/30 mix between business-finance topics and broader professional English.",
    "If a news API cannot guarantee the premium source whitelist, use curated mocked stories as fallback.",
    "Keep source metadata explicit so the UI can communicate credibility clearly."
  ],
  fallbackPolicy: {
    mode: "premium_mock_fallback",
    reason:
      "Preserve editorial quality even when upstream APIs return weak, generic, or sensationalist outlets."
  }
} as const;
