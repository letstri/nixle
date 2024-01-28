import type { HTTPMethod } from '../types/HTTPMethod';
import type { RouteHandler } from '..';
export interface Provider<T = any> {
    app: T;
    createRoute: (params: {
        method: Lowercase<HTTPMethod>;
        path: string;
        handler: RouteHandler;
    }) => void;
}
export declare function createProvider<T>(config: (app: T) => Provider<T>): (app: T) => Provider<T>;
