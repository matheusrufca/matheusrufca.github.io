import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { type Locale, otherLocales } from '@/i18n/routing';
import { container } from '@/lib/layout';
import { profile } from '@/lib/profile';

/**
 * Just the name and the language switch. With only two sections there is nothing
 * for a nav to do that scrolling does not already do.
 *
 * The switch renders one link per other locale, so a third language needs no
 * change here.
 */
export async function Header({ locale }: { locale: Locale }) {
  const t = await getTranslations('nav');

  const targets = await Promise.all(
    otherLocales(locale).map(async (target) => ({
      locale: target,
      name: (await getTranslations({ locale: target, namespace: 'meta' }))('localeName'),
    })),
  );

  return (
    <header className="border-line bg-paper/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className={`${container} flex h-14 items-center justify-between gap-6`}>
        <Link href="/" className="font-mono text-sm font-medium">
          {profile.name}
        </Link>

        <nav aria-label={t('switchLanguage')}>
          <ul className="flex items-center gap-2">
            {targets.map((target) => (
              <li key={target.locale}>
                <Link
                  href="/"
                  locale={target.locale}
                  hrefLang={target.locale}
                  aria-label={`${t('switchLanguage')}: ${target.name}`}
                  className="border-line-strong hover:border-accent hover:text-accent rounded border px-2.5 py-1 font-mono text-xs uppercase transition-colors"
                >
                  <span lang={target.locale}>{target.locale}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
