import { type log } from '../logger';
import type { Route } from './createRoute';
import { env } from '../env';
declare const routerOptions: Nixle.RouterOptions;
declare const extendRouterOptions: (options: Record<string, unknown>) => void;
declare const createRouter: (path: string, routes: (params: {
    log: typeof log;
    env: Nixle.Env;
} & Nixle.RouterOptions) => Route[]) => {
    path: string;
    routes: Route[];
};
export { createRouter, extendRouterOptions, routerOptions };
