import type { HTTPMethod } from '../types/HTTPMethod';
import type { RequestHandler } from './RequestHandler';

export interface Provider<App> {
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
  app: App;
}

export interface ProviderCreator<App> {
  (app: App): Provider<App>;
}

export const createProvider = <App>(config: ProviderCreator<App>) => config;
