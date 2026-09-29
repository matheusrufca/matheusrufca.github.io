import type { CSSProperties } from 'react';
import { getMessages, getTranslations } from 'next-intl/server';

import { Section } from '@/components/Section';
import { type RoleCopy, formatPeriod, profile, requireCopy } from '@/lib/profile';

/**
 * Six recent roles on a timeline, one short paragraph each, plus a single line
 * for everything before 2019. Anyone who wants the full twelve-role history
 * downloads the CV — reproducing it here would only add scroll.
 */
export async function Experience({ index }: { index: number }) {
  const t = await getTranslations();

  // `t.raw()` only reaches leaf keys and the roles are looked up by id, so the
  // copy is read from the message object directly. `requireCopy` turns a missing
  // translation into a build failure rather than a blank heading.
  const messages = await getMessages();
  const roles = messages.experience as unknown as Record<string, RoleCopy>;
  const present = t('experience.present');

  return (
    <Section id="experience" index={index} heading={t('sections.experience')}>
      <ol className="border-line border-l">
        {profile.experience.map((item, i) => {
          const copy = requireCopy(roles, item.id, 'experience');

          return (
            <li
              key={item.id}
              className="group relative pb-8 pl-6 sm:pl-8"
              data-reveal
              style={{ '--reveal-delay': `${i * 50}ms` } as CSSProperties}
            >
              <Dot current={item.to === null} />
              <p className="label">
                {formatPeriod(item, present)}
                <span aria-hidden="true">{' · '}</span>
                {copy.engagement}
              </p>
              <h3 className="mt-1.5 text-base font-medium">
                {copy.role}
                <span className="text-ink-faint font-normal" aria-hidden="true">
                  {' · '}
                </span>
                <span className="text-ink-soft font-normal">{item.company}</span>
              </h3>
              <p className="text-ink-soft mt-2 max-w-[66ch] text-sm leading-relaxed">
                {copy.summary}
              </p>
              <p className="text-ink-faint mt-2.5 font-mono text-xs">{item.stack.join(' · ')}</p>
            </li>
          );
        })}

        <li className="group relative pl-6 sm:pl-8" data-reveal>
          <Dot />
          <p className="label">
            {profile.earlier.from} – {profile.earlier.to}
          </p>
          <h3 className="text-ink-soft mt-1.5 text-base font-medium">{t('earlier.label')}</h3>
          <p className="text-ink-soft mt-2 max-w-[66ch] text-sm leading-relaxed">
            {t('earlier.summary')}
          </p>
          <p className="text-ink-faint mt-2.5 font-mono text-xs">
            {profile.earlier.companies.join(' · ')}
          </p>
        </li>
      </ol>
    </Section>
  );
}

/** Marker on the timeline rule. Filled for the current role. */
function Dot({ current = false }: { current?: boolean }) {
  return (
    <span
      className={`ring-paper absolute top-1 -left-[4.5px] size-2 rounded-full ring-4 transition-colors ${
        current ? 'bg-accent' : 'bg-line-strong group-hover:bg-accent'
      }`}
      aria-hidden="true"
    />
  );
}
