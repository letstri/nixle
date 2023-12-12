import type { HTTPMethod } from '..';
import type { RouteOptionsOrHandler } from './interfaces/Route';

interface Route {
  path: string;
  method: HTTPMethod;
  route: RouteOptionsOrHandler;
}

const get = <Params = any, Query = any>(
  path: string,
  route: RouteOptionsOrHandler<Params, Query, unknown>,
): Route => ({ path, route, method: 'GET' });
const post = <Params = any, Query = any, Body = any>(
  path: string,
  route: RouteOptionsOrHandler<Params, Query, Body>,
): Route => ({ path, route, method: 'POST' });
const patch = <Params = any, Query = any, Body = any>(
  path: string,
  route: RouteOptionsOrHandler<Params, Query, Body>,
): Route => ({ path, route, method: 'PATCH' });
const put = <Params = any, Query = any, Body = any>(
  path: string,
  route: RouteOptionsOrHandler<Params, Query, Body>,
): Route => ({ path, route, method: 'PUT' });
const _delete = <Params = any, Query = any, Body = any>(
  path: string,
  route: RouteOptionsOrHandler<Params, Query, Body>,
): Route => ({ path, route, method: 'DELETE' });
const options = <Params = any, Query = any, Body = any>(
  path: string,
  route: RouteOptionsOrHandler<Params, Query, Body>,
): Route => ({ path, route, method: 'OPTIONS' });

const route = {
  get,
  post,
  patch,
  put,
  delete: _delete,
  options,
} satisfies Record<Lowercase<HTTPMethod>, (path: string, route: RouteOptionsOrHandler) => Route>;

export { route };
export type { Route };
