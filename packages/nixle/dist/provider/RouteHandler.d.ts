import type { CookieOptions, HTTPMethod, StatusCode } from '..';
export interface ProviderRouteHandlerContext<P extends Record<string, string> = Record<string, string>, Q extends Record<string, string | string[]> = Record<string, string | string[]>, B extends Record<string, any> = Record<string, any>> {
    /**
     * Request
     *
     * @deprecated Try to not use it, if you need some features from the request, please create an issue.
     * @see https://github.com/letstri/nixle/issues
     */
    request: any;
    /**
     * Response
     *
     * @deprecated Try to not use it, if you need some features from the response, please create an issue.
     * @see https://github.com/letstri/nixle/issues
     */
    response: any;
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
    params: Awaited<P>;
    /**
     * Query parameters
     *
     * @example
     * // We have a request with query ?name=John
     *
     * // After that we can get query:
     * // => { name: 'John' }
     */
    query: Awaited<Q>;
    /**
     * Body parameters
     *
     * @example
     * // We have a request with body { name: 'John' }
     *
     * // After that we can get body:
     * // => { name: 'John' }
     */
    body: Awaited<B>;
    /**
     * Set status code
     *
     * @param code
     * @default 200
     *
     * @example
     * setStatusCode(StatusCodes.BAD_REQUEST);
     */
    setStatusCode: (code: StatusCode) => void;
    /**
     * Headers
     *
     * @readonly
     */
    headers: Readonly<Record<string, string>>;
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
export interface ProviderRouteHandler<P extends Record<string, string> = Record<string, string>, Q extends Record<string, string | string[]> = Record<string, string | string[]>, B extends Record<string, any> = Record<string, any>, R extends unknown = unknown> {
    (context: ProviderRouteHandlerContext<P, Q, B>): R;
}
