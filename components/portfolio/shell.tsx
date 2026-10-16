"use client";
import { useEffect, useState, type ReactNode } from "react";
import {
  homePath,
  projectPath,
  translate,
  type Locale,
  type ProjectKey,
} from "@/lib/portfolio/content";
import { installPageMotion } from "@/lib/portfolio/page-motion";
import { PreferencesProvider, usePreferences } from "./preferences";
import { Footer } from "./footer";
import { Icon, IconDefinitions } from "./icons";

function ShellContent({
  children,
  lang,
  projectKey,
}: {
  children: ReactNode;
  lang: Locale;
  projectKey?: ProjectKey;
}) {
  const { dark, reduced, deviceReduced, toggleTheme, toggleMotion } =
    usePreferences();
  const [active, setActive] = useState(projectKey ? "work" : "home");
  const t = (value: string) => translate(lang, value);
  useEffect(() => installPageMotion(reduced), [reduced]);
  useEffect(() => {
    if (projectKey) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = Math.min(innerHeight * 0.35, 240);
      let current = "home";
      for (const id of ["home", "work", "about", "contact"])
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <= threshold
        )
          current = id;
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 10)
        current = "contact";
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [projectKey]);
  const other = lang === "pt" ? "en" : "pt";
  const motionLabel = deviceReduced
    ? lang === "pt"
      ? "Animações desativadas: seguindo a configuração do dispositivo"
      : "Animations off: follows your device setting"
    : reduced
      ? lang === "pt"
        ? "Ativar animações"
        : "Turn on animations"
      : lang === "pt"
        ? "Desativar animações"
        : "Turn off animations";
  const themeLabel = dark
    ? lang === "pt"
      ? "Ativar tema claro"
      : "Switch to light theme"
    : lang === "pt"
      ? "Ativar tema escuro"
      : "Switch to dark theme";
  return (
    <>
      <IconDefinitions />
      <a href="#main" className="skip-link">
        {t("Skip to content")}
      </a>
      <header className="site-header wrap">
        <a
          className="brand"
          href={`${projectKey ? homePath(lang) : ""}#home`}
          aria-label={t("Guilherme Nunes, home")}
        >
          <span className="brand-name">
            Guilherme Nunes<span>{t("Software Engineer · Backend")}</span>
          </span>
        </a>
        <nav className="navigation" aria-label={t("Main navigation")}>
          {(["home", "work", "about", "contact"] as const).map((id, index) => (
            <a
              key={id}
              href={`${projectKey ? homePath(lang) : ""}#${id}`}
              className={`nav-link${active === id ? " active" : ""}`}
              aria-current={active === id ? "location" : undefined}
            >
              <Icon name={["home", "work", "about", "mail"][index]} />
              <span>{t(["Home", "Work", "About", "Contact"][index])}</span>
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="language-toggle"
            href={projectKey ? projectPath(other, projectKey) : homePath(other)}
            lang={other === "pt" ? "pt-BR" : "en"}
            aria-label={t("Read this portfolio in Portuguese")}
          >
            <span>EN</span>
            <span aria-hidden="true">/</span>
            <span>PT</span>
          </a>
          <button
            id="motion-toggle"
            className="icon-button motion-toggle"
            aria-label={motionLabel}
            title={motionLabel}
            aria-pressed={!reduced}
            disabled={deviceReduced}
            onClick={toggleMotion}
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 5 10 7-10 7ZM4 5v14" />
            </svg>
          </button>
          <button
            id="theme-toggle"
            className="icon-button"
            aria-label={themeLabel}
            title={themeLabel}
            aria-pressed={dark}
            onClick={toggleTheme}
          >
            <Icon name={dark ? "sun" : "theme"} />
          </button>
          <a
            className="header-contact"
            href={`${projectKey ? homePath(lang) : ""}#contact`}
          >
            {t("Let’s talk")}
            <Icon name="arrow" />
          </a>
        </div>
      </header>
      {children}
      <Footer lang={lang} />
    </>
  );
}
export function Shell(props: {
  children: ReactNode;
  lang: Locale;
  projectKey?: ProjectKey;
}) {
  return (
    <PreferencesProvider lang={props.lang}>
      <ShellContent {...props} />
    </PreferencesProvider>
  );
}
