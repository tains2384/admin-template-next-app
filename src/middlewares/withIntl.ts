import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { MiddlewareFactory } from '~/utils/executeMiddlewares';
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from '../../locales';

export const withIntl: MiddlewareFactory = (next: NextMiddleware) => {
  return (req: NextRequest, _next: NextFetchEvent) => {
    // console.log('Middleware ~ withIntl');

    const intlMiddleware = createIntlMiddleware({
      locales,
      defaultLocale: 'en',
      localePrefix: 'always',
    });

    intlMiddleware(req);
    next(req, _next);
  };
};
