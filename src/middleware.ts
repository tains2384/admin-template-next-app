import createIntlMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';
import { locales } from '../locales';
import { NextRequest } from 'next/server';
import { nextAuthConfig } from './nextAuth';

const publicPages = ['/about', '/auth/login'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: { authorized: ({ token }) => token != null },
    pages: nextAuthConfig.pages,
    secret: nextAuthConfig.secret,
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(`^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`, 'i');
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],

  // Fix lodash build error on vercel
  runtime: 'experimental-edge',
  unstable_allowDynamic: ['**/node_modules/lodash-es/**/*.js'],
};
