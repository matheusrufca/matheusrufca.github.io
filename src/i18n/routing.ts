import { defineRouting } from 'next-intl/routing';

/**
 * Routing config shared by `next-intl` and the app.
 *
 * `localePrefix: 'always'` is what makes this work as a static export: every
 * page lives under `/en/…` or `/pt/…`, so there is nothing for a server to
 * negotiate at request time. `/` is handled by `public/index.html`.
 */
export const routing = defineRouting({
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // No middleware in a static export, so there is no cookie to persist.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/** `html lang` value — more specific than the route segment. */
export const htmlLang: Record<Locale, string> = {
  en: 'en',
  pt: 'pt-BR',
};

/** Every locale except the current one, in configured order. */
export function otherLocales(locale: Locale): Locale[] {
  return routing.locales.filter((candidate) => candidate !== locale);
}
