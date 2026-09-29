import type messages from './messages/en.json';
import type { routing } from './src/i18n/routing';

/**
 * Makes `next-intl` aware of our locales and message keys, so `t('…')` is
 * autocompleted and a typo or a key missing from a catalog is a type error.
 * `messages/en.json` is the source of truth for the key set.
 */
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
