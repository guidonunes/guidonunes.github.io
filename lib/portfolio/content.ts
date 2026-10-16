import data from "@/content/projects.json";
import portuguese from "@/content/pt.json";

export type Locale = "en" | "pt";
export const projectKeys = ["p1grid", "carbon", "aguia", "dca"] as const;
export type ProjectKey = (typeof projectKeys)[number];
export const projects = data;
export const siteOrigin = "https://guidonunes.github.io";
export const homePath = (lang: Locale) => (lang === "pt" ? "/pt/" : "/");
export const projectPath = (lang: Locale, key: ProjectKey) =>
  `${homePath(lang)}projects/${key}/`;
// Reuse the résumé that is already public. New PDFs require publication approval.
export const resumePath = (_lang: Locale) => "/resume.pdf";
export const translate = (lang: Locale, value: string) =>
  lang === "pt"
    ? ((portuguese as Record<string, string>)[value] ?? value)
    : value;
export function isProjectKey(key: string): key is ProjectKey {
  return projectKeys.includes(key as ProjectKey);
}
