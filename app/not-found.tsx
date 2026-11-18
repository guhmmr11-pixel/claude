import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada | Sinal Digital",
  robots: { index: false }
};

export default function NotFound() {
  return (
    <main className="sd-site grid min-h-screen place-items-center bg-space-950 px-4 py-16 text-center text-slate-100">
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal-cyan">Erro 404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
          Página não encontrada
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-400">
          O endereço acessado não existe ou não faz parte do site da Sinal Digital.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-signal-cyan to-signal-sky px-6 text-sm font-semibold text-space-950 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ice"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
