import React from 'react';
import { notFound } from 'next/navigation';
import { locales } from '../../../locales';

import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';

export default async function LocaleLayout({ children, params: { lang } }: LocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === lang);
  if (!isValidLocale) notFound();

  let messages;
  try {
    messages = (await import(`../../../locales/${lang}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={lang}>
      <NextIntlClientProvider locale={lang} messages={messages}>
        <body>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: {
    lang: string;
  };
};
