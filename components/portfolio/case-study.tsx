import {
  projects,
  projectKeys,
  homePath,
  projectPath,
  resumePath,
  type Locale,
  type ProjectKey,
} from "@/lib/portfolio/content";
import { CopyLink } from "./copy-link";

export function CaseStudy({
  lang,
  projectKey,
}: {
  lang: Locale;
  projectKey: ProjectKey;
}) {
  const project = projects[projectKey];
  const content = project[lang];
  const label = (en: string, pt: string) => (lang === "pt" ? pt : en);
  const diagram = `/assets/${projectKey}-architecture-${lang}.svg`;
  const next =
    projectKeys[(projectKeys.indexOf(projectKey) + 1) % projectKeys.length];
  const evidence = "evidence" in content ? content.evidence : null;
  return (
    <main id="main" className="case-main wrap">
      <a className="case-back text-link" href={`${homePath(lang)}#work`}>
        ← {label("Back to selected work", "Voltar aos projetos")}
      </a>
      <header className="case-heading">
        <div className="eyebrow section-number">{content.type}</div>
        <h1>{project.title}</h1>
        <p className="case-lead">{content.lead}</p>
        <p className="case-period">{content.period}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="case-actions">
          {project.repository ? (
            <a
              className="button primary"
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label("Explore repository ↗", "Ver repositório ↗")}
            </a>
          ) : (
            <a
              className="button primary"
              href={`mailto:guilherme.augd@gmail.com?subject=${encodeURIComponent(project.title)}`}
            >
              {label(
                "Ask me about the project ↗",
                "Converse comigo sobre o projeto ↗",
              )}
            </a>
          )}
          <CopyLink lang={lang} path={projectPath(lang, projectKey)} />
        </div>
      </header>
      <div className="case-intro-grid">
        <section className="case-block">
          <h2>{label("The problem", "O problema")}</h2>
          <p>{content.problem}</p>
        </section>
        <section className="case-block">
          <h2>{label("My contribution", "Minha contribuição")}</h2>
          <p>{content.role}</p>
        </section>
      </div>
      <section className="case-block">
        <h2>{label("How the system connects", "Como o sistema se conecta")}</h2>
        <figure className="architecture-figure">
          <a href={diagram} target="_blank" rel="noopener noreferrer">
            <picture>
              <source
                media="(max-width:600px)"
                srcSet={diagram.replace(".svg", "-mobile.svg")}
                width="400"
                height="622"
              />
              <img
                src={diagram}
                width="920"
                height="390"
                alt={`${content.diagram[0][0]} → ${content.diagram[1][0]} → ${(content.diagram[2] as string[][]).map((node) => node[0]).join(", ")}`}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </a>
          <figcaption>
            {content.diagramNote}
            <a href={diagram} target="_blank" rel="noopener noreferrer">
              {label(
                "Open full-size diagram ↗",
                "Abrir diagrama em tamanho completo ↗",
              )}
            </a>
          </figcaption>
        </figure>
      </section>
      <section className="case-block">
        <h2>{label("Engineering decisions", "Decisões de engenharia")}</h2>
        <div className="decision-list">
          {content.decisions.map((decision, index) => (
            <article className="decision" key={decision.title}>
              <span className="decision-index">0{index + 1}</span>
              <div>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="case-block delivered-block">
        <h2>{label("What was delivered", "O que foi entregue")}</h2>
        <ul>
          {content.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
        <p className="evidence-note">{content.note}</p>
      </section>
      {evidence && (
        <section className="case-block">
          <h2>{label("Evidence", "Evidências")}</h2>
          <figure className="evidence-figure">
            <a href={evidence.image} target="_blank" rel="noopener noreferrer">
              <img
                src={evidence.image}
                width="1717"
                height="927"
                alt={evidence.alt}
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption>{evidence.caption}</figcaption>
          </figure>
        </section>
      )}
      {project.sources.length > 0 && (
        <section className="case-block">
          <h2>{label("Explore the sources", "Explore as fontes")}</h2>
          <div className="source-links">
            {project.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source[lang]} ↗
              </a>
            ))}
          </div>
        </section>
      )}
      <div className="case-bottom">
        <a
          className="text-link resume-link"
          href={resumePath(lang)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label("View résumé", "Ver currículo (EN)")} · PDF ↗
        </a>
        <a className="next-case" href={projectPath(lang, next)}>
          <span>{label("Next project", "Próximo projeto")}</span>
          <strong>{projects[next].title} ↗</strong>
        </a>
      </div>
    </main>
  );
}
