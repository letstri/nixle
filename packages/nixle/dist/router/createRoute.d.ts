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
        <Params extends {}, Query extends {}, Body_1 extends {}, Path extends string, Response_1 extends unknown>(path: Path, options: RouteOptions<Params, Query, Body_1, Response_1>): Route<Path, "GET", Params, Query, Body_1, Response_1, RouteOptions<Params, Query, Body_1, Response_1>>;
        <Path_1 extends string, Response_2 extends unknown>(path: Path_1, handler: RouteHandler<{}, {}, {}, Response_2>): Route<Path_1, "GET", {}, {}, {}, Response_2, RouteOptions<{}, {}, {}, Response_2>>;
    };
    post: {
        <Params_1 extends {}, Query_1 extends {}, Body_2 extends {}, Path_2 extends string, Response_3 extends unknown>(path: Path_2, options: RouteOptions<Params_1, Query_1, Body_2, Response_3>): Route<Path_2, "POST", Params_1, Query_1, Body_2, Response_3, RouteOptions<Params_1, Query_1, Body_2, Response_3>>;
        <Path_3 extends string, Response_4 extends unknown>(path: Path_3, handler: RouteHandler<{}, {}, {}, Response_4>): Route<Path_3, "POST", {}, {}, {}, Response_4, RouteOptions<{}, {}, {}, Response_4>>;
    };
    patch: {
        <Params_2 extends {}, Query_2 extends {}, Body_3 extends {}, Path_4 extends string, Response_5 extends unknown>(path: Path_4, options: RouteOptions<Params_2, Query_2, Body_3, Response_5>): Route<Path_4, "PATCH", Params_2, Query_2, Body_3, Response_5, RouteOptions<Params_2, Query_2, Body_3, Response_5>>;
        <Path_5 extends string, Response_6 extends unknown>(path: Path_5, handler: RouteHandler<{}, {}, {}, Response_6>): Route<Path_5, "PATCH", {}, {}, {}, Response_6, RouteOptions<{}, {}, {}, Response_6>>;
    };
    put: {
        <Params_3 extends {}, Query_3 extends {}, Body_4 extends {}, Path_6 extends string, Response_7 extends unknown>(path: Path_6, options: RouteOptions<Params_3, Query_3, Body_4, Response_7>): Route<Path_6, "PUT", Params_3, Query_3, Body_4, Response_7, RouteOptions<Params_3, Query_3, Body_4, Response_7>>;
        <Path_7 extends string, Response_8 extends unknown>(path: Path_7, handler: RouteHandler<{}, {}, {}, Response_8>): Route<Path_7, "PUT", {}, {}, {}, Response_8, RouteOptions<{}, {}, {}, Response_8>>;
    };
    delete: {
        <Params_4 extends {}, Query_4 extends {}, Body_5 extends {}, Path_8 extends string, Response_9 extends unknown>(path: Path_8, options: RouteOptions<Params_4, Query_4, Body_5, Response_9>): Route<Path_8, "DELETE", Params_4, Query_4, Body_5, Response_9, RouteOptions<Params_4, Query_4, Body_5, Response_9>>;
        <Path_9 extends string, Response_10 extends unknown>(path: Path_9, handler: RouteHandler<{}, {}, {}, Response_10>): Route<Path_9, "DELETE", {}, {}, {}, Response_10, RouteOptions<{}, {}, {}, Response_10>>;
    };
    options: {
        <Params_5 extends {}, Query_5 extends {}, Body_6 extends {}, Path_10 extends string, Response_11 extends unknown>(path: Path_10, options: RouteOptions<Params_5, Query_5, Body_6, Response_11>): Route<Path_10, "OPTIONS", Params_5, Query_5, Body_6, Response_11, RouteOptions<Params_5, Query_5, Body_6, Response_11>>;
        <Path_11 extends string, Response_12 extends unknown>(path: Path_11, handler: RouteHandler<{}, {}, {}, Response_12>): Route<Path_11, "OPTIONS", {}, {}, {}, Response_12, RouteOptions<{}, {}, {}, Response_12>>;
    };
};
export { route };
export type { Route };
