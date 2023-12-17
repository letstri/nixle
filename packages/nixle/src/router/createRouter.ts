import { contextLog, type log } from '~/logger';
import { type Route, route } from './createRoute';
import { fixPath } from '~/utils/fixPath';

const extendRouterOptions = (options: Record<string, unknown>) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...options,
  };
};

const createRouter = (
  path: string,
  routes: (
    params: { route: typeof route; log: typeof log; env: Nixle.Env } & Nixle.RouterOptions,
  ) => Route<any, any, any>[],
) => ({
  path: fixPath(path),
  routes: routes({
    route,
    log: contextLog(fixPath(path), 'bgGreen'),
    env: __NIXLE.env || {},
    ...__NIXLE.routerOptions,
  }),
});

export { createRouter, extendRouterOptions };
