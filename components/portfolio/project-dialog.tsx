"use client";
import { useCallback, useEffect, useRef } from "react";
import {
  projects,
  projectPath,
  type Locale,
  type ProjectKey,
} from "@/lib/portfolio/content";
import { usePreferences } from "./preferences";
import { CopyLink } from "./copy-link";
import { Icon } from "./icons";

export function ProjectDialog({
  lang,
  projectKey,
  trigger,
  onClose,
}: {
  lang: Locale;
  projectKey: ProjectKey | null;
  trigger: HTMLElement | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const animations = useRef<Animation[]>([]);
  const closing = useRef(false);
  const { reduced } = usePreferences();
  const cancelAnimations = useCallback(() => {
    animations.current.forEach((a) => a.cancel());
    animations.current = [];
  }, []);
  const transform = useCallback(() => {
    const dialog = ref.current!;
    const source = (
      trigger?.closest(".project")?.querySelector(".project-visual") || trigger
    )?.getBoundingClientRect();
    if (!source) return "translateY(24px) scale(.94)";
    const target = dialog.getBoundingClientRect();
    return `translate(${source.left + source.width / 2 - target.left - target.width / 2}px, ${source.top + source.height / 2 - target.top - target.height / 2}px) scale(${Math.max(0.2, Math.min(1.2, source.width / target.width))}, ${Math.max(0.2, Math.min(1, source.height / target.height))})`;
  }, [trigger]);
  useEffect(() => {
    if (!projectKey) return;
    const dialog = ref.current!;
    closing.current = false;
    dialog.classList.remove("dialog-closing");
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("modal-open");
    dialog.querySelector<HTMLButtonElement>("#close-dialog")?.focus();
    return () => {
      closing.current = false;
      cancelAnimations();
      dialog.close();
      document.body.classList.remove("modal-open");
      trigger?.focus({ preventScroll: true });
    };
  }, [projectKey, trigger, cancelAnimations]);
  useEffect(() => {
    const dialog = ref.current!;
    if (!projectKey || reduced || !dialog.animate) return;
    animations.current.push(
      dialog.animate(
        [
          { transform: transform(), opacity: 0.12, filter: "blur(5px)" },
          { transform: "none", opacity: 1, filter: "blur(0)" },
        ],
        { duration: 440, easing: "cubic-bezier(.16,1,.3,1)" },
      ),
    );
    return cancelAnimations;
  }, [projectKey, reduced, transform, cancelAnimations]);
  const close = () => {
    const dialog = ref.current!;
    if (closing.current) return;
    cancelAnimations();
    if (reduced || !dialog.animate) {
      onClose();
      return;
    }
    closing.current = true;
    dialog.classList.add("dialog-closing");
    const animation = dialog.animate(
      [
        { transform: "none", opacity: 1 },
        { transform: transform(), opacity: 0 },
      ],
      { duration: 220, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" },
    );
    animations.current.push(animation);
    animation.finished
      .catch(() => {})
      .then(() => {
        if (closing.current && ref.current?.open) onClose();
      });
  };
  const project = projectKey ? projects[projectKey] : null;
  const content = project?.[lang];
  return (
    <dialog
      ref={ref}
      id="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          close();
      }}
    >
      {project && content && projectKey && (
        <>
          <div className="dialog-head">
            <span className="mono">{content.type}</span>
            <button
              id="close-dialog"
              className="icon-button"
              aria-label={
                lang === "pt"
                  ? "Fechar detalhes do projeto"
                  : "Close project details"
              }
              onClick={close}
            >
              <Icon name="close" />
            </button>
          </div>
          <h2 id="dialog-title">{project.title}</h2>
          <p className="dialog-intro">{content.lead}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="dialog-divider" />
          <h3>{lang === "pt" ? "Minha contribuição" : "My contribution"}</h3>
          <p>{content.role}</p>
          <h3>{lang === "pt" ? "O que foi entregue" : "What was delivered"}</h3>
          <ul>
            {content.outcomes.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <a className="button primary" href={projectPath(lang, projectKey)}>
            {lang === "pt"
              ? "Ler o estudo de caso completo ↗"
              : "Read the full case study ↗"}
          </a>
          <div id="dialog-share">
            <CopyLink
              lang={lang}
              path={projectPath(lang, projectKey)}
              compact
            />
          </div>
          <p className="concept-note">
            {lang === "pt"
              ? "A capa do projeto é ilustrativa. As evidências estão no estudo completo."
              : "Project artwork is illustrative. Evidence is available in the full case study."}
          </p>
        </>
      )}
    </dialog>
  );
}
