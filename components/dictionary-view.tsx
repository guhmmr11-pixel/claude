import { dictionaryEntries } from "@/data/mock";
import { ButtonLink, Card, Pill } from "@/components/ui";

export function DictionaryView() {
  const statusTone = {
    learned: "bg-mint text-teal",
    review: "bg-gold/15 text-gold",
    hard: "bg-coral/10 text-coral"
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <section className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <Card className="bg-gradient-to-br from-white to-blush/45">
          <Pill className="bg-rosewood/10 text-rosewood">Personal dictionary</Pill>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slateblue">
            Capture vocabulary across modules, chat, news and speaking.
          </h3>
          <p className="mt-3 text-sm leading-7 text-slateblue/70">
            Every saved word stores context, translation, simple definition, example,
            source and review status so the revision engine can bring it back at the
            right time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/review">Review flashcards</ButtonLink>
            <ButtonLink href="/news-lab" variant="secondary">Add from News Lab</ButtonLink>
          </div>
        </Card>

        <Card>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] bg-sand p-4"><p className="text-sm text-slateblue/60">Saved words</p><p className="mt-2 text-3xl font-semibold text-slateblue">48</p></div>
            <div className="rounded-[24px] bg-sand p-4"><p className="text-sm text-slateblue/60">Need review</p><p className="mt-2 text-3xl font-semibold text-gold">19</p></div>
            <div className="rounded-[24px] bg-sand p-4"><p className="text-sm text-slateblue/60">Hard</p><p className="mt-2 text-3xl font-semibold text-coral">7</p></div>
          </div>

          <div className="mt-5 rounded-[24px] bg-mint/50 p-5">
            <p className="text-sm font-semibold text-slateblue">Reinforcement logic</p>
            <p className="mt-2 text-sm leading-6 text-slateblue/70">
              Hard words are surfaced first in flashcards and speaking follow-ups.
              News-derived words are prioritized before new market articles.
            </p>
          </div>
        </Card>
      </section>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slateblue">Saved vocabulary</p>
            <p className="mt-1 text-sm text-slateblue/60">
              Mock persistent dictionary entries, ready for Supabase or another DB.
            </p>
          </div>
          <Pill className="bg-slateblue/8 text-slateblue">Filter-ready</Pill>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slateblue/10 text-slateblue/55">
                <th className="pb-3 font-medium">Word</th>
                <th className="pb-3 font-medium">Definition</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Origin</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Added</th>
              </tr>
            </thead>
            <tbody>
              {dictionaryEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-slateblue/6 align-top">
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-slateblue">{entry.word}</p>
                    <p className="mt-1 text-slateblue/55">{entry.translation}</p>
                  </td>
                  <td className="py-4 pr-4">
                    <p className="text-slateblue/75">{entry.simpleDefinition}</p>
                    <p className="mt-2 italic text-coral">{entry.example}</p>
                  </td>
                  <td className="py-4 pr-4 text-slateblue/70">{entry.category}</td>
                  <td className="py-4 pr-4 capitalize text-slateblue/70">{entry.origin}</td>
                  <td className="py-4 pr-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone[entry.reviewStatus]}`}>
                      {entry.reviewStatus}
                    </span>
                  </td>
                  <td className="py-4 text-slateblue/60">{entry.addedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
