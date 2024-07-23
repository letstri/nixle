import type { ValidPath } from '../utils/types';
import type { HTTPMethod, RouteHandler, RouteOptions } from '..';
interface Route<Path extends string = string, Method extends HTTPMethod = HTTPMethod, Params extends {} = any, Query extends {} = any, Body extends {} = any, Response extends unknown = unknown, Options extends RouteOptions<Params, Query, Body, Response> = RouteOptions<Params, Query, Body, Response>> {
    path: Path;
    method: Method;
    options: Options;
    $infer: {
        path: Path;
        method: Method;
        params: Awaited<Params>;
        query: Awaited<Query>;
        body: Awaited<Body>;
        response: Awaited<Response>;
    };
}
declare const route: {
    get: {
        <Path extends string, Params extends {}, Query extends {}, Body extends {}, Response extends unknown>(path: ValidPath<Path>, options: RouteOptions<Params, Query, Body, Response>): Route<Path, "GET", Params, Query, Body, Response, RouteOptions<Params, Query, Body, Response>>;
        <Path extends string, Response extends unknown>(path: ValidPath<Path>, handler: RouteHandler<{}, {}, {}, Response>): Route<Path, "GET", {}, {}, {}, Response, RouteOptions<{}, {}, {}, Response>>;
    };
    post: {
        <Path extends string, Params extends {}, Query extends {}, Body extends {}, Response extends unknown>(path: ValidPath<Path>, options: RouteOptions<Params, Query, Body, Response>): Route<Path, "POST", Params, Query, Body, Response, RouteOptions<Params, Query, Body, Response>>;
        <Path extends string, Response extends unknown>(path: ValidPath<Path>, handler: RouteHandler<{}, {}, {}, Response>): Route<Path, "POST", {}, {}, {}, Response, RouteOptions<{}, {}, {}, Response>>;
    };
    patch: {
        <Path extends string, Params extends {}, Query extends {}, Body extends {}, Response extends unknown>(path: ValidPath<Path>, options: RouteOptions<Params, Query, Body, Response>): Route<Path, "PATCH", Params, Query, Body, Response, RouteOptions<Params, Query, Body, Response>>;
        <Path extends string, Response extends unknown>(path: ValidPath<Path>, handler: RouteHandler<{}, {}, {}, Response>): Route<Path, "PATCH", {}, {}, {}, Response, RouteOptions<{}, {}, {}, Response>>;
    };
    put: {
        <Path extends string, Params extends {}, Query extends {}, Body extends {}, Response extends unknown>(path: ValidPath<Path>, options: RouteOptions<Params, Query, Body, Response>): Route<Path, "PUT", Params, Query, Body, Response, RouteOptions<Params, Query, Body, Response>>;
        <Path extends string, Response extends unknown>(path: ValidPath<Path>, handler: RouteHandler<{}, {}, {}, Response>): Route<Path, "PUT", {}, {}, {}, Response, RouteOptions<{}, {}, {}, Response>>;
    };
    delete: {
        <Path extends string, Params extends {}, Query extends {}, Body extends {}, Response extends unknown>(path: ValidPath<Path>, options: RouteOptions<Params, Query, Body, Response>): Route<Path, "DELETE", Params, Query, Body, Response, RouteOptions<Params, Query, Body, Response>>;
        <Path extends string, Response extends unknown>(path: ValidPath<Path>, handler: RouteHandler<{}, {}, {}, Response>): Route<Path, "DELETE", {}, {}, {}, Response, RouteOptions<{}, {}, {}, Response>>;
    };
    options: {
        <Path extends string, Params extends {}, Query extends {}, Body extends {}, Response extends unknown>(path: ValidPath<Path>, options: RouteOptions<Params, Query, Body, Response>): Route<Path, "OPTIONS", Params, Query, Body, Response, RouteOptions<Params, Query, Body, Response>>;
        <Path extends string, Response extends unknown>(path: ValidPath<Path>, handler: RouteHandler<{}, {}, {}, Response>): Route<Path, "OPTIONS", {}, {}, {}, Response, RouteOptions<{}, {}, {}, Response>>;
    };
};
export { route };
export type { Route };
