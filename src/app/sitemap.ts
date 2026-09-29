import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { siteUrl } from '@/lib/site';

// Required by `output: export`: resolve this route once, at build time.
export const dynamic = 'force-static';

/** Generated at build time into `out/sitemap.xml`. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}/`])),
    },
  }));
}
