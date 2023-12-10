import { contextLog, type log } from '~/logger';
import type { Route } from './createRoute';

const routerOptions: Nixle.RouterOptions = {};

const extendRouterOptions = (options: Record<string, unknown>) => {
  Object.assign(routerOptions, options);
};

const createRouter = (
  path: string,
  routes: (params: { log: typeof log } & Nixle.RouterOptions) => Route[],
) => [path, routes({ log: contextLog(path, 'bgGreen'), ...routerOptions })] as const;

export { createRouter, extendRouterOptions, routerOptions };
