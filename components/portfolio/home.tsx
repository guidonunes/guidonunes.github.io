"use client";
import { useState, type CSSProperties } from "react";
import {
  translate,
  resumePath,
  projectPath,
  type Locale,
  type ProjectKey,
} from "@/lib/portfolio/content";
import { Sculpture } from "./sculpture";
import { ProjectDialog } from "./project-dialog";
import { usePreferences } from "./preferences";

export function Home({ lang }: { lang: Locale }) {
  const t = (value: string) => translate(lang, value);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<{
    key: ProjectKey;
    trigger: HTMLElement;
  } | null>(null);
  const { copy } = usePreferences();
  const openProject = (key: ProjectKey, element: HTMLElement) => {
    setSelected({ key, trigger: element });
  };
  const copyEmail = () =>
    copy(
      "guilherme.augd@gmail.com",
      lang === "pt" ? "E-mail copiado" : "Email address copied",
      lang === "pt"
        ? "Selecione o e-mail para copiá-lo."
        : "Select the email address to copy it.",
    );
  return (
    <>
      <main id="main">
        <section id="home" className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot"></span>{" "}
              {t("SOFTWARE ENGINEER · BACKEND")}
            </div>
            <h1 id="hero-title">
              {t("Thoughtful code.")}
              <br />
              {t("Real-world")}
              <br />
              <em>{t("impact.")}</em>
            </h1>
            <p>
              {t(
                "I’m Guilherme, a software engineer focused on turning business requirements into reliable backend systems. My work spans API design, business logic, data modeling, and deployment, primarily with Java and Spring Boot, alongside Kotlin and .NET. I’ve contributed to production software as part of a freelance team, connecting technical decisions with real product needs.",
              )}
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                {t("Explore my work")}{" "}
                <svg className="icon">
                  <use href="#i-down" />
                </svg>
              </a>
              <a
                className="button secondary resume-link"
                href={resumePath(lang)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("View résumé")} <span className="file-type">{"PDF"}</span>
              </a>
            </div>
            <div className="hero-socials">
              <span>{t("São Paulo, Brazil")}</span>
              <a
                className="text-link"
                href="https://github.com/guidonunes"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"GitHub ↗"}
              </a>
              <a
                className="text-link"
                href="https://www.linkedin.com/in/guilhermednunes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"LinkedIn ↗"}
              </a>
            </div>
            <div className="hero-footnote">
              <span className="little-brackets">{"{ }"}</span>
              <span>
                {t("Backend at heart.")}
                <br />
                <strong>{t("Product-minded by nature.")}</strong>
              </span>
            </div>
          </div>
          <Sculpture lang={lang} />
        </section>
        <div className="stack-strip wrap">
          <span className="stack-intro">{t("THE TOOLKIT")}</span>
          <div className="stack-list">
            <span>
              {"Java "}
              <b>{"↗"}</b>
            </span>
            <span>{"Spring Boot"}</span>
            <span>{"Kotlin"}</span>
            <span>{"ASP.NET Core"}</span>
            <span>{"PostgreSQL"}</span>
            <span>{"React"}</span>
          </div>
        </div>
        <section
          id="work"
          className="work-section wrap section-pad"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow section-number">
                {t("01 / SELECTED WORK")}
              </div>
              <h2 id="work-title">
                {t("From idea to")} <em>{t("implementation.")}</em>
              </h2>
            </div>
            <p>
              {t("Real products. Practical problems.")}
              <br />
              {t("A look at what I’ve been building.")}
            </p>
          </div>
          <div className="work-toolbar">
            <div
              className="filter-group"
              role="group"
              aria-label={t("Filter projects")}
            >
              <button
                data-filter="all"
                className={filter === "all" ? "filter active" : "filter"}
                aria-pressed={filter === "all"}
                onClick={() => setFilter("all")}
              >
                {t("All work")} <span>{"04"}</span>
              </button>
              <button
                data-filter="backend"
                className={filter === "backend" ? "filter active" : "filter"}
                aria-pressed={filter === "backend"}
                onClick={() => setFilter("backend")}
              >
                {"Backend"}
              </button>
              <button
                data-filter="fullstack"
                className={filter === "fullstack" ? "filter active" : "filter"}
                aria-pressed={filter === "fullstack"}
                onClick={() => setFilter("fullstack")}
              >
                {"Full-stack"}
              </button>
            </div>
            <span id="project-count" className="mono" aria-live="polite">
              {filter === "all" ? 4 : 2}{" "}
              {lang === "pt" ? "PROJETOS" : "PROJECTS"}
            </span>
          </div>
          <div className="project-grid">
            <article
              className="project"
              data-category="fullstack"
              hidden={filter !== "all" && filter !== "fullstack"}
            >
              <button
                className="project-visual race-visual"
                data-project="p1grid"
                aria-label={t("Explore P1Grid project")}
                onClick={(event) => openProject("p1grid", event.currentTarget)}
              >
                <span className="visual-kicker">
                  {t("PREDICT. RACE. REPEAT.")}
                </span>
                <span className="race-wordmark">
                  {"P1"}
                  <span>{"GRID"}</span>
                  <i>{"↗"}</i>
                </span>
                <svg
                  className="race-track"
                  viewBox="0 0 560 290"
                  aria-hidden="true"
                >
                  <path d="M-40 252h205c50 0 30-91 92-91h124c89 0 110-105 15-105H258c-70 0-54 61-111 61H-40" />
                  <path d="M-40 270h205c67 0 48-91 92-91h124c113 0 132-141 15-141H258c-84 0-68 61-111 61H-40" />
                  <path
                    className="racing-pulse"
                    d="M-40 261h205c58 0 39-91 92-91h124c101 0 121-123 15-123H258c-77 0-61 61-111 61H-40"
                  />
                </svg>
                <span className="visual-bottom">
                  <span>{t("FORMULA 1 PREDICTION PLATFORM")}</span>
                  <span className="visual-arrow">{"↗"}</span>
                </span>
                <span className="visual-tag">
                  {t("PRODUCTION · FREELANCE")}
                </span>
              </button>
              <div className="project-info">
                <div>
                  <h3>
                    <a href={projectPath(lang, "p1grid")}>{"P1Grid"}</a>
                  </h3>
                  <p>
                    {t(
                      "Race-weekend predictions, powered by clear business rules.",
                    )}
                  </p>
                </div>
                <a className="case-link" href={projectPath(lang, "p1grid")}>
                  {t("Case study ↗")}
                </a>
              </div>
              <div className="project-tags">
                <span>{"Ruby on Rails"}</span>
                <span>{"PostgreSQL"}</span>
                <span>{"Hotwire"}</span>
              </div>
            </article>
            <article
              className="project"
              data-category="backend"
              hidden={filter !== "all" && filter !== "backend"}
            >
              <button
                className="project-visual carbon-visual"
                data-project="carbon"
                aria-label={t("Explore CarbonHunter project")}
                onClick={(event) => openProject("carbon", event.currentTarget)}
              >
                <span className="visual-kicker">
                  {t("MAKING THE INVISIBLE MEASURABLE")}
                </span>
                <span className="carbon-wordmark">
                  {"carbon"}
                  <span>{"hunter"}</span>
                  <svg viewBox="0 0 40 40" aria-hidden="true">
                    <path d="M7 33C0 11 18 1 35 4c1 18-8 31-28 29ZM7 33 28 12" />
                  </svg>
                </span>
                <div className="carbon-graphic" aria-hidden="true">
                  <span className="carbon-axis">
                    {t("EMISSIONS / DATA / INSIGHT")}
                  </span>
                  <div className="carbon-bars">
                    <i style={{ "--bar": "35%" } as CSSProperties}></i>
                    <i style={{ "--bar": "58%" } as CSSProperties}></i>
                    <i style={{ "--bar": "47%" } as CSSProperties}></i>
                    <i style={{ "--bar": "82%" } as CSSProperties}></i>
                    <i style={{ "--bar": "65%" } as CSSProperties}></i>
                    <i style={{ "--bar": "100%" } as CSSProperties}></i>
                    <i style={{ "--bar": "72%" } as CSSProperties}></i>
                    <i style={{ "--bar": "53%" } as CSSProperties}></i>
                    <i style={{ "--bar": "35%" } as CSSProperties}></i>
                    <i style={{ "--bar": "24%" } as CSSProperties}></i>
                  </div>
                </div>
                <span className="visual-bottom">
                  <span>{t("CARBON EMISSIONS MANAGEMENT")}</span>
                  <span className="visual-arrow">{"↗"}</span>
                </span>
                <span className="visual-tag">{t("ACADEMIC PROJECT")}</span>
              </button>
              <div className="project-info">
                <div>
                  <h3>
                    <a href={projectPath(lang, "carbon")}>{"CarbonHunter"}</a>
                  </h3>
                  <p>
                    {t(
                      "Turning emissions data into structured, actionable insights.",
                    )}
                  </p>
                </div>
                <a className="case-link" href={projectPath(lang, "carbon")}>
                  {t("Case study ↗")}
                </a>
              </div>
              <div className="project-tags">
                <span>{"C# / .NET"}</span>
                <span>{"MongoDB"}</span>
                <span>{"Docker"}</span>
              </div>
            </article>
            <article
              className="project"
              data-category="backend"
              hidden={filter !== "all" && filter !== "backend"}
            >
              <button
                className="project-visual aguia-visual"
                data-project="aguia"
                aria-label={t("Explore AguiaX project")}
                onClick={(event) => openProject("aguia", event.currentTarget)}
              >
                <span className="visual-kicker">
                  {t("GOOD IDEAS DESERVE TO GO FURTHER")}
                </span>
                <span className="aguia-wordmark">
                  {"Aguia"}
                  <span>{"X"}</span>
                </span>
                <svg
                  className="aguia-graphic"
                  viewBox="0 0 560 310"
                  aria-hidden="true"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M280 166 140 240 55 145 280 166 460 98 505 225 280 166 345 285M140 240 345 285 505 225M55 145 190 70 280 166" />
                    <circle cx="280" cy="166" r="62" strokeDasharray="3 6" />
                    <circle cx="280" cy="166" r="103" opacity=".4" />
                  </g>
                  <g fill="currentColor">
                    <circle cx="55" cy="145" r="5" />
                    <circle cx="140" cy="240" r="7" />
                    <circle cx="460" cy="98" r="5" />
                    <circle cx="505" cy="225" r="7" />
                    <circle cx="345" cy="285" r="4" />
                    <circle cx="190" cy="70" r="4" />
                  </g>
                  <circle cx="280" cy="166" r="26" fill="#e7ecff" />
                  <path d="m269 176 12-23 12 23-12-8Z" fill="#394a80" />
                </svg>
                <span className="visual-bottom">
                  <span>{t("IDEAS → PROJECTS → PROGRESS")}</span>
                  <span className="visual-arrow">{"↗"}</span>
                </span>
                <span className="visual-tag">
                  {"FIAP · GRUPO ÁGUIA BRANCA"}
                </span>
              </button>
              <div className="project-info">
                <div>
                  <h3>
                    <a href={projectPath(lang, "aguia")}>{"AguiaX"}</a>
                  </h3>
                  <p>
                    {t(
                      "A connected path from promising ideas to managed projects.",
                    )}
                  </p>
                </div>
                <a className="case-link" href={projectPath(lang, "aguia")}>
                  {t("Case study ↗")}
                </a>
              </div>
              <div className="project-tags">
                <span>{"Java / Spring Boot"}</span>
                <span>{"MySQL"}</span>
                <span>{"Kotlin"}</span>
              </div>
            </article>
            <article
              className="project"
              data-category="fullstack"
              hidden={filter !== "all" && filter !== "fullstack"}
            >
              <button
                className="project-visual dca-visual"
                data-project="dca"
                aria-label={t("Explore Crypto DCA Simulator project")}
                onClick={(event) => openProject("dca", event.currentTarget)}
              >
                <span className="visual-kicker">
                  {t("SMALL STEPS. A LONGER PERSPECTIVE.")}
                </span>
                <span className="dca-wordmark">
                  {"dca"}
                  <span>{"/"}</span>
                  <small>{t("strategy simulator")}</small>
                </span>
                <svg
                  className="dca-graphic"
                  viewBox="0 0 560 310"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop stopColor="#9ccaff" stopOpacity=".25" />
                      <stop offset="1" stopColor="#9ccaff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g stroke="#a6c5df" opacity=".12">
                    <path d="M0 130h560M0 180h560M0 230h560M0 280h560M80 110v200M180 110v200M280 110v200M380 110v200M480 110v200" />
                  </g>
                  <path
                    d="m0 270 40-10 40 8 40-38 40 12 40-32 40 15 40-55 40 22 40-40 40 12 40-63 40 15 40-35 40 9v220H0Z"
                    fill="url(#chart-fill)"
                  />
                  <path
                    d="m0 270 40-10 40 8 40-38 40 12 40-32 40 15 40-55 40 22 40-40 40 12 40-63 40 15 40-35 40 9"
                    fill="none"
                    stroke="#9ce3d2"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0 275c130-3 155-24 230-37s115-32 175-50 100-52 155-65"
                    stroke="#8cbcff"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    fill="none"
                  />
                </svg>
                <span className="visual-bottom">
                  <span>{t("EXPLORE INVESTMENT STRATEGIES")}</span>
                  <span className="visual-arrow">{"↗"}</span>
                </span>
                <span className="visual-tag">{t("FULL-STACK PROJECT")}</span>
              </button>
              <div className="project-info">
                <div>
                  <h3>
                    <a href={projectPath(lang, "dca")}>
                      {"Crypto DCA Simulator"}
                    </a>
                  </h3>
                  <p>
                    {t(
                      "Making investment strategies easier to explore and compare.",
                    )}
                  </p>
                </div>
                <a className="case-link" href={projectPath(lang, "dca")}>
                  {t("Case study ↗")}
                </a>
              </div>
              <div className="project-tags">
                <span>{"Java / Spring Boot"}</span>
                <span>{"Next.js"}</span>
                <span>{"TypeScript"}</span>
              </div>
            </article>
          </div>
          <div className="work-footer">
            <p>{t("There’s more where that came from.")}</p>
            <a
              className="text-link"
              href="https://github.com/guidonunes?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Explore all repositories")}{" "}
              <svg className="icon">
                <use href="#i-arrow" />
              </svg>
            </a>
          </div>
        </section>
        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <div className="wrap about-grid section-pad">
            <div className="about-intro">
              <div className="eyebrow section-number">
                {t("02 / THE PERSON BEHIND THE CODE")}
              </div>
              <h2 id="about-title">
                {t("Curious mind.")}
                <br />
                {t("Engineering")}
                <br />
                <em>{t("mindset.")}</em>
              </h2>
              <div className="location">
                <span className="status-dot"></span>{" "}
                {t("SÃO PAULO, BRAZIL · UTC−3")}
              </div>
            </div>
            <div className="about-content">
              <p className="about-lead">
                {t("I like understanding how things work.")}
                <br />
                {t("Then figuring out how to make them better.")}
              </p>
              <p>
                {t(
                  "My focus is backend and software engineering: turning requirements into reliable APIs, meaningful data models, and maintainable applications. I also enjoy connecting those systems to thoughtful web and mobile interfaces.",
                )}
              </p>
              <p>
                {t(
                  "From delivering features with a freelance team to building academic projects at FIAP, I’m developing software with an eye on the whole product.",
                )}
              </p>
              <div className="expertise">
                <details open>
                  <summary>
                    <span className="mono">{"01"}</span>{" "}
                    {t("Backend & architecture")}{" "}
                    <span className="details-symbol">{"+"}</span>
                  </summary>
                  <div>
                    {t(
                      "Java, Kotlin, Spring Boot, C#, ASP.NET Core, Ruby on Rails. Business rules, REST APIs, authentication, and layered application design.",
                    )}
                  </div>
                </details>
                <details>
                  <summary>
                    <span className="mono">{"02"}</span> {t("Data & delivery")}{" "}
                    <span className="details-symbol">{"+"}</span>
                  </summary>
                  <div>
                    {t(
                      "PostgreSQL, MySQL, MongoDB, Docker, automated testing, and CI/CD. Working from the data model through to deployment.",
                    )}
                  </div>
                </details>
                <details>
                  <summary>
                    <span className="mono">{"03"}</span>{" "}
                    {t("Interfaces & interaction")}{" "}
                    <span className="details-symbol">{"+"}</span>
                  </summary>
                  <div>
                    {t(
                      "React, Next.js, TypeScript, Tailwind, and Android with Kotlin and Jetpack Compose. Connecting people to the systems behind the screen.",
                    )}
                  </div>
                </details>
              </div>
              <div className="currently">
                <span className="mono">{t("ON MY DESK")}</span>
                <p>
                  <strong>{"Vibes"}</strong>{" "}
                  {t(
                    "— a mood-based discovery app, built with Kotlin and Spring Boot.",
                  )}
                </p>
                <span className="currently-status">
                  <i></i> {t("In progress")}
                </span>
              </div>
            </div>
          </div>
          <div className="wrap experience-block">
            <div className="eyebrow section-number">
              {t("EXPERIENCE & EDUCATION")}
            </div>
            <div className="experience-grid">
              <article>
                <span className="experience-date">
                  {t("DEC 2025 — SEP 2026")}
                </span>
                <h3>{t("Full Stack Developer")}</h3>
                <p className="experience-company">
                  {"I.Tech · Freelance · P1Grid"}
                </p>
                <p>
                  {t(
                    "Contributed backend business rules and responsive interfaces to a Formula 1 prediction platform in production, working with a development team.",
                  )}
                </p>
              </article>
              <article>
                <span className="experience-date">{t("AUG — SEP 2024")}</span>
                <h3>{t("Software Engineering Trainee")}</h3>
                <p className="experience-company">
                  {t("Kreativstorm · Remote")}
                </p>
                <p>
                  {t(
                    "Planned the MoneyQuest application and analyzed APIs, software architecture, privacy, and security.",
                  )}
                </p>
              </article>
              <article>
                <span className="experience-date">
                  {t("CONTINUING EDUCATION")}
                </span>
                <h3>{t("Software engineering foundations")}</h3>
                <p className="experience-company">
                  {"FIAP · USP/Esalq · Le Wagon"}
                </p>
                <p>
                  {t(
                    "Systems Analysis and Development at FIAP, expected November 2026. MBA in Software Engineering at USP/Esalq, October 2026–July 2028. Le Wagon Web Development, completed June 2024.",
                  )}
                </p>
              </article>
            </div>
            <div className="experience-footer">
              <p>{t("Portuguese · Native / English · C1 / German · C1")}</p>
              <a
                className="text-link resume-link"
                href={resumePath(lang)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("View full résumé ↗")}
              </a>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="contact-section wrap section-pad"
          aria-labelledby="contact-title"
        >
          <div className="eyebrow section-number">
            {t("03 / NEXT CONVERSATION")}
          </div>
          <div className="contact-heading">
            <h2 id="contact-title">
              {t("Have something")}
              <br />
              {t("in")} <em>{t("mind?")}</em>
            </h2>
            <a
              className="contact-arrow"
              href="mailto:guilherme.augd@gmail.com"
              aria-label={t("Email Guilherme")}
            >
              <svg className="icon">
                <use href="#i-arrow" />
              </svg>
            </a>
          </div>
          <div className="contact-bottom">
            <p>
              {t("A role, a project, or a good technical conversation.")}
              <br />
              {t("I’d be happy to hear from you.")}
            </p>
            <div className="email-line">
              <a href="mailto:guilherme.augd@gmail.com">
                {"guilherme.augd@gmail.com"}
              </a>
              <button
                id="copy-email"
                className="icon-button"
                aria-label={t("Copy email address")}
                onClick={copyEmail}
              >
                <svg className="icon">
                  <use href="#i-copy" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>
      <ProjectDialog
        lang={lang}
        projectKey={selected?.key ?? null}
        trigger={selected?.trigger ?? null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
