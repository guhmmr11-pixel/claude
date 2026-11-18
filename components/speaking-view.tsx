import { Mic, Radio, Star } from "lucide-react";
import { speakingEvaluation, speakingPrompt, speakingTranscript } from "@/data/mock";
import { ButtonLink, Card, Pill } from "@/components/ui";

export function SpeakingView() {
  const metrics = [
    ["Grammar", speakingEvaluation.grammar],
    ["Clarity", speakingEvaluation.clarity],
    ["Vocabulary", speakingEvaluation.vocabulary],
    ["Naturality", speakingEvaluation.naturality],
    ["Pronunciation", speakingEvaluation.pronunciation],
    ["Fluency", speakingEvaluation.fluency]
  ];

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <section className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <Card className="bg-gradient-to-br from-slateblue to-coral text-white">
          <Pill className="bg-white/15 text-white">Speaking Lab</Pill>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight">
            Practice how you sound in real business moments.
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/82">
            The MVP is ready for the Web Speech API and a future evaluation model. Right
            now it demonstrates the end-to-end teaching experience with mocked
            transcription and scoring.
          </p>

          <div className="mt-6 rounded-[26px] bg-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/60">Prompt</p>
            <p className="mt-3 text-sm leading-7 text-white/88">{speakingPrompt}</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white/10 p-4">
              <Mic className="h-5 w-5" />
              <p className="mt-3 text-sm font-semibold">Record or transcribe</p>
              <p className="mt-2 text-sm text-white/75">Browser speech recognition slot prepared.</p>
            </div>
            <div className="rounded-[24px] bg-white/10 p-4">
              <Radio className="h-5 w-5" />
              <p className="mt-3 text-sm font-semibold">Evaluate and coach</p>
              <p className="mt-2 text-sm text-white/75">Scores, rewritten answer and next speaking goals.</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slateblue">Speech result</p>
              <p className="mt-1 text-sm text-slateblue/60">Mock speaking evaluation from `/api/speaking`</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-gold">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-semibold">{speakingEvaluation.overall}/100</span>
            </div>
          </div>

          <div className="mt-5 rounded-[26px] bg-sand p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slateblue/45">Transcript</p>
            <p className="mt-3 text-sm leading-7 text-slateblue/72">{speakingTranscript}</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {metrics.map(([label, value]) => (
              <div key={label} className="rounded-[24px] bg-sand p-4">
                <p className="text-sm text-slateblue/60">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-slateblue">{value}</p>
                <div className="mt-3 h-2 rounded-full bg-white">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-coral to-rosewood"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <p className="text-sm font-semibold text-slateblue">Detailed feedback</p>
          <div className="mt-4 space-y-3">
            {speakingEvaluation.feedback.map((item) => (
              <div key={item} className="rounded-[22px] bg-sand p-4 text-sm leading-6 text-slateblue/72">{item}</div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <ButtonLink href="/chat">Turn into chat drill</ButtonLink>
            <ButtonLink href="/review" variant="secondary">Review weak spots</ButtonLink>
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-slateblue">Improved answer</p>
          <div className="mt-4 rounded-[24px] bg-mint/55 p-5">
            <p className="text-sm leading-7 text-slateblue/80">{speakingEvaluation.improvedAnswer}</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-sand p-4">
              <p className="text-sm font-semibold text-slateblue">Useful vocabulary</p>
              <ul className="mt-3 space-y-2 text-sm text-slateblue/70">
                {speakingEvaluation.usefulVocabulary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] bg-sand p-4">
              <p className="text-sm font-semibold text-slateblue">Next points to train</p>
              <ul className="mt-3 space-y-2 text-sm text-slateblue/70">
                {speakingEvaluation.nextFocus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
