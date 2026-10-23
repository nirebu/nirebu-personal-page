import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// @astrojs/sitemap always emits `sitemap-index.xml` + `sitemap-N.xml` chunks.
// Google Search Console does not reliably follow redirected sitemap URLs, and
// `/sitemap.xml` is what this site has had submitted (via robots.txt) since the
// Jekyll days — so merge the chunks back into a single `/sitemap.xml` at the
// conventional path, and drop the index. Runs after the sitemap integration
// writes its files (integration hooks run in array order).
function singleSitemap() {
  return {
    name: 'single-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const chunks = (await readdir(outDir)).filter((f) => /^sitemap-\d+\.xml$/.test(f)).sort();
        if (chunks.length === 0) return;

        let openTag;
        const bodies = [];
        for (const chunk of chunks) {
          const xml = await readFile(join(outDir, chunk), 'utf8');
          openTag ??= xml.match(/<urlset[^>]*>/)?.[0];
          const body = xml.match(/<urlset[^>]*>([\s\S]*)<\/urlset>/)?.[1];
          if (body) bodies.push(body);
        }
        if (!openTag || bodies.length === 0) return;

        await writeFile(
          join(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>${openTag}${bodies.join('')}</urlset>`
        );
        await Promise.all(
          [...chunks, 'sitemap-index.xml'].map((f) => unlink(join(outDir, f)).catch(() => {}))
        );
        logger.info(`sitemap.xml: merged ${chunks.length} chunk(s) into a single file`);
      },
    },
  };
}

// https://docs.astro.build/en/guides/configuring-astro/
export default defineConfig({
  site: 'https://nirebu.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), singleSitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
