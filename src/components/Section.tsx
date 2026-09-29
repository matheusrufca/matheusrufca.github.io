import type { ReactNode } from 'react';

import { container, rail } from '@/lib/layout';

type SectionProps = {
  id: string;
  /** Rendered as `01`, `02`… — the one repeated ornament in the design. */
  index: number;
  heading: string;
  children: ReactNode;
};

/**
 * Section shell: a numbered label and a modest heading in a sticky left rail on
 * wide screens, stacked above the content on narrow ones.
 */
export function Section({ id, index, heading, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="border-line border-t py-14 sm:py-20">
      <div className={`${container} ${rail}`}>
        <div className="lg:sticky lg:top-24 lg:self-start" data-reveal>
          <p className="label flex items-center gap-2.5">
            <span className="text-accent" aria-hidden="true">
              {String(index).padStart(2, '0')}
            </span>
            <span className="bg-line-strong h-px w-5" aria-hidden="true" />
          </p>
          <h2 id={headingId} className="text-heading mt-3 font-semibold">
            {heading}
          </h2>
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
