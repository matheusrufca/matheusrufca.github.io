'use client';

import { useEffect } from 'react';

/**
 * Reveals `[data-reveal]` elements once as they enter the viewport.
 *
 * One observer for the whole page, disconnected once everything has been seen.
 * Elements are only ever revealed, never re-hidden — re-animating on scroll-up
 * gets tiring fast.
 */
export function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (targets.length === 0) return;

    const reveal = (el: HTMLElement) => el.setAttribute('data-revealed', 'true');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(reveal);
      return;
    }

    let remaining = targets.length;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
          remaining -= 1;
        }
        if (remaining <= 0) observer.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
