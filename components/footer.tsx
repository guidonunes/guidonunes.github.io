export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="absolute bottom-4 left-0 right-0 z-20 flex justify-center pointer-events-none">
      <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
        © {currentYear} - Designed and built by Guilherme Nunes
      </p>
    </footer>
  );
}

