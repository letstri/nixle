import type { HTTPMethod, RouteHandler, RouteOptions } from '..';
interface Route<P extends unknown = any, Q extends unknown = any, B extends unknown = any> {
    path: string;
    method: HTTPMethod;
    options: RouteOptions<P, Q, B>;
}
declare function get<P extends unknown, Q extends unknown, B extends unknown>(path: string, optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>): Route<P, Q, B>;
declare function post<P extends unknown, Q extends unknown, B extends unknown>(path: string, optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>): Route<P, Q, B>;
declare function patch<P extends unknown, Q extends unknown, B extends unknown>(path: string, optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>): Route<P, Q, B>;
declare function put<P extends unknown, Q extends unknown, B extends unknown>(path: string, optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>): Route<P, Q, B>;
declare function _delete<P extends unknown, Q extends unknown, B extends unknown>(path: string, optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>): Route<P, Q, B>;
declare function options<P extends unknown, Q extends unknown, B extends unknown>(path: string, optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>): Route<P, Q, B>;
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
