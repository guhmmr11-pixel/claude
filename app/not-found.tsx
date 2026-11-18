import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada | Sinal Digital",
  robots: { index: false }
};

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-surface px-4 py-16 text-center">
      <div className="max-w-md">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-blue">Erro 404</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy">
          Página não encontrada
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          O endereço acessado não existe ou não faz parte do site da Sinal Digital.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-brand-ink px-6 text-sm font-bold text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
