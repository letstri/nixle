import { type log } from '~/logger/logger';
import { type HTTPMethod } from '~/utils/HTTPMethod';
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
    handler: (params: {
        req: any;
        res: any;
        setStatusCode: (code: number) => void;
    }) => Promise<any> | any;
}
export type Routes = (params: {
    log: typeof log;
}) => Route[];
export declare const routers: Map<string, Routes>;
export declare const createRouter: (path: string, routes: Routes) => [string, Routes];
