import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';

import { Section } from '@/components/Section';

type SkillGroup = { title: string; items: string[] };

/**
 * Four grouped cards, sharing hairline borders so the grid reads as one block.
 * No logos and no proficiency bars — a percentage on a skill claims a precision
 * nobody can measure.
 */
export async function Expertise({ index }: { index: number }) {
  const t = await getTranslations();
  const groups = t.raw('skills.groups') as SkillGroup[];

  return (
    <Section id="expertise" index={index} heading={t('sections.expertise')}>
      <ul className="border-line bg-line grid gap-px overflow-hidden rounded-lg border sm:grid-cols-2">
        {groups.map((group, i) => (
          <li
            key={group.title}
            className="bg-paper hover:bg-paper-raised p-5 transition-colors"
            data-reveal
            style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}
          >
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border-line bg-paper-raised text-ink-soft rounded border px-2 py-0.5 font-mono text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
