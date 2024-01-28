import type { Elysia, Context } from 'elysia';
import { createProvider, type HTTPMethod, isNixleError } from 'nixle';

type ElysiaRequest = Context['request'];
type ElysiaResponse = Context['set'];

export interface Request extends ElysiaRequest {}
export interface Response extends ElysiaResponse {}

const sameSiteMap = new Map([
  ['Strict', 'strict' as const],
  ['Lax', 'lax' as const],
  ['None', 'none' as const],
]);

export const elysiaProvider = createProvider<Elysia>((app) => {
  app.onError(({ error, set }) => {
    if (isNixleError(error)) {
      set.status = error.statusCode;
    }

    return error;
  });

  return {
    app,
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
