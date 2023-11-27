import type { Elysia } from 'elysia';
import { createProvider } from 'nixle';

export const elysiaProvider = createProvider<Elysia>((app) => {
  return {
    request: (method, path, handler) =>
      app[method](path, ({ request, set }) => {
        return handler({
          req: request,
          res: set,
          setStatusCode: (code) => (set.status = code),
          setHeader: (key, value) => (set.headers[key] = value),
        });
      }),
    server: app,
  };
});
