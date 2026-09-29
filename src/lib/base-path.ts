/**
 * Single source of truth for the deployment base path.
 *
 * Imported by BOTH `next.config.ts` (to set `basePath`/`assetPrefix`) and
 * `src/lib/site.ts` (so plain `<a href>` to files in `public/` resolve). Set
 * `NEXT_PUBLIC_BASE_PATH` and everything follows — there is nothing to keep in
 * sync by hand, and no way for the config and the asset links to disagree.
 *
 * Empty for a user site at `https://<username>.github.io`. For a project site
 * at `https://<username>.github.io/<repo>`, set it to `/<repo>`.
 *
 * This file must stay dependency-free: `next.config.ts` loads it before the app
 * is bundled.
 */
const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

if (raw && !raw.startsWith('/')) {
  throw new Error(`NEXT_PUBLIC_BASE_PATH must start with "/" — received "${raw}".`);
}

export const basePath = raw.replace(/\/$/, '');
