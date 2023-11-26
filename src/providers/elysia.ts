import { type Elysia } from 'elysia';
import type { HTTPMethod, ApiMethods, MethodHandler } from '../createApp';

export const elysiaProvider = (app: Elysia) => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): MethodHandler =>
    (path, handler) =>
      app[method](path, ({ request }) => handler({ req: request, res: null }));

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
