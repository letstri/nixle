import type { HTTPMethod, RouteHandler, RouteOptions } from '..';
interface Route<Path extends string = string, Method extends HTTPMethod = HTTPMethod, P extends {} = any, Q extends {} = any, B extends {} = any, R extends unknown = unknown> {
    path: Path;
    method: Method;
    options: RouteOptions<P, Q, B, R>;
    $infer: {
        path: Path;
        method: Method;
        params: Awaited<P>;
        query: Awaited<Q>;
        body: Awaited<B>;
        response: Awaited<R>;
    };
}
declare function get<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(path: Path, optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>): Route<Path, 'GET', P, Q, B, R>;
declare function post<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(path: Path, optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>): Route<Path, 'POST', P, Q, B, R>;
declare function patch<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(path: Path, optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>): Route<Path, 'PATCH', P, Q, B, R>;
declare function put<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(path: Path, optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>): {
    path: Path;
    method: string;
    options: RouteOptions<P, Q, B, R>;
    $infer: {
        path: Path;
        method: 'PUT';
        params: Awaited<P>;
        query: Awaited<Q>;
        body: Awaited<B>;
        response: Awaited<R>;
    };
};
declare function _delete<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(path: Path, optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>): Route<Path, 'DELETE', P, Q, B, R>;
declare function options<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(path: Path, optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>): Route<Path, 'OPTIONS', P, Q, B, R>;
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
