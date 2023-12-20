import type { Elysia, Context } from 'elysia';
import { createProvider, type HTTPMethod, isNixleError } from 'nixle';

type ElysiaRequest = Context['request'];
type ElysiaResponse = Context['set'];

declare global {
  namespace Nixle {
    interface Provider extends Elysia {}
    interface Request extends ElysiaRequest {}
    interface Response extends ElysiaResponse {}
  }
}

const sameSiteMap = new Map([
  ['Strict', 'strict' as const],
  ['Lax', 'lax' as const],
  ['None', 'none' as const],
]);

export const elysiaProvider = createProvider((app) => {
  app.onError(({ error, set }) => {
    if (isNixleError(error)) {
      set.status = error.statusCode;
    }

    return error;
  });

  return {
    app,
    globalMiddleware: (middleware) =>
      app.onRequest(async ({ request, set }) => {
        await middleware({
          url: request.url,
          method: request.method as HTTPMethod,
          setHeader: (key, value) => (set.headers[key] = value),
          getHeader: (key) => request.headers.get(key),
          headers: Object.fromEntries(request.headers.entries()),
        });
      }),
    createRoute: ({ method, path, handler }) =>
      app[method](path, async (context) => {
        return handler({
          request: context.request,
          response: context.set,
          method: context.request.method as HTTPMethod,
          params: context.params || {},
          query: (context.query as Record<string, string | string[]>) || {},
          body: (context.body as Record<string, string>) || {},
          setStatusCode: (code) => (context.set.status = code),
          setHeader: (key, value) => (context.set.headers[key] = value),
          getHeader: (key) => context.request.headers.get(key),
          headers: Object.fromEntries(context.request.headers.entries()),
          setCookie: (name, value, options) => {
            if (options) {
              context.cookie[name].set({
                ...options,
                sameSite: sameSiteMap.get(options?.sameSite || 'Strict') || 'strict',
              });
            }
            context.cookie[name].value = value;
          },
          getCookie: (name) => context.cookie[name].value || null,
        });
      }),
  };
});
