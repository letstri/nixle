import { Elysia } from 'elysia';
import { createProvider } from 'nixle';

export const elysiaProvider = createProvider<Elysia>((app = new Elysia()) => {
  return {
    app,
    request: (method, path, handler) =>
      app[method](path, ({ request, set, cookie, params, query }) => {
        return handler({
          request: request,
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
