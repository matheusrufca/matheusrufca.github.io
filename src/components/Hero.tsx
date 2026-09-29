import type { CSSProperties } from 'react';
import { getMessages, getTranslations } from 'next-intl/server';

import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons';
import { routing } from '@/i18n/routing';
import { container } from '@/lib/layout';
import { profile, requireCopy } from '@/lib/profile';
import { asset } from '@/lib/site';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

/**
 * Name, title, a two-sentence summary, four hard facts, and the links a
 * recruiter came for. Short on purpose — every line here carries information, so
 * there is no room for a headline that only sounds good.
 */
export async function Hero() {
  const t = await getTranslations('hero');

  const facts = [
    { label: t('facts.experience.label'), value: t('facts.experience.value') },
    { label: t('facts.location.label'), value: t('facts.location.value') },
    { label: t('facts.work.label'), value: t('facts.work.value') },
    { label: t('facts.current.label'), value: profile.experience[0].company },
  ];

  const links = [
    { label: 'LinkedIn', href: profile.links.linkedin, Icon: LinkedInIcon },
    { label: 'GitHub', href: profile.links.github, Icon: GitHubIcon },
  ];

  // One download per configured locale, labelled from the catalog. Adding a
  // language means adding a `cv` path and a `cvLanguages` entry — not editing
  // this component.
  const messages = await getMessages();
  const cvLabels = messages.hero.cvLanguages as unknown as Record<string, string>;
  const cvFiles = routing.locales.map((locale) => ({
    locale,
    href: profile.cv[locale],
    label: requireCopy(cvLabels, locale, 'hero.cvLanguages'),
  }));

  return (
    <section className="relative isolate overflow-hidden">
      <div className="grid-field pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className={`${container} py-14 sm:py-20`}>
        <h1 className="text-name font-semibold" data-reveal>
          {profile.name}
        </h1>

        <p className="mt-2.5 font-mono text-sm tracking-[0.02em]" data-reveal style={delay(60)}>
          <span className="text-accent" aria-hidden="true">
            {'// '}
          </span>
          {t('title')}
        </p>

        <p className="text-ink-soft text-lead mt-6 max-w-[60ch]" data-reveal style={delay(120)}>
          {t('summary')}
        </p>

        {/* Four facts instead of a tagline. A definition list is the right
            structure, and it doubles as the intro's visual anchor. */}
        <dl
          className="border-line mt-10 grid grid-cols-2 border-y sm:grid-cols-4"
          data-reveal
          style={delay(180)}
        >
          {facts.map((fact) => (
            <div key={fact.label} className="py-4 pr-4">
              <dt className="label">{fact.label}</dt>
              <dd className="mt-1.5 text-sm font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
          data-reveal
          style={delay(240)}
        >
          <a
            href={`mailto:${profile.email}`}
            className="link-underline hover:text-accent inline-flex items-center gap-2 transition-colors"
          >
            <MailIcon className="text-ink-faint" />
            {profile.email}
          </a>
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener me"
              className="link-underline hover:text-accent inline-flex items-center gap-2 transition-colors"
            >
              <Icon className="text-ink-faint" />
              {label}
            </a>
          ))}
        </div>

        {/* Every language is offered regardless of the page locale — someone
            reading in English may still need the Portuguese document. */}
        <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal style={delay(300)}>
          <span className="label">{t('cvLabel')}</span>
          {cvFiles.map((file) => (
            <a
              key={file.locale}
              href={asset(file.href)}
              download
              hrefLang={file.locale}
              className="border-line-strong hover:border-accent hover:text-accent inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors"
            >
              <DownloadIcon width={13} height={13} />
              {file.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
