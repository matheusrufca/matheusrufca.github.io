import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/**
 * Locale-aware wrappers around Next's navigation APIs. Use this `Link` for
 * internal navigation and the locale prefix is added for you.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
