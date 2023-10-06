import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { MiddlewareFactory } from '~/utils/executeMiddlewares';

export const withLog: MiddlewareFactory = (next: NextMiddleware) => {
  return (req: NextRequest, _next: NextFetchEvent) => {
    // console.log('Middleware ~ withLog');

    return next(req, _next);
  };
};
