import { log } from '../logger';
import { type Route, route } from './createRoute';
import type { Guard } from '../createGuard';
import type { ValidPath } from '../utils/types';
declare function extendRouterContext<T extends unknown>(context: T): void;
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
    [P in T[number]['path']]: {
        [M in Extract<T[number], {
            path: P;
        }> as M['method']]: {
            params: Extract<T[number], {
                path: P;
                method: M['method'];
            }>['$infer']['params'];
            query: Extract<T[number], {
                path: P;
                method: M['method'];
            }>['$infer']['query'];
            body: Extract<T[number], {
                path: P;
                method: M['method'];
            }>['$infer']['body'];
            response: Extract<T[number], {
                path: P;
                method: M['method'];
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
declare function createRouter<Path extends string, Routes extends Route[]>(path: ValidPath<Path>, options: RouterOptions<Routes>): Router<Path, Routes>;
declare function createRouter<Path extends string, Routes extends Route[]>(path: ValidPath<Path>, routes: RouterRoutesHandler<Routes>): Router<Path, Routes>;
export { createRouter, extendRouterContext };
