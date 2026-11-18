"use client";

import { FormEvent, useMemo, useState } from "react";
import { LoaderCircle, SendHorizonal, Sparkles, TriangleAlert } from "lucide-react";
import { teacherMessages } from "@/data/mock";
import { ButtonLink, Card, Pill } from "@/components/ui";
import type { TeacherApiResponse, TeacherMessage } from "@/types";

const initialMessages: TeacherMessage[] = teacherMessages.map((message) => ({
  id: message.id,
  role: message.role,
  content: message.content,
  tag: message.tag
}));

export function ChatCoach() {
  const [messages, setMessages] = useState<TeacherMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providerReady] = useState(Boolean(process.env.NEXT_PUBLIC_OPENAI_READY));

  const canSubmit = input.trim().length > 0 && !isLoading;

  const requestContext = useMemo(
    () => ({
      learnerLevel: "Intermediate" as const,
      progressLabel: "60/150 modules completed",
      currentModuleTitle: "Interpreting central bank news",
      recurringErrors: [
        "prepositions in finance phrases",
        "natural transitions in presentations",
        "fluency under time pressure"
      ],
      curriculumFocus: "70/30 business-general" as const
    }),
    []
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const userMessage: TeacherMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim()
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          context: requestContext
        })
      });

      const data = (await response.json()) as TeacherApiResponse | { error?: string };

      if (!response.ok) {
        throw new Error(
          data && "error" in data ? data.error || "Failed to send message." : "Failed to send message."
        );
      }

      if (!("message" in data) || !data.message?.content?.trim()) {
        throw new Error("The teacher returned an empty response.");
      }

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message.content,
          tag: "Coach"
        }
      ]);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while contacting the teacher."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-[0.78fr_1.22fr] lg:p-8">
      <Card className="bg-gradient-to-br from-slateblue to-rosewood text-white">
        <Pill className="bg-white/15 text-white">Pedagogical agent</Pill>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight">
          An English coach tuned for real business communication.
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/80">
          The coach experience is architected for the OpenAI Responses API, while this
          demo remains safe to present even without a configured key.
        </p>

        <div className="mt-6 rounded-[24px] bg-white/10 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-white/60">What the coach does</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/85">
            <li>Corrects mistakes with short explanations and stronger rewrites.</li>
            <li>Maintains a 70/30 balance between business English and general fluency.</li>
            <li>Adapts to the learner context sent by the application layer.</li>
            <li>Suggests a next step when it helps learning momentum.</li>
          </ul>
        </div>

        <div className="mt-5 rounded-[24px] bg-white/10 p-5 text-sm leading-6 text-white/82">
          {providerReady
            ? "Live provider mode can be enabled with environment configuration."
            : "Demo mode note: if OPENAI_API_KEY is not configured, the chat surfaces a clear fallback message instead of breaking the page."}
        </div>

        <div className="mt-6 flex gap-3">
          <ButtonLink href="/learn">See the linked trail</ButtonLink>
          <ButtonLink href="/news-lab" variant="secondary">
            Use with News Lab
          </ButtonLink>
        </div>
      </Card>

      <Card className="flex min-h-[640px] flex-col">
        <div className="flex items-center justify-between border-b border-slateblue/10 pb-4">
          <div>
            <p className="text-sm font-semibold text-slateblue">Coach Clara</p>
            <p className="mt-1 text-sm text-slateblue/60">
              Premium business English tutor / OpenAI-ready
            </p>
          </div>
          <div className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-teal">
            Active
          </div>
        </div>

        <div className="mt-5 flex-1 space-y-4 overflow-auto">
          {messages.length === 0 ? (
            <div className="rounded-[24px] bg-sand p-5 text-sm text-slateblue/65">
              Start the conversation and Coach Clara will respond with corrections,
              explanations, and a useful next step.
            </div>
          ) : null}

          {messages.map((message) => (
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
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading ? (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-3 rounded-[26px] bg-sand px-4 py-4 text-sm text-slateblue/70">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Clara is preparing your coaching response...
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="flex justify-start">
              <div className="inline-flex max-w-[80%] items-start gap-3 rounded-[26px] bg-coral/10 px-4 py-4 text-sm text-rosewood">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error === "OPENAI_API_KEY is not configured." ? "Coach Clara is in demo mode right now. Add OPENAI_API_KEY later to enable live answers." : error}</span>
              </div>
            </div>
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-5 rounded-[26px] border border-slateblue/10 bg-sand p-3"
        >
          <div className="flex items-center gap-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Describe a meeting, ask for a correction, or practice a business scenario..."
              className="h-12 flex-1 rounded-full bg-white px-4 text-sm text-slateblue outline-none placeholder:text-slateblue/40"
            />
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-coral text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendHorizonal className="h-4 w-4" />
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
