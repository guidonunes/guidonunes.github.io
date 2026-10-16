import type { Metadata } from "next";
import {
  homePath,
  projectPath,
  projects,
  siteOrigin,
  type Locale,
  type ProjectKey,
} from "./content";

export function pageMetadata(lang: Locale, key?: ProjectKey): Metadata {
  const path = key ? projectPath(lang, key) : homePath(lang);
  const title = key
    ? `${projects[key].title} — Guilherme Nunes`
    : lang === "pt"
      ? "Guilherme Nunes — Engenheiro de Software Backend"
      : "Guilherme Nunes — Backend Software Engineer";
  const description = key
    ? projects[key][lang].lead
    : lang === "pt"
      ? "Engenheiro de software com foco em backend. Java, Spring Boot, Kotlin e .NET. Projetos, decisões técnicas e experiência em produção."
      : "Backend-focused software engineer. Java, Spring Boot, Kotlin, and .NET. Explore projects, technical decisions, and production experience.";
  const image = {
    url: `/assets/social-${lang}.png`,
    width: 1200,
    height: 630,
    alt: "Guilherme Nunes · Java · Spring Boot · Kotlin · .NET",
  };
  return {
    metadataBase: new URL(siteOrigin),
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: key ? projectPath("en", key) : "/",
        "pt-BR": key ? projectPath("pt", key) : "/pt/",
        "x-default": key ? projectPath("en", key) : "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Guilherme Nunes",
      title,
      description,
      url: path,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons: { icon: "/favicon.svg" },
  };
}
