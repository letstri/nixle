import type { HTTPMethod, RouteHandler, RouteOptions } from '..';
interface Route<Params, Query, Body> {
    path: string;
    method: HTTPMethod;
    options?: RouteOptions<Params, Query, Body>;
    handler: RouteHandler<Params, Query, Body>;
}
interface RouteMethod<Params = any, Query = any, Body = any> {
    (path: string, route: RouteOptions<Params, Query, Body> | RouteHandler<Params, Query, Body>): Route<Params, Query, Body>;
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
