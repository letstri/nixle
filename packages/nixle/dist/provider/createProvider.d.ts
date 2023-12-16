import type { GlobalMiddlewareHandler } from '../router/interfaces/GlobalMiddleware';
import type { HTTPMethod } from '../types/HTTPMethod';
import type { RouteHandler } from '..';
export interface Provider {
    app: Nixle.Provider;
    globalMiddleware: (middleware: GlobalMiddlewareHandler) => void;
    createRoute: (params: {
        method: Lowercase<HTTPMethod>;
        path: string;
        middleware: RouteHandler<any, any, any>;
        handler: RouteHandler<any, any, any>;
    }) => void;
}
export declare const createProvider: (config: (app: Nixle.Provider) => Provider) => (app: Nixle.Provider) => Provider;
