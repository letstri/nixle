import type { HTTPMethod } from '..';
import type { RouteOptionsOrHandler } from './interfaces/Route';

interface Route<Params, Query, Body> {
  path: string;
  method: HTTPMethod;
  route: RouteOptionsOrHandler<Params, Query, Body>;
}

interface RouteMethod<
  Params extends Record<string, unknown> = any,
  Query extends Record<string, unknown> = any,
  Body extends Record<string, unknown> = any,
> {
  (path: string, route: RouteOptionsOrHandler<Params, Query, Body>): Route<Params, Query, Body>;
}

const get: RouteMethod = (path, route) => ({ path, route, method: 'GET' });
const post: RouteMethod = (path, route) => ({ path, route, method: 'POST' });
const patch: RouteMethod = (path, route) => ({ path, route, method: 'PATCH' });
const put: RouteMethod = (path, route) => ({ path, route, method: 'PUT' });
const _delete: RouteMethod = (path, route) => ({ path, route, method: 'DELETE' });
const options: RouteMethod = (path, route) => ({ path, route, method: 'OPTIONS' });

const route = {
  get,
  post,
  patch,
  put,
  delete: _delete,
  options,
} satisfies Record<Lowercase<HTTPMethod>, RouteMethod>;

export { route };
export type { Route };
