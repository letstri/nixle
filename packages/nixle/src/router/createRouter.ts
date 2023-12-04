import type { RequestHandler } from '~/provider/RequestHandler';
import type { log } from '~/logger';
import type { HTTPMethod } from '~/types/HTTPMethod';

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

export const routerOptions: Nixle.RouterOptions = {};

export const addRouterOptions = (options: Record<string, unknown>) => {
  Object.assign(routerOptions, options);
};

export type Routes = (params: { log: typeof log } & Nixle.RouterOptions) => Route[];

export const routers = new Map<string, Routes>([]);

export const createRouter = (path: string, routes: Routes) => [path, routes] as const;
