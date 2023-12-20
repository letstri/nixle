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

const get = <P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) => formatMethod('GET', path, optionsOrHandler);
const post = <P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) => formatMethod('POST', path, optionsOrHandler);
const patch = <P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) => formatMethod('PATCH', path, optionsOrHandler);
const put = <P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) => formatMethod('PUT', path, optionsOrHandler);
const _delete = <P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) => formatMethod('DELETE', path, optionsOrHandler);
const options = <P extends unknown, Q extends unknown, B extends unknown>(
  path: string,
  optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>,
) => formatMethod('OPTIONS', path, optionsOrHandler);

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
