import type { Express } from 'express';
import cookieParser from 'cookie-parser';
import { createProvider } from 'nixle';

export const expressProvider = createProvider<Express>((app) => {
  app.use(cookieParser());

  return {
    server: app,
    request: (method, path, handler) =>
      app[method](path, async (request, response) => {
        response.send(
          await handler({
            request,
            response,
            params: request.params || {},
            query: (request.query as Record<string, string | string[]>) || {},
            setStatusCode: (code) => response.status(code),
            setHeader: (name, value) => response.setHeader(name, value),
            setCookie: (key, value, options = {}) => response.cookie(key, value, options),
          }),
        );
      }),
  };
});
