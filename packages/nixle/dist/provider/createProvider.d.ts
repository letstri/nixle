import type { HTTPMethod } from '../types/HTTPMethod';
import type { RequestHandler } from './RequestHandler';
export interface Provider {
    /**
     * Register a route
     *
     * @param method
     * @param path
     * @param handler
     *
     * @example
     * createRoute('get', '/users', () => ({ message: 'Hello world!' }));
     */
    createRoute: (method: Lowercase<HTTPMethod>, path: string, handler: RequestHandler) => void;
    app: Nixle.Provider;
}
export declare const createProvider: (config: (app: Nixle.Provider) => Provider) => (app: Nixle.Provider) => Provider;
