import type { SVGProps } from 'react';

/**
 * Inline SVG icons rather than an icon package: three glyphs is not worth a
 * dependency, and inlining keeps them in the HTML with no extra request.
 *
 * All are 16×16, drawn in `currentColor`, and marked decorative — every icon
 * here sits next to a text label or inside a link with an accessible name.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
} as const;

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.4 1.6a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM1.8 6.3h3.2V14H1.8V6.3Zm5.1 0h3.07v1.05h.04c.43-.75 1.47-1.27 2.55-1.27 2.05 0 2.64 1.25 2.64 3.24V14h-3.18v-4.1c0-.98-.36-1.65-1.25-1.65-.85 0-1.35.57-1.57 1.12-.08.2-.1.47-.1.74V14H6.9s.04-6.96 0-7.7Z" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 .4a7.6 7.6 0 0 0-2.4 14.82c.38.07.52-.16.52-.36v-1.3c-2.12.46-2.57-1-2.57-1-.35-.88-.85-1.12-.85-1.12-.69-.47.05-.46.05-.46.77.05 1.17.79 1.17.79.68 1.16 1.79.83 2.23.63.07-.5.27-.83.49-1.02-1.7-.2-3.48-.85-3.48-3.77 0-.83.3-1.51.79-2.04-.08-.2-.34-.98.07-2.04 0 0 .64-.2 2.1.78a7.3 7.3 0 0 1 3.82 0c1.46-.98 2.1-.78 2.1-.78.41 1.06.15 1.84.08 2.04.49.53.78 1.21.78 2.04 0 2.93-1.78 3.57-3.49 3.76.28.24.53.71.53 1.43v2.12c0 .2.14.44.53.36A7.6 7.6 0 0 0 8 .4Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M1.5 3h13a.5.5 0 0 1 .5.5v.36L8 8.6 1 3.86V3.5A.5.5 0 0 1 1.5 3Zm-.5 2.06V12.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V5.06L8.28 9.66a.5.5 0 0 1-.56 0L1 5.06Z" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 1.5a.6.6 0 0 1 .6.6v6.1l1.98-1.98a.6.6 0 1 1 .84.85l-3 3a.6.6 0 0 1-.84 0l-3-3a.6.6 0 0 1 .84-.85L7.4 8.2V2.1a.6.6 0 0 1 .6-.6ZM2.6 10.4a.6.6 0 0 1 .6.6v1.9h9.6V11a.6.6 0 0 1 1.2 0v2.1a.8.8 0 0 1-.8.8H2.8a.8.8 0 0 1-.8-.8V11a.6.6 0 0 1 .6-.6Z" />
    </svg>
  );
}
