import { colors } from 'consola/utils';
import type { HTTPMethod } from '~/types/HTTPMethod';
import { contextLog } from '~/logger';
import type { AppOptions } from '~/createApp';
import { env } from '~/env';
import { createError, logError, transformErrorToResponse, type NixleError } from '~/createError';
import { emitter } from '~/emmiter';
import { StatusCode, type Router } from '..';
import { joinPath, parseObject } from '~/utils/helpers';

export const buildRouter = (appOptions: AppOptions, router: Router) => {
  const routerPath = joinPath(appOptions.globalPrefix || '', router.path || '');
  const routerLog = contextLog(routerPath, 'bgGreen');
  const routes = router.routes();

  try {
    if (routes.length === 0) {
      createError({
        message: 'At least one router is required',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      });
    }
    if (routes.some(({ path, method, options }) => !path || !method || !options.handler)) {
      createError({
        message: 'Path, method and handler are required for each route',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      });
    }
  } catch (e) {
    logError(e, routerLog);
    process.exit(1);
  }

  routes.forEach(({ path, method, options }) => {
    const routePath = joinPath(routerPath, path);
    const log = contextLog(`${colors.bold(method)} ${routePath}`, 'bgGreen');

    appOptions.provider.createRoute({
      method: method.toLowerCase() as Lowercase<HTTPMethod>,
      path: routePath,
      async handler(context) {
        emitter.emit('request', context);

        const _context = {
          ...context,
          query: parseObject(context.query),
          params: parseObject(context.params),
        };

        try {
          await options?.middleware?.(_context);
        } catch (error) {
          const statusCode = (error as NixleError)?.statusCode || StatusCode.INTERNAL_SERVER_ERROR;

          context.setStatusCode(statusCode);
          return transformErrorToResponse(error, statusCode);
        }

        try {
          if (router.guards.length) {
            await Promise.all(router.guards.map((guard) => guard({ ..._context, env })));
          }
          if (options?.guards?.length) {
            await Promise.all(options.guards.map((guard) => guard({ ..._context, env })));
          }

          await Promise.all([
            options?.queryValidation?.(_context.query),
            options?.paramsValidation?.(_context.params),
            options?.bodyValidation?.(_context.body),
          ]);
        } catch (error) {
          const statusCode = (error as NixleError)?.statusCode || StatusCode.BAD_REQUEST;

          context.setStatusCode(statusCode);
          return transformErrorToResponse(error, statusCode);
        }

        try {
          const response = await options.handler(_context);

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
