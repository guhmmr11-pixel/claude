import Link from "next/link";
import {
  BookOpen,
  BrainCircuit,
  LayoutDashboard,
  MessageSquareText,
  Mic2,
  Newspaper,
  Sparkles
} from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: Sparkles },
  { href: "/chat", label: "Coach", icon: MessageSquareText },
  { href: "/news-lab", label: "News Lab", icon: Newspaper },
  { href: "/speaking", label: "Speaking", icon: Mic2 },
  { href: "/dictionary", label: "Dictionary", icon: BookOpen },
  { href: "/review", label: "Review", icon: BrainCircuit }
] as const;

export function AppShell({
  children,
  activePath
}: {
  children: ReactNode;
  activePath: string;
}) {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <aside className="rounded-[32px] border border-white/70 bg-white/80 p-5 shadow-glow backdrop-blur xl:p-6">
          <div className="mb-8">
            <div className="inline-flex rounded-full bg-rosewood/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-rosewood">
              Fluency Wealth
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slateblue">
              Business English,
              <span className="block text-coral">beautifully structured.</span>
            </h1>
            <p className="mt-3 text-sm leading-6 text-slateblue/70">
              Premium English learning with guided progression, live coaching logic and
              finance-first immersion.
            </p>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-slateblue text-white shadow-lg"
                      : "text-slateblue/75 hover:bg-slateblue/5 hover:text-slateblue"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[28px] bg-gradient-to-br from-rosewood to-coral p-5 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-white/70">MVP v1</p>
            <h2 className="mt-2 text-xl font-semibold">OpenAI-ready architecture</h2>
            <p className="mt-2 text-sm leading-6 text-white/85">
              The product is ready for a live coach, speech analysis, and real news
              feeds, while still presenting cleanly with the curated mock experience.
            </p>
          </div>
        </aside>

        <main className="overflow-hidden rounded-[32px] border border-white/60 bg-white/65 shadow-glow backdrop-blur">
          {children}
        </main>
      </div>
    </div>
  );
}
