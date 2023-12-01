import type { CookieSerializeOptions } from 'cookie';
import type { HTTPMethod } from '.';
export type Handler = (params: {
    /**
     * Request
     */
    request: any;
    /**
     * Response
     */
    response: any;
    /**
     * Path parameters
     *
     * @example
     * '/users/:id'
     *
     * @returns
     * { id: '1' }
     */
    params: Record<string, string>;
    /**
     * Query parameters
     *
     * @returns
     * { name: 'John' }
     *
     * @example
     * '/users?name=John'
     */
    query: Record<string, string | string[]>;
    /**
     * Set status code
     *
     * @param code
     * @default 200
     *
     * @example
     * setStatusCode(404);
     */
    setStatusCode: (code: number) => void;
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
    setCookie: (key: string, value: string, options?: CookieSerializeOptions) => void;
    /**
     * Get cookie
     *
     * @param key
     *
     * @example
     * getCookie('token'); // -> 123
     */
    getCookie: (key: string) => string | null;
}) => Promise<any> | any;
export interface Provider<App> {
    /**
     * Register a route
     *
     * @param method
     * @param path
     * @param handler
     *
     * @example
     * request('get', '/users', () => ({ message: 'Hello world!' }));
     */
    request: (method: Lowercase<HTTPMethod>, path: string, handler: Handler) => void;
    app: App;
}
export declare const createProvider: <App>(config: (app: App) => Provider<App>) => (app: App) => Provider<App>;
