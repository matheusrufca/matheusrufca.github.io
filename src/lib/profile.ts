import type messages from '../../messages/en.json';
import profileData from '../../data/profile.json';

/**
 * Language-neutral facts: name, contact, links, and the dates and tech stack of
 * each role. Anything that needs translating (role titles, summaries, skill
 * labels) lives in `messages/<locale>.json` instead, keyed by the same `id`.
 *
 * That split means a date or a stack entry is edited in exactly one place.
 */
export const profile = profileData;

export type ExperienceItem = (typeof profile.experience)[number];

type ExperienceMessages = (typeof messages)['experience'];

/**
 * Per-role copy, derived from the message catalog rather than declared by hand —
 * add a field to `messages/en.json` and this type follows. `Extract` picks the
 * role objects and drops the sibling `present` string.
 */
export type RoleCopy = Extract<ExperienceMessages[keyof ExperienceMessages], { role: string }>;

/**
 * Reads `id` out of a message record, failing the build if the translation is
 * missing. A loud error beats a role rendering with a blank title because a key
 * was added to `en.json` and forgotten in `pt.json`.
 */
export function requireCopy<T>(record: Record<string, T>, id: string, namespace: string): T {
  const value = record[id];
  if (!value) {
    throw new Error(`Missing "${namespace}.${id}" — add it to every file in messages/.`);
  }
  return value;
}

/** `2019 – 2022`, or `2025 – Present` for an ongoing role. */
export function formatPeriod(item: ExperienceItem, present: string): string {
  const to = item.to ?? present;
  return item.from === to ? item.from : `${item.from} – ${to}`;
}
