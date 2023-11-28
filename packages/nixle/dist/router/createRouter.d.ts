import type { log } from '../logger/logger';
import type { HTTPMethod } from '../utils/HTTPMethod';
import type { Handler } from '../createProvider';
export interface Route {
    /**
     * HTTP method
     * @default 'GET'
     */
    method?: HTTPMethod;
    /**
     * Path
     * @example '/users'
     * @example '/users/:id'
     */
    path: string;
    /**
     * Status code
     * @default 200
     */
    statusCode?: number;
    /**
     * Handler
     * @param params
     * @param params.req Request
     * @param params.res Response
     * @example
     * handler() {
     *   return { message: 'Hello world!' };
     * }
     */
    handler: Handler;
}
export type Routes = (params: {
    log: typeof log;
}) => Route[];
export declare const routers: Map<string, Routes>;
export declare const createRouter: (path: string, routes: Routes) => [string, Routes];
