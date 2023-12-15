import type { HTTPMethod } from '~/types/HTTPMethod';
import { fixPath } from '~/utils/fixPath';
import { contextLog } from '~/logger';
import type { AppOptions } from '~/createApp';
import { createError, logError, transformErrorToResponse, type NixleError } from '~/createError';
import { emitter } from '~/emmiter';
import { StatusCode, type Route } from '..';
import { colors } from 'consola/utils';

export const buildRoutes = (
  { provider }: AppOptions,
  routerPath: string,
  routes: Route<any, any, any>[],
) => {
  const log = contextLog(routerPath, 'bgGreen');

  try {
    if (routes.length === 0) {
      createError('At least one router is required');
    }
    if (routes.some(({ path, method, handler }) => !path || !method || !handler)) {
      createError('Path, method and handler are required for each route');
    }
  } catch (e) {
    logError(e, log);
    process.exit(1);
  }

  routes.forEach(({ path, method, options, handler }) => {
    const routePath = routerPath + fixPath(path);
    const log = contextLog(`${colors.bold(method)} ${routePath}`, 'bgGreen');

    provider.createRoute({
      method: method.toLowerCase() as Lowercase<HTTPMethod>,
      path: routePath,
      middleware(context) {
        emitter.emit('request', context);
        options?.middleware?.(context);
      },
      async handler(context) {
        try {
          await Promise.all([
            options?.queryValidation?.(context.query),
            options?.paramsValidation?.(context.params),
            options?.bodyValidation?.(context.body),
          ]);
        } catch (error) {
          logError(error, log);
          context.setStatusCode((error as NixleError<any>)?.statusCode || StatusCode.BAD_REQUEST);
          return transformErrorToResponse(error, StatusCode.BAD_REQUEST);
        }

        try {
          const response = await handler(context);

          emitter.emit('response', response);

          if (options?.statusCode) {
            context.setStatusCode(options.statusCode);
          }

          return response;
        } catch (error) {
          logError(error, log);
          return transformErrorToResponse(error);
        }
      },
    });
  });

  log(`🚏 ${routes.length} route${routes.length === 1 ? '' : 's'} successfully built`, {
    type: 'success',
  });
};
