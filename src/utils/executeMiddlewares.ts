import { NextMiddleware, NextResponse } from 'next/server';

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export function executeMiddlewares(middlewares: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const current = middlewares[index];
  if (!!current) {
    const next = executeMiddlewares(middlewares, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}
