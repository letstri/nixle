import { type log } from '../logger';
import type { Route } from './createRoute';
declare const routerOptions: Nixle.RouterOptions;
declare const extendRouterOptions: (options: Record<string, unknown>) => void;
declare const createRouter: (path: string, routes: (params: {
    log: typeof log;
} & Nixle.RouterOptions) => Route[]) => readonly [string, Route[]];
export { createRouter, extendRouterOptions, routerOptions };
