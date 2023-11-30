import type { Provider } from '~/createProvider';
import type { HTTPMethod } from '~/utils/HTTPMethod';
import { fixPath } from '~/utils/fixPath';
import { log } from '~/logger/logger';
import type { Routes } from './createRouter';
import { createInternalError, logAndFormatError } from '~/createError';

export const buildRoutes = <Server>(
  provider: Provider<Server>,
  routerPath: string,
  _routes: Routes,
) => {
  const routes = _routes({ log });

  if (routes.length === 0) {
    try {
      createInternalError('At least one router is required');
    } catch (e) {
      logAndFormatError(e);
      process.exit(1);
    }
  }

  if (routes.some((route) => !route.path || !route.handler)) {
    try {
      createInternalError('Path and handler are required for each route');
    } catch (e) {
      logAndFormatError(e);
      process.exit(1);
    }
  }

  routes.forEach((route) => {
    const method = route.method ? (route.method.toLowerCase() as Lowercase<HTTPMethod>) : 'get';
    const routePath = fixPath(routerPath) + fixPath(route.path);

    provider.request(method, routePath, async (params) => {
      params.setHeader('x-powered-by', 'Nixle');

      if (route.statusCode) {
        params.setStatusCode(route.statusCode);
      }

      try {
        return await route.handler(params);
      } catch (error) {
        throw logAndFormatError(error);
      }
    });
  });
};
