import type { IncomingMessage, ServerResponse } from 'http';
import type { Express } from 'express';
import cookieParser from 'cookie-parser';
import { createProvider } from 'nixle';

declare global {
  namespace Nixle {
    interface Provider extends Express {}
    interface Request extends IncomingMessage {}
    interface Response extends ServerResponse<IncomingMessage> {}
  }
}

export const expressProvider = createProvider((app) => {
  app.use(cookieParser());

  return {
    app,
    createRoute: (method, path, handler) =>
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
