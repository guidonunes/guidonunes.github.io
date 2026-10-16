import type { MetadataRoute } from "next";
import {
  siteOrigin,
  projectKeys,
  projectPath,
  homePath,
  type Locale,
} from "@/lib/portfolio/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return (["en", "pt"] as Locale[]).flatMap((lang) =>
    [homePath(lang), ...projectKeys.map((key) => projectPath(lang, key))].map(
      (path) => ({ url: siteOrigin + path }),
    ),
  );
}
