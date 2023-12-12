import { contextLog, type log } from '~/logger';
import type { Route } from './createRoute';
import { env } from '~/env';

const routerOptions: Nixle.RouterOptions = {};

const extendRouterOptions = (options: Record<string, unknown>) => {
  Object.assign(routerOptions, options);
};

const createRouter = (
  path: string,
  routes: (params: { log: typeof log; env: Nixle.Env } & Nixle.RouterOptions) => Route[],
) => [path, routes({ log: contextLog(path, 'bgGreen'), env, ...routerOptions })] as const;

export { createRouter, extendRouterOptions, routerOptions };
