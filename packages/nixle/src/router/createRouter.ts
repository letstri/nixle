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

interface RouterRoutesHandler<Routes extends Route[]> {
  (context: RouterContext): Routes;
}

interface RouterOptions<Routes extends Route[]> {
  guards?: Guard[];
  routes: RouterRoutesHandler<Routes>;
}

type ConvertRoutes<T extends Route[]> = {
  [M in T[number]['method']]: {
    [P in Extract<T[number], { method: M }> as P['path']]: {
      params: Extract<T[number], { method: M; path: P['path'] }>['$infer']['params'];
      query: Extract<T[number], { method: M; path: P['path'] }>['$infer']['query'];
      body: Extract<T[number], { method: M; path: P['path'] }>['$infer']['body'];
      response: Extract<T[number], { method: M; path: P['path'] }>['$infer']['response'];
    };
  };
};

export interface Router<Path extends string = string, Routes extends Route[] = Route[]> {
  path: Path;
  guards: Guard[];
  routes: () => Routes;
  $inferRoutes: Routes extends Route[] ? ConvertRoutes<Routes> : never;
}

function createRouter<Path extends string, Routes extends Route[]>(
  path: Path,
  options: RouterOptions<Routes>,
): Router<Path, Routes>;
function createRouter<Path extends string, Routes extends Route[]>(
  path: Path,
  routes: RouterRoutesHandler<Routes>,
): Router<Path, Routes>;

function createRouter<Path extends string, Routes extends Route[]>(
  path: Path,
  optionsOrRoutes?: RouterOptions<Routes> | RouterRoutesHandler<Routes>,
): Router<Path, Routes> {
  const isObject = typeof optionsOrRoutes === 'object';

  if (!optionsOrRoutes || (isObject && !optionsOrRoutes.routes)) {
    throw createError('Routes are required', StatusCode.INTERNAL_SERVER_ERROR);
  }

  const _routesFunction: RouterRoutesHandler<Routes> = isObject
    ? optionsOrRoutes.routes
    : optionsOrRoutes;
  const guards = isObject ? optionsOrRoutes.guards || [] : [];

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
    guards,
    $inferRoutes: {} as Routes extends Route[] ? ConvertRoutes<Routes> : never,
  };
}

export { createRouter, extendRouterContext };
