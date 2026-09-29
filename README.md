# mmr-vitae

A one-page professional site for a Senior Frontend Engineer — an online business
card, not a portfolio. Static, bilingual (English / Portuguese), served at
**https://matheusrufca.github.io**.

- **Framework:** Next.js 15 (App Router) with `output: 'export'`
- **Language:** TypeScript, strict
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **i18n:** `next-intl`
- **Hosting:** GitHub Pages via GitHub Actions
- **Runtime dependencies:** none beyond React — no backend, database, CMS or auth

## Repository name

The project is `mmr-vitae`, but the **repository must be named
`matheusrufca.github.io`** — GitHub derives the site URL from the repository
name, and that exact name is what makes it a user site served from the domain
root with no subpath. It is a GitHub requirement, not a preference.

Renaming the repository to anything else turns it into a project site at
`https://matheusrufca.github.io/<repo>/` and requires a base path (see
[Moving to a project site](#moving-to-a-project-site)). The package name in
`package.json` is independent and plays no part in this.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build        # static export into ./out
pnpm preview      # serve ./out exactly as GitHub Pages will
pnpm lint
pnpm typecheck
pnpm format
```

`/` redirects to `/en/`. The Portuguese page is at `/pt/`, reachable from the
language switch in the header. Everything behaves the same in development and in
the built output.

## Where the content lives

Two kinds of data, in three JSON files. Nothing is hardcoded in a component.

### `data/profile.json` — language-neutral facts

Name, email, profile links, CV paths, education years, and for each role: the
company, the years and the tech stack. Edited **once**, used by both languages.

```json
{
  "id": "disney",
  "company": "Disney Streaming",
  "from": "2025",
  "to": null,
  "stack": ["React", "Next.js", "TypeScript", "Node.js", "Playwright", "Jest"]
}
```

`"to": null` means the role is current and renders as `2025 – Present` (or
`2025 – Atual`). Roles appear in the order listed.

### `messages/en.json` and `messages/pt.json` — everything that needs translating

UI labels, the summary, skill group titles, and per-role job titles and
descriptions. Roles are keyed by the same `id` used in `profile.json`:

```json
"experience": {
  "disney": {
    "role": "Senior Frontend Engineer",
    "engagement": "Contract, remote",
    "summary": "Payment, checkout and billing flows for…"
  }
}
```

The Portuguese is written natively, not translated from the English. Keep it that
way — it reads better.

### What is checked for you

- `messages/en.json` is the source of truth for the key set.
  [`global.d.ts`](global.d.ts) derives the message types from it, so a key that
  is misspelled or missing from `pt.json` fails `pnpm typecheck`.
- Adding a role to `profile.json` without adding its copy to **both** message
  files fails the build with `Missing "experience.<id>"` rather than rendering a
  blank heading. That guard is `requireCopy()` in
  [`src/lib/profile.ts`](src/lib/profile.ts).

### A note on the CV files

Both PDFs are committed and served as-is, and they contain your phone number. The
number is deliberately not on the page, but the documents are public and
indexable. If you would rather it were not, publish variants with it removed.

## The CV

The download buttons point at static files in `public/cv/`:

```
public/cv/matheus-rufca-cv-en.pdf
public/cv/matheus-rufca-cv-pt.pdf
```

The names carry no version number, so the URLs stay stable when you update a
CV — just overwrite the file. They are descriptive so the downloaded file is
named sensibly without a `download="…"` override. The paths live in `cv` in
`data/profile.json`; the buttons are generated from `routing.locales`, so a new
language needs a path there and a label in `hero.cvLanguages`.

## Adding a language

1. Add the locale to `locales` in [`src/i18n/routing.ts`](src/i18n/routing.ts)
   and to `htmlLang`.
2. Copy `messages/en.json` to `messages/<locale>.json` and translate it.

No component changes. Note that `otherLocale()` in `routing.ts` assumes exactly
two locales — generalise it if you add a third.

## Deploying

1. Create the repository named `<username>.github.io` and push to `main`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) lints,
   typechecks, builds and publishes `out/`.

`NEXT_PUBLIC_SITE_URL` is derived from the repository owner, so there is nothing
to configure. It is only used for absolute URLs in metadata (canonical, Open
Graph, `sitemap.xml`). With a custom domain, set a repository variable `SITE_URL`
to the full origin.

`public/.nojekyll` stops GitHub Pages from running Jekyll, which would otherwise
discard Next's `_next/` directory.

### Moving to a project site

If you keep the code in a differently-named repo, set one environment variable
on the build step:

```yaml
NEXT_PUBLIC_BASE_PATH: /<repo>
```

Nothing else. [`src/lib/base-path.ts`](src/lib/base-path.ts) is read by both
`next.config.ts` (for `basePath`/`assetPrefix`) and `src/lib/site.ts` (for the
`asset()` helper used by the CV links), so the config and the asset URLs cannot
disagree. It throws at build time if the value does not start with `/`.

## Design notes

Restrained but not bare. The site reads as a document rather than a portfolio
piece: the intro is short and every line in it carries information.

- **Type:** Inter for text, JetBrains Mono for small labels and metadata. The
  name is the largest thing on the page and it stays near reading size.
- **Colour:** one neutral ramp plus a single warm accent, used only for links,
  focus rings and small marks. All tokens sit at the top of
  [`globals.css`](src/app/globals.css) — re-skinning means editing that block and
  nothing else.
- **Dark mode:** follows `prefers-color-scheme`. No toggle, so no
  flash-of-wrong-theme and no preference to persist.
- **Signature details:** a faint measure grid behind the intro, section labels
  numbered like drawing sheets (`01`), and link underlines that draw themselves
  in. Three, deliberately — resist adding a fourth.
- **Motion:** one scroll-reveal per element, never replayed. Disabled under
  `prefers-reduced-motion`, and content is visible from first paint when
  JavaScript is unavailable.
- **Icons:** four inline SVGs in [`icons.tsx`](src/components/icons.tsx). No icon
  package for four glyphs. The favicon is [`src/app/icon.svg`](src/app/icon.svg),
  an `MR` monogram drawn as paths so it does not depend on a font.
- **Share card:** generated per locale at build time by
  [`og.png/route.tsx`](src/app/[locale]/og.png/route.tsx). It is a route handler
  rather than Next's `opengraph-image` convention because that convention emits an
  extension-less file, which GitHub Pages serves with no `Content-Type` — and
  scrapers then drop the image.
- **Layout:** `max-w-5xl`, section headings in a sticky left rail on wide screens
  and stacked on narrow ones. Three blocks — intro, expertise, experience — plus
  a footer. The intro leads with four hard facts rather than a tagline. Six
  recent roles are shown; everything before 2019 is one summary line, because
  the CV already has the full history.

Accessibility: semantic landmarks, a skip link, one visible focus style, real
`<ol>`/`<dl>` structures, and no information carried by colour alone.

## Project layout

```
data/profile.json       language-neutral facts (dates, companies, stacks, links)
messages/               translatable copy, one file per locale
public/                 static assets; the CVs live in public/cv/
src/app/(root)/         `/` — forwards to the default locale
src/app/[locale]/       the localised page (its layout is a root layout)
src/app/[locale]/og.png route handler that renders the share card
src/app/icon.svg        favicon
src/app/globals.css     design tokens
src/components/         presentational components, no copy
src/i18n/               next-intl routing and request config
src/lib/base-path.ts    base path, shared with next.config.ts
src/lib/layout.ts       container + rail class strings
src/lib/profile.ts      profile data access + build-time copy guard
src/lib/site.ts         site URL and the asset() helper
```
