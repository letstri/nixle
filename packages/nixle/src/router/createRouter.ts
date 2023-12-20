import { contextLog, log } from '~/logger';
import { type Route, route } from './createRoute';
import type { Service } from '~/service/createService';
import { StatusCode, createError } from '..';
import type { Guard } from '~/createGuard';

const extendRouterOptions = (options: Record<string, unknown>) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...options,
  };
};

interface RouterRoutesFunction<S extends Record<string, Service> = Record<string, Service>> {
  (
    options: {
      route: typeof route;
      log: typeof log;
      env: Nixle.Env;
    } & Nixle.RouterOptions,
    services: { [K in keyof S]: ReturnType<S[K]> },
  ): Route[];
}

interface RouterOptions<S extends Record<string, Service>> {
  services?: S;
  guards?: Guard[];
  routes: RouterRoutesFunction<S>;
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
function createRouter(path: string, routes: RouterRoutesFunction): Router;

function createRouter<S extends Record<string, Service>>(
  path: string,
  optionsOrRoutes?: RouterOptions<S> | RouterRoutesFunction<S>,
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
  const _routesFunction: RouterRoutesFunction<S> = isObject
    ? optionsOrRoutes.routes
    : optionsOrRoutes;
  const _guards = isObject ? optionsOrRoutes.guards || [] : [];

  const formatRoutes = () => {
    return _routesFunction(
      {
        route,
        log: contextLog(path, 'bgGreen'),
        env: __NIXLE.env || {},
        ...__NIXLE.routerOptions,
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

export { createRouter, extendRouterOptions };
