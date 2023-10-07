import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { MiddlewareFactory } from '~/utils/executeMiddlewares';
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from '../../locales';

export const withIntl: MiddlewareFactory = () => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const intlMiddleware = createIntlMiddleware({
      locales,
      defaultLocale: 'en',
      localePrefix: 'always',
    });

    return intlMiddleware(req);
  };
};
