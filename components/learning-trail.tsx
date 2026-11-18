import { LockKeyhole, Sparkles, Trophy } from "lucide-react";
import { modules } from "@/data/modules";
import { ButtonLink, Card, Pill } from "@/components/ui";
import { cn } from "@/lib/utils";

export function LearningTrailView() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <Card className="bg-gradient-to-br from-white to-blush/40">
          <Pill className="bg-rosewood/10 text-rosewood">Trail system</Pill>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slateblue">
            A 150-step path built for finance fluency.
          </h3>
          <p className="mt-3 text-sm leading-7 text-slateblue/70">
            The sequence blends business vocabulary, market interpretation, meetings,
            speaking and revision loops. Completed modules fuel XP, streaks and the next
            recommendation engine.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] bg-white p-4"><p className="text-xs uppercase tracking-[0.2em] text-slateblue/50">Complete</p><p className="mt-2 text-2xl font-semibold text-slateblue">60</p></div>
            <div className="rounded-[22px] bg-white p-4"><p className="text-xs uppercase tracking-[0.2em] text-slateblue/50">Current</p><p className="mt-2 text-2xl font-semibold text-coral">1</p></div>
            <div className="rounded-[22px] bg-white p-4"><p className="text-xs uppercase tracking-[0.2em] text-slateblue/50">Locked</p><p className="mt-2 text-2xl font-semibold text-slateblue">89</p></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/chat">Ask coach what to study</ButtonLink>
            <ButtonLink href="/review" variant="secondary">Start adaptive review</ButtonLink>
          </div>
        </Card>

        <Card>
          <div className="flex flex-wrap gap-3">
            <Pill className="bg-teal/10 text-teal">70% business/finance</Pill>
            <Pill className="bg-slateblue/8 text-slateblue">30% general English</Pill>
            <Pill className="bg-gold/12 text-gold">Checkpoints every 10 modules</Pill>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {["Business Fundamentals", "Finance Vocabulary", "Meetings & Presentations", "Market News Interpretation", "Emails & Writing", "Negotiation & Conversation", "General English Essentials", "Speaking Practice", "Review & Dictionary Reinforcement"].map((category) => (
              <div key={category} className="rounded-[22px] bg-sand p-4">
                <p className="font-semibold text-slateblue">{category}</p>
                <p className="mt-2 text-sm text-slateblue/65">
                  {modules.filter((module) => module.category === category).length} modules
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slateblue">Progress map</p>
            <p className="mt-1 text-sm text-slateblue/65">
              Duolingo-style path with visual rhythm, checkpoints and progressive unlocks.
            </p>
          </div>
          <Pill className="bg-coral/10 text-coral">Visual progression</Pill>
        </div>

        <div className="mt-8 grid gap-y-8">
          {Array.from({ length: 15 }, (_, rowIndex) => {
            const rowModules = modules.slice(rowIndex * 10, rowIndex * 10 + 10);
            const direction = rowIndex % 2 === 0 ? rowModules : [...rowModules].reverse();
            return (
              <div key={rowIndex} className="grid grid-cols-2 gap-4 sm:grid-cols-5 xl:grid-cols-10">
                {direction.map((module) => {
                  const completed = module.status === "completed";
                  const current = module.status === "current";
                  const locked = module.status === "locked";
                  return (
                    <div key={module.id} className="relative flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-24 w-full flex-col items-center justify-center rounded-[28px] border text-center shadow-sm transition",
                          completed && "border-teal/20 bg-gradient-to-br from-mint to-white text-teal",
                          current && "border-coral/30 bg-gradient-to-br from-coral to-rosewood text-white",
                          locked && "border-slateblue/10 bg-slateblue/5 text-slateblue/40"
                        )}
                      >
                        <div className="mb-2">
                          {module.checkpoint ? <Trophy className="h-4 w-4" /> : locked ? <LockKeyhole className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                        </div>
                        <p className="text-xs font-semibold">#{module.id}</p>
                        <p className="mt-1 line-clamp-2 px-2 text-[11px] leading-4">{module.title}</p>
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-[11px] font-medium text-slateblue/70">{module.type.replace("_", " ")}</p>
                        <p className="text-[11px] text-slateblue/50">{module.xp} XP • {module.estimatedMinutes} min</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
