export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full flex justify-center items-center pointer-events-none mt-auto pt-8 pb-4 sm:pt-10 sm:pb-6">
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light px-4 text-center">
        © {currentYear} - Designed and built by Guilherme Nunes
      </p>
    </footer>
  );
}

