import type { FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import { createProvider } from 'nixle';

export const fastifyProvider = createProvider<FastifyInstance>((app) => {
  app.register(cookie);

  return {
    server: app,
    request: (method, path, handler) =>
      app[method](path, async (request, response) => {
        response.send(
          await handler({
            request,
            response,
            setStatusCode: response.status,
            setHeader: response.header,
            setCookie: response.setCookie,
          }),
        );
      }),
  };
});
