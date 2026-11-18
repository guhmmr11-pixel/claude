import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { SpeakingView } from "@/components/speaking-view";

export default function SpeakingPage() {
  return (
    <AppShell activePath="/speaking">
      <PageHeader
        eyebrow="Speaking"
        title="Practice spoken English with scoring that feels useful, not generic."
        description="This speaking lab shows the intended learner flow: prompt, transcription, evaluation by criterion, improved answer, vocabulary suggestions and the next points to train."
      />
      <SpeakingView />
    </AppShell>
  );
}
