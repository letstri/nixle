import { contextLog, log } from '~/logger';
import { type Route, route } from './createRoute';
import type { Service } from '~/service/createService';
import { StatusCode, createError } from '..';

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
  routes: RouterRoutesFunction<S>;
}

export interface Router<S extends Record<string, Service> = Record<string, Service>> {
  path?: string;
  services?: S;
  routes: () => Route[];
}

function createRouter<S extends Record<string, Service>>(options: RouterOptions<S>): Router<S>;
function createRouter(routes: RouterRoutesFunction<any>): Router<any>;
function createRouter<S extends Record<string, Service>>(
  path: string,
  options: RouterOptions<S>,
): Router<S>;
function createRouter(path: string, routes: RouterRoutesFunction): Router;

function createRouter<S extends Record<string, Service>>(
  pathOrOptionsOrRoutes: string | RouterOptions<S> | RouterRoutesFunction<S>,
  optionsOrRoutes?: RouterOptions<S> | RouterRoutesFunction<S>,
): Router<S> {
  if (typeof pathOrOptionsOrRoutes === 'string' && !optionsOrRoutes) {
    createError({
      message: 'Missing options',
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    });
  }

  const _path = typeof pathOrOptionsOrRoutes === 'string' ? pathOrOptionsOrRoutes : '';
  const _services =
    typeof pathOrOptionsOrRoutes === 'string' // path
      ? typeof optionsOrRoutes === 'function' // routes
        ? ({} as S)
        : optionsOrRoutes?.services || ({} as S)
      : typeof pathOrOptionsOrRoutes === 'function'
      ? ({} as S)
      : pathOrOptionsOrRoutes.services || ({} as S);
  const _routesFunction: RouterRoutesFunction<S> =
    typeof pathOrOptionsOrRoutes === 'string' // path
      ? typeof optionsOrRoutes === 'function' // routes
        ? optionsOrRoutes
        : optionsOrRoutes!.routes
      : typeof pathOrOptionsOrRoutes === 'function' // routes
      ? pathOrOptionsOrRoutes
      : pathOrOptionsOrRoutes.routes;

  const formatRoutes = () => {
    return _routesFunction(
      {
        route,
        log: _path ? contextLog(_path, 'bgGreen') : log,
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

  // routes
  if (typeof pathOrOptionsOrRoutes === 'function') {
    return {
      routes: formatRoutes,
    };
  }

  // path
  if (typeof pathOrOptionsOrRoutes === 'string') {
    return {
      path: _path,
      routes: formatRoutes,
      services: _services,
    };
  }

  // options
  return {
    routes: formatRoutes,
    services: _services,
  };
}

export { createRouter, extendRouterOptions };
