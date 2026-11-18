export function Footer() {
  return (
    <footer className="border-t border-cyan-200/10 bg-[#020f24] pb-20 pt-6 text-white sm:pb-7">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-slate-300 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="font-extrabold text-white">
          Sinal Digital — O seu parceiro de negócios
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
          <span>Desde 2011</span>
          <span>Parceria Acer x Sinal Digital</span>
        </div>
      </div>
    </footer>
  );
}
