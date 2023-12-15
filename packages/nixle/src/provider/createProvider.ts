import type { GlobalMiddlewareHandler } from '~/router/interfaces/GlobalMiddleware';
import type { RouteHandler } from '~/router/interfaces/Route';
import type { HTTPMethod } from '~/types/HTTPMethod';

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

export const createProvider = (config: (app: Nixle.Provider) => Provider) => config;
