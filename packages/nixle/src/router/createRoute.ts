import type { HTTPMethod, RouteHandler, RouteOptions } from '..';

interface Route<
  Path extends string = string,
  Method extends HTTPMethod = HTTPMethod,
  Params extends {} = any,
  Query extends {} = any,
  Body extends {} = any,
  Response extends unknown = unknown,
  Options extends RouteOptions<Params, Query, Body, Response> = RouteOptions<
    Params,
    Query,
    Body,
    Response
  >,
> {
  path: Path;
  method: Method;
  options: Options;
  $infer: {
    path: Path;
    method: Method;
    params: Awaited<Params>;
    query: Awaited<Query>;
    body: Awaited<Body>;
    response: Awaited<Response>;
  };
}

function createRoute<Method extends HTTPMethod>(method: Method) {
  function route<
    Params extends {},
    Query extends {},
    Body extends {},
    Path extends string,
    Response extends unknown,
  >(
    path: Path,
    options: RouteOptions<Params, Query, Body, Response>,
  ): Route<Path, Method, Params, Query, Body, Response>;
  function route<Path extends string, Response extends unknown>(
    path: Path,
    handler: RouteHandler<{}, {}, {}, Response>,
  ): Route<Path, Method, {}, {}, {}, Response>;

  function route<
    Path extends string,
    Params extends {},
    Query extends {},
    Body extends {},
    Response extends unknown,
  >(
    path: Path,
    optionsOrHandler:
      | RouteOptions<Params, Query, Body, Response>
      | RouteHandler<Params, Query, Body, Response>,
  ): Route<Path, Method, Params, Query, Body, Response> {
    const options =
      typeof optionsOrHandler === 'function' ? { handler: optionsOrHandler } : optionsOrHandler;

    return {
      path,
      method,
      options,
      $infer: {} as any,
    };
  }

  return route;
}

const route = {
  get: createRoute('GET'),
  post: createRoute('POST'),
  patch: createRoute('PATCH'),
  put: createRoute('PUT'),
  delete: createRoute('DELETE'),
  options: createRoute('OPTIONS'),
};

export { route };
export type { Route };
