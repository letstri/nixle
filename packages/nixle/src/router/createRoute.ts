import type { HTTPMethod, RouteHandler, RouteOptions } from '..';

interface Route<
  Path extends string = string,
  Method extends HTTPMethod = HTTPMethod,
  Params extends unknown = any,
  Query extends unknown = any,
  Body extends unknown = any,
  Handler extends RouteHandler<Params, Query, Body> = RouteHandler<Params, Query, Body>,
> {
  path: Path;
  method: Method;
  options: RouteOptions<Params, Query, Body, Handler>;
  $infer: {
    path: Path;
    method: Method;
    params: Awaited<Params>;
    query: Awaited<Query>;
    body: Awaited<Body>;
    response: Awaited<ReturnType<Handler>>;
  };
}

const formatMethod = <
  Path extends string,
  Method extends HTTPMethod,
  Params extends unknown,
  Query extends unknown,
  Body extends unknown,
  Handler extends RouteHandler<Params, Query, Body>,
>(
  method: Method,
  path: Path,
  optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler,
): Route<Path, Method, Params, Query, Body, Handler> => {
  const $infer = {} as {
    path: Path;
    method: Method;
    params: Awaited<Params>;
    query: Awaited<Query>;
    body: Awaited<Body>;
    response: Awaited<ReturnType<Handler>>;
  };

  if (typeof optionsOrHandler === 'function') {
    return {
      path,
      method,
      options: {
        handler: optionsOrHandler,
      },
      $infer,
    };
  }

  return {
    path,
    method,
    options: optionsOrHandler,
    $infer,
  };
};

function get<
  Path extends string,
  Params extends unknown,
  Query extends unknown,
  Body extends unknown,
  Handler extends RouteHandler<Params, Query, Body>,
>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler) {
  return formatMethod('GET', path, optionsOrHandler);
}
function post<
  Path extends string,
  Params extends unknown,
  Query extends unknown,
  Body extends unknown,
  Handler extends RouteHandler<Params, Query, Body>,
>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler) {
  return formatMethod('POST', path, optionsOrHandler);
}
function patch<
  Path extends string,
  Params extends unknown,
  Query extends unknown,
  Body extends unknown,
  Handler extends RouteHandler<Params, Query, Body>,
>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler) {
  return formatMethod('PATCH', path, optionsOrHandler);
}
function put<
  Path extends string,
  Params extends unknown,
  Query extends unknown,
  Body extends unknown,
  Handler extends RouteHandler<Params, Query, Body>,
>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler) {
  return formatMethod('PUT', path, optionsOrHandler);
}
function _delete<
  Path extends string,
  Params extends unknown,
  Query extends unknown,
  Body extends unknown,
  Handler extends RouteHandler<Params, Query, Body>,
>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler) {
  return formatMethod('DELETE', path, optionsOrHandler);
}
function options<
  Path extends string,
  Params extends unknown,
  Query extends unknown,
  Body extends unknown,
  Handler extends RouteHandler<Params, Query, Body>,
>(path: Path, optionsOrHandler: RouteOptions<Params, Query, Body, Handler> | Handler) {
  return formatMethod('OPTIONS', path, optionsOrHandler);
}

const route = {
  get,
  post,
  patch,
  put,
  delete: _delete,
  options,
};

export { route };
export type { Route };
