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
            setStatusCode: response.status,
            setHeader: response.setHeader,
            setCookie: response.cookie,
          }),
        );
      }),
  };
});
