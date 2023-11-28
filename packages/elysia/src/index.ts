import type { Elysia } from 'elysia';
import { createProvider } from 'nixle';

export const elysiaProvider = createProvider<Elysia>((app) => {
  return {
    server: app,
    request: (method, path, handler) =>
      app[method](path, ({ request, set, cookie }) => {
        return handler({
          request: request,
          response: set,
          setStatusCode: (code) => (set.status = code),
          setHeader: (key, value) => (set.headers[key] = value),
          setCookie: (name, value, options) => {
            if (options) {
              cookie[name].set(options);
            }
            cookie[name].value = value;
          },
        });
      }),
  };
});
