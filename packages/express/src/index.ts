import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import { createProvider } from 'nixle';

export const expressProvider = createProvider<Express>((app = express()) => {
  app.use(cookieParser());

  return {
    app,
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
            getHeader: (name) => (request.headers[name] ? String(request.headers[name]) : null),
            setCookie: (key, value, options = {}) => response.cookie(key, value, options),
            getCookie: (key) => request.cookies[key] || null,
          }),
        );
      }),
  };
});
