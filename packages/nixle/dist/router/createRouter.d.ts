import { log } from '../logger';
import { type Route, route } from './createRoute';
import type { Service } from '../service/createService';
import type { Guard } from '../createGuard';
declare const extendRouterOptions: (options: Record<string, unknown>) => void;
interface RouterRoutesFunction<S extends Record<string, Service> = Record<string, Service>> {
    (options: {
        route: typeof route;
        log: typeof log;
        env: Nixle.Env;
    } & Nixle.RouterOptions, services: {
        [K in keyof S]: ReturnType<S[K]>;
    }): Route[];
}
interface RouterOptions<S extends Record<string, Service>> {
    services?: S;
    guards?: Guard[];
    routes: RouterRoutesFunction<S>;
}
export interface Router<S extends Record<string, Service> = Record<string, Service>> {
    path: string;
    services: S;
    guards: Guard[];
    routes: () => Route[];
}
declare function createRouter<S extends Record<string, Service>>(path: string, options: RouterOptions<S>): Router<S>;
declare function createRouter(path: string, routes: RouterRoutesFunction): Router;
export { createRouter, extendRouterOptions };
