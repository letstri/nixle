import { colors } from 'consola/utils';
import type { HTTPMethod } from '~/types/HTTPMethod';
import { contextLog } from '~/logger';
import type { AppOptions } from '~/createApp';
import { createError, logError, transformErrorToResponse, type NixleError } from '~/createError';
import { emitter } from '~/emmiter';
import { StatusCode, type Route, isNixleError } from '..';
import { joinPath, parseObject } from '~/utils/helpers';

export const buildRoutes = ({ provider }: AppOptions, routerPath: string, routes: Route[]) => {
  const log = contextLog(routerPath || '/', 'bgGreen');

  try {
    if (routes.length === 0) {
      createError({
        message: 'At least one router is required',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      });
    }
    if (routes.some(({ path, method, handler }) => !path || !method || !handler)) {
      createError({
        message: 'Path, method and handler are required for each route',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      });
    }
  } catch (e) {
    logError(e, log);
    process.exit(1);
  }

  routes.forEach(({ path, method, options, handler }) => {
    const routePath = joinPath(routerPath, path);
    const log = contextLog(`${colors.bold(method)} ${routePath}`, 'bgGreen');

    provider.createRoute({
      method: method.toLowerCase() as Lowercase<HTTPMethod>,
      path: routePath,
      middleware(context) {
        emitter.emit('request', context);
        options?.middleware?.(context);
      },
      async handler(context) {
        const _context = {
          ...context,
          query: parseObject(context.query),
          params: parseObject(context.params),
        };

        try {
          await Promise.all([
            options?.queryValidation?.(_context.query),
            options?.paramsValidation?.(_context.params),
            options?.bodyValidation?.(_context.body),
          ]);
        } catch (error) {
          const statusCode = (error as NixleError)?.statusCode || StatusCode.BAD_REQUEST;

          logError(error, log);
          context.setStatusCode(statusCode);
          return transformErrorToResponse(error, statusCode);
        }

        try {
          const response = await handler(_context);

          emitter.emit('response', response);

          if (options?.statusCode) {
            context.setStatusCode(options.statusCode);
          }

          return response;
        } catch (error) {
          const statusCode = (error as NixleError)?.statusCode || StatusCode.INTERNAL_SERVER_ERROR;

          logError(error, log);
          context.setStatusCode(statusCode);
          return transformErrorToResponse(error, statusCode);
        }
      },
    });

    log.success(`🚏 Successfully registered`);
  });
};
