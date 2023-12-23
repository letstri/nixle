import { contextLog, log } from '~/logger';
import { type Route, route } from './createRoute';
import type { Service } from '~/service/createService';
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

interface RouterRoutesHandler<S extends Record<string, Service> = Record<string, Service>> {
  (context: RouterContext, services: { [K in keyof S]: ReturnType<S[K]> }): Route[];
}

interface RouterOptions<S extends Record<string, Service>> {
  services?: S;
  guards?: Guard[];
  routes: RouterRoutesHandler<S>;
}

export interface Router<S extends Record<string, Service> = Record<string, Service>> {
  path: string;
  services: S;
  guards: Guard[];
  routes: () => Route[];
}

function createRouter<S extends Record<string, Service>>(
  path: string,
  options: RouterOptions<S>,
): Router<S>;
function createRouter(path: string, routes: RouterRoutesHandler): Router;

function createRouter<S extends Record<string, Service>>(
  path: string,
  optionsOrRoutes?: RouterOptions<S> | RouterRoutesHandler<S>,
): Router<S> {
  const isObject = typeof optionsOrRoutes === 'object';

  if (!optionsOrRoutes || (isObject && !optionsOrRoutes.routes)) {
    createError({
      message: 'Routes are required',
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    });
  }

  const _services =
    typeof optionsOrRoutes === 'function' ? ({} as S) : optionsOrRoutes?.services || ({} as S);
  const _routesFunction: RouterRoutesHandler<S> = isObject
    ? optionsOrRoutes.routes
    : optionsOrRoutes;
  const _guards = isObject ? optionsOrRoutes.guards || [] : [];

  const formatRoutes = () => {
    return _routesFunction(
      {
        route,
        log: contextLog(path, 'bgGreen'),
        env,
        ...routerContext,
      },
      Object.entries(_services).reduce(
        (acc, [key, service]) => ({
          ...acc,
          [key]: service(key),
        }),
        {} as { [K in keyof S]: ReturnType<S[K]> },
      ),
    );
  };

  return {
    path,
    routes: formatRoutes,
    services: _services,
    guards: _guards,
  };
}

export { createRouter, extendRouterContext };
