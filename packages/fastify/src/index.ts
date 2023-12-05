import type { IncomingMessage, ServerResponse } from 'http';
import type { FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import { createProvider } from 'nixle';

declare global {
  namespace Nixle {
    interface Provider extends FastifyInstance {}
    interface Request extends IncomingMessage {}
    interface Response extends ServerResponse<IncomingMessage> {}
  }
}

export const fastifyProvider = createProvider((app) => {
  app.register(cookie);

  return {
    app,
    createRoute: (method, path, handler) =>
      app[method](path, async (request, reply) => {
        reply.send(
          await handler({
            request: request.raw,
            response: reply.raw,
            params: (request.params as Record<string, string>) || {},
            query: { ...(request.query || {}) } as any,
            setStatusCode: (code) => reply.status(code),
            setHeader: (key, value) => reply.header(key, value),
            getHeader: (name) => (request.headers[name] ? String(request.headers[name]) : null),
            setCookie: (key, value, options) => {
              const sameSiteMap = new Map([
                ['Strict', 'strict' as const],
                ['Lax', 'lax' as const],
                ['None', 'none' as const],
              ]);

              return reply.setCookie(key, value, {
                ...options,
                sameSite: sameSiteMap.get(options?.sameSite || 'Strict') || 'strict',
              });
            },
            getCookie: (key) => request.cookies[key] || null,
          }),
        );
      }),
  };
});
