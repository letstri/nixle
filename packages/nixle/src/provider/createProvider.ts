import type { RouteHandler } from '~/router/createRoute';
import type { HTTPMethod } from '~/types/HTTPMethod';

export interface Provider {
  app: Nixle.Provider;
  createMiddleware: (handler: RouteHandler) => void;
  createRoute: (params: {
    method: Lowercase<HTTPMethod>;
    path: string;
    middleware?: RouteHandler;
    handler: RouteHandler;
  }) => void;
}

export const createProvider = (config: (app: Nixle.Provider) => Provider) => config;
