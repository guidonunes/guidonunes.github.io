"use client";
import type { Locale } from "@/lib/portfolio/content";
import { usePreferences } from "./preferences";
import { Icon } from "./icons";
export function CopyLink({
  lang,
  path,
  compact = false,
}: {
  lang: Locale;
  path: string;
  compact?: boolean;
}) {
  const { copy } = usePreferences();
  return (
    <button
      className={compact ? "text-link" : "button secondary"}
      onClick={() =>
        copy(
          new URL(path, location.origin).href,
          lang === "pt" ? "Link do projeto copiado" : "Project link copied",
          lang === "pt"
            ? "Copie o endereço na barra do navegador."
            : "Copy the address from your browser’s address bar.",
        )
      }
    >
      {lang === "pt" ? "Copiar link" : "Copy link"}
      {!compact && <Icon name="copy" />}
    </button>
  );
}
