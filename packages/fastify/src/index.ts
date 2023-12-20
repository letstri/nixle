import type { IncomingMessage, ServerResponse } from 'http';
import type { FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import { createProvider, type HTTPMethod } from 'nixle';

declare global {
  namespace Nixle {
    interface Provider extends FastifyInstance {}
    interface Request extends IncomingMessage {}
    interface Response extends ServerResponse<IncomingMessage> {}
  }
}

const sameSiteMap = new Map([
  ['Strict', 'strict' as const],
  ['Lax', 'lax' as const],
  ['None', 'none' as const],
]);

export const fastifyProvider = createProvider((app) => {
  app.register(cookie);

  return {
    app,
    globalMiddleware: (middleware) =>
      app.addHook('onRequest', async (request, reply) => {
        await middleware({
          url: request.raw.url!,
          method: request.raw.method as HTTPMethod,
          setHeader: (key, value) => reply.header(key, value),
          getHeader: (name) => (request.headers[name] ? String(request.headers[name]) : null),
          headers: request.headers as Record<string, string>,
        });
      }),
    createRoute: ({ method, path, handler }) =>
      app[method](path, async (request, reply) => {
        reply.send(
          await handler({
            request: request.raw,
            response: reply.raw,
            method: request.raw.method as HTTPMethod,
            params: ({ ...(request.params || {}) } satisfies Record<string, string>) || {},
            query: ({ ...(request.query || {}) } satisfies Record<string, string | string[]>) || {},
            body: ({ ...(request.body || {}) } satisfies Record<string, string>) || {},
            setStatusCode: (code) => reply.status(code),
            setHeader: (key, value) => reply.header(key, value),
            getHeader: (name) => (request.headers[name] ? String(request.headers[name]) : null),
            headers: request.headers as Record<string, string>,
            getCookie: (key) => request.cookies[key] || null,
            setCookie: (key, value, options) =>
              reply.setCookie(key, value, {
                ...options,
                sameSite: sameSiteMap.get(options?.sameSite || 'Strict') || 'strict',
              }),
          }),
        );
      }),
  };
});
