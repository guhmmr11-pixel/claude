import { AppShell } from "@/components/app-shell";
import { DictionaryView } from "@/components/dictionary-view";
import { PageHeader } from "@/components/page-header";

export default function DictionaryPage() {
  return (
    <AppShell activePath="/dictionary">
      <PageHeader
        eyebrow="Dictionary"
        title="A personal vocabulary bank linked to real study moments."
        description="Words can come from modules, news, chat or speaking. Each entry stores context and review status so the system can resurface the most valuable vocabulary automatically."
      />
      <DictionaryView />
    </AppShell>
  );
}
