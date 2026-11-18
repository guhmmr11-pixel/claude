import { SendHorizonal, Sparkles } from "lucide-react";
import { teacherMessages } from "@/data/mock";
import { ButtonLink, Card, Pill } from "@/components/ui";

export function ChatView() {
  return (
    <div className="grid gap-6 p-6 lg:grid-cols-[0.78fr_1.22fr] lg:p-8">
      <Card className="bg-gradient-to-br from-slateblue to-rosewood text-white">
        <Pill className="bg-white/15 text-white">Pedagogical agent</Pill>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight">
          An English coach tuned for real business communication.
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/80">
          This MVP uses mock responses, but the interaction contract is already prepared
          for OpenAI integration through `/api/teacher` and a dedicated system prompt
          file.
        </p>

        <div className="mt-6 rounded-[24px] bg-white/10 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-white/60">What the coach does</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/85">
            <li>Corrects mistakes with short explanations and stronger rewrites.</li>
            <li>Maintains a 70/30 balance between business English and general fluency.</li>
            <li>Tracks recurring errors and recommends next lessons automatically.</li>
            <li>Creates business-focused drills from meetings, emails and market news.</li>
          </ul>
        </div>

        <div className="mt-6 flex gap-3">
          <ButtonLink href="/learn">See the linked trail</ButtonLink>
          <ButtonLink href="/news-lab" variant="secondary">Use with News Lab</ButtonLink>
        </div>
      </Card>

      <Card className="flex min-h-[640px] flex-col">
        <div className="flex items-center justify-between border-b border-slateblue/10 pb-4">
          <div>
            <p className="text-sm font-semibold text-slateblue">Coach Clara</p>
            <p className="mt-1 text-sm text-slateblue/60">Premium business English tutor • mock conversation</p>
          </div>
          <div className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-teal">Active</div>
        </div>

        <div className="mt-5 flex-1 space-y-4 overflow-auto">
          {teacherMessages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-[26px] px-4 py-4 text-sm leading-7 ${
                  message.role === "user" ? "bg-slateblue text-white" : "bg-sand text-slateblue"
                }`}
              >
                {message.tag ? (
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                    <Sparkles className="h-3 w-3" />
                    {message.tag}
                  </div>
                ) : null}
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[26px] border border-slateblue/10 bg-sand p-3">
          <div className="flex items-center gap-3">
            <input
              readOnly
              value="Type here to simulate a learner message..."
              className="h-12 flex-1 rounded-full bg-white px-4 text-sm text-slateblue/50 outline-none"
            />
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-coral text-white">
              <SendHorizonal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
