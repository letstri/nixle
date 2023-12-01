import { fastify, type FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import { createProvider } from 'nixle';

export const fastifyProvider = createProvider<FastifyInstance>((app = fastify()) => {
  app.register(cookie);

  return {
    app,
    request: (method, path, handler) =>
      app[method](path, async (request, response) => {
        response.send(
          await handler({
            request,
            response,
            params: (request.params as Record<string, string>) || {},
            query: { ...(request.query || {}) } as any,
            setStatusCode: (code) => response.status(code),
            setHeader: (key, value) => response.header(key, value),
            getHeader: (name) => (request.headers[name] ? String(request.headers[name]) : null),
            setCookie: (key, value, options) => response.setCookie(key, value, options),
            getCookie: (key) => request.cookies[key] || null,
          }),
        );
      }),
  };
});
