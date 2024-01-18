import type { HTTPMethod, RouteHandler, RouteOptions } from '..';

interface Route<
  Path extends string = string,
  Method extends HTTPMethod = HTTPMethod,
  P extends {} = any,
  Q extends {} = any,
  B extends {} = any,
  R extends unknown = unknown,
> {
  path: Path;
  method: Method;
  options: RouteOptions<P, Q, B, R>;
  $infer: {
    path: Path;
    method: Method;
    params: Awaited<P>;
    query: Awaited<Q>;
    body: Awaited<B>;
    response: Awaited<R>;
  };
}

function get<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(
  path: Path,
  optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>,
): Route<Path, 'GET', P, Q, B, R> {
  const $infer = {} as {
    path: Path;
    method: 'GET';
    params: Awaited<P>;
    query: Awaited<Q>;
    body: Awaited<B>;
    response: Awaited<R>;
  };

  if (typeof optionsOrHandler === 'function') {
    return {
      path,
      method: 'GET',
      options: {
        handler: optionsOrHandler,
      },
      $infer,
    };
  }

  return {
    path,
    method: 'GET',
    options: optionsOrHandler,
    $infer,
  };
}

function post<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(
  path: Path,
  optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>,
): Route<Path, 'POST', P, Q, B, R> {
  const $infer = {} as {
    path: Path;
    method: 'POST';
    params: Awaited<P>;
    query: Awaited<Q>;
    body: Awaited<B>;
    response: Awaited<R>;
  };

  if (typeof optionsOrHandler === 'function') {
    return {
      path,
      method: 'POST',
      options: {
        handler: optionsOrHandler,
      },
      $infer,
    };
  }

  return {
    path,
    method: 'POST',
    options: optionsOrHandler,
    $infer,
  };
}
function patch<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(
  path: Path,
  optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>,
): Route<Path, 'PATCH', P, Q, B, R> {
  const $infer = {} as {
    path: Path;
    method: 'PATCH';
    params: Awaited<P>;
    query: Awaited<Q>;
    body: Awaited<B>;
    response: Awaited<R>;
  };

  if (typeof optionsOrHandler === 'function') {
    return {
      path,
      method: 'PATCH',
      options: {
        handler: optionsOrHandler,
      },
      $infer,
    };
  }

  return {
    path,
    method: 'PATCH',
    options: optionsOrHandler,
    $infer,
  };
}
function put<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(
  path: Path,
  optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>,
) {
  const $infer = {} as {
    path: Path;
    method: 'PUT';
    params: Awaited<P>;
    query: Awaited<Q>;
    body: Awaited<B>;
    response: Awaited<R>;
  };

  if (typeof optionsOrHandler === 'function') {
    return {
      path,
      method: 'PUT',
      options: {
        handler: optionsOrHandler,
      },
      $infer,
    };
  }

  return {
    path,
    method: 'PUT',
    options: optionsOrHandler,
    $infer,
  };
}
function _delete<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(
  path: Path,
  optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>,
): Route<Path, 'DELETE', P, Q, B, R> {
  const $infer = {} as {
    path: Path;
    method: 'DELETE';
    params: Awaited<P>;
    query: Awaited<Q>;
    body: Awaited<B>;
    response: Awaited<R>;
  };

  if (typeof optionsOrHandler === 'function') {
    return {
      path,
      method: 'DELETE',
      options: {
        handler: optionsOrHandler,
      },
      $infer,
    };
  }

  return {
    path,
    method: 'DELETE',
    options: optionsOrHandler,
    $infer,
  };
}
function options<Path extends string, P extends {}, Q extends {}, B extends {}, R extends unknown>(
  path: Path,
  optionsOrHandler: RouteOptions<P, Q, B, R> | RouteHandler<P, Q, B, R>,
): Route<Path, 'OPTIONS', P, Q, B, R> {
  const $infer = {} as {
    path: Path;
    method: 'OPTIONS';
    params: Awaited<P>;
    query: Awaited<Q>;
    body: Awaited<B>;
    response: Awaited<R>;
  };

  if (typeof optionsOrHandler === 'function') {
    return {
      path,
      method: 'OPTIONS',
      options: {
        handler: optionsOrHandler,
      },
      $infer,
    };
  }

  return {
    path,
    method: 'OPTIONS',
    options: optionsOrHandler,
    $infer,
  };
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
