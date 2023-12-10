import type { CookieOptions, HTTPMethod, StatusCode } from '..';
export interface RouteHandlerContext<Params = any, Body = any, Query = any> {
    /**
     * Request
     *
     * @deprecated Try to not use it, if you need some features from the request, please create an issue.
     * @see https://github.com/letstri/nixle/issues
     */
    request: Nixle.Request;
    /**
     * Response
     *
     * @deprecated Try to not use it, if you need some features from the response, please create an issue.
     * @see https://github.com/letstri/nixle/issues
     */
    response: Nixle.Response;
    /**
     * Url of the request
     */
    url: string;
    /**
     * HTTP method
     */
    method: HTTPMethod;
    /**
     * Path parameters
     *
     * @example
     * // We have a path '/users/:id'
     * // And we have a request '/users/123'
     *
     * // After that we can get params:
     * // => { id: '123' }
     */
    params: Awaited<Params>;
    /**
     * Body parameters
     *
     * @example
     * // We have a request with body { name: 'John' }
     *
     * // After that we can get body:
     * // => { name: 'John' }
     */
    body: Awaited<Body>;
    /**
     * Query parameters
     *
     * @example
     * // We have a request with query ?name=John
     *
     * // After that we can get query:
     * // => { name: 'John' }
     */
    query: Awaited<Query>;
    /**
     * Set status code
     *
     * @param code
     * @default 200
     *
     * @example
     * setStatusCode(404);
     */
    setStatusCode: (code: StatusCode) => void;
    /**
     * Headers
     */
    headers: Record<string, string>;
    /**
     * Set header
     *
     * @param key
     * @param value
     *
     * @example
     * setHeader('Content-Type', 'application/json');
     */
    setHeader: (key: string, value: string) => void;
    /**
     * Get header
     *
     * @param key
     *
     * @example
     * getHeader('Content-Type'); // -> application/json
     */
    getHeader: (key: string) => string | null;
    /**
     * Set cookie
     *
     * @param key
     * @param value
     * @param options
     *
     * @example
     * setCookie('token', '123');
     * setCookie('token', '123', { httpOnly: true });
     */
    setCookie: (key: string, value: string, options?: CookieOptions) => void;
    /**
     * Get cookie
     *
     * @param key
     *
     * @example
     * getCookie('token'); // -> 123
     */
    getCookie: (key: string) => string | null;
}
type RouteHandler<Params = any, Query = any, Body = any> = (context: RouteHandlerContext<Params, Query, Body>) => any;
interface RouteOptions<Params = any, Query = any, Body = any> {
    /**
     * HTTP method
     * @default 'GET'
     */
    method?: HTTPMethod;
    /**
     * Status code
     * @default 200
     */
    statusCode?: StatusCode;
    /**
     * Path params handler.
     * In the method you can validate and format incoming params.
     * Returned value will be passed to the `handler({ params })`.
     *
     * @example
     * paramsValidation(params) {
     *   // We have a path '/users/:id'
     *   if (!params.id) {
     *     throw new Error('ID is required');
     *   }
     * }
     *
     * @param params Incoming params
     * @returns Formatted and validated params
     */
    paramsValidation?(params: any): Params;
    /**
     * Body handler.
     * In the method you can validate and format incoming body.
     * Returned value will be passed to the `handler({ body })`.
     *
     * @example
     * bodyValidation(body) {
     *   if (!body.name) {
     *     throw new Error('Name is required');
     *   }
     * }
     *
     * @param body Incoming body
     * @returns Formatted and validated body
     */
    bodyValidation?(body: any): Body;
    /**
     * Query handler.
     * In the method you can validate and format incoming query.
     * Returned value will be passed to the `handler({ query })`.
     *
     * @example
     * queryValidation(query) {
     *   if (!query.name) {
     *     throw new Error('Name is required');
     *   }
     * }
     *
     * @param query Incoming query
     * @returns Formatted and validated query
     */
    queryValidation?(query: any): Query;
    /**
     * Middleware handler.
     * In the method you can do anything you want and it will be called before the main handler.
     * If you return something the main handler will not be called.
     *
     * @param context All available context methods and properties
     *
     * @example
     * middleware({ getHeader }) {
     *   if (!getHeader('Authorization')) {
     *     createError('Authorization is required');
     *   }
     * }
     */
    middleware?: RouteHandler<Params, Query, Body>;
    /**
     * Main request handler.
     * In the method you can do anything you want but we recommend to call a service created with `createService`.
     * Returned value will be sent to the client.
     *
     * @param context All available context methods and properties
     *
     * @example
     * handler(context) {
     *   return { message: 'Hello world!' };
     * }
     */
    handler: RouteHandler<Params, Query, Body>;
}
type RouteOptionsOrHandler<Params = any, Query = any, Body = any> = RouteOptions<Params, Query, Body> | RouteHandler<Params, Query, Body>;
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
export type { Route, RouteHandler };
