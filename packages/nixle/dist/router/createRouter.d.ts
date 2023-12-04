import type { RequestHandler } from '../provider/RequestHandler';
import type { log } from '../services/logger';
import type { HTTPMethod } from '../types/HTTPMethod';
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
     * @param params.request
     * @param params.response
     * @example
     * handler() {
     *   return { message: 'Hello world!' };
     * }
     */
    handler: RequestHandler;
}
export type Routes = (params: {
    log: typeof log;
}) => Route[];
export declare const routers: Map<string, Routes>;
export declare const createRouter: (path: string, routes: Routes) => readonly [string, Routes];
