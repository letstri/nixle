import type { HTTPMethod, RouteHandler, RouteOptions } from '..';

interface Route<Params = unknown, Query = unknown, Body = unknown> {
  path: string;
  method: HTTPMethod;
  options?: RouteOptions<Params, Query, Body>;
  handler: RouteHandler<Params, Query, Body>;
}

interface RouteMethod<Params = unknown, Query = unknown, Body = unknown> {
  (
    path: string,
    route: RouteOptions<Params, Query, Body> | RouteHandler<Params, Query, Body>,
  ): Route<Params, Query, Body>;
}

const formatRoute =
  (method: HTTPMethod): RouteMethod =>
  (path, optionsOrHandler) => {
    if (typeof optionsOrHandler === 'function') {
      return {
        path,
        method,
        handler: optionsOrHandler,
      };
    }

    return {
      path,
      method,
      options: optionsOrHandler,
      handler: optionsOrHandler.handler,
    };
  };

const get: RouteMethod = (path, optionsOrHandler) => formatRoute('GET')(path, optionsOrHandler);
const post: RouteMethod = (path, optionsOrHandler) => formatRoute('POST')(path, optionsOrHandler);
const patch: RouteMethod = (path, optionsOrHandler) => formatRoute('PATCH')(path, optionsOrHandler);
const put: RouteMethod = (path, optionsOrHandler) => formatRoute('PUT')(path, optionsOrHandler);
const _delete: RouteMethod = (path, optionsOrHandler) =>
  formatRoute('DELETE')(path, optionsOrHandler);
const options: RouteMethod = (path, optionsOrHandler) =>
  formatRoute('OPTIONS')(path, optionsOrHandler);

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
