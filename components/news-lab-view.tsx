import { sourceStrategy } from "@/data/news-sources";
import { NewsLabPremium } from "@/components/news-lab-premium";
import { Card } from "@/components/ui";

export function NewsLabView() {
  return (
    <div className="space-y-6">
      <NewsLabPremium />
      <div className="px-6 pb-8 lg:px-8">
        <Card>
          <p className="text-sm font-semibold text-slateblue">Editorial architecture</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {sourceStrategy.editorialRules.map((rule) => (
              <div
                key={rule}
                className="rounded-[22px] bg-sand p-4 text-sm leading-6 text-slateblue/72"
              >
                {rule}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
