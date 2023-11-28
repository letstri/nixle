import type { Express } from 'express';
import cookieParser from 'cookie-parser';
import { createProvider } from 'nixle';

export const expressProvider = createProvider<Express>((app) => {
  app.use(cookieParser());

  return {
    server: app,
    request: (method, path, handler) =>
      app[method](path, async (req, res) => {
        res.send(
          await handler({
            req,
            res,
            setStatusCode: res.status,
            setHeader: res.setHeader,
            setCookie: res.cookie,
          }),
        );
      }),
  };
});
