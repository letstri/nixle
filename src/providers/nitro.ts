import { type NodeIncomingMessage, type NodeServerResponse, fromNodeMiddleware } from 'h3';
import { type NitroApp } from 'nitropack';
import { type ApiHandler, type ApiMethods, type HTTPMethod } from '../server';

export const nitroProvider = (app: NitroApp) => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): ApiHandler =>
    (path, handler) =>
      app.router[method](
        path,
        fromNodeMiddleware((req: NodeIncomingMessage, res: NodeServerResponse) =>
          handler({ req, res }),
        ),
      );

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
