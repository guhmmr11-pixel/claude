import { NextResponse } from "next/server";
import {
  speakingEvaluation,
  speakingPrompt,
  speakingTranscript
} from "@/data/mock";

export async function GET() {
  return NextResponse.json({
    provider: "mock",
    prompt: speakingPrompt,
    transcript: speakingTranscript,
    evaluation: speakingEvaluation,
    integrationNotes: [
      "Use Web Speech API or recorded audio transcription.",
      "Call a model to score grammar, clarity, vocabulary and fluency.",
      "Store speaking history to show long-term improvement."
    ]
  });
}
