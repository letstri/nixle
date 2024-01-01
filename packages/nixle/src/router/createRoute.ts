import type { HTTPMethod, RouteHandler, RouteOptions } from '..';

interface Route<P extends unknown = any, Q extends unknown = any, B extends unknown = any> {
  path: string;
  method: HTTPMethod;
  options: RouteOptions<P, Q, B>;
}

const formatMethod = <P extends unknown, Q extends unknown, B extends unknown>(
  method: HTTPMethod,
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
): Route<P, Q, B> => {
  if (typeof optionsOrHandler === 'function') {
    return {
      path,
      method,
      options: {
        handler: optionsOrHandler,
      },
    };
  }

  return {
    path,
    method,
    options: optionsOrHandler,
  };
};

function get<P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) {
  return formatMethod('GET', path, optionsOrHandler);
}
function post<P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) {
  return formatMethod('POST', path, optionsOrHandler);
}
function patch<P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) {
  return formatMethod('PATCH', path, optionsOrHandler);
}
function put<P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) {
  return formatMethod('PUT', path, optionsOrHandler);
}
function _delete<P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) {
  return formatMethod('DELETE', path, optionsOrHandler);
}
function options<P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) {
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
