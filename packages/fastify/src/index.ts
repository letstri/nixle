import type { FastifyInstance } from 'fastify';
import { createProvider } from 'nixle';

export const fastifyProvider = createProvider<FastifyInstance>((app) => {
  return {
    request: (method, path, handler) =>
      app[method](path, async (req, res) => {
        res.send(await handler({ req, res, setStatusCode: res.status, setHeader: res.header }));
      }),
    server: app,
  };
});
