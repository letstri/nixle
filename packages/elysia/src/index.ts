import { type FastifyInstance } from 'fastify';
import { type MethodHandler, type HTTPMethod, createProvider } from 'nixle';

export const fastifyProvider = createProvider<FastifyInstance>((app) => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): MethodHandler =>
    (path, handler) =>
      app[method](path, async (req, res) => {
        res.header('x-powered-by', 'Nixle');
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
