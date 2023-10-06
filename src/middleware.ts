import { withAuth, withIntl, withLog } from './middlewares';
import { MiddlewareFactory, executeMiddlewares } from './utils/executeMiddlewares';

const middlewares: MiddlewareFactory[] = [withLog, withAuth, withIntl];
export default executeMiddlewares(middlewares);

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
