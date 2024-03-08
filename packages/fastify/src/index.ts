import type { IncomingMessage, ServerResponse } from 'http';
import type { FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import { createProvider, type HTTPMethod } from 'nixle';

export interface Request extends IncomingMessage {}
export interface Response extends ServerResponse<IncomingMessage> {}

const sameSiteMap = new Map([
  ['Strict', 'strict' as const],
  ['Lax', 'lax' as const],
  ['None', 'none' as const],
]);

export const fastifyProvider = createProvider<FastifyInstance>((app) => {
  app.register(cookie);

  return {
    app,
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
            redirect: async (url, status) => reply.redirect(status || 302, url),
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
