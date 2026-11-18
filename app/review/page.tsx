import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ReviewView } from "@/components/review-view";

export default function ReviewPage() {
  return (
    <AppShell activePath="/review">
      <PageHeader
        eyebrow="Review"
        title="Revisit vocabulary and mistakes with a focused revision loop."
        description="This area demonstrates how flashcards, hard words and recovery recommendations turn saved vocabulary into meaningful retention."
      />
      <ReviewView />
    </AppShell>
  );
}
