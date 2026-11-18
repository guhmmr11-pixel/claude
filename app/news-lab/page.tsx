import { AppShell } from "@/components/app-shell";
import { NewsLabView } from "@/components/news-lab-view";
import { PageHeader } from "@/components/page-header";

export default function NewsLabPage() {
  return (
    <AppShell activePath="/news-lab">
      <PageHeader
        eyebrow="News Lab"
        title="Premium business news, redesigned as a high-trust English learning lab."
        description="The News Lab combines premium editorial curation, strong visual hierarchy, business-English pedagogy and dictionary-ready vocabulary so each article feels like a compact executive learning session."
      />
      <NewsLabView />
    </AppShell>
  );
}
