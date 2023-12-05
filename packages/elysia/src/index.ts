import type { Elysia, Context } from 'elysia';
import { createProvider } from 'nixle';

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
  return {
    app,
    createRoute: (method, path, handler) =>
      app[method](path, ({ request, set, cookie, params, query }) => {
        return handler({
          request,
          response: set,
          params: params || {},
          query: (query as Record<string, string | string[]>) || {},
          setStatusCode: (code) => (set.status = code),
          setHeader: (key, value) => (set.headers[key] = value),
          getHeader: (key) => request.headers.get(key),
          setCookie: (name, value, options) => {
            if (options) {
              cookie[name].set(options);
            }
            cookie[name].value = value;
          },
          getCookie: (name) => cookie[name].value || null,
        });
      }),
  };
});
