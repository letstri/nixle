import type { HTTPMethod, RouteHandler, RouteOptions } from '..';
interface Route<Path extends string = string, Method extends HTTPMethod = HTTPMethod, Params extends unknown = any, Query extends unknown = any, Body extends unknown = any, Handler extends RouteHandler<Params, Query, Body> = RouteHandler<Params, Query, Body>> {
    path: Path;
    method: Method;
    options: RouteOptions<Params, Query, Body, Handler>;
    $infer: {
        path: Path;
        method: Method;
        params: Params;
        query: Query;
        body: Body;
        response: Awaited<ReturnType<Handler>>;
    };
}
declare function get<Path extends string, Params extends unknown, Query extends unknown, Body extends unknown, Handler extends RouteHandler<Params, Query, Body>>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler): Route<Path, "GET", Params, Query, Body, Handler>;
declare function post<Path extends string, Params extends unknown, Query extends unknown, Body extends unknown, Handler extends RouteHandler<Params, Query, Body>>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler): Route<Path, "POST", Params, Query, Body, Handler>;
declare function patch<Path extends string, Params extends unknown, Query extends unknown, Body extends unknown, Handler extends RouteHandler<Params, Query, Body>>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler): Route<Path, "PATCH", Params, Query, Body, Handler>;
declare function put<Path extends string, Params extends unknown, Query extends unknown, Body extends unknown, Handler extends RouteHandler<Params, Query, Body>>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler): Route<Path, "PUT", Params, Query, Body, Handler>;
declare function _delete<Path extends string, Params extends unknown, Query extends unknown, Body extends unknown, Handler extends RouteHandler<Params, Query, Body>>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler): Route<Path, "DELETE", Params, Query, Body, Handler>;
declare function options<Path extends string, Params extends unknown, Query extends unknown, Body extends unknown, Handler extends RouteHandler<Params, Query, Body>>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler): Route<Path, "OPTIONS", Params, Query, Body, Handler>;
declare const route: {
    get: typeof get;
    post: typeof post;
    patch: typeof patch;
    put: typeof put;
    delete: typeof _delete;
    options: typeof options;
};
export { route };
export type { Route };
