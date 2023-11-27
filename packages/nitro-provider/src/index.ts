import { type NodeIncomingMessage, type NodeServerResponse, fromNodeMiddleware } from 'h3';
import type { NitroApp } from 'nitropack';
import { type MethodHandler, type HTTPMethod, createProvider } from 'nixle';

export const nitroProvider = createProvider<NitroApp>((app) => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): MethodHandler =>
    (path, handler) =>
      app.router[method](
        path,
        fromNodeMiddleware((req: NodeIncomingMessage, res: NodeServerResponse) => {
          res.setHeader('x-powered-by', 'Nixle');
          return handler({ req, res, setStatusCode: (code) => (res.statusCode = code) });
        }),
      );

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
