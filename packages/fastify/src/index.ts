import { fastify, type FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import { createProvider } from 'nixle';

export const fastifyProvider = createProvider<FastifyInstance>((app = fastify()) => {
  app.register(cookie);

  return {
    app,
    createRoute: (method, path, handler) =>
      app[method](path, async (request, reply) => {
        reply.send(
          await handler({
            request,
            response: reply,
            params: (request.params as Record<string, string>) || {},
            query: { ...(request.query || {}) } as any,
            setStatusCode: (code) => reply.status(code),
            setHeader: (key, value) => reply.header(key, value),
            getHeader: (name) => (request.headers[name] ? String(request.headers[name]) : null),
            setCookie: (key, value, options) => reply.setCookie(key, value, options),
            getCookie: (key) => request.cookies[key] || null,
          }),
        );
      }),
  };
});
