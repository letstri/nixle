import type { HTTPMethod } from '~/types/HTTPMethod';
import { fixPath } from '~/utils/fixPath';
import { contextLog } from '~/services/logger';
import type { AppOptions } from '~/createApp';
import type { Routes } from './createRouter';
import { createInternalError, logError, formatError } from '~/createError';
import { emitter } from '~/services/emmiter';

export const buildRoutes = <Server>(
  options: AppOptions<Server>,
  routerPath: string,
  _routes: Routes,
) => {
  const fixedRouterPath = fixPath(routerPath);
  const log = contextLog(fixedRouterPath, 'bgGreen');
  const routes = _routes({ log });

  try {
    if (routes.length === 0) {
      createInternalError('At least one router is required');
    }
    if (routes.some((route) => !route.path || !route.handler)) {
      createInternalError('Path and handler are required for each route');
    }
  } catch (e) {
    logError(e);
    process.exit(1);
  }

  routes.forEach((route) => {
    const method = route.method ? (route.method.toLowerCase() as Lowercase<HTTPMethod>) : 'get';
    const routePath = fixPath(fixedRouterPath) + fixPath(route.path);

    options.provider.createRoute(method, routePath, async (params) => {
      emitter.emit('request', params);
      params.setHeader('x-powered-by', 'Nixle');

      if (route.statusCode) {
        params.setStatusCode(route.statusCode);
      }

      try {
        const response = await route.handler(params);

        emitter.emit('response', response);

        return response;
      } catch (error) {
        logError(error);
        throw formatError(error);
      }
    });
  });

  log(`🚏 ${routes.length} route${routes.length === 1 ? '' : 's'} successfully built`, {
    type: 'success',
  });
};
