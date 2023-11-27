import type { Express } from 'express';
import { createProvider } from 'nixle';

export const expressProvider = createProvider<Express>((app) => {
  return {
    request: (method, path, handler) =>
      app[method](path, async (req, res) => {
        res.send(await handler({ req, res, setStatusCode: res.status, setHeader: res.setHeader }));
      }),
    server: app,
  };
});
