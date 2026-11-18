import { AppShell } from "@/components/app-shell";
import { LearningTrailView } from "@/components/learning-trail";
import { PageHeader } from "@/components/page-header";

export default function LearnPage() {
  return (
    <AppShell activePath="/learn">
      <PageHeader
        eyebrow="Learning Trail"
        title="A Duolingo-inspired path, redesigned for Business and Finance English."
        description="The journey is organized into 150 modules with checkpoints, locked stages, difficulty shifts and category logic that keeps the curriculum 70% career-focused and 30% general-fluency supportive."
      />
      <LearningTrailView />
    </AppShell>
  );
}
