export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full flex justify-center items-center pointer-events-none mt-0 md:mt-auto pt-0 pb-4 sm:pb-6 md:pt-8 md:pb-4">
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light px-4 text-center">
        © {currentYear} - Designed and built by Guilherme Nunes
      </p>
    </footer>
  );
}

