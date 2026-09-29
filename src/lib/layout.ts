/**
 * Shared layout primitives.
 *
 * Lives here rather than in `Section.tsx` so the header, intro and footer do not
 * have to import a section module just to line up with the page gutter.
 */

/** Page gutter and max width. Every full-width block composes on top of this. */
export const container = 'mx-auto w-full max-w-5xl px-6 sm:px-8';

/** The narrow label rail used by sections and the footer, so they align. */
export const rail = 'grid gap-7 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-14';
