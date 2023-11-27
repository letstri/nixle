import type { Elysia } from 'elysia';
import {
  type Provider,
  type ApiMethods,
  type MethodHandler,
  type HTTPMethod,
  createProvider,
} from 'nixle';

export const elysiaProvider = createProvider<Elysia>((app) => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): MethodHandler =>
    (path, handler) =>
      app[method](path, ({ request, set }) => {
        set.headers['x-powered-by'] = 'Nixle';
        return handler({ req: request, res: null, setStatusCode: (code) => (set.status = code) });
      });

  const methods = {
    get: createMethod('get'),
    post: createMethod('post'),
    patch: createMethod('patch'),
    put: createMethod('put'),
    delete: createMethod('delete'),
  };

  return {
    methods,
    server: app,
  };
});
