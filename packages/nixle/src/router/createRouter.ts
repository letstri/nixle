import { contextLog, log } from '~/logger';
import { type Route, route } from './createRoute';
import { StatusCode, createError, type RouteHandlerContext } from '..';
import type { Guard } from '~/createGuard';
import { getEnv } from '~/env';
import type { ValidPath } from '~/utils/types';
import { validatePath } from '~/utils/validations';
import type { Middleware } from '~/createMiddleware';

const routerContext: Nixle.RouterContext = {};

function extendRouterContext<T extends unknown>(context: T) {
  Object.assign(routerContext, context);
}

export interface RouterContext extends Nixle.RouterContext {
  route: typeof route;
  log: typeof log;
  env: RouteHandlerContext['env'];
}

interface RouterRoutesHandler<Routes extends Route[]> {
  (context: RouterContext): Routes;
}

interface RouterOptions<Routes extends Route[]> {
  middlewares?: Middleware[];
  guards?: Guard[];
  routes: RouterRoutesHandler<Routes>;
}

export type ConvertRoutes<T extends Route[]> = {
  [P in T[number]['path']]: {
    [M in Extract<T[number], { path: P }> as M['method']]: Omit<
      Extract<T[number], { path: P; method: M['method'] }>['$infer'],
      'path' | 'method'
    >;
  };
};

export interface Router<Path extends string = string, Routes extends Route[] = Route[]> {
  path: Path;
  middlewares: Middleware[];
  guards: Guard[];
  routes: () => Routes;
  $inferRoutes: Routes extends Route[] ? ConvertRoutes<Routes> : never;
}

function createRouter<Path extends string, Routes extends Route[]>(
  path: ValidPath<Path>,
  options: RouterOptions<Routes>,
): Router<Path, Routes>;
function createRouter<Path extends string, Routes extends Route[]>(
  path: ValidPath<Path>,
  routes: RouterRoutesHandler<Routes>,
): Router<Path, Routes>;

function createRouter<Path extends string, Routes extends Route[]>(
  path: ValidPath<Path>,
  optionsOrRoutes?: RouterOptions<Routes> | RouterRoutesHandler<Routes>,
): Router<ValidPath<Path>, Routes> {
  validatePath(path);

  const isObject = typeof optionsOrRoutes === 'object';

  if (!optionsOrRoutes || (isObject && !optionsOrRoutes.routes)) {
    throw createError('Routes are required', StatusCode.INTERNAL_SERVER_ERROR);
  }

  const _routesFunction: RouterRoutesHandler<Routes> = isObject
    ? optionsOrRoutes.routes
    : optionsOrRoutes;
  const middlewares = isObject ? optionsOrRoutes.middlewares || [] : [];
  const guards = isObject ? optionsOrRoutes.guards || [] : [];

  const formatRoutes = () => {
    return _routesFunction({
      route,
      log: contextLog(path, 'bgGreen'),
      env: getEnv(),
      ...routerContext,
    });
  };

  return {
    path,
    routes: formatRoutes,
    middlewares,
    guards,
    $inferRoutes: {} as any,
  };
}

export { createRouter, extendRouterContext };
