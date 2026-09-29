import { basePath } from './base-path';

/**
 * Deployment-level constants.
 *
 * `NEXT_PUBLIC_SITE_URL` is only used for absolute URLs in metadata (Open Graph,
 * canonical links, sitemap). The deploy workflow derives it from the repository
 * owner, so it normally needs no attention.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://matheusrufca.github.io'
).replace(/\/$/, '');

/**
 * Prefix a `public/` asset with the base path. `<Link>` does this on its own;
 * plain `<a href>` and `<img src>` to static files do not.
 */
export function asset(path: string): string {
  return `${basePath}${path}`;
}

export { basePath };
