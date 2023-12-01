import type { HTTPMethod } from '~/types/HTTPMethod';
import { fixPath } from '~/utils/fixPath';
import { contextLog, log } from '~/services/logger';
import type { Routes } from './createRouter';
import { createInternalError, logAndFormatError } from '~/createError';
import type { AppOptions } from '~/createApp';
import { emitter } from '~/services/emmiter';

export const buildRoutes = <Server>(
  options: AppOptions<Server>,
  routerPath: string,
  _routes: Routes,
) => {
  const routes = _routes({ log: contextLog(routerPath) });

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

    options.provider.request(method, routePath, async (params) => {
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
        throw logAndFormatError(error);
      }
    });
  });
};
