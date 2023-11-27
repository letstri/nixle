import type { Express } from 'express';
import { type MethodHandler, createProvider, type HTTPMethod } from 'nixle';

export const expressProvider = createProvider<Express>((app) => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): MethodHandler =>
    (path, handler) =>
      app[method](path, async (req, res) => {
        res.setHeader('x-powered-by', 'Nixle');
        res.send(await handler({ req, res, setStatusCode: res.status }));
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
