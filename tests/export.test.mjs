import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { JSDOM } from "jsdom";
const output = resolve("out");
const keys = ["p1grid", "carbon", "aguia", "dca"];
const paths = [
  "/",
  "/pt/",
  ...keys.flatMap((key) => [`/projects/${key}/`, `/pt/projects/${key}/`]),
];
const documents = new Map(
  paths.map((path) => [
    path,
    new JSDOM(readFileSync(join(output, path, "index.html"), "utf8")).window
      .document,
  ]),
);

for (const [path, document] of documents)
  test(`static export ${path}`, () => {
    const pt = path.startsWith("/pt/");
    assert.equal(document.documentElement.lang, pt ? "pt-BR" : "en");
    assert.equal(document.querySelectorAll("h1").length, 1);
    assert.equal(
      document.querySelector("link[rel=canonical]").href,
      "https://guidonunes.github.io" + path,
    );
    assert.equal(
      document.querySelector('meta[property="og:url"]').content,
      "https://guidonunes.github.io" + path,
    );
    assert(
      document
        .querySelector('meta[property="og:image"]')
        .content.endsWith(`/assets/social-${pt ? "pt" : "en"}.png`),
    );
    assert.equal(
      document.querySelector(".language-toggle").getAttribute("href"),
      pt ? path.replace("/pt/", "/") : "/pt" + path,
    );
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate IDs");
    const resume = document.querySelector(".resume-link");
    assert.equal(resume.getAttribute("href"), "/resume.pdf");
    if (pt) assert(resume.textContent.includes("EN"), "identify the existing English résumé");
    for (const node of document.querySelectorAll(
      "a[href],img[src],script[src],link[href],source[srcset]",
    )) {
      const raw =
        node.getAttribute("href") ||
        node.getAttribute("src") ||
        node.getAttribute("srcset");
      const url = new URL(raw, "https://guidonunes.github.io" + path);
      if (url.origin !== "https://guidonunes.github.io") continue;
      let file = join(output, decodeURIComponent(url.pathname));
      if (existsSync(file) && statSync(file).isDirectory())
        file = join(file, "index.html");
      assert(existsSync(file), `${path}: missing ${raw}`);
      if (url.hash && documents.has(url.pathname))
        assert(
          documents.get(url.pathname).getElementById(url.hash.slice(1)),
          `missing fragment ${raw}`,
        );
      if (node.tagName === "IMG") {
        assert(node.alt);
        assert(node.width > 0);
        assert(node.height > 0);
      }
    }
    assert(
      !document.documentElement.innerHTML.includes("chatgpt.site"),
      "prototype URL leaked into export",
    );
  });
test("sitemap covers all ten routes and robots uses the production origin", () => {
  const map = readFileSync(join(output, "sitemap.xml"), "utf8");
  for (const path of paths)
    assert(map.includes(`<loc>https://guidonunes.github.io${path}</loc>`));
  assert(
    readFileSync(join(output, "robots.txt"), "utf8").includes(
      "https://guidonunes.github.io/sitemap.xml",
    ),
  );
});
