import { type FastifyInstance } from 'fastify';
import type { HTTPMethod, ApiMethods, MethodHandler } from '../createApp';

export const fastifyProvider = (app: FastifyInstance) => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): MethodHandler =>
    (path, handler) =>
      app[method](path, async (req, res) => {
        res.send(await handler({ req, res }));
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
