import { homePath, translate, type Locale } from "@/lib/portfolio/content";
export function Footer({ lang }: { lang: Locale }) {
  const t = (v: string) => translate(lang, v);
  return (
    <footer className="site-footer wrap">
      <span>
        {"© "}
        {new Date().getFullYear()}
        {" Guilherme Nunes"}
      </span>
      <span className="footer-note">
        {t("Built with intention. Always evolving.")}
      </span>
      <div>
        <a
          href="https://www.linkedin.com/in/guilhermednunes/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"LinkedIn ↗"}
        </a>
        <a
          href="https://github.com/guidonunes"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"GitHub ↗"}
        </a>
        <a href={homePath(lang) + "#home"} aria-label={t("Back to top")}>
          {"↑"}
        </a>
      </div>
    </footer>
  );
}
