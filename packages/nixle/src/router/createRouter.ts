import type { log } from '~/logger/logger';
import type { HTTPMethod } from '~/utils/HTTPMethod';
import type { Handler } from '~/createProvider';

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
  handler: Handler;
}

export type Routes = (params: { log: typeof log }) => Route[];

export const routers = new Map<string, Routes>([]);

export const createRouter = (path: string, routes: Routes) => [path, routes] as [string, Routes];
