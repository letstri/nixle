import type { GlobalMiddlewareHandler } from '../router/interfaces/GlobalMiddleware';
import type { HTTPMethod } from '../types/HTTPMethod';
import type { RouteHandler } from '..';
export interface Provider {
    app: Nixle.Provider;
    globalMiddleware: (middleware: GlobalMiddlewareHandler) => void;
    createRoute: (params: {
        method: Lowercase<HTTPMethod>;
        path: string;
        handler: RouteHandler<any, any, any>;
    }) => void;
}
export declare function createProvider(config: (app: Nixle.Provider) => Provider): (app: Nixle.Provider) => Provider;
