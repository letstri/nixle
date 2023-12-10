import type { Elysia, Context } from 'elysia';
import { createProvider, type RouteHandlerContext, type HTTPMethod } from 'nixle';

type ElysiaRequest = Context['request'];
type ElysiaResponse = Context['set'];

declare global {
  namespace Nixle {
    interface Provider extends Elysia {}
    interface Request extends ElysiaRequest {}
    interface Response extends ElysiaResponse {}
  }
}

export const elysiaProvider = createProvider((app) => {
  const formatHandler = (context: Context): RouteHandlerContext => ({
    request: context.request,
    response: context.set,
    url: context.request.url,
    method: context.request.method as HTTPMethod,
    params: context.params || {},
    query: (context.query as Record<string, string | string[]>) || {},
    body: (context.body as Record<string, string>) || {},
    setStatusCode: (code) => (context.set.status = code),
    setHeader: (key, value) => (context.set.headers[key] = value),
    getHeader: (key) => context.request.headers.get(key),
    headers: Object.fromEntries(context.request.headers.entries()),
    setCookie: (name, value, options) => {
      const sameSiteMap = new Map([
        ['Strict', 'strict' as const],
        ['Lax', 'lax' as const],
        ['None', 'none' as const],
      ]);

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

  return {
    app,
    createMiddleware: (handler) => app.onBeforeHandle((context) => handler(formatHandler(context))),
    createRoute: ({ method, path, middleware, handler }) =>
      app[method](path, async (context) => {
        if (middleware) {
          const response = await middleware(formatHandler(context));

          if (response) {
            return response;
          }
        }

        return handler(formatHandler(context));
      }),
  };
});
