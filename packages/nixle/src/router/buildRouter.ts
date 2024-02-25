import { colors } from 'consola/utils';
import type { HTTPMethod } from '~/types/HTTPMethod';
import { contextLog } from '~/logger';
import type { AppOptions } from '~/createApp';
import { env } from '~/env';
import { createError, logError, transformErrorToResponse, type NixleError } from '~/createError';
import { hooks } from '~/hooks';
import { StatusCode, type Router, type RouteHandlerContext } from '..';
import { joinPath, parseObject } from '~/utils/helpers';

export const buildRouter = (appOptions: AppOptions, router: Router) => {
  const routerPath = joinPath(appOptions.globalPrefix || '', router.path || '');
  const routerLog = contextLog(routerPath, 'bgGreen');
  const routes = router.routes();

  try {
    if (routes.length === 0) {
      throw createError('At least one router is required', StatusCode.INTERNAL_SERVER_ERROR);
    }
    if (routes.some(({ path, method, options }) => !path || !method || !options.handler)) {
      throw createError(
        'Path, method and handler are required for each route',
        StatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  } catch (e) {
    logError(e, routerLog);
    process.exit(1);
  }

  routes.forEach(function buildRouters({ path, method, options }) {
    const routePath = joinPath(routerPath, path);
    const log = contextLog(`${colors.bold(method)} ${routePath}`, 'bgGreen');

    appOptions.provider.createRoute({
      method: method.toLowerCase() as Lowercase<HTTPMethod>,
      path: routePath,
      async handler(context) {
        const data: any = {};

        const getData = <T extends Record<string, any>, K extends keyof T>(
          key?: K,
        ): K extends undefined ? T : T[K] => (key ? data[key] || null : data);
        const setData = <T extends {} | string, V>(keyOrData: T, value?: V) => {
          if (typeof keyOrData === 'string') {
            data[keyOrData] = value;
          } else {
            Object.assign(data, keyOrData);
          }
        };

        const _context: RouteHandlerContext = {
          ...context,
          query: parseObject(context.query),
          params: parseObject(context.params),
          headers: Object.fromEntries(
            Object.entries(context.headers)
              .filter(([, value]) => typeof value === 'string')
              .map(([key, value]) => [key.toLowerCase(), value]),
          ),
          env,
          getData,
          setData,
        };

        await hooks.callHook('request', context);

        try {
          if (options?.middlewares?.length) {
            await Promise.all(
              options.middlewares.map(function executeAppMiddleware(middleware) {
                return middleware(_context);
              }),
            );
          }
          if (router?.middlewares?.length) {
            await Promise.all(
              router.middlewares.map(function executeRouterMiddleware(middleware) {
                return middleware(_context);
              }),
            );
          }
          if (options?.middlewares?.length) {
            await Promise.all(
              options.middlewares.map(function executeRouterMiddleware(middleware) {
                return middleware(_context);
              }),
            );
          }
        } catch (error) {
          await logError(error, log);
          const statusCode = (error as NixleError)?.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
          context.setStatusCode(statusCode);
          return transformErrorToResponse(error, statusCode);
        }

        try {
          if (router.guards.length) {
            await Promise.all(
              router.guards.map(function validateRouterGuard(guard) {
                return guard(_context);
              }),
            );
          }
          if (options?.guards?.length) {
            await Promise.all(
              options.guards.map(function validateRouteGuard(guard) {
                return guard(_context);
              }),
            );
          }

          const [_query, _params, _body] = await Promise.all([
            options?.queryValidation?.(_context.query),
            options?.paramsValidation?.(_context.params),
            options?.bodyValidation?.(_context.body),
          ]);

          _context.query = _query || _context.query;
          _context.params = _params || _context.params;
          _context.body = _body || _context.body;
        } catch (error) {
          const statusCode = (error as NixleError)?.statusCode || StatusCode.BAD_REQUEST;
          context.setStatusCode(statusCode);
          return transformErrorToResponse(error, statusCode);
        }

        try {
          const response = await options.handler(_context);

          await hooks.callHook('response', response);

          if (options?.statusCode) {
            context.setStatusCode(options.statusCode);
          }

          return response;
        } catch (error) {
          await logError(error, log);
          const statusCode = (error as NixleError)?.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
          context.setStatusCode(statusCode);
          return transformErrorToResponse(error, statusCode);
        }
      },
    });
  });
};
