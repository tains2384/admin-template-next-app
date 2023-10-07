import { withAuth } from './middlewares';
import { withIntl } from './middlewares/withIntl';
import { MiddlewareFactory, executeMiddlewares } from './utils/executeMiddlewares';

// withIntl should be the last executed middleware
const middlewares: MiddlewareFactory[] = [withAuth, withIntl];
export default executeMiddlewares(middlewares);

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
