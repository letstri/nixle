import type { HTTPMethod } from '..';
import type { RouteOptionsOrHandler } from './interfaces/Route';
interface Route {
    path: string;
    method: HTTPMethod;
    route: RouteOptionsOrHandler;
}
declare const route: {
    get: <Params = any, Query = any>(path: string, route: RouteOptionsOrHandler<Params, Query, unknown>) => Route;
    post: <Params_1 = any, Query_1 = any, Body_1 = any>(path: string, route: RouteOptionsOrHandler<Params_1, Query_1, Body_1>) => Route;
    patch: <Params_2 = any, Query_2 = any, Body_2 = any>(path: string, route: RouteOptionsOrHandler<Params_2, Query_2, Body_2>) => Route;
    put: <Params_3 = any, Query_3 = any, Body_3 = any>(path: string, route: RouteOptionsOrHandler<Params_3, Query_3, Body_3>) => Route;
    delete: <Params_4 = any, Query_4 = any, Body_4 = any>(path: string, route: RouteOptionsOrHandler<Params_4, Query_4, Body_4>) => Route;
    options: <Params_5 = any, Query_5 = any, Body_5 = any>(path: string, route: RouteOptionsOrHandler<Params_5, Query_5, Body_5>) => Route;
};
export { route };
export type { Route };
