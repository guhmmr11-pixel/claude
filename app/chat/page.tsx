import { AppShell } from "@/components/app-shell";
import { ChatCoach } from "@/components/chat-coach";
import { PageHeader } from "@/components/page-header";

export default function ChatPage() {
  return (
    <AppShell activePath="/chat">
      <PageHeader
        eyebrow="Coach"
        title="A premium English coach, ready for gentle correction and practical growth."
        description="The coach experience is designed to correct, explain and personalize learning around business and finance communication, while still supporting everyday fluency."
      />
      <ChatCoach />
    </AppShell>
  );
}
