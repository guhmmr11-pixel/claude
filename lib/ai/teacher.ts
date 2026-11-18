import { teacherSystemPrompt } from "@/data/agent-prompt";
import { getOpenAIClient } from "@/lib/openai";
import type { TeacherApiRequest, TeacherContext } from "@/types";

function buildTeacherInstructions(context?: TeacherContext) {
  const contextLines = [
    context?.learnerLevel ? `Learner level: ${context.learnerLevel}` : null,
    context?.progressLabel ? `Progress: ${context.progressLabel}` : null,
    context?.currentModuleTitle ? `Current module: ${context.currentModuleTitle}` : null,
    context?.curriculumFocus ? `Curriculum focus: ${context.curriculumFocus}` : null,
    context?.recurringErrors?.length
      ? `Recurring errors: ${context.recurringErrors.join("; ")}`
      : null
  ].filter(Boolean);

  if (!contextLines.length) return teacherSystemPrompt;

  return `${teacherSystemPrompt}\n\nCurrent learner context:\n${contextLines
    .map((line) => `- ${line}`)
    .join("\n")}`;
}

export async function getTeacherReply({ messages, context }: TeacherApiRequest) {
  const client = getOpenAIClient();
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  const response = await client.responses.create({
    model,
    instructions: buildTeacherInstructions(context),
    input: messages.map((message) => ({
      role: message.role,
      content: message.content
    }))
  });

  const content = response.output_text?.trim();

  if (!content) {
    throw new Error("The teacher response was empty.");
  }

  return {
    role: "assistant" as const,
    content
  };
}
