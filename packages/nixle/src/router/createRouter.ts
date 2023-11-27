import { type log } from '~/logger/logger';
import { type HTTPMethod } from '~/utils/HTTPMethod';

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
   * @param params.req Request
   * @param params.res Response
   * @example
   * handler() {
   *   return { message: 'Hello world!' };
   * }
   */
  handler: (params: { req: any; res: any }) => any;
}

export type Routes = (params: { log: typeof log }) => Route[];

export const routers = new Map<string, Routes>([]);

export const createRouter = (path: string, routes: Routes) => {
  return [path, routes] as [string, Routes];
};
