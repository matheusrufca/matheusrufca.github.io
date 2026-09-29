import { getTranslations } from 'next-intl/server';

import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons';
import { container, rail } from '@/lib/layout';
import { profile } from '@/lib/profile';

/**
 * Education plus a second pass at the contact links, so someone who has read to
 * the bottom does not have to scroll back up to reach them.
 */
export async function Footer() {
  const t = await getTranslations();

  const links = [
    { label: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
    { label: 'LinkedIn', href: profile.links.linkedin, Icon: LinkedInIcon, external: true },
    { label: 'GitHub', href: profile.links.github, Icon: GitHubIcon, external: true },
  ];

  return (
    <footer className="border-line border-t py-12">
      <div className={`${container} ${rail}`}>
        <p className="label">{t('education.label')}</p>

        <div>
          <p className="text-sm">
            {t('education.degree')}
            <span className="text-ink-faint" aria-hidden="true">
              {' · '}
            </span>
            <span className="text-ink-soft">{profile.education.institution}</span>
          </p>
          <p className="text-ink-faint mt-1 font-mono text-xs">
            {profile.education.from} – {profile.education.to}
          </p>

          <ul className="border-line mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t pt-6 text-sm">
            {links.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener me' } : {})}
                  className="link-underline hover:text-accent inline-flex items-center gap-2 transition-colors"
                >
                  <Icon className="text-ink-faint" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-ink-faint mt-6 font-mono text-xs">
            {t('footer.cvNote')}
            <span aria-hidden="true">{' · '}</span>
            {t('footer.builtWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
