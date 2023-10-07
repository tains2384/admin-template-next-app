import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { MiddlewareFactory } from '~/utils/executeMiddlewares';
import { withAuth as withNextAuth } from 'next-auth/middleware';
import { locales } from '../../locales';
import { nextAuthConfig } from '~/nextAuth';

const publicPages = ['/about', '/auth/login'];

export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return (req: NextRequest, _next: NextFetchEvent) => {
    // console.log('Middleware ~ withAuth');

    const publicPathnameRegex = RegExp(`^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`, 'i');
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) return next(req, _next);

    const authMiddleware = withNextAuth(
      function onSuccess(req) {
        return next(req, _next);
      },
      {
        callbacks: { authorized: ({ token }) => token != null },
        pages: nextAuthConfig.pages,
        secret: nextAuthConfig.secret,
        jwt: nextAuthConfig.jwt,
      }
    ) as NextMiddleware;

    return authMiddleware(req, _next);
  };
};
