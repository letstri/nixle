import type { HTTPMethod, RouteHandler, RouteOptions } from '..';
interface Route<Params = unknown, Query = unknown, Body = unknown> {
    path: string;
    method: HTTPMethod;
    options?: RouteOptions<Params, Query, Body>;
    handler: RouteHandler<Params, Query, Body>;
}
interface RouteMethod<Params = unknown, Query = unknown, Body = unknown> {
    (path: string, route: RouteOptions<Params, Query, Body> | RouteHandler<Params, Query, Body>): Route<Params, Query, Body>;
}
declare const route: {
    get: RouteMethod<unknown, unknown, unknown>;
    post: RouteMethod<unknown, unknown, unknown>;
    patch: RouteMethod<unknown, unknown, unknown>;
    put: RouteMethod<unknown, unknown, unknown>;
    delete: RouteMethod<unknown, unknown, unknown>;
    options: RouteMethod<unknown, unknown, unknown>;
};
export { route };
export type { Route };
