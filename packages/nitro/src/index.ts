import { type NodeIncomingMessage, type NodeServerResponse, fromNodeMiddleware } from 'h3';
import type { NitroApp } from 'nitropack';
import { createProvider } from 'nixle';

export const nitroProvider = createProvider<NitroApp>((app) => {
  return {
    request: (method, path, handler) =>
      app.router[method](
        path,
        fromNodeMiddleware((req: NodeIncomingMessage, res: NodeServerResponse) => {
          return handler({
            req,
            res,
            setStatusCode: (code) => (res.statusCode = code),
            setHeader: res.setHeader,
          });
        }),
      ),
    server: app,
  };
});
