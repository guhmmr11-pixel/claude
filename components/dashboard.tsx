import { ArrowUpRight, Flame, Gem, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import {
  activities,
  dashboardStats,
  learnerName,
  nextModule,
  recommendations,
  weaknessSignals
} from "@/data/mock";
import { categoryProgress } from "@/data/modules";
import { formatPercent } from "@/lib/utils";
import { ButtonLink, Card, Pill } from "@/components/ui";

export function DashboardView() {
  const shortcuts = [
    { label: "Continue trail", href: "/learn" },
    { label: "Talk to teacher", href: "/chat" },
    { label: "Study a news article", href: "/news-lab" },
    { label: "Train speaking", href: "/speaking" },
    { label: "Open dictionary", href: "/dictionary" }
  ] as const;

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <Card className="overflow-hidden bg-gradient-to-br from-slateblue via-slateblue to-rosewood text-white">
          <Pill className="bg-white/15 text-white">Dashboard</Pill>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-xl">
              <h3 className="text-4xl font-semibold tracking-tight">Welcome back, {learnerName}.</h3>
              <p className="mt-3 text-base leading-7 text-white/80">
                You are deep into the business track. Today’s strongest move is to continue
                with your market-news lesson and then reinforce the hardest finance
                expressions in speaking.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/learn">Resume module 61</ButtonLink>
                <ButtonLink href="/chat" variant="secondary">
                  Coach me live
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-[28px] bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                Next recommended module
              </p>
              <h4 className="mt-2 text-2xl font-semibold">{nextModule.title}</h4>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                {nextModule.category} • {nextModule.type.replace("_", " ")} • {nextModule.estimatedMinutes} min • {nextModule.xp} XP
              </p>
              <div className="mt-6 h-2 rounded-full bg-white/15">
                <div className="h-2 w-[40%] rounded-full bg-gold" />
              </div>
              <p className="mt-2 text-sm text-white/70">60 of 150 modules completed</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {dashboardStats.map((stat, index) => {
            const Icon = [TrendingUp, Flame, Gem, ArrowUpRight][index];
            return (
              <Card key={stat.label}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slateblue/60">{stat.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-slateblue">{stat.value}</p>
                  </div>
                  <div className="rounded-2xl bg-coral/10 p-3 text-coral">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slateblue/65">{stat.caption}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slateblue">Learning balance</p>
              <p className="mt-1 text-sm text-slateblue/65">
                70% business and finance, 30% general English transfer skills.
              </p>
            </div>
            <Pill className="bg-teal/10 text-teal">Adaptive progress</Pill>
          </div>

          <div className="mt-5 space-y-4">
            {categoryProgress.map((item) => {
              const percent = (item.completed / item.total) * 100;
              return (
                <div key={item.category}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slateblue">{item.category}</span>
                    <span className="text-slateblue/60">
                      {item.completed}/{item.total} • {formatPercent(percent)}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slateblue/8">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-coral to-rosewood"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-slateblue">Quick actions</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {shortcuts.map((shortcut) => (
              <Link
                key={shortcut.label}
                href={shortcut.href}
                className="rounded-[24px] border border-slateblue/8 bg-sand px-4 py-4 text-sm font-medium text-slateblue transition hover:-translate-y-0.5 hover:border-coral/30 hover:shadow-sm"
              >
                {shortcut.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] bg-mint/55 p-4">
            <p className="text-sm font-semibold text-slateblue">Weak points detected</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slateblue/70">
              {weaknessSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slateblue">Automatic recommendations</p>
            <Pill className="bg-gold/15 text-gold">AI-guided</Pill>
          </div>
          <div className="mt-5 space-y-4">
            {recommendations.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-slateblue/8 bg-sand p-4">
                <p className="font-semibold text-slateblue">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slateblue/68">{item.reason}</p>
                <Link href={item.href as Route} className="mt-4 inline-flex text-sm font-semibold text-coral">
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-slateblue">Recent activity</p>
          <div className="mt-5 space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between gap-4 rounded-[24px] border border-slateblue/8 bg-white px-4 py-4"
              >
                <div>
                  <p className="font-medium text-slateblue">{activity.title}</p>
                  <p className="mt-1 text-sm text-slateblue/60">
                    {activity.type} • {activity.time}
                  </p>
                </div>
                <Pill className="bg-coral/10 text-coral">{activity.outcome}</Pill>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
