import { NextResponse } from "next/server";
import { getTeacherReply } from "@/lib/ai/teacher";
import type { TeacherApiRequest, TeacherApiResponse } from "@/types";

function isValidPayload(payload: unknown): payload is TeacherApiRequest {
  if (!payload || typeof payload !== "object") return false;

  const candidate = payload as TeacherApiRequest;

  return (
    Array.isArray(candidate.messages) &&
    candidate.messages.length > 0 &&
    candidate.messages.every(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
    )
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;

    if (!isValidPayload(payload)) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const message = await getTeacherReply(payload);
    const response: TeacherApiResponse = {
      provider: "openai",
      message
    };

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate teacher reply.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
