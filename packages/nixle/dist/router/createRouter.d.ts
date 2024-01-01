import { log } from '../logger';
import { type Route, route } from './createRoute';
import type { Guard } from '../createGuard';
declare const extendRouterContext: (context: Record<string, unknown>) => void;
export interface RouterContext extends Nixle.RouterContext {
    route: typeof route;
    log: typeof log;
    env: Nixle.Env;
}
interface RouterRoutesHandler {
    (context: RouterContext): Route[];
}
interface RouterOptions {
    guards?: Guard[];
    routes: RouterRoutesHandler;
}
export interface Router {
    path: string;
    guards: Guard[];
    routes: () => Route[];
}
declare function createRouter(path: string, options: RouterOptions): Router;
declare function createRouter(path: string, routes: RouterRoutesHandler): Router;
export { createRouter, extendRouterContext };
