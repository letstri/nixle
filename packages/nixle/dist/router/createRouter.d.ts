import { log } from '../logger';
import { type Route, route } from './createRoute';
import type { Service } from '../service/createService';
import type { Guard } from '../createGuard';
declare const extendRouterContext: (context: Record<string, unknown>) => void;
export interface RouterContext extends Nixle.RouterContext {
    route: typeof route;
    log: typeof log;
    env: Nixle.Env;
}
interface RouterRoutesHandler<S extends Record<string, Service> = Record<string, Service>> {
    (context: RouterContext, services: {
        [K in keyof S]: ReturnType<S[K]>;
    }): Route[];
}
interface RouterOptions<S extends Record<string, Service>> {
    services?: S;
    guards?: Guard[];
    routes: RouterRoutesHandler<S>;
}
export interface Router<S extends Record<string, Service> = Record<string, Service>> {
    path: string;
    services: S;
    guards: Guard[];
    routes: () => Route[];
}
declare function createRouter<S extends Record<string, Service>>(path: string, options: RouterOptions<S>): Router<S>;
declare function createRouter(path: string, routes: RouterRoutesHandler): Router;
export { createRouter, extendRouterContext };
