import { routing } from '@/i18n/routing';

const target = `/${routing.defaultLocale}/`;

/**
 * `/` forwards to the default locale.
 *
 * Every real page lives under a locale prefix, and a static export has no
 * server to issue a 3xx — so the redirect happens in the document itself.
 * `next/navigation`'s `redirect()` cannot be used here: it needs a runtime.
 *
 * Three layers, so this works whatever the client supports:
 *  - `meta refresh` does the redirect with no JavaScript at all;
 *  - `location.replace` makes it instant and keeps `/` out of session history,
 *    so "back" from the site does not bounce through here again;
 *  - a visible link if both are blocked.
 */
export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(target)})` }} />
      <p>
        <a href={target}>Continue to the site</a>
      </p>
    </>
  );
}
