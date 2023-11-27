import { type Elysia } from 'elysia';
import { type Provider, type ApiMethods, type MethodHandler } from '~/createApp';
import { type HTTPMethod } from '~/utils/HTTPMethod';

export const elysiaProvider = (app: Elysia): Provider<Elysia> => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): MethodHandler =>
    (path, handler) =>
      app[method](path, ({ request, set }) => {
        set.headers['x-powered-by'] = 'Nixle';
        return handler({ req: request, res: null, setStatusCode: (code) => (set.status = code) });
      });

  const methods: ApiMethods = {
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
};
