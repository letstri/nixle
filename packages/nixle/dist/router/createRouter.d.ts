import { log } from '../logger';
import { type Route, route } from './createRoute';
import type { Guard } from '../createGuard';
declare const extendRouterContext: (context: Record<string, unknown>) => void;
export interface RouterContext extends Nixle.RouterContext {
    route: typeof route;
    log: typeof log;
    env: Nixle.Env;
}
interface RouterRoutesHandler<Routes extends Route[]> {
    (context: RouterContext): Routes;
}
interface RouterOptions<Routes extends Route[]> {
    guards?: Guard[];
    routes: RouterRoutesHandler<Routes>;
}
type ConvertRoutes<T extends Route[]> = {
    [M in T[number]['method']]: {
        [P in Extract<T[number], {
            method: M;
        }> as P['path']]: {
            params: Extract<T[number], {
                method: M;
                path: P['path'];
            }>['$infer']['params'];
            query: Extract<T[number], {
                method: M;
                path: P['path'];
            }>['$infer']['query'];
            body: Extract<T[number], {
                method: M;
                path: P['path'];
            }>['$infer']['body'];
            response: Extract<T[number], {
                method: M;
                path: P['path'];
            }>['$infer']['response'];
        };
    };
};
export interface Router<Path extends string = string, Routes extends Route[] = Route[]> {
    path: Path;
    guards: Guard[];
    routes: () => Routes;
    $inferRoutes: Routes extends Route[] ? ConvertRoutes<Routes> : never;
}
declare function createRouter<Path extends string, Routes extends Route[]>(path: Path, options: RouterOptions<Routes>): Router<Path, Routes>;
declare function createRouter<Path extends string, Routes extends Route[]>(path: Path, routes: RouterRoutesHandler<Routes>): Router<Path, Routes>;
export { createRouter, extendRouterContext };
