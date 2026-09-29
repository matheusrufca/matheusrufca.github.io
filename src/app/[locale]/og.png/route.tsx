import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { profile } from '@/lib/profile';

/**
 * The card shown when the site is pasted into LinkedIn, Slack or a message.
 * Rendered once per locale at build time and written to `out/<locale>/og.png`.
 *
 * This is a route handler rather than Next's `opengraph-image` file convention
 * on purpose: that convention emits an extension-less file, which GitHub Pages
 * serves without a `Content-Type` — and scrapers then ignore the image. Naming
 * the segment `og.png` gives the export a real `.png` filename. The URL is wired
 * up by hand in the layout's `generateMetadata`.
 */
export const dynamic = 'force-static';

const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: 'hero' });

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 88px',
        background: '#131316',
        color: '#f5f4f2',
      }}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 26 }}>
        <div style={{ width: 28, height: 4, background: '#e8663f' }} />
        <div style={{ color: '#a5a3a0', letterSpacing: 2, textTransform: 'uppercase' }}>
          {t('facts.location.value')}
        </div>
      </div>

      <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -3, marginTop: 28 }}>
        {profile.name}
      </div>

      <div style={{ display: 'flex', fontSize: 40, marginTop: 12, color: '#d6d4d1' }}>
        <span style={{ color: '#e8663f', marginRight: 14 }}>{'//'}</span>
        {t('title')}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 28,
          marginTop: 'auto',
          fontSize: 26,
          color: '#8f8d8a',
        }}
      >
        <span>{profile.email}</span>
        <span>·</span>
        <span>{profile.links.github.replace('https://', '')}</span>
      </div>
    </div>,
    size,
  );
}
