import type { CookieOptions, HTTPMethod, StatusCode } from '~/index';

export interface RouteOptions<Params = any, Query = any, Body = any> {
  /**
   * Status code
   * @default 200
   */
  statusCode?: StatusCode;
  /**
   * Path params validation.
   * In the method you can validate incoming params.
   *
   * @param params Incoming params
   *
   * @example
   * paramsValidation(params) {
   *   // We have a path '/users/:id'
   *   if (!params.id) {
   *     createError('ID is required');
   *   }
   * }
   */
  paramsValidation?(params: any): Params;
  /**
   * Body validation.
   * In the method you can validate body.
   *
   * @param body Incoming body
   *
   * @example
   * bodyValidation(body) {
   *   if (!body.name) {
   *     createError('Name is required');
   *   }
   * }
   */
  bodyValidation?(body: any): Body;
  /**
   * Query handler.
   * In the method you can validate query.
   *
   * @param query Incoming query
   *
   * @example
   * queryValidation(query) {
   *   if (!query.name) {
   *     createError('Name is required');
   *   }
   * }
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
  handler: (context: {
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
     *
     * @readonly
     */
    headers: Readonly<Record<string, string>>;
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
  }) => any;
}

export type RouteHandlerContext<Params = any, Query = any, Body = any> = Parameters<
  RouteOptions<Params, Query, Body>['handler']
>[0];

export interface RouteHandler<Params = any, Query = any, Body = any> {
  (context: RouteHandlerContext<Params, Query, Body>): any;
}

export type RouteOptionsOrHandler<Params = any, Query = any, Body = any> =
  | RouteOptions<Params, Query, Body>
  | RouteHandler<Params, Query, Body>;
