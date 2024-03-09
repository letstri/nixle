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
        <Path_1 extends string, Response_1 extends unknown>(path: ValidPath<Path_1>, handler: RouteHandler<{}, {}, {}, Response_1>): Route<Path_1, "GET", {}, {}, {}, Response_1, RouteOptions<{}, {}, {}, Response_1>>;
    };
    post: {
        <Path_2 extends string, Params_1 extends {}, Query_1 extends {}, Body_1 extends {}, Response_2 extends unknown>(path: ValidPath<Path_2>, options: RouteOptions<Params_1, Query_1, Body_1, Response_2>): Route<Path_2, "POST", Params_1, Query_1, Body_1, Response_2, RouteOptions<Params_1, Query_1, Body_1, Response_2>>;
        <Path_3 extends string, Response_3 extends unknown>(path: ValidPath<Path_3>, handler: RouteHandler<{}, {}, {}, Response_3>): Route<Path_3, "POST", {}, {}, {}, Response_3, RouteOptions<{}, {}, {}, Response_3>>;
    };
    patch: {
        <Path_4 extends string, Params_2 extends {}, Query_2 extends {}, Body_2 extends {}, Response_4 extends unknown>(path: ValidPath<Path_4>, options: RouteOptions<Params_2, Query_2, Body_2, Response_4>): Route<Path_4, "PATCH", Params_2, Query_2, Body_2, Response_4, RouteOptions<Params_2, Query_2, Body_2, Response_4>>;
        <Path_5 extends string, Response_5 extends unknown>(path: ValidPath<Path_5>, handler: RouteHandler<{}, {}, {}, Response_5>): Route<Path_5, "PATCH", {}, {}, {}, Response_5, RouteOptions<{}, {}, {}, Response_5>>;
    };
    put: {
        <Path_6 extends string, Params_3 extends {}, Query_3 extends {}, Body_3 extends {}, Response_6 extends unknown>(path: ValidPath<Path_6>, options: RouteOptions<Params_3, Query_3, Body_3, Response_6>): Route<Path_6, "PUT", Params_3, Query_3, Body_3, Response_6, RouteOptions<Params_3, Query_3, Body_3, Response_6>>;
        <Path_7 extends string, Response_7 extends unknown>(path: ValidPath<Path_7>, handler: RouteHandler<{}, {}, {}, Response_7>): Route<Path_7, "PUT", {}, {}, {}, Response_7, RouteOptions<{}, {}, {}, Response_7>>;
    };
    delete: {
        <Path_8 extends string, Params_4 extends {}, Query_4 extends {}, Body_4 extends {}, Response_8 extends unknown>(path: ValidPath<Path_8>, options: RouteOptions<Params_4, Query_4, Body_4, Response_8>): Route<Path_8, "DELETE", Params_4, Query_4, Body_4, Response_8, RouteOptions<Params_4, Query_4, Body_4, Response_8>>;
        <Path_9 extends string, Response_9 extends unknown>(path: ValidPath<Path_9>, handler: RouteHandler<{}, {}, {}, Response_9>): Route<Path_9, "DELETE", {}, {}, {}, Response_9, RouteOptions<{}, {}, {}, Response_9>>;
    };
    options: {
        <Path_10 extends string, Params_5 extends {}, Query_5 extends {}, Body_5 extends {}, Response_10 extends unknown>(path: ValidPath<Path_10>, options: RouteOptions<Params_5, Query_5, Body_5, Response_10>): Route<Path_10, "OPTIONS", Params_5, Query_5, Body_5, Response_10, RouteOptions<Params_5, Query_5, Body_5, Response_10>>;
        <Path_11 extends string, Response_11 extends unknown>(path: ValidPath<Path_11>, handler: RouteHandler<{}, {}, {}, Response_11>): Route<Path_11, "OPTIONS", {}, {}, {}, Response_11, RouteOptions<{}, {}, {}, Response_11>>;
    };
};
export { route };
export type { Route };
