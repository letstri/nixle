import type { HTTPMethod } from '~/types/HTTPMethod';
import { fixPath } from '~/utils/fixPath';
import { contextLog } from '~/logger';
import type { AppOptions } from '~/createApp';
import { createError, logError, transformErrorToResponse } from '~/createError';
import { emitter } from '~/emmiter';
import type { Route } from '..';
import { colors } from 'consola/utils';

export const buildRoutes = (options: AppOptions, routerPath: string, routes: Route[]) => {
  const log = contextLog(routerPath, 'bgGreen');

  try {
    if (routes.length === 0) {
      createError('At least one router is required');
    }
    if (
      routes.some(
        ({ path, method, route }) =>
          !path || !method || !(typeof route === 'function' ? route : route.handler),
      )
    ) {
      createError('Path and handler are required for each route');
    }
  } catch (e) {
    logError(e, log);
    process.exit(1);
  }

  routes.forEach(({ path, method, route }) => {
    const routePath = routerPath + fixPath(path);
    const statusCode = typeof route === 'function' ? undefined : route.statusCode;
    const routeOptions = typeof route === 'function' ? undefined : route;
    const _handler = typeof route === 'function' ? route : route.handler;
    const log = contextLog(`${colors.bold(method)} ${routePath}`, 'bgGreen');

    options.provider.createRoute({
      method: method.toLowerCase() as Lowercase<HTTPMethod>,
      path: routePath,
      middleware: (context) => {
        emitter.emit('request', context);
        routeOptions?.middleware?.(context);
      },
      handler: async (context) => {
        try {
          await Promise.all([
            routeOptions?.queryValidation?.(context.query),
            routeOptions?.paramsValidation?.(context.params),
            routeOptions?.bodyValidation?.(context.body),
          ]);
        } catch (error) {
          logError(error, log);
          context.setStatusCode(400);
          throw transformErrorToResponse(error, 400);
        }

        if (statusCode) {
          context.setStatusCode(statusCode);
        }

        try {
          const response = await _handler(context);

          emitter.emit('response', response);

          return response;
        } catch (error) {
          logError(error, log);
          throw transformErrorToResponse(error);
        }
      },
    });
  });

  log(`🚏 ${routes.length} route${routes.length === 1 ? '' : 's'} successfully built`, {
    type: 'success',
  });
};
