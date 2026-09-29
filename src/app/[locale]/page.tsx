import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Experience } from '@/components/Experience';
import { Expertise } from '@/components/Expertise';
import { Hero } from '@/components/Hero';
import { routing } from '@/i18n/routing';

/** Single page: who, what with, where. Education and CV note sit in the footer. */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Expertise index={1} />
      <Experience index={2} />
    </>
  );
}
