import { reviewDeck } from "@/data/mock";
import { ButtonLink, Card, Pill } from "@/components/ui";

export function ReviewView() {
  const cards = reviewDeck.slice(0, 3);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="bg-gradient-to-br from-slateblue to-teal text-white">
          <Pill className="bg-white/15 text-white">Review mode</Pill>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight">
            Reinforce hard words before they fade.
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/82">
            This revision area mixes flashcards, recent mistakes and vocabulary recovery
            so the learner keeps advancing without forgetting older content.
          </p>
          <div className="mt-6 flex gap-3">
            <ButtonLink href="/dictionary">Manage dictionary</ButtonLink>
            <ButtonLink href="/speaking" variant="secondary">Convert to speaking drill</ButtonLink>
          </div>
        </Card>

        <Card>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] bg-sand p-4"><p className="text-sm text-slateblue/60">Due today</p><p className="mt-2 text-3xl font-semibold text-slateblue">14</p></div>
            <div className="rounded-[24px] bg-sand p-4"><p className="text-sm text-slateblue/60">Hard words</p><p className="mt-2 text-3xl font-semibold text-coral">7</p></div>
            <div className="rounded-[24px] bg-sand p-4"><p className="text-sm text-slateblue/60">Recovery score</p><p className="mt-2 text-3xl font-semibold text-teal">81%</p></div>
          </div>

          <div className="mt-5 rounded-[24px] bg-mint/50 p-5">
            <p className="text-sm font-semibold text-slateblue">Review recommendation</p>
            <p className="mt-2 text-sm leading-6 text-slateblue/70">
              Start with finance collocations from recent news sessions, then move to
              presentation transitions before speaking again.
            </p>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.id}>
            <p className="text-xs uppercase tracking-[0.24em] text-slateblue/45">Flashcard prompt</p>
            <h4 className="mt-4 text-2xl font-semibold text-slateblue">{card.prompt}</h4>
            <div className="mt-6 rounded-[24px] bg-sand p-5">
              <p className="text-sm text-slateblue/60">Answer</p>
              <p className="mt-2 text-lg font-semibold text-slateblue">{card.word}</p>
              <p className="mt-2 text-sm text-slateblue/72">{card.example}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-teal">Learned</span>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">Review</span>
              <span className="rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold text-coral">Hard</span>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
