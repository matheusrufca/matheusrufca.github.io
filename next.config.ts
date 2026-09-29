import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

import { basePath } from './src/lib/base-path';

/**
 * Static export for GitHub Pages.
 *
 * `basePath` comes from `NEXT_PUBLIC_BASE_PATH` via a shared module, which
 * `src/lib/site.ts` reads too — so the config and the asset links can never
 * disagree. Empty for a user site at `https://<username>.github.io`; set it to
 * `/<repo>` for a project site.
 */
const nextConfig: NextConfig = {
  output: 'export',
  // Emits `/en/index.html` instead of `/en.html`, which is what GitHub Pages
  // needs to resolve directory-style URLs without a server-side rewrite.
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
