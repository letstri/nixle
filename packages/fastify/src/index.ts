import type { FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import { createProvider } from 'nixle';

export const fastifyProvider = createProvider<FastifyInstance>((app) => {
  app.register(cookie);

  return {
    server: app,
    request: (method, path, handler) =>
      app[method](path, async (req, res) => {
        res.send(
          await handler({
            req,
            res,
            setStatusCode: res.status,
            setHeader: res.header,
            setCookie: res.setCookie,
          }),
        );
      }),
  };
});
