import { contextLog, log } from '~/logger';
import { type Route, route } from './createRoute';
import { StatusCode, createError } from '..';
import type { Guard } from '~/createGuard';
import { env } from '~/env';

const routerContext: Nixle.RouterContext = {};

const extendRouterContext = (context: Record<string, unknown>) => {
  Object.assign(routerContext, context);
};

export interface RouterContext extends Nixle.RouterContext {
  route: typeof route;
  log: typeof log;
  env: Nixle.Env;
}

interface RouterRoutesHandler {
  (context: RouterContext): Route[];
}

interface RouterOptions {
  guards?: Guard[];
  routes: RouterRoutesHandler;
}

export interface Router {
  path: string;
  guards: Guard[];
  routes: () => Route[];
}

function createRouter(path: string, options: RouterOptions): Router;
function createRouter(path: string, routes: RouterRoutesHandler): Router;

function createRouter(path: string, optionsOrRoutes?: RouterOptions | RouterRoutesHandler): Router {
  const isObject = typeof optionsOrRoutes === 'object';

  if (!optionsOrRoutes || (isObject && !optionsOrRoutes.routes)) {
    createError({
      message: 'Routes are required',
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    });
  }

  const _routesFunction: RouterRoutesHandler = isObject ? optionsOrRoutes.routes : optionsOrRoutes;
  const _guards = isObject ? optionsOrRoutes.guards || [] : [];

  const formatRoutes = () => {
    return _routesFunction({
      route,
      log: contextLog(path, 'bgGreen'),
      env,
      ...routerContext,
    });
  };

  return {
    path,
    routes: formatRoutes,
    guards: _guards,
  };
}

export { createRouter, extendRouterContext };
