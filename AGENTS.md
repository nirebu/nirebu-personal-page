# Project Context: Nicolò Rebughini's Personal Website

## Overview
This project is the personal website and blog of **Nicolò Rebughini** (nirebu.com). It is a static site generated using **Astro** and styled with **Tailwind CSS**.

## Tech Stack
*   **Core:** Astro v7 (static output, `site: https://nirebu.com`)
*   **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`, utilities in `src/styles/global.css` — no config file needed, automatic content detection)
*   **Package Manager:** npm (`package.json`, `package-lock.json`)
*   **Content:** Astro Content Collections (`src/content.config.ts`, `src/content/blog/*.md`)

## Key Files & Directories
*   **`astro.config.mjs`**: Astro config (site URL, Tailwind Vite plugin + sitemap integrations).
*   **`src/content.config.ts`**: Defines the `blog` collection (title, description, date, tags, `published` flag; `published: false` = draft, filtered out at render).
*   **`src/content/blog/`**: Blog posts in Markdown (filename = slug, no date prefix; date lives in frontmatter).
*   **`src/data/site.ts`**: Site constants + video list (ported from Jekyll `_data/videos.yml`).
*   **`src/layouts/Base.astro`**: Main layout (head/SEO, navbar, footer, PostHog in production builds).
*   **`src/components/`**: `Navbar.astro`, `Footer.astro`, `VideoList.astro`, `PostHog.astro`.
*   **`src/pages/`**: File-based routing — `index.astro`, `about.astro`, `blog/index.astro`, `blog/[...slug].astro`, `videos/index.astro` + `videos/page/[page].astro` (10 per page, same `/videos/` + `/videos/page/N/` URLs as before), `projects/`, `tools/` (incl. client-side `out-of-black` tool), `rss.xml.js`, `404.astro`.
*   **`src/styles/global.css`**: Tailwind directives + ported custom styles (`.btn-primary`, `.markdown`, ...).
*   **`public/`**: Static files served at root (`robots.txt`, `parking-simulator.html`, `assets/images/`).

## Setup & Installation

1.  **Install Dependencies:**
    Ensure you have Node.js installed. Then run:
    ```bash
    npm install
    ```

## Development

### Running the Local Server
To start the Astro dev server with hot reload:
```bash
npm run dev
```
The site will be available at `http://localhost:4321/` (or the URL specified in the output).

### Building for Production
To build the static site into the `dist/` directory:
```bash
npm run build
```
Preview the production build with `npm run preview`.

## Deployment

Deploys on Netlify, configured via `netlify.toml` (`npm run build` → `dist/`, Node 22).
No account/CI changes needed when adding pages — push and Netlify rebuilds.

`public/_redirects` (copied to `dist/_redirects`) holds 301s from the old Jekyll URL
structure — posts lived at `/YYYY/MM/DD/slug.html`, pages at `/path/name.html`
(`/about.html`, `/tools/out-of-black.html`, `/projects/festeggiati.html`), plus
`/feed.xml`. That list is a frozen migration mapping; new posts never had an old-style
URL, so it does not need touching. Don't hard-link to old URLs in content — link to the
canonical `/blog/<slug>/` path.

The sitemap is a single `/sitemap.xml` (see `singleSitemap()` in `astro.config.mjs`) —
`@astrojs/sitemap` emits an index plus chunks, which Search Console handles badly, so a
build hook merges them back into one file at the conventional path. Keep `robots.txt`
pointing at `/sitemap.xml` and never redirect that URL.

## Development Conventions

*   **Content:** Blog posts are Markdown files in `src/content/blog/`. New videos go in the `videos` array in `src/data/site.ts`.
*   **Styling:** Use Tailwind utility classes in `.astro` components. Shared custom CSS lives in `src/styles/global.css`.
*   **Routes:** Add a file under `src/pages/` — the path maps to the URL. Dynamic blog URLs come from the `blog` collection slug.
