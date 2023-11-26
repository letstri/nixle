import { type HTTPMethod } from './createApp';

export interface Route {
  /**
   * HTTP method
   * @default 'GET'
   */
  method?: HTTPMethod;
  /**
   * Path
   * @default '/'
   * @example '/users'
   * @example '/users/:id'
   */
  path: string;
  /**
   * Handler
   * @param params
   * @param params.req Request
   * @param params.res Response
   * @example
   * handler() {
   *   return { message: 'Hello world!' };
   * }
   * @returns
   */
  handler: (params: { req: any; res: any }) => any;
}

export const routers = new Map<string, () => Route[]>([]);

export const createRouter = (path: string, routes: () => Route[]) => {
  return [path, routes] as [string, () => Route[]];
};
