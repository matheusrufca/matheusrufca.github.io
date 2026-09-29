import type { Metadata } from 'next';

/**
 * Root layout for `/` only.
 *
 * `(root)` and `[locale]` are separate route groups, each with its own root
 * layout, because `/` must not inherit the site chrome or a locale — it exists
 * only to forward to `/en/`. There is deliberately no `src/app/layout.tsx`:
 * adding one would force `[locale]/layout.tsx` to stop being a root layout and
 * it could no longer set `<html lang>` per locale.
 */
export const metadata: Metadata = {
  title: 'Redirecting to /en/',
  robots: { index: false, follow: true },
  alternates: { canonical: '/en/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
