import type { HTTPMethod } from '..';
import type { RouteOptionsOrHandler } from './interfaces/Route';
interface Route<Params, Query, Body> {
    path: string;
    method: HTTPMethod;
    route: RouteOptionsOrHandler<Params, Query, Body>;
}
interface RouteMethod<Params extends Record<string, unknown> = any, Query extends Record<string, unknown> = any, Body extends Record<string, unknown> = any> {
    (path: string, route: RouteOptionsOrHandler<Params, Query, Body>): Route<Params, Query, Body>;
}
declare const route: {
    get: RouteMethod<any, any, any>;
    post: RouteMethod<any, any, any>;
    patch: RouteMethod<any, any, any>;
    put: RouteMethod<any, any, any>;
    delete: RouteMethod<any, any, any>;
    options: RouteMethod<any, any, any>;
};
export { route };
export type { Route };
