import { contextLog, type log } from '~/logger';
import type { Route } from './createRoute';
import { env } from '~/env';
import { fixPath } from '~/utils/fixPath';

const routerOptions: Nixle.RouterOptions = {};

const extendRouterOptions = (options: Record<string, unknown>) => {
  Object.assign(routerOptions, options);
};

const createRouter = (
  path: string,
  routes: (
    params: { log: typeof log; env: Nixle.Env } & Nixle.RouterOptions,
  ) => Route<any, any, any>[],
) => ({
  path: fixPath(path),
  routes: routes({ log: contextLog(fixPath(path), 'bgGreen'), env, ...routerOptions }),
});

export { createRouter, extendRouterOptions, routerOptions };
