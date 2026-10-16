# Guilherme Nunes — Software / Backend Engineering Portfolio

Responsive Next.js portfolio with a graphite, ice-blue, and mint palette; a matching light theme; English and Brazilian Portuguese content; and detailed engineering case studies.

## Development

Requires Node.js 20.9+ and npm.

```bash
npm ci
npm run dev
```

Create and validate the GitHub Pages export:

```bash
npm run build
npm test
```

`next build` checks TypeScript and writes the static site to `out/`. The export test requires that build output. All pages are generated at build time; no application server is required by the published site.

## Routes and structure

- `/` and `/pt/`: localized portfolio home pages.
- `/projects/{p1grid,carbon,aguia,dca}/` and `/pt/projects/{slug}/`: case studies.
- `app/(en)/` and `app/(pt)/pt/`: route groups with correctly localized HTML documents and metadata.
- `components/portfolio/`: React UI, native Canvas sculpture, dialogs, and shared preferences.
- `content/projects.json`: localized project details, contributions, decisions, outcomes, and evidence links.
- `content/pt.json`: Portuguese translations for the home page and controls.
- `lib/portfolio/`: route helpers, metadata, and progressive section/disclosure motion.
- `public/assets/`: responsive architecture diagrams, real CarbonHunter pipeline evidence, and social cards.
- `app/globals.css`: responsive styling and light/dark design tokens.

Project names and “case study” links open complete pages. Project artwork opens a quick-view dialog with a full-page link. The language switch preserves the project being viewed. Static text, case-study links, and résumé downloads work without JavaScript.

## Preferences and accessibility

Dark mode is the default. Theme and site-wide motion choices persist across pages. Operating-system reduced motion takes precedence, and the sculpture's pause control cannot override it. Canvas rendering stops offscreen and in background tabs; narrower screens use fewer particles.

Navigation becomes a bottom dock below 900 px. Native dialogs support Escape and return focus to their trigger. Details/summary remains usable without animation support. View Transitions have a Web Animations fallback, and section navigation moves keyboard focus to the destination.

## Deployment and review

Pull requests targeting `master` run the production build and tests. The deployment job is skipped for pull requests. Merging into `master` triggers the existing GitHub Pages deployment of `out/`.

Canonical, alternate-language, sitemap, and social URLs use `https://guidonunes.github.io`, configured in `lib/portfolio/content.ts`. If the production domain changes, update that value. `trailingSlash: true` generates directory/index.html routes suitable for direct GitHub Pages requests.

Review checklist before merging:

- Desktop and mobile layouts in both languages and both themes, including 320 px and 200% zoom.
- Keyboard navigation, dialog focus, and the mobile dock.
- Motion preferences, rapid disclosure toggles, and section transitions on a real browser.
- Direct project URLs, back/forward navigation, copy actions, and résumé downloads.

## Content provenance

The approved prototype was ported into the existing React/Next.js application. Project-card artwork is illustrative; architecture diagrams are simplified documented component views. CarbonHunter includes a real repository pipeline screenshot with dated evidence and a link to its workflow run. Repository test counts are historical evidence, not tests rerun by the portfolio build.

Résumé links reuse the existing public `/resume.pdf`. The Portuguese UI identifies it as English. Newer EN/PT PDFs are not included because publication approval is still required. Existing public assets and their URLs are retained for compatibility.

## Validation scope

`npm test` checks all ten exported portfolio routes, links/assets, locale counterparts, metadata, sitemap, and DOM-based React interactions in both languages. Interaction tests run under React Strict Mode and cover effect cleanup, filters, dialogs, focus restoration, copy links, navigation, theme, and reduced motion.

The DOM test environment mocks Canvas, geometry, native dialogs, and animation APIs. It verifies application behavior, not actual browser rendering, screen-reader output, physical devices, or Core Web Vitals. Those require the real-browser review above.
