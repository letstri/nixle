import { type NodeIncomingMessage, type NodeServerResponse, fromNodeMiddleware } from 'h3';
import { type NitroApp } from 'nitropack';
import { type MethodHandler, type ApiMethods, type Provider } from '../createApp';
import { type HTTPMethod } from '../utils/HTTPMethod';

export const nitroProvider = (app: NitroApp): Provider<NitroApp> => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): MethodHandler =>
    (path, handler) =>
      app.router[method](
        path,
        fromNodeMiddleware((req: NodeIncomingMessage, res: NodeServerResponse) => {
          res.setHeader('x-powered-by', 'ScaleX');
          return handler({ req, res, setStatusCode: (code) => (res.statusCode = code) });
        }),
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
