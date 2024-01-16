import type { GlobalMiddlewareHandler } from '~/router/interfaces/GlobalMiddleware';
import type { HTTPMethod } from '~/types/HTTPMethod';
import type { RouteHandler } from '..';

export interface Provider<T = any> {
  app: T;
  globalMiddleware: (middleware: GlobalMiddlewareHandler) => void;
  createRoute: (params: {
    method: Lowercase<HTTPMethod>;
    path: string;
    handler: RouteHandler<any, any, any>;
  }) => void;
}

export function createProvider<T>(config: (app: T) => Provider<T>) {
  return config;
}
